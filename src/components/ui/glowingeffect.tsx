// "use client";

// import * as React from "react";

// interface GlowingEffectProps {
//   spread?: number;
//   glow?: boolean;
//   disabled?: boolean;
//   proximity?: number;
//   inactiveZone?: number;
// }

// export const GlowingEffect = ({
//   spread = 40,
//   glow = true,
//   disabled = false,
//   proximity = 64,
//   inactiveZone = 0.01,
// }: GlowingEffectProps) => {
//   const ref = React.useRef<HTMLDivElement>(null);

//   React.useEffect(() => {
//     if (disabled || !ref.current) return;

//     const card = ref.current;
//     const handlePointerMove = (e: PointerEvent) => {
//       const bounds = card.getBoundingClientRect();
//       const centerX = bounds.left + bounds.width / 2;
//       const centerY = bounds.top + bounds.height / 2;

//       const dx = e.clientX - centerX;
//       const dy = e.clientY - centerY;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       const clampedDistance = Math.min(distance, proximity);
//       const proximityRatio = 1 - clampedDistance / proximity;

//       if (proximityRatio < inactiveZone) {
//         card.style.setProperty("--glow", "0");
//       } else {
//         const glowStrength = proximityRatio * spread;
//         card.style.setProperty("--glow", `${glowStrength}px`);
//         card.style.setProperty("--mouse-x", `${e.clientX - bounds.left}px`);
//         card.style.setProperty("--mouse-y", `${e.clientY - bounds.top}px`);
//       }
//     };

//     window.addEventListener("pointermove", handlePointerMove);

//     return () => {
//       window.removeEventListener("pointermove", handlePointerMove);
//     };
//   }, [disabled, proximity, spread, inactiveZone]);

//   return (
//     <div
//       ref={ref}
//       className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none [background:radial-gradient(200px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.emerald.500/.15),transparent_40%)]"
//     />
//   );
// };
