"use client";

// import { siteConfig } from "@/lib/config";
import LogoCarousel from "./logocarousal";

const CompanyShowcase = () =>{
  return (
    <section
      id="company"
      className="flex flex-col items-center justify-center gap-6 py-10 pt-12 w-full relative px-6 md:px-12 lg:px-20 border-t border-border"
    >
      <p className="text-muted-foreground font-medium text-center">
        Trusted by fast-growing startups
      </p>

      {/* Only the new auto-scroll carousel */}
      <LogoCarousel />
    </section>
  );
}
export default CompanyShowcase;