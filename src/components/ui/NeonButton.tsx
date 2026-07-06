import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NeonButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  href, 
  children, 
  className = '', 
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // PERF: Cache touch device check once instead of querying on every mouse move
  const isTouchDevice = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  // Magnetic effect state
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Clean up ripples
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // PERF: Use cached touch device check
    if (isTouchDevice.current) return;
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Non-blocking ripple effect for instant 0ms response
    requestAnimationFrame(() => {
      const rect = buttonRef.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;
      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
    });

    // 2. Fixed linking logic
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault(); // MUST be inside this if-block to allow normal linking fallback!
        
        // Add highlight effect if scrolling to contact
        if (targetId === 'contact') {
          const contactGrid = targetElement.querySelector('.contact-grid-highlight-target');
          if (contactGrid) {
            contactGrid.classList.add('contact-form-highlight');
            setTimeout(() => {
              contactGrid.classList.remove('contact-form-highlight');
            }, 1000);
          }
        }

        targetElement.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        });
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`
        relative inline-flex items-center justify-center gap-2 
        px-8 py-4 rounded-[50px] font-bold text-base
        min-h-[56px] /* MOBILE: Ensure >= 56px tap area */
        bg-white/5 backdrop-blur-[20px]
        border border-[#00f0ff]/20
        text-[#00f0ff]
        transition-colors duration-300 ease-out
        hover:border-[#00f0ff]
        hover:text-white
        hover:shadow-[0_0_20px_rgba(0,240,255,0.4),inset_0_0_10px_rgba(0,240,255,0.2)]
        active:shadow-[0_0_40px_rgba(0,240,255,0.8),inset_0_0_20px_rgba(0,240,255,0.5)] active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black
        ${className}
      `}
      style={{ willChange: 'transform, box-shadow', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      {...props}
    >
      {/* Container for internal effects that need clipping */}
      <div className="absolute inset-0 overflow-hidden rounded-[50px] pointer-events-none">
        {/* Idle Breathing Glow */}
        <div className="absolute inset-0 opacity-50 animate-breathing-glow" />

        {/* Hover Light Sweep */}
        <div 
          className={`
            absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent
            transition-transform duration-700 ease-in-out
            ${isHovered ? 'translate-x-full' : ''}
          `}
        />
      </div>

      {/* Click Ripples (Outside clipping) */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ 
              top: ripple.y, 
              left: ripple.x, 
              x: '-50%', 
              y: '-50%',
              scale: 0, 
              opacity: 1,
              borderWidth: '2px'
            }}
            animate={{ 
              scale: 4, 
              opacity: 0,
              borderWidth: '0px'
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-32 h-32 rounded-[50px] border-[#c300ff] bg-gradient-to-r from-[#00f0ff]/20 to-[#c300ff]/20 blur-[2px] pointer-events-none -z-10"
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
        {children}
      </span>
    </motion.a>
  );
};
