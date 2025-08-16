"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import React, { useRef } from "react";

export default function TextAnimation() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div>
      <div className="h-screen w-full bg-neutral-800"></div>

      <div ref={container} className="relative h-[200vh] bg-neutral-950">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <div className="h-screen w-full bg-neutral-200"></div>
        <div className="h-screen w-full bg-neutral-500"></div>
      </div>
    </div>
  );
}

const Section1 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  return (
    <motion.div
      style={{ scale: scale, rotate: rotate }}
      className="sticky top-0 flex h-screen w-full items-center justify-center bg-neutral-300"
    >
      <h1 className="text-8xl">Some Text</h1>
    </motion.div>
  );
};

const Section2 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 0]);

  return (
    <motion.div
      style={{ scale: scale, rotate: rotate }}
      className="relative flex h-screen w-full items-center justify-center gap-20 bg-neutral-500"
    >
      <Image
        src="https://images.unsplash.com/photo-1752625555974-f0b81374d988?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D"
        alt="img1"
        width={300}
        height={600}
      />

      <Image
        src="https://images.unsplash.com/photo-1570470705071-2393ef5cbe3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D"
        alt="img1"
        width={300}
        height={600}
      />
    </motion.div>
  );
};
