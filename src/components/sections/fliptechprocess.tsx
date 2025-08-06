'use client'
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Hyperspeed from "../ui/hyperspeed";

interface Step {
  icon: React.ReactNode;
  day: string;
  title: string;
  desc: string;
}

export default function FlipTechProcess() {
  const controls = useAnimation();
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const steps: Step[] = [
    {
      icon: (
        <Image
          src="/bulb.svg"
          alt="icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      day: "Days 1–2",
      title: "Discovery & Strategy",
      desc: "We uncover your business challenges and outline the perfect AI solution.",
    },
    {
      icon: (
        <Image
          src="/calender.svg"
          alt="icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      day: "Days 3–5",
      title: "Solution Design",
      desc: "Our engineers architect the technical approach and data strategy.",
    },
    {
      icon: (
        <Image
          src="/code.svg"
          alt="icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      day: "Days 6–10",
      title: "Rapid Development",
      desc: "Intensive development sprint brings your AI solution to life.",
    },
    {
      icon: (
        <Image
          src="/testing.svg"
          alt="icon"
          width={28}
          height={28}
          className="w-6 h-6"
        />
      ),
      day: "Days 11–13",
      title: "Testing & Refinement",
      desc: "Rigorous testing ensures your AI solution works flawlessly.",
    },
    {
      icon: (
        <Image
          src="/rocket.svg"
          alt="icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      day: "Day 14",
      title: "Launch",
      desc: "Your AI solution goes live with comprehensive documentation and support.",
    },
  ];

  useEffect(() => {
    let start = 0;
    const total = 100;
    const duration = 2000;
    const interval = 20;
    const increment = (interval / duration) * total;

    const animate = () => {
      start += increment;
      if (start >= total) {
        start = total;
      }
      setProgress(start);
      if (start < total) {
        setTimeout(animate, interval);
      }
    };
    animate();
  }, []);

  return (
    <section className="w-full px-4 md:px-8 py-16 text-center bg-white dark:bg-[#18181B] transition-colors duration-300 relative overflow-hidden">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 opacity-30">
        <Hyperspeed
          effectOptions={{
            length: 400,
            roadWidth: 12,
            speedUp: 1.5,
            totalSideLightSticks: 25,
            lightPairsPerRoadWay: 50,
            colors: {
              roadColor: 0x0a0a0a,
              islandColor: 0x0c0c0c,
              background: 0x000000,
              shoulderLines: 0x4a5568,
              brokenLines: 0x4a5568,
              leftCars: [0x3b82f6, 0x8b5cf6, 0x10b981],
              rightCars: [0x06b6d4, 0x0ea5e9, 0x0284c7],
              sticks: 0x06b6d4,
            }
          }}
          className="hyperspeed-bg"
        />
      </div>
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
          THE <span className="text-blue-500">FLIP-TECH</span> PROCESS
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 px-2">
          Our proven 14-day journey from concept to working AI solution.
        </p>

        <div className="relative mt-12">
        {/* Animated Gradient Line - hidden on mobile/tablet */}
        <div className="hidden md:block absolute left-0 top-[86px] w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-300"
          />
        </div>

        {/* Steps */}
        <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-6">
          {steps.map((step, index) => {
            const threshold = ((index + 1) / steps.length) * 100;
            const isActive = progress >= threshold;

            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className={`text-xl rounded-full p-2 md:p-3 shadow-md transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                  }`}
                >
                  {step.icon}
                </div>
                <p className="text-xs md:text-sm text-emerald-400 font-semibold mt-2">{step.day}</p>
                <h3 className="mt-3 text-base md:text-lg font-bold text-black dark:text-white">{step.title}</h3>
                <p className="mt-1 max-w-[220px] text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
