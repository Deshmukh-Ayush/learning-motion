import React from "react";


export const BackgroundGradient = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200">
      <div className="h-94 w-200 border">
        <ShaderGradientCanvas
          style={{
            width: "100%",
            height: "100%",
          }}
          lazyLoad={true}
          fov={100}
          pixelDensity={2}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="waterPlane"
            wireframe={false}
            shader="defaults"
            uTime={8}
            uSpeed={0.3}
            uStrength={1.5}
            uDensity={1.5}
            uFrequency={0}
            uAmplitude={0}
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            color1="#242880"
            color2="#8d7dca"
            color3="#212121"
            reflection={0.1}
            // View (camera) props
            cAzimuthAngle={180}
            cPolarAngle={80}
            cDistance={2.8}
            cameraZoom={9.1}
            // Effect props
            lightType="3d"
            brightness={1}
            envPreset="city"
            grain="on"
            // Tool props
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            // Optional - if using transition features
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>
    </div>
  );
};
