import { useEffect, useState, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Deterministic particle positions — cinematic microscopic light particles
const CINEMATIC_PARTICLES = [
  { x: 5,  y: 12, size: 1.2, delay: 0,    duration: 22, driftX: 18,  driftY: -35, color: 'cyan'   },
  { x: 18, y: 68, size: 0.8, delay: 3.1,  duration: 28, driftX: -12, driftY: -28, color: 'blue'   },
  { x: 32, y: 28, size: 1.5, delay: 6.4,  duration: 19, driftX: 22,  driftY: -42, color: 'violet' },
  { x: 48, y: 82, size: 1.0, delay: 1.7,  duration: 25, driftX: -8,  driftY: -30, color: 'cyan'   },
  { x: 63, y: 18, size: 0.9, delay: 8.2,  duration: 31, driftX: 15,  driftY: -38, color: 'blue'   },
  { x: 78, y: 55, size: 1.6, delay: 4.5,  duration: 21, driftX: -20, driftY: -25, color: 'violet' },
  { x: 12, y: 44, size: 0.7, delay: 11.0, duration: 26, driftX: 10,  driftY: -45, color: 'cyan'   },
  { x: 42, y: 8,  size: 1.3, delay: 5.3,  duration: 18, driftX: -15, driftY: -32, color: 'blue'   },
  { x: 58, y: 38, size: 0.8, delay: 7.8,  duration: 24, driftX: 25,  driftY: -20, color: 'violet' },
  { x: 72, y: 75, size: 1.8, delay: 2.2,  duration: 29, driftX: -18, driftY: -40, color: 'cyan'   },
  { x: 25, y: 90, size: 0.6, delay: 13.5, duration: 20, driftX: 12,  driftY: -50, color: 'blue'   },
  { x: 88, y: 32, size: 1.1, delay: 9.7,  duration: 23, driftX: -22, driftY: -28, color: 'violet' },
  { x: 3,  y: 60, size: 0.9, delay: 15.2, duration: 27, driftX: 8,   driftY: -35, color: 'cyan'   },
  { x: 95, y: 78, size: 1.4, delay: 0.9,  duration: 32, driftX: -10, driftY: -22, color: 'blue'   },
  { x: 50, y: 50, size: 0.7, delay: 12.0, duration: 17, driftX: 20,  driftY: -48, color: 'violet' },
  { x: 35, y: 72, size: 1.0, delay: 6.0,  duration: 30, driftX: -14, driftY: -33, color: 'cyan'   },
  { x: 82, y: 15, size: 1.3, delay: 4.0,  duration: 22, driftX: 16,  driftY: -40, color: 'blue'   },
  { x: 20, y: 35, size: 0.8, delay: 10.5, duration: 25, driftX: -9,  driftY: -27, color: 'violet' },
  { x: 67, y: 92, size: 1.5, delay: 2.8,  duration: 19, driftX: 11,  driftY: -55, color: 'cyan'   },
  { x: 90, y: 48, size: 0.6, delay: 16.0, duration: 28, driftX: -25, driftY: -30, color: 'blue'   },
  { x: 10, y: 85, size: 1.2, delay: 7.2,  duration: 24, driftX: 18,  driftY: -42, color: 'violet' },
  { x: 55, y: 22, size: 0.9, delay: 14.3, duration: 21, driftX: -13, driftY: -36, color: 'cyan'   },
  { x: 40, y: 58, size: 1.6, delay: 3.6,  duration: 33, driftX: 7,   driftY: -25, color: 'blue'   },
  { x: 75, y: 40, size: 0.7, delay: 11.8, duration: 26, driftX: -19, driftY: -44, color: 'violet' },
  { x: 28, y: 5,  size: 1.1, delay: 8.9,  duration: 20, driftX: 23,  driftY: -38, color: 'cyan'   },
  { x: 60, y: 65, size: 1.4, delay: 1.4,  duration: 29, driftX: -11, driftY: -32, color: 'blue'   },
  { x: 15, y: 20, size: 0.8, delay: 17.5, duration: 23, driftX: 14,  driftY: -46, color: 'violet' },
  { x: 85, y: 88, size: 1.0, delay: 5.7,  duration: 27, driftX: -16, driftY: -28, color: 'cyan'   },
  { x: 45, y: 42, size: 1.3, delay: 9.1,  duration: 18, driftX: 21,  driftY: -52, color: 'blue'   },
  { x: 70, y: 10, size: 0.6, delay: 13.0, duration: 31, driftX: -8,  driftY: -35, color: 'violet' },
];

const MOBILE_CINEMATIC_PARTICLES = CINEMATIC_PARTICLES.slice(0, 12);

// Volumetric light ray angles for the conic burst effect
const LIGHT_RAYS = [
  { angle: -60, width: 2,   opacity: 0.06, delay: 0,   duration: 12 },
  { angle: -40, width: 3,   opacity: 0.09, delay: 1.5, duration: 15 },
  { angle: -20, width: 4,   opacity: 0.12, delay: 0.5, duration: 11 },
  { angle: 0,   width: 5,   opacity: 0.15, delay: 2.0, duration: 14 },
  { angle: 20,  width: 4,   opacity: 0.12, delay: 0.8, duration: 13 },
  { angle: 40,  width: 3,   opacity: 0.09, delay: 1.2, duration: 16 },
  { angle: 60,  width: 2,   opacity: 0.06, delay: 0.3, duration: 12 },
  { angle: -50, width: 1.5, opacity: 0.05, delay: 3.0, duration: 18 },
  { angle: 50,  width: 1.5, opacity: 0.05, delay: 2.5, duration: 17 },
];

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(16);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    // Detect mobile for particle optimization
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    setParticleCount(mobile ? 6 : 16);

    // Start animation immediately
    setMounted(true);

    // Emit intro animation start event
    window.dispatchEvent(new CustomEvent('intro-animation-start'));

    // Complete animation after 4 seconds (3.2s animation + 0.8s fade-out)
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = '';
      // Emit intro animation complete event
      window.dispatchEvent(new CustomEvent('intro-animation-complete'));
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const cinematicParticles = isMobile ? MOBILE_CINEMATIC_PARTICLES : CINEMATIC_PARTICLES;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center intro-animation-container transition-opacity duration-800 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 60%, #020510 0%, #030818 25%, #040a1e 50%, #020408 75%, #010205 100%)',
      }}
    >
      {/* ============================================================
          PREMIUM CINEMATIC BACKGROUND LAYERS — z-index 1-9
          All layers are pointer-events-none and below logo z-index
          ============================================================ */}

      {/* Layer 1: Deep space base — animated dark navy gradient shift */}
      <div
        className="absolute inset-0 pointer-events-none intro-deep-space-base"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Layer 2: Star field — tiny static dots for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        {/* Static star dots rendered via CSS pseudo-elements */}
        <div className="intro-star-field" />
      </div>

      {/* Layer 3: Volumetric light rays — conic burst from center-bottom */}
      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {LIGHT_RAYS.map((ray, i) => (
            <div
              key={`ray-${i}`}
              className="intro-vol-ray"
              style={{
                '--ray-angle': `${ray.angle}deg`,
                '--ray-width': `${ray.width}px`,
                '--ray-opacity': ray.opacity,
                '--ray-delay': `${ray.delay}s`,
                '--ray-duration': `${ray.duration}s`,
                animationDelay: `${ray.delay}s`,
                animationDuration: `${ray.duration}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Layer 4: Radial neon energy field — centered behind logo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 4 }}
        aria-hidden="true"
      >
        {/* Outer ambient aura — violet */}
        <div className="intro-neon-aura-violet" />
        {/* Mid energy ring — electric blue */}
        <div className="intro-neon-aura-blue" />
        {/* Inner core glow — cyan */}
        <div className="intro-neon-aura-cyan" />
      </div>

      {/* Layer 5: Atmospheric fog / haze drifting layers */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 5 }}
        aria-hidden="true"
      >
        <div className="intro-fog-layer-1" />
        <div className="intro-fog-layer-2" />
        <div className="intro-fog-layer-3" />
      </div>

      {/* Layer 6: Gradient accent bands — electric blue / cyan / violet sweeps */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 6 }}
        aria-hidden="true"
      >
        <div className="intro-accent-band-1" />
        <div className="intro-accent-band-2" />
        <div className="intro-accent-band-3" />
      </div>

      {/* Layer 7: Microscopic floating light particles */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 7 }}
        aria-hidden="true"
      >
        {cinematicParticles.map((p, i) => (
          <div
            key={`cp-${i}`}
            className={`intro-micro-particle intro-micro-particle--${p.color}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Layer 8: Horizontal scan line — subtle cinematic sweep */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 8 }}
        aria-hidden="true"
      >
        <div className="intro-scan-line" />
      </div>

      {/* Layer 9: Soft vignette edges — focus attention on center */}
      <div
        className="absolute inset-0 pointer-events-none intro-premium-vignette"
        style={{ zIndex: 9 }}
        aria-hidden="true"
      />

      {/* ============================================================
          EXISTING ANIMATION LAYERS — z-index 10+ (COMPLETELY UNCHANGED)
          ============================================================ */}

      {/* Phase 1: Energy Activation - Ambient Haze */}
      <div className="absolute inset-0 pointer-events-none intro-ambient-haze" style={{ zIndex: 10 }} />

      {/* Phase 1: Energy Activation - Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
        <div className="intro-energy-glow" />
      </div>

      {/* Phase 1: Energy Activation - Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }}>
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className="intro-particle"
            style={{
              animationDelay: `${i * 0.05}s`,
              left: `${(i % 4) * 25 + 12.5}%`,
              top: `${Math.floor(i / 4) * 25 + 12.5}%`,
            }}
          />
        ))}
      </div>

      {/* Central animated element */}
      <div className="relative flex flex-col items-center justify-center" style={{ zIndex: 20 }}>
        {/* Phase 2 & 3: Eagle Logo Container */}
        <div className="relative intro-logo-container">
          {/* Eagle head strongest glow overlay */}
          <div className="absolute top-0 left-0 w-full h-[30%] intro-head-glow-focus pointer-events-none" />

          {/* Phase 2: Neon outline trace */}
          <div className="absolute inset-0 intro-neon-trace pointer-events-none" />

          {/* Phase 2: Electric pulse traveling edges */}
          <div className="absolute inset-0 intro-electric-pulse pointer-events-none" />

          {/* Phase 3: Power burst effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="intro-power-burst" />
          </div>

          {/* Eagle Logo Image with Phase 2 reveal and Phase 3 zoom */}
          <img
            src="/assets/generated/eagle-logo.dim_512x512.png"
            alt="SwiftOps Eagle"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain intro-eagle-image"
          />

          {/* Multi-layer glow effects */}
          <div className="absolute inset-0 intro-glow-inner pointer-events-none" />
          <div className="absolute inset-0 intro-glow-outer pointer-events-none" />

          {/* Reflection effect */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 intro-reflection pointer-events-none" />
        </div>

        {/* Phase 3: SwiftOps Text */}
        <div className="mt-8 flex flex-col items-center gap-2 intro-text-container">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-orbitron font-bold tracking-wider intro-swiftops-text">
            SwiftOps
          </h1>
        </div>
      </div>
    </div>
  );
}
