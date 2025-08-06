'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import GalaxyFallback from './galaxy-fallback';

interface GalaxyErrorBoundaryProps {
  children: ReactNode;
  fallbackProps?: {
    mouseRepulsion?: boolean;
    mouseInteraction?: boolean;
    density?: number;
    glowIntensity?: number;
    saturation?: number;
    hueShift?: number;
    className?: string;
  };
}

interface GalaxyErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

class GalaxyErrorBoundary extends Component<GalaxyErrorBoundaryProps, GalaxyErrorBoundaryState> {
  constructor(props: GalaxyErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): GalaxyErrorBoundaryState {
    // Update state to trigger fallback render
    return { 
      hasError: true, 
      errorMessage: error.message 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log WebGL-specific errors
    const isWebGLError = error.message.toLowerCase().includes('webgl') ||
                        error.message.toLowerCase().includes('context') ||
                        error.message.toLowerCase().includes('renderer') ||
                        error.message.toLowerCase().includes('shader') ||
                        error.message.toLowerCase().includes('gl');
    
    if (isWebGLError) {
      console.warn('WebGL Galaxy failed, falling back to CSS version:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
      });
    } else {
      console.error('Galaxy component error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render CSS fallback with the same props
      return (
        <GalaxyFallback
          mouseRepulsion={this.props.fallbackProps?.mouseRepulsion ?? true}
          mouseInteraction={this.props.fallbackProps?.mouseInteraction ?? true}
          density={this.props.fallbackProps?.density ?? 1.5}
          glowIntensity={this.props.fallbackProps?.glowIntensity ?? 0.5}
          saturation={this.props.fallbackProps?.saturation ?? 0.8}
          hueShift={this.props.fallbackProps?.hueShift ?? 240}
          className={this.props.fallbackProps?.className ?? ''}
        />
      );
    }

    return this.props.children;
  }
}

export default GalaxyErrorBoundary;