"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { LiquidButton } from "../ui/Liquid-button";
import { Check, Shield, Clock, Users, Zap, Star } from "lucide-react";
import { SavingsCalculator } from "../ui/savings-calculator";

const PricingSection = () => {
  const tier = siteConfig.pricing.pricingItems[0];

  const PriceDisplay = ({ price }: { price: string | number }) => (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-baseline justify-center gap-2 mb-2">
        <span className="text-3xl font-semibold text-gray-600 dark:text-gray-400">$</span>
        <span className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {price}
        </span>
      </div>
      <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
        Your complete AI solution in 14 days
      </p>
    </motion.div>
  );

  const ValueItem = ({ icon: Icon, text, delay }: { icon: any; text: string; delay: number }) => (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <span className="text-gray-700 dark:text-gray-300 font-medium">{text}</span>
    </motion.div>
  );

  const TrustBadge = ({ icon: Icon, text, subtext }: { icon: any; text: string; subtext: string }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{text}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtext}</p>
      </div>
    </div>
  );

  return (
    <section
      id="pricing"
      className="relative py-24 px-6 md:px-12 lg:px-20 w-full overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800/20 rounded-full blur-xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 dark:bg-purple-800/20 rounded-full blur-xl opacity-30" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {siteConfig.pricing.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {siteConfig.pricing.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Main Pricing Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Card Background */}
            <div className="relative rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl p-8 md:p-12">
              
              {/* Price Hero Section */}
              <PriceDisplay price={tier.price} />

              {/* Value Stack */}
              <div className="grid gap-4 mb-12">
                <ValueItem icon={Zap} text="Complete 14-day AI solution implementation" delay={1} />
                <ValueItem icon={Shield} text="Custom AI model development and training" delay={2} />
                <ValueItem icon={Users} text="Integration with your existing systems" delay={3} />
                <ValueItem icon={Star} text="Comprehensive documentation & support" delay={4} />
                <ValueItem icon={Clock} text="2 weeks of post-launch support" delay={5} />
                <ValueItem icon={Users} text="Knowledge transfer session for your team" delay={6} />
                <ValueItem icon={Zap} text="AI Control Dashboard included" delay={7} />
                <ValueItem icon={Shield} text="30-day money-back guarantee" delay={8} />
              </div>

              {/* Trust Elements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <TrustBadge 
                  icon={Shield} 
                  text="30-Day Guarantee" 
                  subtext="Money back if not satisfied" 
                />
                <TrustBadge 
                  icon={Users} 
                  text="500+ Clients" 
                  subtext="Trusted by businesses worldwide" 
                />
                <TrustBadge 
                  icon={Star} 
                  text="4.9/5 Rating" 
                  subtext="From verified customers" 
                />
              </div>

              {/* CTA Section with Urgency */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4"
                >
                  <LiquidButton className="w-full md:w-auto px-12 py-4 text-lg font-semibold">
                    Book Your Demo Today
                  </LiquidButton>
                </motion.div>
                
                {/* Urgency Element */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">
                    Only 3 spots left this month
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20" />
          </motion.div>

          {/* Savings Calculator */}
          <div className="lg:sticky lg:top-8">
            <SavingsCalculator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
