'use client';

import { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry, Vec3 } from 'ogl';

interface HyperspeedColors {
  roadColor?: number;
  islandColor?: number;
  background?: number;
  shoulderLines?: number;
  brokenLines?: number;
  leftCars?: number[];
  rightCars?: number[];
  sticks?: number;
}

interface HyperspeedEffectOptions {
  onSpeedUp?: () => void;
  onSlowDown?: () => void;
  distortion?: 'turbulentDistortion' | 'waveDistortion' | 'none';
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: [number, number];
  lightStickHeight?: [number, number];
  movingAwaySpeed?: [number, number];
  movingCloserSpeed?: [number, number];
  carLightsLength?: [number, number];
  carLightsRadius?: [number, number];
  carWidthPercentage?: [number, number];
  carShiftX?: [number, number];
  carFloorSeparation?: [number, number];
  colors?: HyperspeedColors;
}

interface HyperspeedProps {
  effectOptions?: HyperspeedEffectOptions;
  className?: string;
}

const Hyperspeed: React.FC<HyperspeedProps> = ({
  effectOptions = {},
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const speedRef = useRef<number>(1);

  const {
    length = 400,
    roadWidth = 10,
    islandWidth = 2,
    fov = 90,
    speedUp = 2,
    totalSideLightSticks = 20,
    lightPairsPerRoadWay = 40,
    movingAwaySpeed = [60, 80],
    movingCloserSpeed = [-120, -160],
    carLightsLength = [12, 80],
    colors = {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xFFFFFF,
      brokenLines: 0xFFFFFF,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  } = effectOptions;

  const vertexShader = `
    attribute vec3 position;
    attribute vec3 color;
    attribute float size;
    attribute float alpha;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;
    uniform float uSpeed;
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      vColor = color;
      vAlpha = alpha;
      
      vec3 pos = position;
      
      // Move particles along Z-axis for speed effect
      pos.z += uTime * uSpeed * 50.0;
      
      // Reset particles that have moved too far
      if (pos.z > 200.0) {
        pos.z -= 400.0;
      }
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (200.0 / (200.0 + pos.z));
    }
  `;

  const fragmentShader = `
    precision mediump float;
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      // Create circular points
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      float glow = 1.0 - smoothstep(0.0, 0.5, dist);
      glow = pow(glow, 2.0);
      
      gl_FragColor = vec4(vColor, vAlpha * glow);
    }
  `;

  const lineVertexShader = `
    attribute vec3 position;
    attribute vec3 color;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;
    uniform float uSpeed;
    varying vec3 vColor;
    
    void main() {
      vColor = color;
      
      vec3 pos = position;
      
      // Animate road lines
      pos.z += mod(uTime * uSpeed * 30.0, 20.0) - 10.0;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const lineFragmentShader = `
    precision mediump float;
    varying vec3 vColor;
    
    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;

  const hexToRgb = (hex: number): [number, number, number] => {
    const r = ((hex >> 16) & 255) / 255;
    const g = ((hex >> 8) & 255) / 255;
    const b = (hex & 255) / 255;
    return [r, g, b];
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new Renderer({ canvas, alpha: true });
    const gl = renderer.gl;
    
    rendererRef.current = renderer;
    
    // Set background color
    const [bgR, bgG, bgB] = hexToRgb(colors.background || 0x000000);
    gl.clearColor(bgR, bgG, bgB, 1);
    
    // Enable blending for glow effects
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Set up camera
    const camera = new Camera(gl, { fov: fov });
    camera.position.set(0, 8, 0);
    camera.lookAt([0, 0, -100]);
    
    // Create scene
    const scene = new Transform();
    sceneRef.current = scene;
    
    // Create car lights
    const createCarLights = () => {
      const positions: number[] = [];
      const vertexColors: number[] = [];
      const sizes: number[] = [];
      const alphas: number[] = [];
      
      // Left side cars (moving away) - red lights
      const leftColors = colors.leftCars || [0xD856BF, 0x6750A2, 0xC247AC];
      for (let i = 0; i < 50; i++) {
        const z = Math.random() * -length;
        const x = -(roadWidth / 2) - Math.random() * 2;
        const y = 0;
        
        positions.push(x, y, z);
        
        const colorHex = leftColors[Math.floor(Math.random() * leftColors.length)];
        const [r, g, b] = hexToRgb(colorHex);
        vertexColors.push(r, g, b);
        
        sizes.push(2 + Math.random() * 3);
        alphas.push(0.5 + Math.random() * 0.5);
      }
      
      // Right side cars (moving closer) - blue/white lights
      const rightColors = colors.rightCars || [0x03B3C3, 0x0E5EA5, 0x324555];
      for (let i = 0; i < 50; i++) {
        const z = Math.random() * -length;
        const x = (roadWidth / 2) + Math.random() * 2;
        const y = 0;
        
        positions.push(x, y, z);
        
        const colorHex = rightColors[Math.floor(Math.random() * rightColors.length)];
        const [r, g, b] = hexToRgb(colorHex);
        vertexColors.push(r, g, b);
        
        sizes.push(2 + Math.random() * 3);
        alphas.push(0.5 + Math.random() * 0.5);
      }
      
      const geometry = new Geometry(gl, {
        position: { size: 3, data: new Float32Array(positions) },
        color: { size: 3, data: new Float32Array(vertexColors) },
        size: { size: 1, data: new Float32Array(sizes) },
        alpha: { size: 1, data: new Float32Array(alphas) },
      });
      
      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speedRef.current },
        },
        transparent: true,
      });
      
      return new Mesh(gl, { geometry, program, mode: gl.POINTS });
    };
    
    // Create side light sticks
    const createLightSticks = () => {
      const positions: number[] = [];
      const vertexColors: number[] = [];
      const sizes: number[] = [];
      const alphas: number[] = [];
      
      const [stickR, stickG, stickB] = hexToRgb(colors.sticks || 0x03B3C3);
      
      // Left side sticks
      for (let i = 0; i < totalSideLightSticks; i++) {
        const z = (i / totalSideLightSticks) * -length;
        const x = -(roadWidth / 2) - 8;
        const y = 1 + Math.random() * 2;
        
        positions.push(x, y, z);
        vertexColors.push(stickR, stickG, stickB);
        sizes.push(1 + Math.random());
        alphas.push(0.8);
      }
      
      // Right side sticks
      for (let i = 0; i < totalSideLightSticks; i++) {
        const z = (i / totalSideLightSticks) * -length;
        const x = (roadWidth / 2) + 8;
        const y = 1 + Math.random() * 2;
        
        positions.push(x, y, z);
        vertexColors.push(stickR, stickG, stickB);
        sizes.push(1 + Math.random());
        alphas.push(0.8);
      }
      
      const geometry = new Geometry(gl, {
        position: { size: 3, data: new Float32Array(positions) },
        color: { size: 3, data: new Float32Array(vertexColors) },
        size: { size: 1, data: new Float32Array(sizes) },
        alpha: { size: 1, data: new Float32Array(alphas) },
      });
      
      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speedRef.current * 0.3 },
        },
        transparent: true,
      });
      
      return new Mesh(gl, { geometry, program, mode: gl.POINTS });
    };
    
    // Create road lines
    const createRoadLines = () => {
      const positions: number[] = [];
      const vertexColors: number[] = [];
      
      const [lineR, lineG, lineB] = hexToRgb(colors.brokenLines || 0xFFFFFF);
      
      // Center broken lines
      for (let i = 0; i < lightPairsPerRoadWay; i++) {
        const z = (i / lightPairsPerRoadWay) * -length;
        
        // Left center line segment
        positions.push(-0.5, 0, z, -0.5, 0, z - 5);
        vertexColors.push(lineR, lineG, lineB, lineR, lineG, lineB);
        
        // Right center line segment
        positions.push(0.5, 0, z, 0.5, 0, z - 5);
        vertexColors.push(lineR, lineG, lineB, lineR, lineG, lineB);
      }
      
      // Shoulder lines
      const [shoulderR, shoulderG, shoulderB] = hexToRgb(colors.shoulderLines || 0xFFFFFF);
      
      // Left shoulder
      positions.push(-roadWidth/2, 0, 0, -roadWidth/2, 0, -length);
      vertexColors.push(shoulderR, shoulderG, shoulderB, shoulderR, shoulderG, shoulderB);
      
      // Right shoulder
      positions.push(roadWidth/2, 0, 0, roadWidth/2, 0, -length);
      vertexColors.push(shoulderR, shoulderG, shoulderB, shoulderR, shoulderG, shoulderB);
      
      const geometry = new Geometry(gl, {
        position: { size: 3, data: new Float32Array(positions) },
        color: { size: 3, data: new Float32Array(vertexColors) },
      });
      
      const program = new Program(gl, {
        vertex: lineVertexShader,
        fragment: lineFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speedRef.current },
        },
      });
      
      return new Mesh(gl, { geometry, program, mode: gl.LINES });
    };
    
    // Create road surface
    const createRoadSurface = () => {
      const positions = new Float32Array([
        -roadWidth/2, 0, 0,
        roadWidth/2, 0, 0,
        -roadWidth/2, 0, -length,
        roadWidth/2, 0, -length,
      ]);
      
      const indices = new Uint16Array([0, 1, 2, 1, 3, 2]);
      
      const [roadR, roadG, roadB] = hexToRgb(colors.roadColor || 0x080808);
      const roadColors = new Float32Array([
        roadR, roadG, roadB,
        roadR, roadG, roadB,
        roadR, roadG, roadB,
        roadR, roadG, roadB,
      ]);
      
      const geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        color: { size: 3, data: roadColors },
        index: { data: indices },
      });
      
      const program = new Program(gl, {
        vertex: lineVertexShader,
        fragment: lineFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0 },
        },
      });
      
      return new Mesh(gl, { geometry, program });
    };
    
    // Create all elements
    const roadSurface = createRoadSurface();
    const roadLines = createRoadLines();
    const carLights = createCarLights();
    const lightSticks = createLightSticks();
    
    roadSurface.setParent(scene);
    roadLines.setParent(scene);
    carLights.setParent(scene);
    lightSticks.setParent(scene);
    
    // Animation loop
    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      
      // Update uniforms
      [roadLines, carLights, lightSticks].forEach(mesh => {
        if (mesh.program.uniforms.uTime) {
          mesh.program.uniforms.uTime.value = timeRef.current;
        }
        if (mesh.program.uniforms.uSpeed) {
          mesh.program.uniforms.uSpeed.value = speedRef.current;
        }
      });
      
      renderer.render({ scene, camera });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.perspective({
        aspect: canvas.offsetWidth / canvas.offsetHeight,
        fov: fov
      });
    };
    
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    handleResize();
    
    // Speed control (could be triggered by parent component)
    const handleSpeedUp = () => {
      speedRef.current = speedUp;
      effectOptions.onSpeedUp?.();
    };
    
    const handleSlowDown = () => {
      speedRef.current = 1;
      effectOptions.onSlowDown?.();
    };
    
    // Auto speed variation for demo
    const speedInterval = setInterval(() => {
      speedRef.current = 1 + Math.sin(timeRef.current * 0.1) * 0.5;
    }, 100);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(speedInterval);
      resizeObserver.disconnect();
      
      // Clean up WebGL resources
      [roadSurface, roadLines, carLights, lightSticks].forEach(mesh => {
        mesh.geometry.remove();
      });
      
      if (rendererRef.current) {
        const gl = rendererRef.current.gl;
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) {
          ext.loseContext();
        }
      }
    };
  }, [effectOptions, fov, length, roadWidth, totalSideLightSticks, lightPairsPerRoadWay, colors]);

  return (
    <canvas 
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ 
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default Hyperspeed;