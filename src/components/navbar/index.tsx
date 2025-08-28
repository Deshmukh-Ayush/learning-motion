// components/navbar/index.tsx
"use client";

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import Nav from "./nav";

export const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false); // controls Nav visibility

  const toggle = () => {
    setIsActive((s) => !s);
  };

  // static color — removed auto-detection logic
  const colorClass = isActive
    ? "before:bg-white after:bg-white"
    : "before:bg-neutral-800 after:bg-neutral-800";

  return (
    <>
      <div
        onClick={toggle}
        className="fixed right-0 z-50 m-5 flex h-20 w-20 cursor-pointer items-center justify-center"
        aria-expanded={isActive}
        aria-label="menu"
      >
        <div
          className={`burger relative w-full before:relative before:mx-auto before:block before:h-[2px] before:w-2/5 before:transition-transform before:duration-300 before:content-[''] after:relative after:mx-auto after:block after:h-[2px] after:w-2/5 after:transition-transform after:duration-300 after:content-[''] ${colorClass} ${
            isActive
              ? "before:top-0 before:rotate-[-45deg] after:top-[-1px] after:rotate-45"
              : "before:top-[5px] after:top-[-5px]"
          } `}
        />
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav closeNav={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
