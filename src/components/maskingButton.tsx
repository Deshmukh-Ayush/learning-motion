"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MaskingButtonProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "responsive";
};

const sizeStyles = {
  sm: "px-14 py-4 text-sm",
  md: "px-18 py-6 text-base",
  lg: "px-32 py-8 text-xl",
  // Responsive: small on mobile, medium on tablets, large on desktops
  responsive:
    "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-10 md:py-4 md:text-lg lg:px-16 lg:py-6 lg:text-2xl",
};

export default function MaskingButton({
  children,
  href,
  className = "",
  variant = "dark",
  size = "responsive", // default responsive
}: MaskingButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const bgColor = variant === "dark" ? "bg-black" : "bg-white";
  const textColor = variant === "dark" ? "text-black" : "text-white";
  const hoverTextColor = variant === "dark" ? "text-white" : "text-black";

  return (
    <Link href={href} className="inline-block">
      <motion.div
        role="button"
        tabIndex={0}
        className={`relative cursor-pointer overflow-hidden rounded-full border transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${sizeStyles[size]} ${className}`}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {/* Default (top) children */}
        <motion.span
          className={`absolute z-[2] whitespace-nowrap ${textColor}`}
          initial={false}
          transition={{ type: "spring", mass: 1, damping: 20, stiffness: 250 }}
          animate={{
            top: isHovering ? "-50%" : "50%",
            opacity: isHovering ? 0 : 1,
            transform: `translate(-50%, ${isHovering ? "-100%" : "-50%"})`,
          }}
          style={{ left: "50%" }}
        >
          {children}
        </motion.span>

        {/* Hover (revealed) children */}
        <motion.span
          className={`absolute z-[2] whitespace-nowrap ${hoverTextColor}`}
          initial={false}
          transition={{
            type: "spring",
            mass: 1,
            damping: 20,
            stiffness: 250,
            delay: 0.05,
          }}
          animate={{
            top: isHovering ? "50%" : "100%",
            opacity: isHovering ? 1 : 0,
            transform: `translate(-50%, ${isHovering ? "-50%" : "0%"})`,
          }}
          style={{ left: "50%" }}
        >
          {children}
        </motion.span>

        {/* Expanding background */}
        <motion.div
          className={`absolute bottom-0 left-0 z-[1] h-full w-full rounded-full ${bgColor}`}
          style={{ originY: 1 }}
          initial={false}
          transition={{ type: "spring", mass: 1, damping: 20, stiffness: 250 }}
          animate={{
            scaleY: isHovering ? 1 : 0,
          }}
        />
      </motion.div>
    </Link>
  );
}
