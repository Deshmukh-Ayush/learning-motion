"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function AdvancedMaskSplitText() {
  const container = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const wordsTextRef = useRef<HTMLHeadingElement>(null);
  const charsTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // 1. Hero text - Lines mask reveal from bottom
      if (heroTextRef.current) {
        SplitText.create(heroTextRef.current, {
          type: "lines",
          linesClass: "hero-line",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.lines, { yPercent: 100 });

            return gsap.to(self.lines, {
              yPercent: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroTextRef.current,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }

      // 2. Paragraph - Lines mask reveal with different timing
      if (paragraphRef.current) {
        SplitText.create(paragraphRef.current, {
          type: "lines",
          linesClass: "para-line",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.lines, { yPercent: 120, opacity: 0.3 });

            return gsap.to(self.lines, {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }

      // 3. Words mask reveal with horizontal slide
      if (wordsTextRef.current) {
        SplitText.create(wordsTextRef.current, {
          type: "words",
          wordsClass: "word",
          mask: "words",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.words, { xPercent: -100, opacity: 0 });

            return gsap.to(self.words, {
              xPercent: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wordsTextRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }

      // 4. Characters mask reveal with scale effect
      if (charsTextRef.current) {
        SplitText.create(charsTextRef.current, {
          type: "chars",
          charsClass: "char",
          mask: "chars",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.chars, {
              yPercent: 100,
              rotation: 15,
              scale: 0.8,
              opacity: 0,
            });

            return gsap.to(self.chars, {
              yPercent: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.02,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: charsTextRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-gray-900 text-white">
      {/* Spacer */}
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold">Scroll Down</h1>
          <p className="text-xl opacity-70">To see the mask reveal effects</p>
        </div>
      </div>

      {/* Hero Text - Lines Mask */}
      <section className="flex h-screen items-center justify-center bg-gray-800 px-8">
        <h1
          ref={heroTextRef}
          className="max-w-4xl text-center text-7xl leading-tight font-black"
        >
          Beautiful Text Reveals With Advanced Masking Effects
        </h1>
      </section>

      {/* Paragraph - Lines Mask */}
      <section className="flex min-h-screen items-center justify-center bg-gray-700 px-8 py-20">
        <div className="max-w-3xl">
          <p
            ref={paragraphRef}
            className="text-2xl leading-relaxed text-gray-200"
          >
            This paragraph demonstrates how SplitText's masking feature creates
            smooth reveal animations. Each line slides up from behind its mask,
            creating a sophisticated entrance effect that feels both modern and
            elegant. The staggered timing adds visual rhythm to the animation.
          </p>
        </div>
      </section>

      {/* Words Mask - Horizontal Reveal */}
      <section className="flex h-screen items-center justify-center bg-gray-600 px-8">
        <h2
          ref={wordsTextRef}
          className="max-w-3xl text-center text-5xl leading-tight font-bold"
        >
          Words slide in horizontally from behind their masks
        </h2>
      </section>

      {/* Characters Mask - Individual Character Animation */}
      <section className="flex h-screen items-center justify-center bg-gray-500 px-8">
        <h2
          ref={charsTextRef}
          className="text-center text-6xl font-black text-gray-900"
        >
          CHARACTER MAGIC
        </h2>
      </section>

      {/* Final section */}
      <section className="flex h-screen items-center justify-center bg-gray-400">
        <div className="text-center text-gray-900">
          <h3 className="mb-4 text-4xl font-bold">Scroll back up!</h3>
          <p className="text-xl">
            Notice how animations reverse with toggleActions
          </p>
        </div>
      </section>
    </div>
  );
}
