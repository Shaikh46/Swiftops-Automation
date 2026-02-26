import { useEffect, useState, useRef } from 'react';

export function NeonCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    // Check if device is desktop
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      // Only update position if magnetic effect is not paused
      if (!isPausedRef.current) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    // Listen for pause/resume events from CTA click system
    const handlePause = () => {
      isPausedRef.current = true;
    };

    const handleResume = () => {
      isPausedRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pause-magnetic-cursor', handlePause);
    window.addEventListener('resume-magnetic-cursor', handleResume);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pause-magnetic-cursor', handlePause);
      window.removeEventListener('resume-magnetic-cursor', handleResume);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 w-8 h-8 rounded-full"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, rgba(0, 229, 255, 0) 70%)',
        filter: 'blur(8px)',
        transition: isPausedRef.current ? 'none' : 'left 0.1s ease-out, top 0.1s ease-out',
        willChange: 'transform, opacity',
      }}
    />
  );
}
