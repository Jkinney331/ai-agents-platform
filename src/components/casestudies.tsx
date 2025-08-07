"use client";

import React from "react";
import { Gallery4, type Gallery4Props } from "./ui/gallery4";

const caseStudiesData: Gallery4Props = {
  title: "Case Studies",
  description: "See how we've transformed businesses with AI in just 14 days. Real results, real impact.",
  items: [
    {
      id: "f-bot",
      title: "F-Bot: Fascia Health AI Assistant",
      description: "Revolutionary fascia-focused chatbot trained on extensive medical data. Handles thousands of queries daily with medical-grade accuracy while maintaining an approachable tone.",
      href: "#f-bot-case-study",
      image: "/robot.webp",
    },
    {
      id: "cryptoedge",
      title: "CryptoEdge: Trading Intelligence Agent",
      description: "Sophisticated crypto trading agent analyzing market patterns 24/7. Achieves 73% accuracy rate while processing millions of data points across multiple exchanges.",
      href: "#cryptoedge-case-study",
      image: "/screen.webp",
    },
    {
      id: "viralvoice",
      title: "ViralVoice: Social Media AI Manager",
      description: "AI agent managing content across 6 platforms simultaneously. Increased engagement by 340% in the first month through intelligent content generation and trend analysis.",
      href: "#viralvoice-case-study",
      image: "/socialmedia.webp",
    },
  ],
};

function CaseStudiesSection() {
  return <Gallery4 {...caseStudiesData} />;
}

export default CaseStudiesSection;
