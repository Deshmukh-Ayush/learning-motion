"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-30 bg-neutral-400">
      <h1 className="text-6xl">Contact Me</h1>

      <span className="text-6xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path d="M5 8H20" 
            
          />
          <motion.path d="M5 13H20" />
        </svg>
      </span>
    </div>
  );
}
