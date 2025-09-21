"use client";

import { BackgroundGradient } from "@/components/backgroundGradient";
import Bento from "@/components/interactive-button";
import DebugDistortionShader from "@/components/debug";
import DistortImage from "@/components/distortionShader";
import Basics from "@/components/gsap/basics";
import { ScrollTriggerDemo } from "@/components/gsap/scrollTrigger";
import { LandingAnimation } from "@/components/landingAnimation";
import Loader from "@/components/loader";
import MaskingButton from "@/components/maskingButton";
import { Navbar } from "@/components/navbar/index";
import { ParallaxImage } from "@/components/parallaxImage";
import { Sidebar } from "@/components/sidebar";
import TextAnimation from "@/components/text-animation";
import InteractiveButton from "@/components/interactive-button";
import { BentoDemo } from "@/components/bento/bento-demo";

export default function Home() {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  // const handleClickFailed = () => {
  //   return new Promise((_, reject) => {
  //     setTimeout(() => reject(new Error("Something went wrong")), 2000);
  //   });
  // };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100">
      {/* <ParallaxImage /> */}
      {/* <Practise /> */}
      {/* <Sidebar /> */}
      {/* <div className="flex h-full items-center justify-center">
        <MaskingButton href="/" size="lg">
          About Us
        </MaskingButton>
      </div> */}
      {/* <BackgroundGradient /> */}
      {/* <LandingAnimation /> */}
      {/* <Loader /> */}
      {/* <TextAnimation /> */}
      {/* <Basics /> */}

      {/* <ScrollTriggerDemo /> */}
      {/* 
      <div className="mx-auto h-[70vh] w-5xl bg-neutral-400">
        <DistortImage
          src="/AD.png"
          speed={0.7}
          intensity={0.7}
          decay={0.06}
          className="h-[800px] w-full"
        />
      </div> */}
      {/* <InteractiveButton onClick={handleClick}>Something</InteractiveButton> */}

      <BentoDemo />
    </div>
  );
}
