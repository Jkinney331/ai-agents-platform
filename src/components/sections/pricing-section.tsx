"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { LiquidButton } from "../ui/Liquid-button";

const PricingSection = () => {
  const tier = siteConfig.pricing.pricingItems[0];

  const PriceDisplay = ({ price }: { price: string | number }) => (
    <motion.span
      key={price}
      className="text-5xl font-bold text-center"
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      ${price}
    </motion.span>
  );

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10 py-20 px-4 w-full relative"
    >
      <SectionHeader>
        {/* Pricing name and title */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">
          {siteConfig.pricing.title}
        </h2>
        <p className="text-muted-foreground text-center font-medium max-w-2xl mx-auto">
          {siteConfig.pricing.description}
        </p>
      </SectionHeader>

      {/* Pricing Card */}
      <div className="w-full max-w-md mx-auto rounded-xl border border-border dark:border-white/10 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-8 shadow-xl">
        {/* Price */}
        <div className="mb-6 flex flex-col items-center">
          <PriceDisplay price={tier.price} />
          <p className="text-base text-muted-foreground mt-2 text-center">{tier.name}</p>
          <p className="text-sm text-muted-foreground mt-2 text-center">{tier.description}</p>
        </div>

        {/* Features List */}
        <ul className="space-y-3 text-sm mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border border-primary/20 flex items-center justify-center">
                <svg
                  width="8"
                  height="7"
                  viewBox="0 0 8 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block dark:hidden"
                >
                  <path
                    d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                    stroke="#101828"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="8"
                  height="7"
                  viewBox="0 0 8 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden dark:block"
                >
                  <path
                    d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                    stroke="#FAFAFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="flex justify-center">
          <LiquidButton className="cursor-pointer">
            Book Your Demo Today
          </LiquidButton>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
