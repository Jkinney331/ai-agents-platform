"use client";

import { SectionHeader } from "@/components/section-header";
import { SocialProofTestimonials } from "@/components/testimonial-scroll";
import { siteConfig } from "@/lib/config";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "../ui/AcetrinityGlowCard";

const TestimonialSection = () => {
  const { testimonials } = siteConfig;

  return (
    <section
      id="testimonials"
      className="flex flex-col items-center justify-center w-full px-6 md:px-12 lg:px-20 py-20 border-t border-border"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          What Our Clients Say
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          Hear from businesses that have transformed their operations with FlipTech {`Pro's`} AI agent teams.
        </p>

        {/* ✅ Glowing Testimonial Card */}
        <div className="relative w-full mt-10">
          <GlowingEffect
            blur={12}
            glow
            spread={30}
            variant="default"
            movementDuration={1.5}
            borderWidth={2}
            disabled={false}
          />

          <div
            className={cn(
              "relative z-10 p-6 rounded-xl border border-border dark:border-white/10 shadow-md backdrop-blur-md",
              "bg-white/70 dark:bg-zinc-900/40"
            )}
          >
            <Quote className="absolute top-4 left-4 h-5 w-5 text-primary opacity-50" />
            <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6 pl-6">
              “Flip-Tech Pro transformed our customer service with their AI implementation.
              Response times dropped by 80% and customer satisfaction increased by 45%.
              Their 14-day timeline seemed ambitious, but they delivered exactly as promised.”
            </p>

            <div className="pl-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Sarah Johnson
              </p>
              <p className="text-xs text-muted-foreground">CTO, TechVision Inc.</p>
            </div>
          </div>
        </div>
      </SectionHeader>

      {/* ✅ Keep original scrolling testimonials */}
      <SocialProofTestimonials testimonials={testimonials} />
    </section>
  );
};

export default TestimonialSection;
