// src/components/DebugDistortionShader.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export default function DebugDistortionShader({
  src,
  alt = "",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const reqRef = useRef<number | null>(null);

  const [status, setStatus] = useState<
    "idle" | "no-webgl" | "loading" | "texture-ok" | "rendering" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [textureFailed, setTextureFailed] = useState(false);

  // shaders (same as codepen)
  const vertexShader = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;
    void main() {
      vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
      vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
      vec2 mouseDirection = u_mouse - u_prevMouse;
      vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
      float pixelDistanceToMouse = length(pixelToMouseDirection);
      float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
      vec2 uvOffset = strength * - mouseDirection * 0.2;
      vec2 uv = vUv - uvOffset;
      vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
      vec4 colorG = texture2D(u_texture, uv);
      vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));
      gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
  `;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.warn("DebugDistortionShader: container missing");
      return;
    }

    // check WebGL support
    const tempCanvas = document.createElement("canvas");
    const gl =
      tempCanvas.getContext("webgl2") ||
      tempCanvas.getContext("webgl") ||
      tempCanvas.getContext("experimental-webgl");
    if (!gl) {
      console.error("DebugDistortionShader: No WebGL context available");
      setStatus("no-webgl");
      setErrorMsg("No WebGL available in this browser.");
      return;
    }
    setStatus("loading");

    // absolute URL helper for public/ assets
    const absUrl = (() => {
      try {
        if (src.startsWith("http") || src.startsWith("//")) return src;
        return `${window.location.origin}${src.startsWith("/") ? src : "/" + src}`;
      } catch {
        return src;
      }
    })();

    console.info("DebugDistortionShader: absUrl =", absUrl);

    // create renderer and append canvas
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // important: make canvas occupy the full container
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, 1, 0.01, 10);
    camera.position.z = 1;

    // resizeObserver to size canvas when container measured
    const ro = new ResizeObserver(() => {
      if (!container || !rendererRef.current || !camera) return;
      const r = container.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      rendererRef.current.setSize(
        Math.floor(r.width),
        Math.floor(r.height),
        false,
      );
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // texture loader (with logs)
    const loader = new THREE.TextureLoader();
    (loader as any).crossOrigin = "anonymous";

    let material: THREE.ShaderMaterial | null = null;
    let geo: THREE.PlaneGeometry | null = null;
    let textureObj: THREE.Texture | null = null;

    console.info("DebugDistortionShader: Starting texture load...");
    loader.load(
      absUrl,
      (texture) => {
        console.info("DebugDistortionShader: texture loaded OK");
        setStatus("texture-ok");
        textureObj = texture;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;

        // uniforms
        const uniforms: any = {
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_aberrationIntensity: { value: 0.0 },
          u_texture: { value: texture },
        };

        material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
        });
        geo = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geo, material);
        planeRef.current = mesh;
        scene.add(mesh);

        // start render loop
        setStatus("rendering");

        function animate() {
          // trivial render (we are not updating uniforms here for debug)
          if (rendererRef.current) rendererRef.current.render(scene, camera);
          reqRef.current = requestAnimationFrame(animate);
        }
        reqRef.current = requestAnimationFrame(animate);
      },
      // onProgress
      undefined,
      (err) => {
        console.error("DebugDistortionShader: texture failed to load:", err);
        setTextureFailed(true);
        setStatus("error");
        setErrorMsg(`Texture failed to load: check path/CORS (${absUrl})`);
      },
    );

    // pointer handlers just to avoid TS warnings; not required for initial display
    function noop() {}
    container.addEventListener("pointermove", noop);

    // cleanup
    return () => {
      ro.disconnect();
      container.removeEventListener("pointermove", noop);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      if (planeRef.current) {
        scene.remove(planeRef.current);
        planeRef.current = null;
      }
      if (geo) geo.dispose();
      if (material) material?.dispose();
      if (textureObj) textureObj.dispose();
      if (rendererRef.current) {
        const canvas = rendererRef.current.domElement;
        rendererRef.current.dispose();
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        rendererRef.current = null;
      }
    };
  }, [src]);

  // debug overlay styles
  const overlay = (
    <div className="pointer-events-none absolute top-2 left-2 z-50 rounded bg-black/50 px-2 py-1 text-xs text-white">
      <div>
        Status: <strong>{status}</strong>
      </div>
      {errorMsg ? <div className="mt-1">Error: {errorMsg}</div> : null}
      <div className="mt-1">
        Canvas: {rendererRef.current ? "created" : "no"}
      </div>
    </div>
  );

  // fallback image shown when texture load fails or WebGL unavailable
  const fallback =
    textureFailed || status === "no-webgl" ? (
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onError={() => {
          console.error(
            "Fallback <img> failed to load. Try visiting the URL in the browser directly.",
          );
        }}
      />
    ) : null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: 50 }}
      role="img"
      aria-label={alt}
    >
      {overlay}
      {fallback}
      {/* helpful hint text when idle */}
      {status === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Initializing...
        </div>
      )}
    </div>
  );
}
