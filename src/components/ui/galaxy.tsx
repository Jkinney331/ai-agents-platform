'use client';

import { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Transform, Plane, Vec3, Program, Mesh, Geometry } from 'ogl';

interface GalaxyProps {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  className?: string;
}

const Galaxy: React.FC<GalaxyProps> = ({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1.5,
  glowIntensity = 0.5,
  saturation = 0.8,
  hueShift = 240,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef<Vec3>(new Vec3(0, 0, 0));
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  const vertexShader = `
    attribute vec2 uv;
    attribute vec2 position;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uDensity;
    uniform bool uMouseRepulsion;
    varying vec2 vUv;
    varying float vNoise;
    
    // Noise function
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vUv = uv;
      
      vec3 pos = vec3(position, 0.0);
      
      // Add noise-based displacement for galaxy swirl effect
      float noise1 = snoise(vec3(pos.xy * uDensity + uTime * 0.1, uTime * 0.05));
      float noise2 = snoise(vec3(pos.xy * uDensity * 2.0 + uTime * 0.05, uTime * 0.1));
      
      // Create spiral galaxy effect
      float angle = atan(pos.y, pos.x);
      float radius = length(pos.xy);
      float spiral = sin(angle * 3.0 + radius * 5.0 + uTime * 0.5);
      
      pos.x += noise1 * 0.1 + spiral * 0.05;
      pos.y += noise2 * 0.1;
      
      // Mouse repulsion effect
      if (uMouseRepulsion) {
        vec3 mousePos = uMouse;
        float dist = distance(pos.xy, mousePos.xy);
        float repulsion = 1.0 / (1.0 + dist * 5.0);
        vec2 repulsionDir = normalize(pos.xy - mousePos.xy);
        pos.xy += repulsionDir * repulsion * 0.2;
      }
      
      vNoise = (noise1 + noise2) * 0.5 + spiral * 0.3;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = 2.0 + abs(vNoise) * 3.0;
    }
  `;

  const fragmentShader = `
    precision mediump float;
    uniform float uTime;
    uniform float uGlowIntensity;
    uniform float uSaturation;
    uniform float uHueShift;
    varying vec2 vUv;
    varying float vNoise;
    
    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      // Create star-like glow
      float glow = 1.0 - smoothstep(0.0, 0.5, dist);
      glow = pow(glow, 2.0);
      
      // Color based on noise and time
      float hue = (vNoise * 0.1 + uTime * 0.02 + uHueShift / 360.0);
      hue = fract(hue);
      
      vec3 color = hsv2rgb(vec3(hue, uSaturation, 1.0));
      
      // Add brightness variation
      float brightness = 0.5 + abs(vNoise) * 0.5 + sin(uTime + vNoise * 10.0) * 0.2;
      color *= brightness * uGlowIntensity;
      
      gl_FragColor = vec4(color, glow);
    }
  `;

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let renderer;
    let gl;
    
    try {
      // Initialize renderer with error handling
      renderer = new Renderer({ canvas, alpha: true });
      
      if (!renderer || !renderer.gl) {
        throw new Error('Failed to initialize WebGL renderer');
      }
      
      gl = renderer.gl;
      
      // Check if WebGL context is available
      if (gl.isContextLost()) {
        throw new Error('WebGL context is lost');
      }
      
      rendererRef.current = renderer;
      
    } catch (error) {
      console.error('Galaxy: Failed to initialize WebGL:', error);
      return;
    }
    
    // Set up camera with error handling
    let camera;
    try {
      camera = new Camera(gl);
      if (!camera) {
        throw new Error('Failed to create camera');
      }
      camera.position.z = 5;
      cameraRef.current = camera;
    } catch (error) {
      console.error('Galaxy: Failed to create camera:', error);
      return;
    }
    
    // Create scene with error handling
    let scene;
    try {
      scene = new Transform();
      if (!scene) {
        throw new Error('Failed to create scene');
      }
      sceneRef.current = scene;
    } catch (error) {
      console.error('Galaxy: Failed to create scene:', error);
      return;
    }
    
    // Create particles geometry
    const particleCount = Math.floor(1000 * density);
    const positions = new Float32Array(particleCount * 3);
    const uvs = new Float32Array(particleCount * 2);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i2 = i * 2;
      
      // Create galaxy-like distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.5) * 4;
      const armOffset = Math.sin(angle * 3 + radius * 0.5) * 0.5;
      
      positions[i3] = Math.cos(angle) * radius + armOffset + (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = Math.sin(angle) * radius + armOffset + (Math.random() - 0.5) * 0.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.2;
      
      uvs[i2] = Math.random();
      uvs[i2 + 1] = Math.random();
    }
    
    // Create program with error handling
    let program;
    try {
      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: mouseRef.current },
          uDensity: { value: density },
          uGlowIntensity: { value: glowIntensity },
          uSaturation: { value: saturation },
          uHueShift: { value: hueShift },
          uMouseRepulsion: { value: mouseRepulsion },
        },
      });
      
      if (!program) {
        throw new Error('Failed to create shader program');
      }
      
    } catch (error) {
      console.error('Galaxy: Failed to create shader program:', error);
      return;
    }
    
    // Create geometry with error handling
    let geometry;
    try {
      geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        uv: { size: 2, data: uvs },
      });
      
      if (!geometry) {
        throw new Error('Failed to create geometry');
      }
      
    } catch (error) {
      console.error('Galaxy: Failed to create geometry:', error);
      return;
    }
    
    // Create mesh with error handling
    let mesh;
    try {
      mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS });
      
      // Verify mesh was created successfully
      if (!mesh) {
        throw new Error('Failed to create mesh');
      }
      
      // Add mesh to scene with validation
      mesh.setParent(scene);
      
      // Verify mesh was properly added to scene
      if (mesh.parent !== scene) {
        throw new Error('Failed to add mesh to scene');
      }
      
      meshRef.current = mesh;
      
    } catch (error) {
      console.error('Galaxy: Failed to create or add mesh:', error);
      // Clean up on failure
      if (geometry) geometry.remove();
      throw error;
    }
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseRef.current.set(x * 5, y * 5, 0);
    };
    
    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    
    // Animation loop with comprehensive safety checks
    const animate = () => {
      // Verify all required refs exist
      if (!sceneRef.current || !cameraRef.current || !meshRef.current || !rendererRef.current) {
        console.warn('Galaxy: Missing required refs for animation');
        return;
      }
      
      // Ensure scene has children before attempting to render
      if (!sceneRef.current.children || sceneRef.current.children.length === 0) {
        console.warn('Galaxy: Scene has no children to render');
        return;
      }
      
      // Verify renderer is still valid
      if (!rendererRef.current.gl || rendererRef.current.gl.isContextLost()) {
        console.warn('Galaxy: WebGL context lost');
        return;
      }
      
      try {
        timeRef.current += 0.01;
        
        // Update uniforms with additional safety checks
        if (program && program.uniforms) {
          if (program.uniforms.uTime) {
            program.uniforms.uTime.value = timeRef.current;
          }
          if (program.uniforms.uMouse) {
            program.uniforms.uMouse.value = mouseRef.current;
          }
        }
        
        // Safe render call with try-catch
        rendererRef.current.render({ 
          scene: sceneRef.current, 
          camera: cameraRef.current 
        });
        
        // Continue animation loop
        animationRef.current = requestAnimationFrame(animate);
        
      } catch (error) {
        console.warn('Galaxy animation error:', error);
        // Stop animation on error to prevent cascade
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };
    
    // Ensure mesh is properly added to scene before starting animation
    if (mesh && scene && mesh.parent === scene) {
      animate();
    } else {
      console.warn('Galaxy: Mesh not properly added to scene, skipping animation');
    }
    
    // Handle resize with error handling
    const handleResize = () => {
      try {
        if (!cameraRef.current || !rendererRef.current || !canvas) {
          console.warn('Galaxy: Missing required objects for resize');
          return;
        }
        
        // Check if canvas has valid dimensions
        if (canvas.offsetWidth <= 0 || canvas.offsetHeight <= 0) {
          console.warn('Galaxy: Invalid canvas dimensions for resize');
          return;
        }
        
        rendererRef.current.setSize(canvas.offsetWidth, canvas.offsetHeight);
        cameraRef.current.perspective({
          aspect: canvas.offsetWidth / canvas.offsetHeight
        });
        
      } catch (error) {
        console.warn('Galaxy: Error during resize:', error);
      }
    };
    
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    handleResize();
    
    return () => {
      try {
        // Stop animation loop
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        
        // Remove event listeners
        if (mouseInteraction && canvas) {
          canvas.removeEventListener('mousemove', handleMouseMove);
        }
        
        // Disconnect resize observer
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        
        // Clean up WebGL resources with error handling
        if (meshRef.current && meshRef.current.geometry) {
          try {
            meshRef.current.geometry.remove();
          } catch (error) {
            console.warn('Galaxy: Error cleaning up geometry:', error);
          }
        }
        
        if (rendererRef.current && rendererRef.current.gl) {
          try {
            const gl = rendererRef.current.gl;
            const ext = gl.getExtension('WEBGL_lose_context');
            if (ext) {
              ext.loseContext();
            }
          } catch (error) {
            console.warn('Galaxy: Error losing WebGL context:', error);
          }
        }
        
        // Clear refs
        meshRef.current = null;
        sceneRef.current = null;
        cameraRef.current = null;
        rendererRef.current = null;
        
      } catch (error) {
        console.warn('Galaxy: Error during cleanup:', error);
      }
    };
  }, [mounted, mouseRepulsion, mouseInteraction, density, glowIntensity, saturation, hueShift]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        className={`w-full h-full ${className}`}
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />
    );
  }

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

export default Galaxy;