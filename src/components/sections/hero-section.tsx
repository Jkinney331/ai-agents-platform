"use client";

// import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { LiquidButton } from "../ui/Liquid-button";
import { BackgroundPaths } from "@/components/ui/background-paths";

const HeroSection = () => {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated brand paths background */}
      <BackgroundPaths title="Hero background" pathCount={14} opacity={0.35} strokeWidth={1.1} speedMs={13000} />

      <div className="relative flex flex-col items-center w-full px-6 md:px-12 lg:px-20">
        <div className="relative z-10 w-full h-full flex flex-col gap-10 items-center justify-center py-28">
          <div className="flex flex-col items-center justify-center gap-5 w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tighter text-balance text-center text-primary">
              {hero.title}
            </h1>
            <p className="text-base md:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {hero.description}
            </p>
            <p className="text-base md:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {hero.support_text}
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap justify-center mb-2">
            <Link href={""}>
              <LiquidButton className="cursor-pointer"> Book Demo </LiquidButton>
            </Link>
          </div>
        </div>
      </div>
      {/* <HeroVideoSection /> */}
    </section>
  );
}

export default HeroSection;