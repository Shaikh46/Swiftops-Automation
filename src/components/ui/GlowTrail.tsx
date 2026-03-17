import { useEffect, useRef } from 'react';

export function GlowTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const isVisible = useRef(false);
  const rafId = useRef<number>();

  useEffect(() => {
    // PERF: Disable on touch devices entirely
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    // PERF: Disable on slow networks or if prefers-reduced-motion
    const connection = (navigator as any).connection;
    if (
      (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      
      pos.current = { x: clientX, y: clientY };
      
      if (!isVisible.current && trailRef.current) {
        isVisible.current = true;
        trailRef.current.style.opacity = '1';
      }
    };

    const handleLeave = () => {
      if (isVisible.current && trailRef.current) {
        isVisible.current = false;
        trailRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    const update = () => {
      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);
      lastTime.current = now;

      // Calculate velocity
      const dx = pos.current.x - lastPos.current.x;
      const dy = pos.current.y - lastPos.current.y;
      
      // Smooth velocity
      vel.current.x = vel.current.x * 0.8 + (dx / dt) * 0.2;
      vel.current.y = vel.current.y * 0.8 + (dy / dt) * 0.2;

      lastPos.current = { ...pos.current };

      if (trailRef.current && isVisible.current) {
        const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
        const angle = Math.atan2(vel.current.y, vel.current.x);
        
        // Scale based on speed (stretch in direction of movement)
        const scaleX = 1 + Math.min(speed * 2, 4);
        const scaleY = Math.max(0.2, 1 - speed * 0.1);
        
        // Opacity based on speed (brighter when moving fast)
        const opacity = Math.min(0.8, 0.2 + speed * 0.5);

        trailRef.current.style.transform = `translate3d(${pos.current.x - 20}px, ${pos.current.y - 20}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
        trailRef.current.style.opacity = opacity.toString();
      }

      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div ref={trailRef} className="glow-trail" style={{ opacity: 0 }} />;
}
