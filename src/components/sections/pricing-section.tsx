"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { LiquidButton } from "../ui/Liquid-button";
import { Shield, Users, Star, Clock, Zap } from "lucide-react";
import { SavingsCalculator } from "../ui/savings-calculator";

const PricingSection = () => {
  const tier = siteConfig.pricing.pricingItems[0];

  const PrimaryPrice = ({ price }: { price: string | number }) => (
    <div className="text-center mb-6">
      <div className="flex items-baseline justify-center gap-2">
        <span className="text-3xl font-semibold text-gray-600 dark:text-gray-400">$</span>
        <span className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{price}</span>
      </div>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mt-2">Your complete AI solution in 14 days</p>
    </div>
  );

  return (
    <section id="pricing" className="relative py-24 px-6 md:px-12 lg:px-20 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{siteConfig.pricing.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{siteConfig.pricing.description}</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Primary pricing card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl p-8 md:p-10">
              <PrimaryPrice price={tier.price} />
              <ul className="space-y-3 text-sm mb-8">
                {tier.features.slice(0,5).map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80" />
                    <span className="text-gray-800 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <LiquidButton className="w-full md:w-auto px-12 py-4 text-lg font-semibold">Book Your Demo Today</LiquidButton>
                <div className="mt-3 text-sm text-red-700 dark:text-red-300 inline-flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Only 3 spots left this month
                </div>
              </div>
            </div>
          </div>

          {/* Secondary info card */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-4">What's included</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-blue-600" /><span>Knowledge transfer session for your team</span></li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-blue-600" /><span>AI Control Dashboard included</span></li>
                <li className="flex items-center gap-3"><Shield className="w-4 h-4 text-green-600" /><span>30-day money-back guarantee</span></li>
              </ul>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-center">
                <Shield className="w-5 h-5 mx-auto text-green-600" />
                <p className="text-xs mt-2">30-Day Guarantee</p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-center">
                <Users className="w-5 h-5 mx-auto text-blue-600" />
                <p className="text-xs mt-2">500+ Clients</p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-center">
                <Star className="w-5 h-5 mx-auto text-yellow-500" />
                <p className="text-xs mt-2">4.9/5 Rating</p>
              </div>
            </div>

            {/* Optional calculator below */}
            <SavingsCalculator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
