// const FeatureSection = dynamic(() => import("@/components/sections/feature-section"));
const EmpowerCards = dynamic(() => import("@/components/sections/empowercard"));
const BentoSection = dynamic(() => import("@/components/sections/bento-section"));
// const GrowthSection = dynamic(() => import("@/components/sections/growth-section"));
// const QuoteSection = dynamic(() => import("@/components/sections/quote-section"));
const CompanyShowcase = dynamic(() => import("@/components/sections/company-showcase"));
const PricingSection = dynamic(() => import("@/components/sections/pricing-section"));
const TestimonialSection = dynamic(() => import("@/components/sections/testimonial-section"));
const ContactSection = dynamic(() => import("@/components/sections/contact-section"));
const FAQSection = dynamic(() => import("@/components/sections/faq-section"));
const CTASection = dynamic(() => import("@/components/sections/cta-section"));
const FooterSection = dynamic(() => import("@/components/sections/footer-section"));
const FlipTechProcess = dynamic(() => import("@/components/sections/fliptechprocess"));
const AIAgentsSection = dynamic(() => import("@/components/AIAgentsSection"));
const GlowCard = dynamic(() => import("@/components/ui/GlowEffectCard"));
const DashboardFeaturesDemo = dynamic(() => import("@/components/blocks/dashboard-features-demo").then(mod => ({ default: mod.DashboardFeaturesDemo })));

import CaseStudiesSection from "@/components/casestudies";
import HeroSection from "@/components/sections/hero-section";
import WhyNowSection from "@/components/WhyNowSec";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen space-y-0">
      <HeroSection />
      <CompanyShowcase />
      <BentoSection />
      {/* <QuoteSection /> */}
      <EmpowerCards/>
      <AIAgentsSection/>
      <DashboardFeaturesDemo/>
      <GlowCard/>
      {/* <GrowthSection /> */}
      <FlipTechProcess/>
      <CaseStudiesSection/>
      <WhyNowSection/>
      <PricingSection />
      <TestimonialSection />
      <ContactSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
