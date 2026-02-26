import { useEffect, useState } from 'react';

interface EagleClickAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

export function EagleClickAnimation({ isActive, onComplete }: EagleClickAnimationProps) {
  const [stage, setStage] = useState<'idle' | 'fade' | 'draw' | 'expand' | 'particles' | 'pulse' | 'scale' | 'fadeout'>('idle');

  useEffect(() => {
    if (!isActive) {
      setStage('idle');
      return;
    }

    // Emit event: animation is running
    window.dispatchEvent(new CustomEvent('eagle-animation-start'));

    // Animation sequence timing
    const sequence = [
      { stage: 'fade', delay: 0 },
      { stage: 'draw', delay: 300 },
      { stage: 'expand', delay: 1000 },
      { stage: 'particles', delay: 1500 },
      { stage: 'pulse', delay: 2200 },
      { stage: 'scale', delay: 2800 },
      { stage: 'fadeout', delay: 3200 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    sequence.forEach(({ stage: nextStage, delay }) => {
      const timeout = setTimeout(() => {
        setStage(nextStage as any);
      }, delay);
      timeouts.push(timeout);
    });

    // Complete animation
    const completeTimeout = setTimeout(() => {
      onComplete();
      setStage('idle');
      // Emit event: animation complete
      window.dispatchEvent(new CustomEvent('eagle-animation-complete'));
    }, 3800);
    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isActive, onComplete]);

  if (!isActive && stage === 'idle') return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Dark overlay fade */}
      <div
        className={`absolute inset-0 bg-dark-bg transition-opacity duration-500 ${
          stage === 'fade' || stage === 'draw' || stage === 'expand' || stage === 'particles' || stage === 'pulse' || stage === 'scale'
            ? 'opacity-90'
            : 'opacity-0'
        }`}
      />

      {/* Eagle logo animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          {/* Main eagle image - using new eagle head logo */}
          <img
            src="/assets/generated/eagle-head-logo.dim_400x400.png"
            alt="Eagle Animation"
            className={`w-full h-full object-contain transition-all duration-700 ${
              stage === 'draw' || stage === 'expand' || stage === 'particles' || stage === 'pulse' || stage === 'scale'
                ? 'opacity-100'
                : 'opacity-0'
            } ${
              stage === 'expand' || stage === 'particles' || stage === 'pulse' || stage === 'scale'
                ? 'scale-100'
                : 'scale-75'
            } ${
              stage === 'scale'
                ? 'scale-110'
                : ''
            }`}
            style={{
              filter:
                stage === 'pulse' || stage === 'scale'
                  ? 'drop-shadow(0 0 40px rgba(0, 245, 255, 1)) drop-shadow(0 0 80px rgba(0, 245, 255, 0.6))'
                  : stage === 'expand' || stage === 'particles'
                  ? 'drop-shadow(0 0 20px rgba(0, 245, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 245, 255, 0.4))'
                  : 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.6))',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, opacity',
            }}
          />

          {/* Stroke drawing effect overlay */}
          {stage === 'draw' && (
            <div className="absolute inset-0 animate-stroke-draw">
              <div className="absolute inset-0 border-4 border-neon-cyan rounded-full opacity-80" 
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  animation: 'draw-stroke 1s ease-in-out forwards',
                }}
              />
            </div>
          )}

          {/* Wing expansion glow */}
          {(stage === 'expand' || stage === 'particles' || stage === 'pulse' || stage === 'scale') && (
            <>
              <div
                className="absolute top-1/2 left-0 w-32 h-32 -translate-y-1/2 -translate-x-16 animate-wing-expand-left"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%)',
                  willChange: 'transform, opacity',
                }}
              />
              <div
                className="absolute top-1/2 right-0 w-32 h-32 -translate-y-1/2 translate-x-16 animate-wing-expand-right"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%)',
                  willChange: 'transform, opacity',
                }}
              />
            </>
          )}

          {/* Electric particles */}
          {(stage === 'particles' || stage === 'pulse' || stage === 'scale') && (
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-particle-burst"
                  style={{
                    left: '50%',
                    top: '50%',
                    animationDelay: `${i * 0.05}s`,
                    '--angle': `${(i * 360) / 12}deg`,
                    willChange: 'transform, opacity',
                  } as any}
                />
              ))}
            </div>
          )}

          {/* Light streaks */}
          {(stage === 'particles' || stage === 'pulse' || stage === 'scale') && (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-24 bg-gradient-to-t from-neon-cyan to-transparent animate-light-streak"
                  style={{
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -100%) rotate(${i * 60}deg)`,
                    animationDelay: `${i * 0.1}s`,
                    willChange: 'transform, opacity',
                  }}
                />
              ))}
            </>
          )}

          {/* Pulse ring */}
          {stage === 'pulse' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border-4 border-neon-cyan rounded-full animate-pulse-ring" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
