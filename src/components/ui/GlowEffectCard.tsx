"use client";

import React from "react";
import { FlippingCard } from "./flipping-card";
import { 
  Code2, 
  TrendingUp, 
  Zap, 
  Settings 
} from "lucide-react";

const hiddenAdvantageData = [
  {
    front: {
      icon: <Code2 size={56} className="text-white drop-shadow-lg" />,
      title: "Technical Expertise",
      gradient: "from-blue-600 via-blue-500 to-indigo-600"
    },
    back: {
      description: "We speak both languages—complex AI and practical business. Our engineers don't just build, they build what matters."
    }
  },
  {
    front: {
      icon: <TrendingUp size={56} className="text-white drop-shadow-lg" />,
      title: "Business Acumen",
      gradient: "from-emerald-600 via-green-500 to-teal-600"
    },
    back: {
      description: "We've been in your shoes. We know what keeps you up at night and what moves the needle. Every solution is designed for real-world impact."
    }
  },
  {
    front: {
      icon: <Zap size={56} className="text-white drop-shadow-lg" />,
      title: "Rapid Execution",
      gradient: "from-amber-500 via-yellow-500 to-orange-500"
    },
    back: {
      description: "While others plan, we deliver. Our 14-day promise isn't a gimmick—it's our proven methodology that gets you results before competitors finish their first meeting."
    }
  },
  {
    front: {
      icon: <Settings size={56} className="text-white drop-shadow-lg" />,
      title: "Future-Ready Solutions",
      gradient: "from-purple-600 via-violet-500 to-fuchsia-600"
    },
    back: {
      description: "We don't just solve today's problems. Our AI solutions are built to evolve with your business and stay ahead of the curve."
    }
  }
];

const GlowCard = () => {
  return (
    <div className="w-full px-6 md:px-12 lg:px-20 py-20 border-t border-border relative z-10">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white text-gray-900">
        The Hidden Advantage
      </h2>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {hiddenAdvantageData.map((card, index) => (
          <div key={index} className="flex justify-center">
            <FlippingCard
              frontContent={
                <div className={`flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-br ${card.front.gradient} relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                      {card.front.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                      {card.front.title}
                    </h3>
                    <div className="w-20 h-1 bg-white/30 rounded-full mx-auto"></div>
                  </div>
                </div>
              }
              backContent={
                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {card.front.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    {card.back.description}
                  </p>
                </div>
              }
              height={320}
              width={400}
              className="shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 transform hover:-translate-y-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlowCard;
