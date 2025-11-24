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
import { ModeToggle } from "@/components/theme/theme-toggle";
import { CopyPasteReveal } from "@/components/copy-paste-reveal";
import { AIInput } from "@/components/ai-input";
import { AvatarStack } from "@/components/collections";

export default function Home() {
  const usersData = [
    {
      name: "Evil Rabbit",
      image: "https://avatar.vercel.sh/rabbit",
    },
    {
      name: "shadcn",
      image: "https://avatar.vercel.sh/shadcn",
    },
    {
      name: "Maxime Heckel",
      image: "https://avatar.vercel.sh/maxime",
    },
    {
      name: "Ayush Deshmukh",
      image: "https://avatar.vercel.sh/ayush",
    },
    {
      name: "Lee Robinson",
      image: "https://avatar.vercel.sh/lee",
    },
  ];
  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-black">
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

      {/* <div className="mx-auto h-[70vh] w-5xl bg-neutral-400">
        <DistortImage
          src="/AD.png"
          speed={0.7}
          intensity={0.7}
          decay={0.06}
          className="h-[800px] w-full"
        />
      </div> */}
      {/* <InteractiveButton className="px-8 py-3 text-3xl" onClick={handleClick}>
        Click Me
      </InteractiveButton> */}

      {/* <BentoDemo /> */}
      {/* <ImageExpand
        title="Beautiful Girl"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti error eos omnis cupiditate atque, tempore cumque
                    quaerat itaque id aliquam earum magni accusantium eligendi,
                    sit facere modi ducimus eaque. Minima, asperiores eveniet!"
        src="/girl-img.jpg"
      /> */}
      {/*<Password /> */}
      {/* <HoverUnderline imageSrc="/cloff-ui.png">Cloff UI</HoverUnderline> */}
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
      {/* <ModeToggle /> */}
      {/* <CopyPasteReveal /> */}
      {/* <AIInput /> */}
      <AvatarStack
        items={usersData}
        title="Contributors"
        subtitle="5 Active Members"
      />
    </div>
  );
}
