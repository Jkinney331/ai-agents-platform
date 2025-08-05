"use client";

import React from "react";
import { GlowingEffect } from "./AcetrinityGlowCard";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Technical Expertise",
    description:
      "Deep AI engineering capabilities that transform complex algorithms into practical solutions.",
  },
  {
    title: "Business Acumen",
    description:
      "Strategic insight to identify the highest-impact AI applications for your specific business model.",
  },
  {
    title: "Rapid Execution",
    description:
      "Lightning-fast development methodology that delivers functional AI solutions in just 14 days.",
  },
  {
    title: "AI Control Dashboard",
    description:
      "Every agent comes with an intuitive dashboard to fine-tune, train, and optimize performance in real-time. You're always in control.",
  },
];

const GlowCard = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-8 py-10">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-center mb-8 dark:text-white text-gray-900">
         The Hidden Advantage
      </h2>

      {/* Cards in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  cursor-pointer">
        {features.map((feature, index) => (
          <div key={index} className="relative">
            {/* Glowing effect behind the card */}
            <GlowingEffect
              blur={12}
              glow
              spread={30}
              variant="default"
              movementDuration={1.5}
              borderWidth={2}
              disabled={false}
            />

            {/* Card Content */}
            <div
              className={cn(
                "relative z-10 rounded-xl border p-6 backdrop-blur-md ",
                "bg-white/70 text-gray-900 border-gray-300",           // light mode
                "dark:bg-zinc-800 dark:text-white dark:border-white/20" // dark mode
              )}
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-80">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlowCard;
