import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "../anim";

interface LinkData {
  title: string;
  href: string;
  index: number;
}

interface IndexProps {
  data: LinkData;
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
  className?: string;
}

export default function Index({
  data,
  isActive,
  setSelectedIndicator,
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
      <Link href={href} className="font-light text-white no-underline">
        {title}
      </Link>
    </motion.div>
  );
}
