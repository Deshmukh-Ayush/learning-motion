import React from "react";
import { motion } from "framer-motion";

// 1. Define the shape of a single item
interface AvatarItem {
  name: string;
  image: string;
}

// 2. Define the component props
interface AvatarStackProps {
  items: AvatarItem[];
  title: string;
  subtitle: string;
  className?: string;
}

/**
 * AvatarStack Component
 * * A reusable component that displays a stack of avatars that fan out on hover.
 */
export const AvatarStack = ({
  items = [],
  title,
  subtitle,
  className = "",
}: AvatarStackProps) => {
  return (
    <div
      className={`group flex flex-col items-center justify-center ${className}`}
    >
      {/* INTERACTION FIX: 
        We moved `initial` and `whileHover` to this specific wrapper 
        instead of the parent container. This ensures the animation 
        only triggers when hovering the images, not the text.
      */}
      <motion.div
        className="relative flex h-16 w-full cursor-pointer items-center justify-center"
        initial="initial"
        whileHover="hover"
      >
        {items.map((item, index) => {
          return (
            <motion.img
              key={item.name}
              src={item.image}
              alt={item.name}
              className="absolute h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm transition-shadow duration-300 hover:shadow-md"
              style={{
                zIndex: items.length - index,
              }}
              variants={{
                initial: {
                  x: index * 4, // Stacked with slight offset
                  y: -index * 0.5, // Slight vertical rise
                  scale: 1 - index * 0.05, // Depth effect
                  opacity: 1,
                },
                hover: {
                  x: (index - (items.length - 1) / 2) * 35, // Symmetric fan out
                  y: 0,
                  scale: 1.1, // Slight zoom on individual item focus
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                },
              }}
            />
          );
        })}
      </motion.div>

      {/* Text Content - Outside the hover trigger zone */}
      <div className="mt-4 flex flex-col items-center gap-0.5">
        <span className="text-sm font-medium text-neutral-900">{title}</span>
        <span className="text-xs text-neutral-500">{subtitle}</span>
      </div>
    </div>
  );
};
