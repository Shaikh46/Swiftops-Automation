import { Suspense, lazy } from "react";
// PERF: Lazy load 3D scene to prevent blocking main thread parsing
const SplineScene = lazy(() => import("@/components/ui/splite").then(m => ({ default: m.SplineScene })));
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { NeonButton } from "./ui/NeonButton";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const hideHint = () => {
      setShowHint(false);
    };

    window.addEventListener("touchstart", hideHint, { once: true, passive: true });
    window.addEventListener("mousedown", hideHint, { once: true, passive: true });

    return () => {
      window.removeEventListener("touchstart", hideHint);
      window.removeEventListener("mousedown", hideHint);
    };
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Layered Background - Optimized for mobile */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.12),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_30%,rgba(0,212,255,0.08),transparent_50%)] hidden md:block"></div>
      {/* Subtle grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,212,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50 md:opacity-100"></div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(0,0,0,0.7)_100%)]"></div>
      {/* Neon Orbs - Reduced blur on mobile */}
      <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-cyan-500/10 rounded-full blur-[80px] md:blur-[120px] md:animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-80 h-64 md:h-80 bg-cyan-400/8 rounded-full blur-[100px] md:blur-[140px] hidden md:block animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="relative w-full min-h-screen overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#00d4ff"
        />

        <div className="flex flex-col lg:flex-row h-full min-h-screen items-center">
          {/* LEFT: Content — order-1 (always first) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 px-5 sm:px-6 pt-24 sm:pt-28 lg:pt-28 pb-8 sm:pb-12 lg:px-16 lg:pb-0 relative z-10 flex flex-col justify-center order-1 w-full hero-animation"
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4 lg:mb-7 self-start"
            >
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/8 backdrop-blur-sm my-3 sm:my-5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">Next Gen Automation</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-cyan-200 via-cyan-400 to-cyan-600 tracking-tighter drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]">
                Automate
              </h1>
              <h2 className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold text-white mt-1 sm:mt-2 tracking-[0.15em] sm:tracking-[0.2em] drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                The Impossible
              </h2>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mt-4 sm:mt-5 mb-4 sm:mb-5 origin-left"
            ></motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-neutral-300 max-w-xl text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
            >
              Intelligent Automation Solutions for the Modern Enterprise. From AI Agents to Full-Scale Workflow Automation — We Build the Future of Business Efficiency.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 sm:mt-6 lg:mt-10"
            >
              <NeonButton href="#contact" className="!px-5 !py-3 lg:!px-8 lg:!py-4 !text-sm lg:!text-base">
                Start Your Journey
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </NeonButton>
              <NeonButton href="#services" className="!px-5 !py-3 lg:!px-8 lg:!py-4 !text-sm lg:!text-base !bg-transparent !border-cyan-400/50 hover:!bg-cyan-400/10">
                View Services
              </NeonButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mt-5 sm:mt-6 lg:mt-12"
            >
              {['24/7 Support', 'Enterprise Ready', 'Fast Deployment'].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}></div>
                  <span className="text-neutral-400 text-[11px] sm:text-xs lg:text-sm font-medium">{badge}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D Robot — order-2, optimized for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="flex-1 relative flex items-center justify-center w-full order-2 mt-0 mb-8 sm:mt-4 sm:mb-12 lg:mt-0 lg:mb-0 h-[300px] sm:h-[380px] md:h-[500px] lg:h-[90vh] hero-animation animation-heavy"
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 to-transparent hidden lg:block"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] hidden lg:block"></div>

            {/* Spline Scene Container — ENLARGED for prominence */}
            <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[460px] md:h-[460px] lg:w-full lg:h-full relative origin-center" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 460px' }}>
              <Suspense fallback={null}>
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full scale-110 md:scale-125 transform"
                />
              </Suspense>
              {/* Watermark cover */}
              <div className="absolute bottom-0 right-0 w-20 h-8 sm:w-24 sm:h-10 lg:w-36 lg:h-14 bg-black blur-sm"></div>
              
              {/* Mobile Interaction Hint */}
              {showHint && (
                <div className="robot-hint md:hidden absolute bottom-[-16px] left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] tracking-[1px] text-white/70 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none whitespace-nowrap border border-white/10 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                  Drag ← → to interact
                </div>
              )}
            </div>

            {/* Robot ambient glow — enlarged to match bigger robot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[380px] md:h-[380px] lg:w-[600px] lg:h-[600px] bg-cyan-500/20 rounded-full blur-[40px] sm:blur-[60px] lg:blur-[100px] -z-10 md:animate-pulse"></div>
          </motion.div>
        </div>
      </div>
      {/* Bottom separator line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
    </section>
  );
}
