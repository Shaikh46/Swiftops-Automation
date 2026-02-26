import { useEffect, useRef, useState } from 'react';

interface EagleLogoProps {
  variant?: 'icon' | 'full';
  size?: number;
  className?: string;
}

export function EagleLogo({ variant = 'icon', size = 512, className = '' }: EagleLogoProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check if animation has already played
    const animationPlayed = sessionStorage.getItem('eagle-logo-animated');
    if (animationPlayed) {
      setHasAnimated(true);
      setIsLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (!hasAnimated) {
      // Mark animation as played after entry animation completes (1.2 seconds)
      setTimeout(() => {
        sessionStorage.setItem('eagle-logo-animated', 'true');
        setHasAnimated(true);
      }, 1200);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer ambient aura - soft glow behind head (Layer 3) */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && !hasAnimated ? 'animate-eagle-entry-ambient' : isLoaded ? 'animate-eagle-pulse-glow' : ''
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(0, 247, 255, 0.25) 0%, rgba(0, 247, 255, 0.12) 40%, transparent 70%)',
          filter: 'blur(30px)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Medium outline glow around head (Layer 2) */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && !hasAnimated ? 'animate-eagle-entry-medium-glow' : isLoaded ? 'animate-eagle-shimmer-sweep' : ''
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(0, 247, 255, 0.4) 0%, rgba(0, 247, 255, 0.2) 35%, transparent 60%)',
          filter: 'blur(15px)',
          transform: isHovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Circular container with dark background and neon glow */}
      <div
        className={`absolute inset-0 rounded-full overflow-hidden gpu-accelerated ${
          isLoaded && !hasAnimated ? 'animate-eagle-entry-container' : isLoaded ? '' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(17, 24, 39, 0.95) 0%, rgba(11, 15, 26, 0.98) 100%)',
          border: '2px solid rgba(0, 247, 255, 0.6)',
          boxShadow: isHovered
            ? '0 0 40px rgba(0, 247, 255, 0.9), 0 0 60px rgba(0, 247, 255, 0.5), inset 0 0 25px rgba(0, 247, 255, 0.2)'
            : '0 0 25px rgba(0, 247, 255, 0.7), 0 0 45px rgba(0, 247, 255, 0.4), inset 0 0 18px rgba(0, 247, 255, 0.12)',
          transition: 'box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          aspectRatio: '1 / 1',
        }}
      >
        {/* Eagle head image centered in circle */}
        <div className="absolute inset-0 flex items-center justify-center p-[10%]">
          <img
            ref={imgRef}
            src="/assets/generated/eagle-head-logo.dim_400x400.png"
            alt="SwiftOps Eagle Logo"
            onLoad={handleImageLoad}
            className={`w-full h-full object-contain relative z-10 gpu-accelerated ${
              isLoaded && !hasAnimated ? 'animate-eagle-entry-image' : isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : ''}`}
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 6px rgba(0, 247, 255, 1)) drop-shadow(0 0 12px rgba(0, 247, 255, 0.9)) drop-shadow(0 0 20px rgba(0, 247, 255, 0.7))'
                : 'drop-shadow(0 0 4px rgba(0, 247, 255, 0.95)) drop-shadow(0 0 8px rgba(0, 247, 255, 0.8)) drop-shadow(0 0 16px rgba(0, 247, 255, 0.6))',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          
          {/* Inner illumination inside eagle head (Layer 1 - strongest) */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isLoaded && !hasAnimated ? 'animate-eagle-head-bloom' : isLoaded ? 'animate-eagle-head-pulse' : ''
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 35%, rgba(0, 247, 255, 0.6) 0%, rgba(0, 247, 255, 0.3) 20%, transparent 40%)',
              filter: 'blur(8px)',
              opacity: isLoaded ? 1 : 0,
            }}
          />
        </div>

        {/* Energy spread effect - flows from head to wings */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isLoaded && !hasAnimated ? 'animate-eagle-energy-spread' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(0, 247, 255, 0.5) 0%, rgba(0, 247, 255, 0.3) 30%, transparent 60%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Shimmer sweep overlay - moves across logo */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isLoaded && hasAnimated ? 'animate-eagle-shimmer-sweep' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 247, 255, 0.4) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* Continuous soft pulse glow - activates after entry */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && hasAnimated ? 'animate-eagle-breathing-pulse' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(0, 247, 255, 0.25) 0%, rgba(0, 247, 255, 0.15) 40%, transparent 70%)',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Energy pulse ring - every 3.5 seconds */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full ${
          isLoaded && hasAnimated ? 'animate-eagle-energy-pulse' : 'opacity-0'
        }`}
        style={{
          border: '2px solid rgba(0, 247, 255, 0.6)',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
}
