"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // only animate once
    margin: "-25% 0px", // start animating when 75% in view
  });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.h2
        className={cn("m-0 text-4xl", className)}
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{
          duration: 0.75,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.h2>
    </div>
  );
};

export const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // only animate once
    margin: "-25% 0px", // start animating when 75% in view
  });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.p
        className={cn("m-0", className)}
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{
          duration: 0.75,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.p>
    </div>
  );
};
