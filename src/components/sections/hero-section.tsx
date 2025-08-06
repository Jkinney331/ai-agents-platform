"use client";

// import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { LiquidButton } from "../ui/Liquid-button";

const HeroSection = () => {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative">
       <div 
  className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"
  style={{ 
    background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(79, 70, 229, 0.05) 100%)',
    animation: 'pulse 4s ease-in-out infinite'
  }}
>
  <div 
    className="absolute inset-0 opacity-30"
    style={{
      background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
      animation: 'shimmer 3s ease-in-out infinite'
    }}
  />
</div>
      <div className="relative flex flex-col items-center w-full px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 -z-10 h-[600px] md:h-[800px] w-full animated-bg rounded-b-xl" />

        </div>
        <div className="relative z-10 pt-32 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          {/* <p className="border border-border bg-accent rounded-full text-sm h-8 px-3 flex items-center gap-2">
            {hero.badgeIcon}
            {hero.badge}
          </p> */}
          <div className="flex flex-col items-center justify-center gap-5">
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
            <Link
              href={""}>
                <LiquidButton className="cursor-pointer"> Book Demo </LiquidButton>
            </Link>
            {/* <Link
              href={hero.cta.secondary.href}
              className="h-10 flex items-center justify-center w-32 px-5 text-sm font-normal tracking-wide text-primary rounded-full transition-all ease-out active:scale-95 bg-white dark:bg-background border border-[#E5E7EB] dark:border-[#27272A] hover:bg-white/80 dark:hover:bg-background/80"
            >
              {hero.cta.secondary.text}
            </Link> */}
          </div>
        </div>
      </div>
      {/* <HeroVideoSection /> */}
    </section>
  );
}

export default HeroSection;