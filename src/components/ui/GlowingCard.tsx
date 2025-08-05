// components/ui/GlowingCard.tsx
import React from "react";
import clsx from "clsx";

interface GlowingCardProps {
  title: string;
  description: string;
  className?: string;
}

const GlowingCard: React.FC<GlowingCardProps> = ({ title, description, className }) => {
  return (
    <div
      className={clsx(
        "relative p-6 rounded-2xl border border-white/10 bg-white/5 dark:bg-white/10 text-black dark:text-white overflow-hidden",
        "group hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300 cursor-pointer",
        className
      )}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed">{description}</p>

      {/* Animated Shine Sweep */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="shine" />
      </div>
    </div>
  );
};

export default GlowingCard;
