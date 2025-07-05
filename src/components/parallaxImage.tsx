"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const ParallaxImage = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 120], [1, 0.5]);
  const borderRadius = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

  return (
    <div className="relative h-[200vh] overflow-hidden bg-[#0D0F0C]">
      <motion.img
        src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D"
        alt="camera"
        className="absolute inset-0 h-full w-full"
        style={{ scale, borderRadius }}
      />

      <div className="sticky top-0 flex h-screen items-center justify-center">
        <h1 className="text-4xl text-white">Scroll to Animate</h1>
      </div>
    </div>
  );
};
