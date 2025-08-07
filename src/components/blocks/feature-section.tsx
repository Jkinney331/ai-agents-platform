"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Feature {
  step: string;
  title: string;
  content: string;
  image: string;
}

interface FeatureStepsProps {
  features: Feature[];
  title: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

export function FeatureSteps({ 
  features, 
  title, 
  autoPlayInterval = 4000, 
  imageHeight = "h-[500px]" 
}: FeatureStepsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % features.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlayInterval, features.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {features[currentIndex].title}
                </h3>

                {/* Content */}
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {features[currentIndex].content}
                </p>

                {/* Progress Indicators (dots only, no numbers) */}
                <div className="flex gap-2 pt-4">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        index === currentIndex
                          ? "bg-blue-600 dark:bg-blue-400 scale-110"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Previous</span>
                {/* using simple character to avoid new icon import */}
                ‹
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} / {features.length}
              </span>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Next</span>
                ›
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className={cn("relative rounded-2xl overflow-hidden", imageHeight)}
              >
                <Image
                  src={features[currentIndex].image}
                  alt={features[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle overlay only, no numbers */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
} 