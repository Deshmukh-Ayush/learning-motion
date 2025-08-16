import Link from "next/link";
import React from "react";

export const LandingAnimation = () => {
  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Work",
      href: "/work",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ];
  return (
    <div className="min-h-screen w-full bg-black">
      <nav className="h-28 w-full px-14">
        <div className="flex h-full items-center justify-between text-neutral-200">
          <div className="cursor-pointer text-2xl transition duration-300 ease-out hover:text-neutral-400">
            Cloff
          </div>
          <div className="flex gap-10">
            {navItems.map((item, idx) => (
              <Link
                className="cursor-pointer transition duration-300 ease-out hover:text-neutral-400"
                key={idx}
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <Link
            className="border-rounded cursor-pointer border border-gray-200 px-6 py-2 text-xl transition duration-300 ease-out hover:text-neutral-400"
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* hero section */}

      <div className="h-screen w-full bg-red-500 p-4"></div>
    </div>
  );
};
