import React from "react";
import { motion } from "motion/react";

export const Skeleton = () => {
  return (
    <motion.div className="relative flex h-full min-h-[6rem] w-full flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-600 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};
