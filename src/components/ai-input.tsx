"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import useMeasure from "react-use-measure";
import Image from "next/image";

// ============================================================================
// TYPES
// ============================================================================

interface Logo {
  title: string;
  src: string;
}

interface DropdownOption {
  label: string;
  value: string;
}

// ============================================================================
// HOOKS
// ============================================================================

const useAutoResizeTextarea = (
  ref: React.RefObject<HTMLTextAreaElement | null>,
) => {
  const handleInput = () => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
    const maxHeight = lineHeight * 4;

    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    }
  };

  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.overflowY = "hidden";
      textarea.style.height = "auto";
    }
  }, [ref]);

  return handleInput;
};

const useCarouselSnap = (
  items: any[],
  showPicker: boolean,
  trayRef: React.RefObject<HTMLDivElement | null>,
  itemRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>,
) => {
  const x = useMotionValue(0);
  const dragStarted = useRef(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [snapPoints, setSnapPoints] = useState<number[]>([]);

  const snapToNearest = () => {
    if (!snapPoints.length) return;
    const current = x.get();
    const target = snapPoints.reduce(
      (p, c) => (Math.abs(c - current) < Math.abs(p - current) ? c : p),
      snapPoints[0],
    );
    animate(x, target, { type: "spring", stiffness: 400, damping: 45 });
  };

  useEffect(() => {
    if (!showPicker) return;

    const timeout = setTimeout(() => {
      const viewport = trayRef.current;
      if (!viewport) return;
      const viewportW = viewport.clientWidth;

      const rects = itemRefs.current
        .map((el) => el?.getBoundingClientRect())
        .filter(Boolean) as DOMRect[];

      if (!rects.length) return;

      const itemW = rects[0].width;
      const stride = rects[1] ? rects[1].left - rects[0].left : itemW;
      const totalW = stride * (items.length - 1) + itemW;

      const left = Math.min(0, viewportW - totalW);
      setConstraints({ left, right: 0 });

      const points = items.map((_, i) => -i * stride + (viewportW - itemW) / 2);
      setSnapPoints(points);

      x.set(points[0] ?? 0);
    }, 50);

    return () => clearTimeout(timeout);
  }, [showPicker, items.length, trayRef, itemRefs]);

  return { x, constraints, dragStarted, snapToNearest };
};

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

// ============================================================================
// PRIMITIVE COMPONENTS
// ============================================================================

const SelectorIcon = ({ isOpen }: { isOpen?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-selector"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        d="M8 9l4 -4l4 4"
        animate={{
          d: isOpen ? "M8 15l4 4l4 -4" : "M8 9l4 -4l4 4",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.path
        d="M16 15l-4 4l-4 -4"
        animate={{
          d: isOpen ? "M16 9l-4 -4l-4 4" : "M16 15l-4 4l-4 -4",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
};

const RightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697"
        stroke="#fff"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12H20.33"
        stroke="#fff"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconSquare = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
    </svg>
  );
};

// ============================================================================
// COMPOUND COMPONENTS
// ============================================================================

export const AIInput = ({ children }: { children: React.ReactNode }) => {
  const [measureRef, bounds] = useMeasure();

  return (
    <motion.div
      animate={{
        height: bounds.height > 0 ? bounds.height : undefined,
      }}
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 0.6,
      }}
      className="relative w-100"
    >
      <div ref={measureRef}>
        <div className="flex w-full flex-col rounded-3xl bg-gray-200 px-2 py-2 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const AIInputTextarea = ({
  placeholder = "Type here.....",
  onSubmit,
  value,
  onChange,
}: {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = useAutoResizeTextarea(textareaRef);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
    handleInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const text = textareaRef.current?.value.trim();
      if (onSubmit && text) {
        onSubmit(text);
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current && value !== undefined) {
      textareaRef.current.value = value;
      handleInput();
    }
  }, [value]);

  return (
    <div className="w-full py-1">
      <textarea
        ref={textareaRef}
        className="w-full resize-none rounded-lg px-3 py-2 outline-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={placeholder}
        defaultValue={value}
      />
    </div>
  );
};

export const AIInputControls = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-10 w-full shrink-0 items-center justify-between rounded-3xl">
      {children}
    </div>
  );
};

export const AIInputLeftControls = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const AIInputRightControls = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const AIInputDropdown = ({
  options,
  defaultValue,
  onChange,
}: {
  options: DropdownOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    defaultValue || options[0]?.label || "",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option: DropdownOption) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        layout
        layoutId="dropdown-container"
        onClick={() => setIsOpen(!isOpen)}
        transition={{
          layout: {
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
        className="flex items-center gap-2 rounded-2xl border-t border-white bg-neutral-100 px-4 py-1 text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={selected}
            initial={{ opacity: 0, filter: "blur(4px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(4px)",
              scale: 0.9,
              position: "absolute",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-block whitespace-nowrap"
          >
            {selected}
          </motion.span>
        </AnimatePresence>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <SelectorIcon />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0, filter: "blur(8px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(8px)" }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              opacity: { duration: 0.2 },
            }}
            className="absolute top-full left-0 z-10 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-600 dark:bg-neutral-800"
          >
            <motion.div layout className="py-1">
              {options.map((option, index) => (
                <motion.button
                  layout
                  key={option.value}
                  initial={{ filter: "blur(8px)" }}
                  animate={{ filter: "blur(0px)" }}
                  exit={{ filter: "blur(8px)" }}
                  transition={{
                    delay: isOpen ? index * 0.0823 : 0,
                    duration: 0.3,
                  }}
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-2 text-left transition-colors hover:bg-neutral-100 hover:dark:bg-neutral-700 ${
                    selected === option.label
                      ? "bg-neutral-50 font-medium text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                      : "text-neutral-700 dark:text-neutral-100"
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AIInputAgentPicker = ({
  agents,
  defaultAgent,
  onChange,
}: {
  agents: Logo[];
  defaultAgent?: Logo;
  onChange?: (agent: Logo) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Logo | null>(
    defaultAgent || null,
  );
  const trayRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { x, constraints, dragStarted, snapToNearest } = useCarouselSnap(
    agents,
    showPicker,
    trayRef,
    itemRefs,
  );

  const handleAgentSelect = (agent: Logo) => {
    if (!dragStarted.current) {
      setSelectedAgent(agent);
      setShowPicker(false);
      onChange?.(agent);
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {showPicker && (
          <motion.div
            className="absolute mb-18 ml-30 flex h-8 w-16 gap-2 rounded-2xl bg-gray-300 backdrop-blur-xs dark:bg-neutral-800"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: showPicker ? "auto" : "none" }}
          >
            <div
              ref={trayRef}
              className="relative h-full w-full"
              style={{ overflow: "hidden" }}
            >
              <motion.div
                drag="x"
                dragDirectionLock
                dragElastic={0.15}
                dragMomentum={false}
                dragTransition={{
                  bounceStiffness: 200,
                  bounceDamping: 25,
                }}
                dragConstraints={constraints}
                style={{ x, willChange: "transform" }}
                onDragStart={() => {
                  dragStarted.current = true;
                }}
                onDragEnd={() => {
                  requestAnimationFrame(() => snapToNearest());
                  setTimeout(() => (dragStarted.current = false), 80);
                }}
                className="flex h-full items-center"
              >
                {agents.map((agent, i) => (
                  <button
                    key={agent.title}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    onPointerUp={() => handleAgentSelect(agent)}
                    className="flex h-full w-full shrink-0 items-center justify-center"
                    style={{ touchAction: "none" }}
                  >
                    <Image
                      src={agent.src}
                      alt={agent.title}
                      height={100}
                      width={100}
                      className="pointer-events-none h-20 w-20"
                    />
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPicker((s) => !s)}
        className="flex h-8 w-8 items-center justify-center rounded-full border-t border-white bg-neutral-100 p-1.5 dark:border-neutral-600 dark:bg-neutral-800"
      >
        <img
          src={selectedAgent?.src ?? "https://via.placeholder.com/100"}
          alt={selectedAgent?.title ?? "AI Agent"}
          className="h-full w-full object-contain"
        />
      </motion.button>
    </>
  );
};

export const AIInputSubmitButton = ({
  onClick,
  disabled = false,
  isLoading = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <IconSquare />
          </motion.div>
        ) : (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <RightArrow />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
