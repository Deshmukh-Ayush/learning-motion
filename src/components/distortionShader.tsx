// src/components/DistortionShaderFast.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** Overall responsiveness multiplier: >1 is faster/snappier */
  speed?: number; // default 1.5
  /** How strong the distortion/aberration multiplier is */
  intensity?: number; // default 1.2
  /** How quickly the aberration decays each frame (bigger = quicker fade) */
  decay?: number; // default 0.08
};

export default function DistortImage({
  src,
  alt = "",
  className = "",
  speed = 1.5,
  intensity = 1.2,
  decay = 0.08,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const reqRef = useRef<number | null>(null);

  // mouse state
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const prevMouse = useRef({ x: 0.5, y: 0.5 });
  const aberration = useRef(0);
  const ease = useRef(0.02);

  // shaders — added u_strength uniform to control overall distortion multiplier
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;
    uniform float u_strength;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        // multiply the base offset with u_strength for runtime tuning
        vec2 uvOffset = strength * - mouseDirection * (0.2 * u_strength);
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
  `;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerEl = container;

    // absolute url for public/ files
    const absUrl = (() => {
      if (src.startsWith("http") || src.startsWith("//")) return src;
      return `${window.location.origin}${src.startsWith("/") ? src : "/" + src}`;
    })();

    let material: THREE.ShaderMaterial | null = null;
    let planeGeo: THREE.PlaneGeometry | null = null;
    let textureLoaded: THREE.Texture | null = null;

    // create renderer & append
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    rendererRef.current = renderer;
    containerEl.appendChild(renderer.domElement);

    // scene + camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(80, 1, 0.01, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // resize observer
    const ro = new ResizeObserver(() => {
      if (!containerEl || !rendererRef.current || !cameraRef.current) return;
      const rect = containerEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      rendererRef.current.setSize(
        Math.floor(rect.width),
        Math.floor(rect.height),
        false,
      );
      cameraRef.current.aspect = rect.width / rect.height;
      cameraRef.current.updateProjectionMatrix();
    });
    ro.observe(containerEl);

    // load texture
    const loader = new THREE.TextureLoader();
    (loader as any).crossOrigin = "anonymous";

    loader.load(
      absUrl,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
        textureLoaded = texture;

        const uniforms: any = {
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_aberrationIntensity: { value: 0.0 },
          u_texture: { value: texture },
          u_strength: { value: intensity }, // use intensity prop
        };

        material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
        });

        planeGeo = new THREE.PlaneGeometry(2, 2);
        const plane = new THREE.Mesh(planeGeo, material);
        planeRef.current = plane;
        scene.add(plane);

        // animation loop
        const ACTIVE_EASE = Math.min(0.9, 0.08 * speed + 0.04); // higher = faster follow
        const LEAVE_EASE = 0.06;

        function animate() {
          // easing: move mousePos toward target quickly when moving
          mousePos.current.x +=
            (targetMouse.current.x - mousePos.current.x) * ease.current;
          mousePos.current.y +=
            (targetMouse.current.y - mousePos.current.y) * ease.current;

          if (material) {
            (material.uniforms.u_mouse.value as THREE.Vector2).set(
              mousePos.current.x,
              1.0 - mousePos.current.y,
            );
            (material.uniforms.u_prevMouse.value as THREE.Vector2).set(
              prevMouse.current.x,
              1.0 - prevMouse.current.y,
            );

            // fade aberration by configurable decay per frame (larger = faster fade)
            aberration.current = Math.max(0.0, aberration.current - decay);
            material.uniforms.u_aberrationIntensity.value = aberration.current;
          }

          if (renderer && camera && scene) {
            renderer.render(scene, camera);
          }

          reqRef.current = requestAnimationFrame(animate);
        }

        if (!reqRef.current) reqRef.current = requestAnimationFrame(animate);

        // helper: update active ease when pointer events occur
        function setActiveEase() {
          ease.current = ACTIVE_EASE;
        }
        function setLeaveEase() {
          ease.current = LEAVE_EASE;
        }

        // attach listeners (so they can change ease during interaction)
        containerEl.addEventListener("pointerdown", setActiveEase);
        containerEl.addEventListener("pointerup", setLeaveEase);

        // cleanup: remove those
        const cleanupEaseListeners = () => {
          containerEl.removeEventListener("pointerdown", setActiveEase);
          containerEl.removeEventListener("pointerup", setLeaveEase);
        };

        // patch cleanup into outer scope via ref (we'll call this later)
        (cleanupEaseListenersRef as any).current = cleanupEaseListeners;
      },
      undefined,
      (err) => {
        // texture error — helpful debug
        // eslint-disable-next-line no-console
        console.error(
          "DistortionShaderFast: texture failed to load",
          absUrl,
          err,
        );
      },
    );

    // pointer handlers (use containerEl captured)
    function handleMove(e: PointerEvent) {
      // make follow snappier on move
      ease.current = Math.min(0.9, 0.08 * speed + 0.04); // same formula as ACTIVE_EASE
      const rect = containerEl.getBoundingClientRect();
      prevMouse.current = { ...targetMouse.current };
      targetMouse.current.x = (e.clientX - rect.left) / rect.width;
      targetMouse.current.y = (e.clientY - rect.top) / rect.height;
      // trigger a stronger aberration burst
      aberration.current = Math.min(3.0, 1.0 * speed * intensity + 0.5);
    }
    function handleEnter(e: PointerEvent) {
      // immediate jump to pointer with a faster ease
      ease.current = Math.min(0.9, 0.12 * speed + 0.05);
      const rect = containerEl.getBoundingClientRect();
      targetMouse.current.x = (e.clientX - rect.left) / rect.width;
      targetMouse.current.y = (e.clientY - rect.top) / rect.height;
      mousePos.current.x = targetMouse.current.x;
      mousePos.current.y = targetMouse.current.y;
      aberration.current = Math.min(3.0, 1.0 * speed * intensity + 0.5);
    }
    function handleLeave() {
      // slower easing when leaving so it settles quicker visually
      ease.current = 0.06;
      targetMouse.current = { ...prevMouse.current };
    }

    containerEl.addEventListener("pointermove", handleMove);
    containerEl.addEventListener("pointerenter", handleEnter);
    containerEl.addEventListener("pointerleave", handleLeave);

    // small ref so we can remove added ease listeners created inside texture load
    const cleanupEaseListenersRef = { current: null as null | (() => void) };

    // cleanup
    return () => {
      ro.disconnect();
      containerEl.removeEventListener("pointermove", handleMove);
      containerEl.removeEventListener("pointerenter", handleEnter);
      containerEl.removeEventListener("pointerleave", handleLeave);

      if ((cleanupEaseListenersRef as any).current) {
        (cleanupEaseListenersRef as any).current();
      }

      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      reqRef.current = null;

      if (planeRef.current) {
        scene.remove(planeRef.current);
        planeRef.current = null;
      }

      if (planeGeo) {
        planeGeo.dispose();
        planeGeo = null;
      }

      if (material) {
        material.dispose();
        material = null;
      }

      if (textureLoaded) {
        textureLoaded.dispose();
        textureLoaded = null;
      }

      if (rendererRef.current) {
        const canvas = rendererRef.current.domElement;
        rendererRef.current.dispose();
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        rendererRef.current = null;
      }

      sceneRef.current = null;
      cameraRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, speed, intensity, decay]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-md ${className}`}
      aria-label={alt}
      role="img"
      style={{ minHeight: 50 }}
    />
  );
}

// speed: increases how quickly the mesh follows the mouse. Typical range: 0.6 (soft) → 3.0 (very snappy).

// intensity: multiplies the displacement magnitude. Typical range: 0.5 → 2.5.

// decay: per-frame subtract from aberration. Bigger = shorter burst (quicker fade). Typical range: 0.02 → 0.2.
