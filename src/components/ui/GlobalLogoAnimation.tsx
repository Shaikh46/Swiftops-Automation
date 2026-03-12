import React, { useEffect, useState } from 'react';

export function GlobalLogoAnimation() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if the clicked element or any of its parents is a button or link
      const target = e.target as HTMLElement;
      const isButton = target.closest('button') || target.closest('[role="button"]') || target.closest('a');
      
      if (isButton && !isActive) {
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 4000);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isActive]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Optional backdrop */}
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className={`relative w-[300px] h-[300px] flex flex-col items-center justify-center perspective-[1000px] ${isActive ? 'active' : ''}`}>
        <div className="swiftops-glow-ring absolute top-1/2 left-1/2 w-[240px] h-[240px] -mt-[120px] -ml-[120px] rounded-full border-2 border-[#00E5FF]/80 shadow-[0_0_30px_rgba(0,229,255,0.6),inset_0_0_30px_rgba(0,229,255,0.6)] opacity-0 preserve-3d md:w-[240px] md:h-[240px] max-md:w-[180px] max-md:h-[180px] max-md:-mt-[90px] max-md:-ml-[90px]" style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}></div>
        
        <img 
          src="/images/swiftops-logo.jpeg" 
          className="swiftops-logo relative w-[120px] h-[120px] rounded-[24px] object-contain shadow-[0_0_25px_rgba(0,229,255,0.5)] z-[2] opacity-0 preserve-3d max-md:w-[90px] max-md:h-[90px]" 
          alt="SwiftOps Logo" 
          loading="lazy"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        />
        
        <div className="swiftops-text absolute -bottom-[60px] text-[#00E5FF] text-[24px] font-bold tracking-[0.15em] uppercase opacity-0 whitespace-nowrap max-md:text-[18px] max-md:-bottom-[45px]" style={{ textShadow: '0 0 15px rgba(0, 229, 255, 0.8)' }}>
          SwiftOps Automation
        </div>
      </div>
    </div>
  );
}
