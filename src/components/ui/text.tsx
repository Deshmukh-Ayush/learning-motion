"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export const Heading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-25% 0px" });

  const words = children.split(" ");

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.h2
        className={cn("m-0 flex flex-wrap gap-2 text-4xl", className)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block overflow-hidden"
            variants={{
              hidden: { y: "100%" },
              visible: { y: "0%" },
            }}
            transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
};

// export const SubHeading = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {
//     once: true, // only animate once
//     margin: "-25% 0px", // start animating when 75% in view
//   });

//   return (
//     <div ref={ref} className="overflow-hidden">
//       <motion.p
//         className={cn("m-0", className)}
//         initial={{ y: "100%" }}
//         animate={isInView ? { y: "0%" } : { y: "100%" }}
//         transition={{
//           duration: 0.75,
//           delay: 0.2,
//           ease: [0.33, 1, 0.68, 1],
//         }}
//       >
//         {children}
//       </motion.p>
//     </div>
//   );
// };

export const SubHeading = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-25% 0px" });

  const letters = children.split("");

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.h2
        className={cn("m-0 flex flex-wrap text-xl", className)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.01 } },
          hidden: {},
        }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block overflow-hidden"
            variants={{
              hidden: { y: "100%" },
              visible: { y: "0%" },
            }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
};
