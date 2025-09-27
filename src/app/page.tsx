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
import { ImageExpand } from "@/components/image-expand";
import Password from "@/components/password";
import { HoverUnderline } from "@/components/hover-underline";
import { ActionToolbar } from "@/components/action-toolbar";
import { QRCode } from "@/components/qr-code";

export default function Home() {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const handleClickFailed = () => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Something went wrong")), 2000);
    });
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
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

      {/* <BentoDemo /> */}
      {/* <ImageExpand
        title="Beautiful Girl"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti error eos omnis cupiditate atque, tempore cumque
                    quaerat itaque id aliquam earum magni accusantium eligendi,
                    sit facere modi ducimus eaque. Minima, asperiores eveniet!"
        src="/girl-img.jpg"
      /> */}
      {/* <Password /> */}
      {/* <HoverUnderline imageSrc="/cloff-ui.png">Cloff Studio</HoverUnderline> */}
      {/* <DistortImage
        src="/girl-img.jpg"
        alt="girl"
        speed={0.6}
        decay={0.06}
        intensity={1}
        className="h-[700px] w-[500px] rounded-lg"
      /> */}
      {/* <ActionToolbar /> Incomplete */}
      {/* <QRCode /> */}
    </div>
  );
}
