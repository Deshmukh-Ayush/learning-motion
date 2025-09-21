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
  const [state, setState] = useState<
    "idle" | "loading" | "success" | "failure"
  >("idle");

  useEffect(() => {
    if (!clickEnter) return;
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && state === "idle") {
        // call the shared performer with a synthetic event (like original)
        performer({} as React.MouseEvent<HTMLButtonElement>);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [clickEnter, state]);

  // shared action performer (combines both original handlers)
  const performer = useCallback(
    async (event?: React.MouseEvent<HTMLButtonElement>) => {
      if (state !== "idle") return;
      setState("loading");

      try {
        if (onClick)
          await onClick(event ?? ({} as React.MouseEvent<HTMLButtonElement>));

        // mimic original setTimeout waiting for loadingDuration before success/failure branch
        await new Promise((res) => setTimeout(res, loadingDuration));

        try {
          if (onSuccess) await onSuccess();
          setState("success");
        } catch (err) {
          setState("failure");
          if (onFailure) await onFailure();
        }
      } catch (err) {
        setState("failure");
        if (onFailure) await onFailure();
      } finally {
        setTimeout(() => setState("idle"), resetDelay);
      }
    },
    [state, onClick, onSuccess, onFailure, loadingDuration, resetDelay],
  );

  // click handler just delegates
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    performer(e);
  };

  // strip unwanted DOM handlers from props (same as original)
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...filteredProps
  } = props;

  // Icons (same visuals as original)
  const Icons = {
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
        className="icon icon-tabler icons-tabler-outline icon-tabler-corner-down-left opacity-60"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
      </svg>
    ),
    loading: (
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </motion.svg>
    ),
    check: (
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
        className="icon icon-tabler icons-tabler-outline icon-tabler-x"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    ),
  };

  // content mapping (same text + icons)
  const getContent = () => {
    switch (state) {
      case "loading":
        return { text: loadingText, icon: Icons.loading };
      case "success":
        return { text: successText, icon: Icons.check };
      case "failure":
        return { text: failureText, icon: Icons.failure };
      default:
        return { text: children || "Enter", icon: Icons.enter };
    }
  };

  const { text, icon } = getContent();

  const getAnimationDirection = () => {
    switch (state) {
      case "loading":
        return 20;
      case "success":
        return -20;
      case "failure":
        return 20;
      default:
        return 20;
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md border px-3 py-1 tracking-tight transition-colors",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "border-gray-900 bg-black text-white",
        "dark:border-gray-200 dark:bg-white dark:text-black",
        className,
      )}
      whileHover={{
        backgroundColor: "var(--hover-color, #171717)",
      }}
      style={
        {
          "--hover-color": "var(--button-hover, #171717)",
        } as React.CSSProperties
      }
      disabled={state !== "idle"}
      layout
      transition={{
        layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      }}
      {...filteredProps}
    >
      <motion.span
        key={`text-${state}`}
        layout
        initial={{
          opacity: 0,
          filter: "blur(8px)",
          y: getAnimationDirection(),
        }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: -getAnimationDirection() }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {text}
      </motion.span>

      <motion.div
        key={`icon-${state}`}
        layout
        initial={{
          opacity: 0,
          filter: "blur(8px)",
          y: getAnimationDirection(),
        }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: -getAnimationDirection() }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
}
