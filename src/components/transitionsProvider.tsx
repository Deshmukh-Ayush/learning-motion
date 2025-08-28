"use client";

import React, { ReactNode, useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react";

type TransitionsProviderProps = {
  children: ReactNode;
};

export default function TransitionsProvider({
  children,
}: TransitionsProviderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const overlayStyles: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    background: "#525252",
    willChange: "transform",
    pointerEvents: "none",
    transform: "translateY(100%)", // initial position off screen (bottom)
  };

  return (
    <TransitionRouter
      auto
      leave={async (next) => {
        if (overlayRef.current) {
          // Slide overlay up from bottom to cover screen
          await animate(
            overlayRef.current,
            { y: ["100%", "0%"] },
            { duration: 0.5, ease: "easeInOut" },
          );
          await new Promise((resolve) => setTimeout(resolve, 500)); // wait covered
        }
        next();
      }}
      enter={async (next) => {
        if (overlayRef.current) {
          // Slide overlay up and off screen
          await animate(
            overlayRef.current,
            { y: ["0%", "-100%"] },
            { duration: 0.3, ease: "easeInOut" },
          );
          // Reset for next transition
          overlayRef.current.style.transform = "translateY(100%)";
        }
        next();
      }}
    >
      <div ref={overlayRef} style={overlayStyles} className="relative p-2">
        <h1 className="absolute bottom-0 left-0 text-8xl">Cloff Studio</h1>
      </div>
      <div>{children}</div>
    </TransitionRouter>
  );
}
