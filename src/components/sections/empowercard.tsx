// components/sections/EmpowerCards.tsx

import GlowingCard from "../ui/GlowingCard";

const EmpowerCards = () => {
  const cards = [
    {
      title: "Real-Time AI Collaboration",
      description:
        "Experience real-time assistance. Watch your AI team work collectively to coordinate tasks, answer questions and maintain project alignment.",
    },
    {
      title: "Seamless Integrations",
      description:
        "Unite your favorite tools for effortless connectivity. Boost productivity through interconnected workflows.",
    },
    {
      title: "Instant Insight Reporting",
      description:
        "Transform raw data into clear insights in seconds. Empower smarter decisions with real-time, always-learning intelligence.",
    },
    {
      title: "Smart Automation",
      description:
        "Set it, forget it. Your team of AI Agents tackle repetitive tasks so you can focus on strategy, innovation, and growth.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 w-full bg-transparent border-t border-border">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {cards.map((card, index) => (
      <GlowingCard key={index} title={card.title} description={card.description} />
    ))}
  </div>
</section>

  );
};

export default EmpowerCards;
