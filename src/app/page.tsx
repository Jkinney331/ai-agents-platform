// const FeatureSection = dynamic(() => import("@/components/sections/feature-section"));
const EmpowerCards = dynamic(() => import("@/components/sections/empowercard"));
const BentoSection = dynamic(() => import("@/components/sections/bento-section"));
// const GrowthSection = dynamic(() => import("@/components/sections/growth-section"));
// const QuoteSection = dynamic(() => import("@/components/sections/quote-section"));
const CompanyShowcase = dynamic(() => import("@/components/sections/company-showcase"));
const PricingSection = dynamic(() => import("@/components/sections/pricing-section"));
const TestimonialSection = dynamic(() => import("@/components/sections/testimonial-section"));
const FAQSection = dynamic(() => import("@/components/sections/faq-section"));
const CTASection = dynamic(() => import("@/components/sections/cta-section"));
const FooterSection = dynamic(() => import("@/components/sections/footer-section"));
const FlipTechProcess = dynamic(() => import("@/components/sections/fliptechprocess"));
const AIAgentsSection = dynamic(() => import("@/components/AIAgentsSection"));
const GlowCard = dynamic(() => import("@/components/ui/GlowEffectCard"));

import CaseStudiesSection from "@/components/casestudies";
import HeroSection from "@/components/sections/hero-section";
import WhyNowSection from "@/components/WhyNowSec";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
      <HeroSection />
      <CompanyShowcase />
      <BentoSection />
      {/* <QuoteSection /> */}
      <EmpowerCards/>
      {/* <FeatureSection /> */}
      <AIAgentsSection/>
      <GlowCard/>
      {/* <GrowthSection /> */}
      <FlipTechProcess/>
      <CaseStudiesSection/>
      <WhyNowSection/>
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
