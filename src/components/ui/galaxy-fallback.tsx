'use client';

import { useEffect, useRef, useState } from 'react';

interface GalaxyFallbackProps {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  className?: string;
}

const GalaxyFallback: React.FC<GalaxyFallbackProps> = ({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1.5,
  glowIntensity = 0.5,
  saturation = 0.8,
  hueShift = 240,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    angle: number;
    distance: number;
    brightness: number;
    hue: number;
  }>>([]);

  // Generate particles based on density
  useEffect(() => {
    const particleCount = Math.floor(200 * density);
    const newParticles = Array.from({ length: particleCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.pow(Math.random(), 0.5) * 45; // Percentage based
      const armOffset = Math.sin(angle * 3 + distance * 0.1) * 5;
      
      return {
        id: i,
        x: 50 + Math.cos(angle) * distance + armOffset + (Math.random() - 0.5) * 8,
        y: 50 + Math.sin(angle) * distance + armOffset + (Math.random() - 0.5) * 8,
        size: 1 + Math.random() * 3,
        speed: 0.1 + Math.random() * 0.2,
        angle: angle,
        distance: distance,
        brightness: 0.3 + Math.random() * 0.7,
        hue: (hueShift + Math.random() * 60 - 30) % 360,
      };
    });
    
    setParticles(newParticles);
  }, [density, hueShift]);

  // Mouse interaction handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePos({ x, y });
    };

    const currentContainer = containerRef.current;
    if (mouseInteraction && currentContainer) {
      currentContainer.addEventListener('mousemove', handleMouseMove);
      return () => {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [mouseInteraction]);

  return (
    <div 
      ref={containerRef}
      className={`galaxy-fallback-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* CSS Variables for dynamic values */}
      <style jsx>{`
        .galaxy-fallback-container {
          --glow-intensity: ${glowIntensity};
          --saturation: ${Math.round(saturation * 100)}%;
          --mouse-x: ${mousePos.x}%;
          --mouse-y: ${mousePos.y}%;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: 
            galaxyRotation 60s linear infinite,
            twinkle 3s ease-in-out infinite alternate,
            float 8s ease-in-out infinite alternate;
          transform-origin: 50% 50%;
        }
        
        .particle::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          background: inherit;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          filter: blur(1px);
          opacity: 0.6;
        }
        
        .particle::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 400%;
          height: 400%;
          background: inherit;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          filter: blur(3px);
          opacity: 0.2;
        }
        
        @keyframes galaxyRotation {
          from {
            transform: rotate(0deg) translateX(0px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(0px) rotate(-360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: var(--base-opacity);
            transform: scale(1);
          }
          50% {
            opacity: calc(var(--base-opacity) * 1.5);
            transform: scale(1.2);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-2px) translateX(1px);
          }
          75% {
            transform: translateY(2px) translateX(-1px);
          }
        }
        
        @keyframes spiral {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .galaxy-background {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            hsla(${hueShift}, 30%, 10%, 0.1) 0%,
            transparent 70%
          );
          animation: spiral 120s linear infinite;
        }
        
        .galaxy-arms {
          position: absolute;
          inset: 0;
          background: conic-gradient(
            from 0deg at center,
            transparent 0deg,
            hsla(${hueShift}, 50%, 20%, 0.1) 30deg,
            transparent 60deg,
            hsla(${hueShift}, 50%, 20%, 0.1) 150deg,
            transparent 180deg,
            hsla(${hueShift}, 50%, 20%, 0.1) 270deg,
            transparent 300deg
          );
          animation: spiral 180s linear infinite reverse;
        }

        ${mouseRepulsion && mouseInteraction ? `
        .particle {
          transition: transform 0.3s ease-out;
        }
        ` : ''}
      `}</style>
      
      {/* Background gradients for galaxy structure */}
      <div className="galaxy-background" />
      <div className="galaxy-arms" />
      
      {/* Render particles */}
      {particles.map((particle) => {
        const repulsionX = mouseRepulsion && mouseInteraction 
          ? Math.max(-10, Math.min(10, (particle.x - mousePos.x) * 0.1))
          : 0;
        const repulsionY = mouseRepulsion && mouseInteraction
          ? Math.max(-10, Math.min(10, (particle.y - mousePos.y) * 0.1))
          : 0;
          
        return (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x + repulsionX}%`,
              top: `${particle.y + repulsionY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `hsla(${particle.hue}, ${Math.round(saturation * 100)}%, 70%, ${particle.brightness * glowIntensity})`,
              boxShadow: `
                0 0 ${particle.size * 2}px hsla(${particle.hue}, ${Math.round(saturation * 100)}%, 70%, ${particle.brightness * glowIntensity * 0.8}),
                0 0 ${particle.size * 4}px hsla(${particle.hue}, ${Math.round(saturation * 100)}%, 70%, ${particle.brightness * glowIntensity * 0.4})
              `,
              animationDelay: `${particle.id * 0.1}s, ${particle.id * 0.05}s, ${particle.id * 0.2}s`,
              animationDuration: `${60 + particle.speed * 30}s, ${2 + Math.random() * 3}s, ${6 + Math.random() * 4}s`,
              '--base-opacity': particle.brightness * glowIntensity,
            } as React.CSSProperties & { '--base-opacity': number }}
          />
        );
      })}
      
      {/* Central glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '20px',
          height: '20px',
          transform: 'translate(-50%, -50%)',
          background: `hsla(${hueShift}, ${Math.round(saturation * 100)}%, 80%, ${glowIntensity * 0.3})`,
          borderRadius: '50%',
          filter: 'blur(10px)',
          animation: 'twinkle 4s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
};

export default GalaxyFallback;