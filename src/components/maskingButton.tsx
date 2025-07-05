"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MaskingButton() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <motion.button
        className="relative cursor-pointer overflow-hidden rounded-full border bg-white px-48 py-16 text-black"
        initial={false}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <motion.p
          className="absolute z-[2] m-0"
          initial={false}
          transition={{ type: "spring", mass: 1, damping: 17, stiffness: 302 }}
          animate={{
            top: isHovering ? "-50%" : "50%",
            transform: `translate(-50%, ${isHovering ? "-100%" : "-50%"})`,
          }}
          style={{ left: "50%" }}
        >
          About Us
        </motion.p>
        <motion.p
          className="absolute z-[2] m-0"
          initial={false}
          transition={{ type: "spring", mass: 1, damping: 17, stiffness: 302 }}
          animate={{
            top: isHovering ? "50%" : "100%",
            transform: `translate(-50%, ${isHovering ? "-50%" : "0%"})`,
          }}
          style={{ left: "50%" }}
        >
          OUR WORK
        </motion.p>
        <motion.div
          className="absolute bottom-0 left-0 z-[1] h-full w-full rounded-full bg-[#5b76f0]"
          style={{ originY: 1 }}
          initial={false}
          transition={{ type: "spring", mass: 1, damping: 17, stiffness: 302 }}
          animate={{
            scaleY: isHovering ? 1 : 0,
          }}
        ></motion.div>
      </motion.button>
    </div>
  );
}
