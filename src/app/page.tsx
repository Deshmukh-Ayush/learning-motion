import { BackgroundGradient } from "@/components/backgroundGradient";
import { LandingAnimation } from "@/components/landingAnimation";
import Loader from "@/components/loader";
import MaskingButton from "@/components/maskingButton";
import { Navbar } from "@/components/navbar/index";
import { ParallaxImage } from "@/components/parallaxImage";
import { Sidebar } from "@/components/sidebar";
import TextAnimation from "@/components/text-animation";

export default function Home() {
  return (
    <div className="h-screen w-full bg-neutral-100">
      {/* <ParallaxImage /> */}
      {/* <Practise /> */}
      {/* <Sidebar /> */}
      {/* <MaskingButton /> */}
      {/* <BackgroundGradient /> */}
      <Navbar />
      {/* <LandingAnimation /> */}
      {/* <Loader /> */}
      {/* <TextAnimation /> */}
    </div>
  );
}
