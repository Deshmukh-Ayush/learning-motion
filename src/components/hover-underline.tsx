"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const HoverUnderline = ({
  children,
  className,
  href,
  imageSrc,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  imageSrc: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[150px] w-[200px] overflow-hidden rounded-xl">
        <AnimatePresence>
          {hovered && (
            <motion.img
              key="hover-image"
              src={imageSrc}
              alt="Company Image"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.455, 0.03, 0.515, 0.955] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>

      <a
        href={href}
        target="_blank"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "group relative flex cursor-pointer items-center text-lg font-semibold text-neutral-700",
          "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
          "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:before:origin-left hover:before:scale-x-100",
          className,
        )}
      >
        {children}
      </a>
    </div>
  );
};
