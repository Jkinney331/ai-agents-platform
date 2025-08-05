import React from "react";
import clsx from "clsx";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

export const LiquidButton = ({
  children,
  className = "",
  size = "md",
  variant = "default",
  ...props
}: LiquidButtonProps) => {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    default: "bg-white/30 dark:bg-white/10 border-black/10 dark:border-white/10",
    outline: "bg-transparent border border-current",
    ghost: "bg-transparent border-none",
  };

  return (
    <button
      {...props}
      className={clsx(
        `relative font-semibold rounded-xl 
         text-black dark:text-white 
         backdrop-blur-md shadow-lg overflow-hidden 
         transition-all duration-300 hover:scale-105`,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-md rounded-xl" />
    </button>
  );
};
