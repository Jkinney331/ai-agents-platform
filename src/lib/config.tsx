"use client";

import { FirstBentoAnimation } from "@/components/first-bento-animation";
import { FourthBentoAnimation } from "@/components/fourth-bento-animation";
import { SecondBentoAnimation } from "@/components/second-bento-animation";
import { ThirdBentoAnimation } from "@/components/third-bento-animation";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Globe } from "@/components/ui/globe";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "p-1 py-0.5 font-medium dark:font-semibold text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Cal AI",
  description: "Smart scheduling powered by AI.",
  cta: "Get Started",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "AI Calendar",
    "Smart Scheduling",
    "Productivity",
    "Time Management",
  ],
  nav: {
    links: [
      { id: 1, name: "Home", href: "#hero" },
      { id: 2, name: "How it Works", href: "#bento" },
      { id: 3, name: "Features", href: "#features" },
      { id: 4, name: "Pricing", href: "#pricing" },
    ],
  },
  hero: {
    title: "Where Vision Meets Velocity",
    description:
      "From idea to production in 14 days",
    support_text: "Transform your business with cutting-edge AI solutions, delivered with unmatched speed and expertise.",  
    cta: {
      primary: {
        text: "Book Demo",
        href: "#",
      },
    },
  },
  companyShowcase: {
    companyLogos: [
      {
  id: 1,
  name: "Company 1",
  logo: (
    <Image
      src="/unrealengine.png"
      alt="unrealengine"
      width={80}
      height={80}
    />
  ),
},
    ],
  },
  bentoSection: {
    title: "Empower Your organization with AI",
    description:
      "Real-time collaboration, seamless integrations, and actionable insights to streamline your operations.",
    items: [
      {
        id: 1,
        content: <FirstBentoAnimation />,
        title: "Real-time AI Collaboration",
        description:
          "Experience real-time assistance. Ask your AI Agent to coordinate tasks, answer questions, and maintain team alignment.",
      },
      {
        id: 2,
        content: <SecondBentoAnimation />,
        title: "Seamless Integrations",
        description:
          "Unite your favorite tools for effortless connectivity. Boost productivity through interconnected workflows.",
      },
      {
        id: 3,
        content: (
          <ThirdBentoAnimation
            data={[20, 30, 25, 45, 40, 55, 75]}
            toolTipValues={[
              1234, 1678, 2101, 2534, 2967, 3400, 3833, 4266, 4700, 5133,
            ]}
          />
        ),
        title: "Instant Insight Reporting",
        description:
          "Transform raw data into clear insights in seconds. Empower smarter decisions with real-time, always-learning intelligence.",
      },
      {
        id: 4,
        content: <FourthBentoAnimation />,
        title: "Smart Automation",
        description:
          "Set it, forget it. Your team of AI Agents tackle repetitive tasks so you can focus on strategy, innovation, and growth.",
      },
    ],
  },
  pricing: {
    title: "One Investment, Infinite Returns",
    description:
      "Simple, transparent pricing. No hidden fees, no surprises.",
    pricingItems: [
      {
        name: "Single price focus",
        price: "9,500",
        features: [
          "Complete 14-day AI solution implementation",
          "Custom AI model development and training",
          "Integration with your existing systems",
          "Comprehensive documentation",
          "2 weeks of post-launch support",
          "Knowledge transfer session for your team",
          "AI Control Dashboard included",
          "30-day money-back guarantee",
        ],
        description: "Your complete AI solution in 14 days",
      },
    ],
  },
  testimonials: [
    {
      id: "1",
      name: "Yannick R.",
      role: "Game Studio Director",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      description: (
        <p>
          "FlipTech Pro's AI character system cut our NPC development time by 70%. Players can't tell they're not human-scripted. Game-changing for our studio."
        </p>
      ),
    },
    {
      id: "2",
      name: "Keith M.",
      role: "Lead Game Developer",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      description: (
        <p>
          "Their AI workflow automation handles everything from combat patterns to NPC emotions. We shipped 6 months early. Incredible 14-day delivery."
        </p>
      ),
    },
    {
      id: "3",
      name: "Mike S.",
      role: "Tech Startup Founder",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      description: (
        <p>
          "The reinforcement learning dashboard learns from every user interaction. Our mobile ordering app now predicts with 89% accuracy. ROI in weeks."
        </p>
      ),
    },
    {
      id: "4",
      name: "Damon L.",
      role: "Investment Fund Manager",
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      description: (
        <p>
          "Their trading agent consistently outperforms our manual strategies by 23%. Best investment decision we've made this year."
        </p>
      ),
    },
    {
      id: "5",
      name: "Josh T.",
      role: "Healthcare Innovation Director",
      img: "https://randomuser.me/api/portraits/men/23.jpg",
      description: (
        <p>
          "The healthcare chatbot handles consultations and scheduling flawlessly. 60% reduction in wait times. Patients love it."
        </p>
      ),
    },
    {
      id: "6",
      name: "Curtis P.",
      role: "Medical Practice Owner",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
      description: (
        <p>
          "FlipTech Pro delivered a medical AI assistant that triages patients 24/7. Accuracy rivals our senior nurses. Revolutionary for healthcare."
        </p>
      ),
    },
    {
      id: "7",
      name: "Teresa H.",
      role: "AI Operations Lead",
      img: "https://randomuser.me/api/portraits/women/36.jpg",
      description: (
        <p>
          "Their data sourcing solution automated our entire training pipeline. What took weeks now takes hours. Essential for scaling AI."
        </p>
      ),
    },
    {
      id: "8",
      name: "Ines M.",
      role: "Data Science Director",
      img: "https://randomuser.me/api/portraits/women/28.jpg",
      description: (
        <p>
          "FlipTech Pro built us a data collection system that's both ethical and efficient. 10x improvement in data quality. Exceeded all expectations."
        </p>
      ),
    },
    {
      id: "9",
      name: "Jack K.",
      role: "ML Engineering Manager",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      description: (
        <p>
          "The custom AI training infrastructure they delivered handles massive datasets effortlessly. From concept to production in 14 days. Impressive execution."
        </p>
      ),
    },
  ],
  faqSection: {
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about SkyAgent and its features. If you have any other questions, please don't hesitate to contact us.",
    faQitems: [
      {
        id: 1,
        question: "How can you deliver AI solutions in just 14 days?",
        answer:
          "AI Agent Teams are groups of specialized AI agents that work together like departments in your company. Each team handles specific functions—from marketing to operations—collaborating seamlessly to automate workflows and drive results.",
      },
      {
        id: 2,
        question: "What types of AI solutions do you build?",
        answer:
          "FlipTech Pro deploys AI teams that integrate with your existing tools, learn your business processes, and execute tasks autonomously. Teams share context and insights, creating a unified workforce that scales with your needs.",
      },
      {
        id: 3,
        question: "How secure is my data during development?",
        answer:
          "We implement enterprise-grade security with end-to-end encryption, SOC 2 Type II certification, and role-based access controls. Your data never leaves our secure infrastructure and is protected by industry-leading standards.",
      },
      {
        id: 4,
        question: "Can you integrate with my existing tech stack?",
        answer:
          "Absolutely. FlipTech Pro teams connect seamlessly with your current tech stack through pre-built integrations and APIs. Your AI teams work within your existing workflows, not around them.",
      },
      {
        id: 5,
        question: "What happens after the 14-day deployment?",
        answer:
          "We offer free customized demos that give you a glimpse into the future of your operations with AI teams. See exactly how FlipTech Pro will transform your specific workflows before committing.",
      },
      {
        id: 6,
        question: "How much ongoing maintenance is required?",
        answer:
          "Our AI teams handle entire workflows—not just tasks. While one team manages customer inquiries, another analyzes data, and another optimizes operations. They work 24/7, multiplying your capacity without adding headcount.",
      },
    ],
  },
  ctaSection: {
    id: "cta",
    title: "Automate. Simplify. Thrive",
    backgroundImage: "/agent-cta-background.webp",
    button: {
      text: "FREE custom demo today",
      href: "/contact",
    },
    subtext: "No obligations, no questions asked",
  },
  footerLinks: [
    // {
    //   title: "Company",
    //   links: [
    //     { id: 1, title: "About", url: "#" },
    //     { id: 2, title: "Contact", url: "#" },
    //     { id: 3, title: "Blog", url: "#" },
    //     { id: 4, title: "Story", url: "#" },
    //   ],
    // },
    // {
    //   title: "Products",
    //   links: [
    //     { id: 5, title: "Company", url: "#" },
    //     { id: 6, title: "Product", url: "#" },
    //     { id: 7, title: "Press", url: "#" },
    //     { id: 8, title: "More", url: "#" },
    //   ],
    // },
    // {
    //   title: "Resources",
    //   links: [
    //     { id: 9, title: "Press", url: "#" },
    //     { id: 10, title: "Careers", url: "#" },
    //     { id: 11, title: "Newsletters", url: "#" },
    //     { id: 12, title: "More", url: "#" },
    //   ],
    // },
  ],
};

export type SiteConfig = typeof siteConfig;
