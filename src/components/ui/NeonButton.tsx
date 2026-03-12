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
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
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
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2; // Magnetic pull strength
    const y = (e.clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Flash glow
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    // Handle ripple (cyan-purple ring expand)
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : 0;
    const y = rect ? e.clientY - rect.top : 0;
    setRipples((prev) => [...prev, { x, y, id: Date.now() }]);

    // Handle smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
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
          behavior: 'smooth',
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
        px-8 py-4 rounded-xl font-bold text-base
        min-h-[56px] /* MOBILE: Ensure >= 56px tap area */
        bg-[#0a121e]/40 backdrop-blur-md
        border border-[#00f0ff]/40
        text-[#00f0ff]
        transition-colors duration-300 ease-out
        hover:border-[#00f0ff]
        hover:text-white
        ${isClicked ? 'shadow-[0_0_40px_rgba(0,240,255,0.8),inset_0_0_20px_rgba(0,240,255,0.5)] scale-[0.98]' : 'hover:shadow-[0_0_20px_rgba(0,240,255,0.4),inset_0_0_10px_rgba(0,240,255,0.2)]'}
        ${className}
      `}
      style={{ willChange: 'transform, box-shadow', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      {...props}
    >
      {/* Container for internal effects that need clipping */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
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
            className="absolute w-32 h-32 rounded-full border-[#c300ff] bg-gradient-to-r from-[#00f0ff]/20 to-[#c300ff]/20 blur-[2px] pointer-events-none -z-10"
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
