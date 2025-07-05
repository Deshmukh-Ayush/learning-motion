"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-800">
      <button
        className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle Sidebar
      </button>

      <motion.div
        className="fixed top-0 right-0 h-full w-100 bg-neutral-600 p-4 text-white shadow-lg"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Sidebar</h1>
        </div>
        <p>This is the sidebar content.</p>
        <p>You can add more content here.</p>
      </motion.div>
    </div>
  );
};
