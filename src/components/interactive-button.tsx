"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useCallback, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  loadingText?: string;
  successText?: string;
  failureText?: string;
  onSuccess?: () => void | Promise<void>;
  onFailure?: () => void | Promise<void>;
  loadingDuration?: number;
  resetDelay?: number;
  clickEnter?: boolean;
}

const icons = {
  enter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-60"
    >
      <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
    </svg>
  ),
  loading: (
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#525252"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  ),
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  ),
  failure: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  ),
};

const stateConfig = {
  idle: { text: "Enter", icon: "enter", y: 20 },
  loading: { text: "Loading", icon: "loading", y: 20 },
  success: { text: "Success", icon: "success", y: -20 },
  failure: { text: "Failed", icon: "failure", y: 20 },
} as const;

export default function InteractiveButton({
  className,
  children,
  onClick,
  loadingText = "Loading",
  successText = "Success",
  failureText = "Failed",
  onSuccess,
  onFailure,
  loadingDuration = 1500,
  resetDelay = 3000,
  clickEnter = false,
  ...props
}: ButtonProps) {
  // Filter out conflicting props
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...filteredProps
  } = props;
  const [state, setState] = useState<keyof typeof stateConfig>("idle");

  const config = {
    ...stateConfig[state],
    text:
      state === "idle"
        ? children || "Enter"
        : state === "loading"
          ? loadingText
          : state === "success"
            ? successText
            : failureText,
  };

  const handleAction = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (state !== "idle") return;
      setState("loading");

      try {
        if (onClick)
          await onClick(e ?? ({} as React.MouseEvent<HTMLButtonElement>));
        await new Promise((res) => setTimeout(res, loadingDuration));

        if (onSuccess) await onSuccess();
        setState("success");
      } catch {
        setState("failure");
        if (onFailure) await onFailure();
      } finally {
        setTimeout(() => setState("idle"), resetDelay);
      }
    },
    [state, onClick, onSuccess, onFailure, loadingDuration, resetDelay],
  );

  useEffect(() => {
    if (!clickEnter) return;
    const handler = (e: KeyboardEvent) =>
      e.key === "Enter" && state === "idle" && handleAction();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [clickEnter, state, handleAction]);

  return (
    <motion.button
      onClick={handleAction}
      disabled={state !== "idle"}
      layout
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md border border-gray-900 bg-black px-3 py-1 tracking-tight text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors dark:border-gray-200 dark:bg-white dark:text-black",
        className,
      )}
      whileHover={{ backgroundColor: "var(--hover-color, #171717)" }}
      style={
        {
          "--hover-color": "var(--button-hover, #171717)",
        } as React.CSSProperties
      }
      transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
      {...filteredProps}
    >
      {["text", "icon"].map((type) => (
        <motion.div
          key={`${type}-${state}`}
          layout
          initial={{ opacity: 0, filter: "blur(8px)", y: config.y }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(8px)", y: -config.y }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          {...(type === "text" ? { as: "span" } : {})}
        >
          {type === "text"
            ? config.text
            : icons[config.icon as keyof typeof icons]}
        </motion.div>
      ))}
    </motion.button>
  );
}
