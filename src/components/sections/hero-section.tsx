// import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { LiquidButton } from "../ui/Liquid-button";
import LightRays from "../ui/auoralightray";

const HeroSection = () => {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative">
       <div style={{ width: '100%', height: '600px', position: 'absolute' }}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#00ffff"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays"
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