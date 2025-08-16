"use client";

import React from "react";
import { easeIn, easeInOut, easeOut, motion } from "motion/react";
import { useState } from "react";

const tabs = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y." },
  { id: "buisness", label: "Buisness" },
  { id: "art", label: "Art" },
  { id: "science", label: "Science" },
];

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <div className="flex gap-6 space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id ? "" : "hover:opacity-50"} relative rounded-full px-3 py-1.5 text-sm font-medium text-white`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 50,
                  mass: 2,
                }}
              />
            )}
            <span className="relative z-10 mix-blend-exclusion">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-check-icon lucide-check mt-10 text-white"
      >
        <motion.path
        animate={{pathLength: 1}}
        strokeLinecap="round"
        strokeLinejoin={}
        d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  );
};
