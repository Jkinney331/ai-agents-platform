'use client';

import { useState } from 'react';
import Galaxy from './galaxy';
import GalaxyFallback from './galaxy-fallback';
import GalaxyErrorBoundary from './galaxy-error-boundary';

/**
 * Demo component to showcase both WebGL Galaxy and CSS Fallback
 * This is for testing purposes only - not meant for production use
 */
const GalaxyDemo = () => {
  const [useWebGL, setUseWebGL] = useState(true);
  const [forceFallback, setForceFallback] = useState(false);

  const galaxyProps = {
    mouseRepulsion: true,
    mouseInteraction: true,
    density: 1.5,
    glowIntensity: 0.5,
    saturation: 0.8,
    hueShift: 240,
    className: "demo-galaxy"
  };

  return (
    <div className="w-full h-screen relative bg-black">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <button
          onClick={() => setUseWebGL(!useWebGL)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {useWebGL ? 'Show CSS Fallback' : 'Show WebGL Galaxy'}
        </button>
        <button
          onClick={() => setForceFallback(!forceFallback)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          {forceFallback ? 'Enable WebGL' : 'Force Fallback'}
        </button>
      </div>

      {/* Info Panel */}
      <div className="absolute top-4 right-4 z-20 bg-black/80 text-white p-4 rounded max-w-xs">
        <h3 className="font-bold mb-2">Galaxy Demo</h3>
        <p className="text-sm mb-1">
          <strong>Current:</strong> {useWebGL && !forceFallback ? 'WebGL Galaxy' : 'CSS Fallback'}
        </p>
        <p className="text-sm">
          Move your mouse to see interaction effects
        </p>
      </div>

      {/* Galaxy Components */}
      <div className="absolute inset-0">
        {forceFallback ? (
          // Force CSS fallback
          <GalaxyFallback {...galaxyProps} />
        ) : useWebGL ? (
          // WebGL with error boundary fallback
          <GalaxyErrorBoundary fallbackProps={galaxyProps}>
            <Galaxy {...galaxyProps} />
          </GalaxyErrorBoundary>
        ) : (
          // Direct CSS fallback
          <GalaxyFallback {...galaxyProps} />
        )}
      </div>
    </div>
  );
};

export default GalaxyDemo;