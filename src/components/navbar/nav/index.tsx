"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "../anim";
import Link from "./link";
import Curve from "./curve";
import Image from "next/image";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Index() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 right-0 h-screen bg-[#292929] text-white"
    >
      <div className="box-border flex h-full flex-col justify-between p-[100px]">
        {/* nav section */}
        <div
          onMouseLeave={() => setSelectedIndicator(pathname)}
          className="mt-2 mb-6 flex flex-col gap-6 text-6xl"
        >
          <div className="mb-[40px] border-b border-[#999] text-[11px] text-[#999] uppercase">
            <p>Navigation</p>
          </div>

          {navItems.map((data, index) => (
            <Link
              key={index}
              data={{ ...data, index }}
              isActive={selectedIndicator == data.href}
              setSelectedIndicator={setSelectedIndicator}
            />
          ))}
        </div>

        {/* footer */}
        <Footer />
      </div>

      {/* curve */}
      <Curve />
    </motion.div>
  );
}

const Footer = () => {
  return (
    <div className="text-md mt-10 flex w-full justify-between gap-2">
      <a href="https://www.instagram.com/cloff.studio">
        <Image src="/Ig-logo.png" alt="ig logo" height={30} width={30} />
      </a>
      <Image src="/LI-In-Bug.png" alt="ig logo" height={30} width={30} />
      <Image src="/X-logo.png" alt="ig logo" height={30} width={30} />
    </div>
  );
};
