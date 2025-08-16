"use client";

import React from "react";
import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-bolt"
      >
        <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
          initial={{
            pathLength: 0,
          }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.svg> */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="24"
        viewBox="0 0 36 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Shaft */}
        <motion.path
          d="M5 12 L33 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
        {/* Upper head */}
        <motion.path
          d="M27 6 L33 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
        {/* Lower head */}
        <motion.path
          d="M27 18 L33 12"
          initial={{ pathLength: 1 }} // Start with the path fully drawn
          animate={{ pathLength: 0 }} // Animate to path not drawn (reverse)
          transition={{
            duration: 0.2,
            ease: "easeIn",
            delay: 0.4,
          }}
        />
      </motion.svg>
    </div>
  );
}
