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
                className="mx-auto flex max-w-3xl rounded-2xl border border-dashed border-neutral-500 bg-white p-4 shadow-xl"
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
                    className="text-4xl font-bold"
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
                    className="text-md text-neutral-600"
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
            className="cursor-pointer rounded-2xl border border-dashed border-neutral-500 p-2 shadow-md"
            onClick={() => setOpen(true)}
            layoutId="exp-img-cont"
          >
            <motion.img
              src={src}
              alt="Girl Image"
              className="w-40 rounded-2xl"
              layoutId="expandable-img"
            />
            <motion.p className="mt-2 ml-1" layoutId="expandable-title">
              {title}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </LayoutGroup>
  );
};
