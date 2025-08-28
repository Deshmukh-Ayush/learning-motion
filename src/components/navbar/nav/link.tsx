"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { slide, scale } from "../anim";
import { FlipLink } from "@/components/ui/text-effect-flipper";
import { cn } from "@/lib/utils";

interface LinkData {
  title: string;
  href: string;
  index: number;
}

interface IndexProps {
  data: LinkData;
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
  closeNav: () => void;
  className?: string;
}

export default function Index({
  data,
  isActive,
  setSelectedIndicator,
  closeNav,
  className,
}: IndexProps) {
  const { title, href, index } = data;

  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="absolute left-[-30px] h-[10px] w-[10px] rounded-full bg-white"
      />
      <FlipLink
        href={href}
        onClick={closeNav}
        className={`${(cn("font-light text-white no-underline"), className)}`}
      >
        {title}
      </FlipLink>
    </motion.div>
  );
}
