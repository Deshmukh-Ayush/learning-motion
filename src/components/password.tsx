"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

const PASSWORD_REQUIREMENTS = [
  { regex: /[0-9]/, text: "Password must contain at least 1 number." },
  { regex: /[a-z]/, text: "Password must contain at least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "Password must contain at least 1 uppercase letter" },
  {
    regex: /[!-\/:-@[-`{-~]/,
    text: "Password must contain at least 1 special character",
  },
  { regex: /.{8,}/, text: "Password must contain at least 8 characters" },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;
const levels = [1, 2, 3, 4, 5];
const colors = [
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-green-500",
  "bg-green-600",
];
const STRENGTH_TEXTS: Record<Exclude<StrengthScore, 5>, string> = {
  0: "Enter a password",
  1: "Weak password",
  2: "Medium password!",
  3: "Strong password!!",
  4: "Very Strong password!!!",
};

export default function Password() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [prevStrength, setPrevStrength] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const strength = useMemo(() => {
    const requirements = PASSWORD_REQUIREMENTS.map((r) => ({
      met: r.regex.test(password),
      text: r.text,
    }));
    return {
      score: requirements.filter((r) => r.met).length as StrengthScore,
      requirements,
    };
  }, [password]);

  const isVeryStrong = strength.score >= 5;

  useEffect(() => {
    // Check if we just became very strong
    if (strength.score >= 5 && prevStrength < 5) {
      setShouldAnimate(true);
      // Reset animation trigger after animation completes
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 1000); // Duration covers both scale and vibration

      return () => clearTimeout(timer);
    }
    setPrevStrength(strength.score);
  }, [strength.score, prevStrength]);

  const message =
    password.length === 0
      ? STRENGTH_TEXTS[0]
      : strength.requirements.find((r) => !r.met)
        ? `${strength.requirements.find((r) => !r.met)!.text}`
        : STRENGTH_TEXTS[
            Math.min(strength.score, 4) as keyof typeof STRENGTH_TEXTS
          ];

  const msgColorClass =
    message === STRENGTH_TEXTS[0]
      ? "text-neutral-400"
      : message === STRENGTH_TEXTS[4]
        ? "text-green-500"
        : "text-red-500";

  return (
    <div className="mx-auto mt-8 flex w-xl max-w-2xl flex-col justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-neutral-800"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            aria-invalid={strength.score < 4}
            aria-describedby="password-strength"
            className="text-md block w-full rounded-md border-0 bg-white px-4 py-1 ring-1 ring-neutral-400 transition-all duration-200 ease-in-out placeholder:text-neutral-400 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <motion.button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <motion.div
              key={visible ? "eye-off" : "eye-on"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.3,
              }}
            >
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <div className="mt-2 flex w-full justify-between gap-2">
        {levels.map((lvl, i) => (
          <div
            key={lvl}
            className="relative h-2 w-full overflow-hidden rounded-full border border-neutral-200 bg-neutral-300"
          >
            <motion.div
              className={`h-full rounded-full ${colors[i]}`}
              initial={{ width: 0 }}
              animate={{
                width: strength.score >= lvl ? "100%" : 0,
              }}
              transition={{
                duration: 0.3,
                delay:
                  strength.score >= lvl
                    ? i * 0.1
                    : (levels.length - 1 - i) * 0.1,
                ease: "easeInOut",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <motion.p
          id="password-strength"
          className={`my-2 text-sm font-medium ${msgColorClass}`}
          initial={{
            opacity: 0,

            y: -3,
            filter: "blur(4px)",
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          key={message}
        >
          {message}
        </motion.p>

        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={
            strength.score === 0
              ? "#737373"
              : isVeryStrong
                ? "#22c55e"
                : "#dc2626"
          }
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-lock"
          whileHover={{
            scale: [1, 1.5, 1],
            x: [0, -3, 4, -3, 4, -3, 0],
          }}
          animate={{
            scale: shouldAnimate ? [1, 1.5, 1] : 1,
            x: shouldAnimate ? [0, -3, 4, -3, 4, -3, 0] : 0,
            stroke:
              strength.score === 0
                ? "#737373"
                : isVeryStrong
                  ? "#22c55e"
                  : "#dc2626",
          }}
          transition={{
            scale: { duration: 0.6, ease: "easeInOut" },
            x: { duration: 0.4, ease: "easeInOut", delay: 0.2 },
            stroke: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
          <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
          <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
        </motion.svg>
      </div>
    </div>
  );
}
