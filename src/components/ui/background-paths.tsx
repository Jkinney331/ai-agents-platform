import React, { useId } from "react";
import { cn } from "@/lib/utils";

export type BackgroundPathsProps = {
  className?: string;
  title?: string;
  pathCount?: number;
  opacity?: number; // 0..1
  strokeWidth?: number;
  speedMs?: number; // animation duration
};

/**
 * Animated SVG background composed of smooth curved paths.
 * Optimized for hero sections: subtle, low-contrast, GPU-friendly.
 */
export function BackgroundPaths({
  className,
  title,
  pathCount = 12,
  opacity = 0.35,
  strokeWidth = 1.2,
  speedMs = 14000,
}: BackgroundPathsProps) {
  const gradientId = useId();
  const maskId = useId();

  // Fixed viewBox for predictable curves; scales responsively with preserveAspectRatio
  const width = 1440;
  const height = 900;

  const paths = Array.from({ length: pathCount }).map((_, i) => {
    const t = i / (pathCount - 1 || 1);
    // Distribute Y with easing to cluster near center slightly
    const y = 120 + t * (height - 240);
    // Amplitude varies smoothly; alternate phase for variety
    const amp = 40 + 70 * Math.sin((t + 0.15) * Math.PI) + (i % 2 === 0 ? 25 : -10);

    const c1x = width / 3;
    const c2x = (2 * width) / 3;
    const c1y = y + amp;
    const c2y = y - amp;

    const d = `M 0,${y.toFixed(2)} C ${c1x},${c1y.toFixed(2)} ${c2x},${c2y.toFixed(2)} ${width},${y.toFixed(2)}`;

    // Staggered animation via style and different dasharray
    const dash = 400 + (i % 5) * 120;
    const offset = (i % 7) * 180;

    return (
      <path
        key={i}
        d={d}
        fill="none"
        stroke={`url(#grad-${gradientId})`}
        strokeWidth={strokeWidth}
        strokeOpacity={opacity}
        style={{
          strokeDasharray: dash,
          strokeDashoffset: offset,
          animation: `bgpaths-dash ${speedMs + i * 350}ms linear infinite`,
        }}
      />
    );
  });

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        className="block"
      >
        <defs>
          {/* Brand gradient: blue → indigo → purple (light/dark friendly) */}
          <linearGradient id={`grad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="55%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Soft vignette mask to fade edges */}
          <radialGradient id={`mask-${maskId}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.75" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`m-${maskId}`}>
            <rect x="0" y="0" width={width} height={height} fill={`url(#mask-${maskId})`} />
          </mask>
        </defs>

        {/* Subtle brand-tinted backdrop via CSS */}
        <rect x="0" y="0" width={width} height={height} className="fill-[rgba(59,113,246,0.06)] dark:fill-[rgba(59,113,246,0.06)]" />

        <g mask={`url(#m-${maskId})`}>{paths}</g>

        {/* Optional title for accessibility; visually hidden by mask */}
        {title ? <title>{title}</title> : null}
      </svg>

      {/* Keyframes injected once; scoping via global is fine */}
      <style jsx global>{`
        @keyframes bgpaths-dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1200; }
        }
      `}</style>
    </div>
  );
}

export function DemoBackgroundPaths() {
  return <BackgroundPaths title="Background Paths" />;
}