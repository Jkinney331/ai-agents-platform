"use client";

import React from "react";
import { GlowingEffect } from "./ui/AcetrinityGlowCard";
import { TrendingUp, Puzzle, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "AI Market Explosion",
    description:
      "Every day you wait, your competitors get stronger. The AI revolution isn't coming—it's here, and early movers are already capturing market share you might never get back.",
    icon: <TrendingUp size={28} className="text-pink-500 dark:text-pink-400" />,
  },
  {
    title: "Implementation Gap",
    description:
      "You know you need AI, but where do you start? Most companies are stuck in analysis paralysis. We turn your ideas into working solutions in 14 days—not months of meetings and maybes.",
    icon: <Puzzle size={28} className="text-yellow-500 dark:text-yellow-400" />,
  },
  {
    title: "Accelerated ROI",
    description:
      "For less than the cost of one employee, get an entire AI system that works 24/7. See real returns in weeks while others are still writing proposals. Your future starts at $9,500.",
    icon: <Rocket size={28} className="text-green-500 dark:text-green-400" />,
  },
];

const WhyNowSection = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-20 cursor-pointer border-t border-border">
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-white text-gray-900">
        Why Now Is The Time
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group rounded-xl overflow-visible"
          >
            <GlowingEffect
              blur={14}
              glow
              spread={28}
              borderWidth={2}
              movementDuration={1.5}
              disabled={false}
            />

            <div className="relative z-10 rounded-xl border p-6 backdrop-blur-md bg-white/60 dark:bg-zinc-900/70 border-gray-300 dark:border-white/20 shadow-lg">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyNowSection;
