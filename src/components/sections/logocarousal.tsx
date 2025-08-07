"use client";

// import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { siteConfig } from "@/lib/config";

export default function LogoCarousel() {
  const logos = siteConfig.companyShowcase.companyLogos;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true }),
  ]);

  return (
          <div className="overflow-hidden w-full pt-10" ref={emblaRef}>
      <div className="flex">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex items-center justify-center flex-none w-40 h-20 mx-4"
          >
            {logo.logo}
          </div>
        ))}
      </div>
    </div>
  );
}
