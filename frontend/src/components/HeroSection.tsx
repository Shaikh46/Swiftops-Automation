import { useState } from 'react';
import { useParallax } from '../hooks/useParallax';
import { EagleLogo } from './EagleLogo';
import { EagleClickAnimation } from './EagleClickAnimation';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { useCTAClick } from '../hooks/useCTAClick';

export function HeroSection() {
  const parallaxY = useParallax(0.3);
  const [showAnimation, setShowAnimation] = useState(false);
  const createRipple = useRippleEffect();

  // CTA click hook — triggers animation then scrolls to #contact
  const { handleCTAClick, isLocked } = useCTAClick(() => {
    setShowAnimation(true);
  });

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    // useCTAClick handles the scroll after animation
  };

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    handleCTAClick(e);
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Neural Network Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/neural-grid-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${parallaxY}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg" />
        </div>

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 grid-background" />

        {/* Large Eagle Logo Background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{ transform: `translate(-50%, calc(-50% + ${parallaxY * 0.5}px))` }}
        >
          <EagleLogo variant="icon" size={600} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-5xl md:text-7xl font-orbitron font-bold leading-tight heading-glow">
                <span className="block text-neon-cyan neon-text">AUTOMATE</span>
                <span className="block text-white">THE</span>
                <span className="block text-neon-cyan neon-text">IMPOSSIBLE</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 font-inter max-w-2xl">
                AI-powered agents and intelligent automation systems that eliminate manual work and
                accelerate growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onButtonClick}
                  disabled={isLocked.current}
                  className="neon-button-primary relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Get Started
                </button>
                <button
                  onClick={onButtonClick}
                  disabled={isLocked.current}
                  className="neon-button relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Get Free Consultation
                </button>
              </div>
            </div>

            {/* Right: AI Robot */}
            <div className="relative">
              <div className="relative z-10 animate-float">
                <img
                  src="/assets/generated/ai-robot-server-room.dim_1200x1200.png"
                  alt="AI Robot"
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-auto robot-enhanced"
                />
                {/* Glowing Eyes Effect */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 bg-neon-cyan rounded-full blur-sm animate-pulse" />
              </div>

              {/* Network Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0, 245, 255, 0)" />
                    <stop offset="50%" stopColor="rgba(0, 245, 255, 0.8)" />
                    <stop offset="100%" stopColor="rgba(0, 245, 255, 0)" />
                  </linearGradient>
                </defs>
                {[...Array(5)].map((_, i) => (
                  <line
                    key={i}
                    x1={`${20 + i * 15}%`}
                    y1="20%"
                    x2={`${80 - i * 10}%`}
                    y2="80%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="network-line"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </svg>

              {/* Floating Workflow Nodes */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-neon-cyan rounded-full animate-float-node"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <EagleClickAnimation isActive={showAnimation} onComplete={handleAnimationComplete} />
    </>
  );
}
