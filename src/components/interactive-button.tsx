"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect, MouseEvent, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  loadingText = "Loading is boring",
  successText = "We got a huge Success",
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
        handleClickInternal();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [clickEnter, state]);

  const handleClickInternal = async () => {
    if (state !== "idle") return;
    setState("loading");
    try {
      if (onClick) {
        const syntheticEvent = {} as MouseEvent<HTMLButtonElement>;
        await onClick(syntheticEvent);
      }
      setTimeout(async () => {
        try {
          if (onSuccess) {
            await onSuccess();
          }
          setState("success");
          setTimeout(() => {
            setState("idle");
          }, resetDelay);
        } catch (error) {
          setState("failure");
          if (onFailure) {
            await onFailure();
          }
          setTimeout(() => {
            setState("idle");
          }, resetDelay);
        }
      }, loadingDuration);
    } catch (error) {
      setState("failure");
      if (onFailure) {
        await onFailure();
      }
      setTimeout(() => {
        setState("idle");
      }, resetDelay);
    }
  };

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (state !== "idle") return;
    setState("loading");
    try {
      if (onClick) {
        await onClick(event);
      }
      setTimeout(async () => {
        try {
          if (onSuccess) {
            await onSuccess();
          }
          setState("success");
          setTimeout(() => {
            setState("idle");
          }, resetDelay);
        } catch (error) {
          setState("failure");
          if (onFailure) {
            await onFailure();
          }
          setTimeout(() => {
            setState("idle");
          }, resetDelay);
        }
      }, loadingDuration);
    } catch (error) {
      setState("failure");
      if (onFailure) {
        await onFailure();
      }
      setTimeout(() => {
        setState("idle");
      }, resetDelay);
    }
  };

  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...filteredProps
  } = props;

  const getContent = () => {
    switch (state) {
      case "loading":
        return { text: loadingText, icon: <LoadingIcon /> };
      case "success":
        return { text: successText, icon: <CheckIcon /> };
      case "failure":
        return { text: failureText, icon: <FailureIcon /> };
      default:
        return { text: children || "Enter", icon: <EnterIcon /> };
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
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)] will-change-transform",
        "border-neutral-100 bg-white text-white hover:bg-neutral-100",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900",
        className,
      )}
      whileHover={{
        scale: 1.06,
      }}
      whileTap={{
        scale: 1,
        animationDuration: 0.1,
      }}
      disabled={state !== "idle"}
      layout
      transition={{
        layout: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
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
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        exit={{
          opacity: 0,
          filter: "blur(8px)",
          y: -getAnimationDirection(),
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        exit={{
          opacity: 0,
          filter: "blur(8px)",
          y: -getAnimationDirection(),
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
}

const EnterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em" // Use em for relative sizing
      height="1.2em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5" // Slightly adjust strokeWidth for better scaling
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-corner-down-left opacity-60"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
    </svg>
  );
};

// Update LoadingIcon
const LoadingIcon = () => {
  return (
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#525252"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

// Update CheckIcon
const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
};

// Update FailureIcon
const FailureIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
