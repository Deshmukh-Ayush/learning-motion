import { IconPaperclip, IconQrcode, IconX } from "@tabler/icons-react";
import React, { useState, useMemo, useId } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Transition, Variants } from "motion/react";

export const QRCode = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="qr-modal"
            initial={{ opacity: 0, scale: 0.7, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="flex w-60 flex-col gap-2 overflow-hidden rounded-4xl border border-neutral-200 bg-gray-200 p-2"
          >
            <div className="flex grow items-center justify-center overflow-hidden rounded-4xl bg-white p-2">
              <img src="/qr-cloff-ui.png" className="" alt="qrcode" />
            </div>

            <div className="flex grow items-center justify-center gap-2">
              <CopyButton />
              <CloseButton setIsOpen={setIsOpen} />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="qr-button"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            onClick={() => setIsOpen(true)}
            className="flex cursor-pointer items-center justify-center rounded-4xl border border-neutral-200 px-2 py-2 font-medium text-neutral-600 transition-all duration-300 ease-in-out hover:text-neutral-800"
          >
            <IconQrcode className="mr-1" /> Show QR Code
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

type TextMorphProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  transition?: Transition;
};

function TextMorph({
  children,
  as: Component = "p",
  className,
  style,
  variants,
  transition,
}: TextMorphProps) {
  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {};
    return children.split("").map((char) => {
      const lowerChar = char.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;
      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: char === " " ? "\u00A0" : char,
      };
    });
  }, [children, uniqueId]);

  const defaultVariants: Variants = {
    initial: { opacity: 0, y: 10, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -10, filter: "blur(5px)" },
  };

  const defaultTransition: Transition = {
    type: "spring",
    stiffness: 280,
    damping: 22,
    mass: 0.3,
  };

  return (
    <motion.div layout className="inline-flex">
      <Component className={cn(className)} aria-label={children} style={style}>
        <AnimatePresence mode="popLayout" initial={false}>
          {characters.map((character) => (
            <motion.span
              key={character.id}
              layout="position"
              className="inline-block"
              aria-hidden="true"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants || defaultVariants}
              transition={transition || defaultTransition}
            >
              {character.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </Component>
    </motion.div>
  );
}

const CopyButton = () => {
  const [text, setText] = useState("Copy Link");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCopy = async () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);

    try {
      await navigator.clipboard.writeText("https://your-link.com");
      setText("Copied Link");

      setTimeout(() => {
        setText("Copy Link");
        setIsAnimating(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setIsAnimating(false);
    }
  };

  return (
    <motion.button
      layout="position"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
        mass: 3.1,
      }}
      onClick={handleCopy}
      className="text-md flex items-center justify-center gap-2 rounded-4xl border border-neutral-300 bg-white px-6 py-3 text-neutral-600 select-none hover:text-neutral-800"
      style={{
        minWidth: "fit-content",
      }}
      whileTap={{ scale: 0.98 }}
      disabled={isAnimating}
    >
      <motion.div
        initial={false}
        animate={{
          scale:
            text === "Copied Link"
              ? [1, 1.03, 1.06, 1.09, 1.1, 1.1, 1.09, 1.06, 1.03, 1]
              : 1,
          rotate: text === "Copied Link" ? [0, 5, -5, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <IconPaperclip />
      </motion.div>

      <motion.div
        layout="position"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <TextMorph>{text}</TextMorph>
      </motion.div>
    </motion.button>
  );
};

type CloseButtonProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseButton: React.FC<CloseButtonProps> = ({ setIsOpen }) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.9,
      }}
      className="flex items-center justify-center rounded-full border border-neutral-300 bg-white p-3 text-xl text-neutral-600 transition-all duration-300 ease-in-out hover:text-neutral-800"
      onClick={() => setIsOpen(false)}
      aria-label="Close QR"
    >
      <IconX />
    </motion.button>
  );
};
