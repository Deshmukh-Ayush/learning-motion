"use client";

import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export const ImageExpand = ({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <LayoutGroup>
      <div>
        {/* Expanded Card */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                layoutId="exp-img-cont"
                className="mx-auto flex max-w-3xl rounded-2xl border border-dashed border-neutral-700 bg-white p-4 shadow-xl dark:border-neutral-800 dark:bg-black"
              >
                <motion.img
                  src={src}
                  alt="Girl Image"
                  className="w-80 rounded-2xl"
                  layoutId="expandable-img"
                />

                <motion.div
                  className="flex flex-col gap-4 px-4 py-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h2
                    className="text-4xl font-bold dark:text-neutral-200"
                    layoutId="expandable-title"
                    initial={{
                      filter: "blur(8px)",
                    }}
                    animate={{
                      filter: "blur(0px)",
                    }}
                  >
                    {title}
                  </motion.h2>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 20,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.4,
                    }}
                    className="text-md text-neutral-600 dark:text-neutral-400"
                  >
                    {description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Card */}
        <div className="flex h-screen w-full items-center justify-center">
          <motion.div
            className="cursor-pointer rounded-2xl border border-dashed border-neutral-200 p-2 shadow-md dark:border-neutral-800"
            onClick={() => setOpen(true)}
            layoutId="exp-img-cont"
          >
            <motion.img
              src={src}
              alt="Girl Image"
              className="w-40 rounded-2xl"
              layoutId="expandable-img"
            />
            <div className="flex h-full w-full items-center justify-between px-2 py-1">
              <motion.p
                className="dark:text-neutral-100"
                layoutId="expandable-title"
              >
                {title}
              </motion.p>

              <Arrow />
            </div>
          </motion.div>
        </div>
      </div>
    </LayoutGroup>
  );
};

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.4301 5.92969L20.5001 11.9997L14.4301 18.0697"
        stroke="#fff"
        stroke-width="1"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.4"
        d="M3.5 12H20.33"
        stroke="#fff"
        stroke-width="1"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
