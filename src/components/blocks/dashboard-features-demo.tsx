"use client";

import { FeatureSteps } from "./feature-section";

const dashboardFeatures = [
  { 
    step: 'Step 1', 
    title: 'AI-Powered Analytics',
    content: 'Get instant insights into your business performance with our advanced AI analytics dashboard. Monitor key metrics, track trends, and make data-driven decisions in real-time.', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    step: 'Step 2',
    title: 'Smart Automation',
    content: 'Automate repetitive tasks and workflows with intelligent AI agents. From customer service to data processing, our dashboard handles it all while you focus on growth.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Step 3',
    title: 'Real-Time Monitoring',
    content: 'Stay ahead of the curve with real-time monitoring and alerts. Our dashboard provides instant notifications and predictive insights to keep your business running smoothly.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  { 
    step: 'Step 4',
    title: 'Custom Integrations',
    content: 'Seamlessly integrate with your existing tools and platforms. Our dashboard connects with CRM systems, marketing tools, and more to create a unified business ecosystem.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Step 5',
    title: 'Advanced Reporting',
    content: 'Generate comprehensive reports and visualizations that tell your business story. From executive summaries to detailed analytics, get the insights you need to succeed.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
];

export function DashboardFeaturesDemo() {
  return (
    <FeatureSteps 
      features={dashboardFeatures}
      title="Your AI Dashboard Journey"
      autoPlayInterval={5000}
      imageHeight="h-[600px]"
    />
  );
} 