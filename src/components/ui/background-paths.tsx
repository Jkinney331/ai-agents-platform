import React, { useId } from "react";
import { cn } from "@/lib/utils";

export type BackgroundPathsProps = {
  className?: string;
  title?: string;
  pathCount?: number;
  opacity?: number; // base opacity 0..1
  strokeWidth?: number; // base stroke width
  speedMs?: number; // base animation duration
  curveIntensity?: number; // multiplies curvature amplitude
  rotateDeg?: number; // rotate the whole field for sweeping arcs
  palettes?: Array<[string, string, string]>; // gradient triplets
};

/**
 * Animated SVG background composed of smooth curved paths.
 * Optimized for hero sections: subtle, low-contrast, GPU-friendly.
 */
export function BackgroundPaths({
  className,
  title,
  pathCount = 18,
  opacity = 0.35,
  strokeWidth = 1.2,
  speedMs = 9000,
  curveIntensity = 1.8,
  rotateDeg = -16,
  palettes = [
    ["#3B82F6", "#6366F1", "#8B5CF6"], // blue→indigo→violet
    ["#06B6D4", "#22D3EE", "#60A5FA"], // teal→cyan→blue
    ["#F472B6", "#C084FC", "#818CF8"], // pink→purple→indigo
    ["#F59E0B", "#F97316", "#FB7185"], // amber→orange→rose
  ],
}: BackgroundPathsProps) {
  const gradientBase = useId();
  const maskId = useId();

  // Fixed viewBox for predictable curves; scales responsively with preserveAspectRatio
  const width = 1440;
  const height = 900;

  // Build gradient defs for each palette
  const gradientDefs = palettes.map((stops, gi) => (
    <linearGradient id={`grad-${gradientBase}-${gi}`} x1="0%" y1="0%" x2="100%" y2="0%" key={gi}>
      <stop offset="0%" stopColor={stops[0]} />
      <stop offset="55%" stopColor={stops[1]} />
      <stop offset="100%" stopColor={stops[2]} />
    </linearGradient>
  ));

  const paths = Array.from({ length: pathCount }).map((_, i) => {
    const t = i / Math.max(1, pathCount - 1);
    // Distribute Y with slight easing so lines cluster toward the middle
    const y = 100 + t * (height - 200);

    // Stronger curvature via curveIntensity
    const ampBase = 60 + 90 * Math.sin((t + 0.1) * Math.PI);
    const amp = ampBase * curveIntensity + (i % 2 === 0 ? 20 : -10);

    // Push control points farther to increase bend and create sweeping arcs
    const c1x = width * 0.22;
    const c2x = width * 0.88;
    const c1y = y + amp * 1.0;
    const c2y = y - amp * 1.4;

    // Start slightly off-canvas for the left tail
    const startX = -120 - (i % 5) * 30;

    const d = `M ${startX},${y.toFixed(2)} C ${c1x},${c1y.toFixed(2)} ${c2x},${c2y.toFixed(2)} ${width + 60},${(y + amp * 0.05).toFixed(2)}`;

    // Staggered animation via style and different dasharray
    const dash = 420 + (i % 7) * 140; // varied dash length
    const offset = (i % 9) * 160; // varied initial offset
    const duration = Math.max(3000, speedMs + i * 180); // speed up a bit with small stagger

    // Slight per-line variance for depth
    const lineOpacity = Math.max(0.15, Math.min(0.6, opacity + (i % 3) * 0.05 - 0.05));
    const lineWidth = Math.max(0.8, strokeWidth + ((i % 4) - 1.5) * 0.2);

    // Assign gradient per path from palette list
    const gradIndex = i % palettes.length;

    return (
      <path
        key={i}
        d={d}
        fill="none"
        stroke={`url(#grad-${gradientBase}-${gradIndex})`}
        strokeWidth={lineWidth}
        strokeOpacity={lineOpacity}
        style={{
          strokeDasharray: dash,
          strokeDashoffset: offset,
          animation: `bgpaths-dash ${duration}ms linear infinite`,
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
          {gradientDefs}

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
        <rect x="0" y="0" width={width} height={height} className="fill-[rgba(59,113,246,0.05)] dark:fill-[rgba(59,113,246,0.05)]" />

        <g mask={`url(#m-${maskId})`} transform={`rotate(${rotateDeg} ${width / 2} ${height / 2})`}>
          {paths}
        </g>

        {/* Optional title for accessibility; visually hidden by mask */}
        {title ? <title>{title}</title> : null}
      </svg>

      {/* Keyframes injected once; scoping via global is fine */}
      <style jsx global>{`
        @keyframes bgpaths-dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1400; }
        }
      `}</style>
    </div>
  );
}

export function DemoBackgroundPaths() {
  return <BackgroundPaths title="Background Paths" />;
}