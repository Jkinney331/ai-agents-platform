"use client";

// import { siteConfig } from "@/lib/config";
import LogoCarousel from "./logocarousal";

const CompanyShowcase = () =>{
  return (
    <section
      id="company"
      className="flex flex-col items-center justify-center gap-10 py-10 pt-20 w-full relative px-6"
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