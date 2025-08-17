"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Nav from "./nav";

const ANIM_MS = 350; // match Nav's open/close transition duration (ms)

export const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false); // controls Nav visibility
  const [overlayed, setOverlayed] = useState(false); // true only after Nav finishes opening
  const [isOnDark, setIsOnDark] = useState(false); // true when underlying area is dark
  const burgerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const toggle = () => {
    const next = !isActive;
    setIsActive(next);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // change overlayed only after the nav animation completes
    timeoutRef.current = window.setTimeout(() => {
      setOverlayed(next);
      timeoutRef.current = null;
    }, ANIM_MS);
  };

  // Detect whether the element under the hamburger center belongs to a dark section.
  // Mark your sections like <section data-theme="dark"> or <section data-theme="light">.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;

    const check = () => {
      if (!burgerRef.current) return;
      const r = burgerRef.current.getBoundingClientRect();
      const x = Math.round(r.left + r.width / 2);
      const y = Math.round(r.top + r.height / 2);

      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return;

      const section =
        el.closest<HTMLElement>("[data-theme]") ||
        el.closest<HTMLElement>("[data-section-theme]");

      const theme =
        section?.getAttribute("data-theme") ??
        section?.getAttribute("data-section-theme") ??
        "light";

      if (!mounted) return;
      setIsOnDark(theme === "dark");
    };

    // initial
    check();

    // re-check on scroll/resize
    const onScrollResize = () => check();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);

    // observe DOM changes (images lazy-load, content changes)
    const mo = new MutationObserver(check);
    mo.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    // light polling to catch dynamic changes
    const interval = window.setInterval(check, 300);

    return () => {
      mounted = false;
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
      mo.disconnect();
      clearInterval(interval);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // color logic:
  // - when overlayed (sidebar finished) -> solid white
  // - when underlying area is dark -> solid white
  // - otherwise -> original neutral-800 (exactly how you had it)
  const colorClass =
    overlayed || isOnDark
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
          ref={burgerRef}
          className={`burger relative w-full before:relative before:mx-auto before:block before:h-[2px] before:w-2/5 before:transition-transform before:duration-300 before:content-[''] after:relative after:mx-auto after:block after:h-[2px] after:w-2/5 after:transition-transform after:duration-300 after:content-[''] ${colorClass} ${isActive ? "before:top-0 before:rotate-[-45deg] after:top-[-1px] after:rotate-45" : "before:top-[5px] after:top-[-5px]"} `}
        ></div>
      </div>

      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
};

export default Navbar;
