"use client";

import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import Nav from "./nav";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsActive(!isActive)}
        className="fixed right-0 z-2 m-5 flex h-20 w-20 cursor-pointer items-center justify-center rounded-[50%] bg-[#455CE4]"
      >
        <div
          className={`burger relative w-full before:relative before:mx-auto before:block before:h-[1px] before:w-2/5 before:bg-white before:transition-transform before:duration-300 before:content-[''] after:relative after:mx-auto after:block after:h-[1px] after:w-2/5 after:bg-white after:transition-transform after:duration-300 after:content-[''] ${isActive ? "before:top-0 before:rotate-[-45deg] after:top-[-1px] after:rotate-45" : "before:top-[5px] after:top-[-5px]"} `}
        ></div>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
};
