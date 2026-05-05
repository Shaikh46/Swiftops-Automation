import { Suspense, lazy, useEffect, useState } from "react";
const SplineScene = lazy(() => import("@/components/ui/splite").then(m => ({ default: m.SplineScene })));
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { ArrowRight, Zap, PlayCircle } from "lucide-react";
import { NeonButton } from "./ui/NeonButton";

export function HeroSection() {
  const [mountSpline, setMountSpline] = useState(false);

  useEffect(() => {
    // PERF: On mobile, radically delay the heavy Spline scene to ensure PageSpeed/Lighthouse passes the TBT window
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    
    if (!isMobile) {
      const timer = setTimeout(() => setMountSpline(true), 800);
      return () => clearTimeout(timer);
    } else {
      let mounted = false;
      const mount = () => {
        if (!mounted) {
           mounted = true;
           setMountSpline(true);
        }
      };
      const timer = setTimeout(mount, 8000);
      window.addEventListener('touchstart', mount, { once: true, passive: true });
      window.addEventListener('scroll', mount, { once: true, passive: true });
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('touchstart', mount);
        window.removeEventListener('scroll', mount);
      };
    }
  }, []);

  const headline = "Automate The Impossible".split(" ");

  return (
    <section id="home" className="relative w-full min-h-screen bg-[#0a1628] overflow-hidden bg-ken-burns">
      {/* Cinematic Dark Overlay & Mesh */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,255,247,0.15),transparent_70%)] z-0"></div>
      <div className="absolute top-0 left-0 pointer-events-none w-full h-full bg-[linear-gradient(rgba(0,255,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,247,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 z-0"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(0,0,0,0.8)_100%)] z-0"></div>

      <div className="relative w-full min-h-screen overflow-hidden z-10 flex items-center pt-24 pb-12 lg:pt-0 lg:pb-0">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#00fff7" />

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-[80px] flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-3xl flex flex-col justify-center order-1 mt-10 lg:mt-0 hero-animation">
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center self-start mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-[50px] pulse-4s glass-card text-[#00fff7]">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Next Gen Automation</span>
              </div>
            </motion.div>

            {/* Staggered Headline */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[72px] leading-[1.1] font-bold text-white drop-shadow-[0_0_20px_rgba(0,255,247,0.4)]"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-[16px] sm:text-[18px] font-light text-neutral-300 max-w-xl leading-relaxed mb-10"
            >
              Intelligent Automation Solutions for the Modern Enterprise. We build the future of business efficiency with custom AI agents and workflow architectures.
            </motion.p>

            {/* Buttons Row with Tooltip & Urgency Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col items-start gap-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="relative inline-flex items-center justify-center gap-2 px-8 py-4 lg:px-10 rounded-[50px] font-bold text-base min-h-[56px] bg-white/5 backdrop-blur-[20px] border border-[#00f0ff]/20 text-[#00f0ff] transition-colors duration-300 hover:border-[#00f0ff] hover:text-white pulse-4s w-full sm:w-auto outline-none cursor-pointer"
                >
                  Start Your Journey →
                </a>
                
                <div className="relative group w-full sm:w-auto">
                  <a 
                    href="#services"
                    className="relative inline-flex items-center justify-center px-8 py-4 lg:px-10 rounded-[50px] font-bold text-base min-h-[56px] !bg-transparent border border-[#00fff7]/30 hover:bg-[#00fff7]/10 text-[#00f0ff] transition-colors duration-300 w-full sm:w-auto outline-none cursor-pointer"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    View Services
                  </a>
                  {/* Tooltip */}
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-black/90 text-white px-3 py-1.5 rounded-md whitespace-nowrap border border-white/10 pointer-events-none before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black/90 z-20">
                    See what we automate →
                  </span>
                </div>
              </div>
              
              <span className="text-xs text-neutral-400 mt-1 ml-2 font-medium">Join 500+ businesses already automated.</span>
            </motion.div>

            {/* Social Proof Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12 w-full max-w-lg glass-card rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4 border border-white/5"
            >
              <div className="flex flex-col">
                <span className="text-[#00fff7] font-bold text-lg lg:text-xl">500+</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Enterprises</span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[#00fff7] font-bold text-lg lg:text-xl">99.9%</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Uptime</span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-[#00fff7] font-bold text-lg lg:text-xl">10x</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">ROI Avg</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: 3D Robot */}
          <div className="hidden md:flex flex-1 w-full order-2 justify-center items-center h-[400px] md:h-[500px] lg:h-[800px] relative pointer-events-auto">
            <div className="w-full h-full relative float-robot origin-center">
              {mountSpline && (
                <Suspense fallback={null}>
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full scale-110 lg:scale-125"
                  />
                </Suspense>
              )}
              {/* Spline logo cover */}
              <div className="absolute bottom-0 right-0 pointer-events-none w-32 h-12 bg-black/60 backdrop-blur-md"></div>
            </div>
            {/* Atmospheric Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-[#00fff7]/10 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none -z-10"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px pointer-events-none bg-gradient-to-r from-transparent via-[#00fff7]/40 to-transparent z-10"></div>
    </section>
  );
}
