import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { NeonButton } from './ui/NeonButton'
import { useEffect, useState } from 'react'

const features = [
  'AI-Powered Automation',
  'Custom Business Solutions',
  'Fast & Scalable Systems',
  '24/7 Smart Support'
]

// Floating AI Core Animation Component
const FloatingAICore = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate particles - reduced count for performance
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    angle: Math.random() * Math.PI * 2,
    radius: 60 + Math.random() * 80,
    speed: 0.2 + Math.random() * 0.5,
    delay: Math.random() * 2
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Subtle Radial Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1)_0%,transparent_60%)]"></div>

      {/* Animation Container */}
      <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center perspective-1000">
        
        {/* Vertical Energy Beam */}
        <motion.div 
          className="absolute w-16 h-full bg-gradient-to-b from-transparent via-[#00E5FF]/10 to-transparent blur-md z-0"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom Platform */}
        <motion.div 
          className="absolute bottom-10 w-48 h-12 rounded-[100%] border border-[#00E5FF]/30 bg-[#00E5FF]/5 shadow-[0_0_10px_rgba(0,229,255,0.1)_inset] z-0"
          style={{ transform: 'rotateX(70deg)' }}
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(0,229,255,0.1) inset",
              "0 0 20px rgba(0,229,255,0.2) inset",
              "0 0 10px rgba(0,229,255,0.1) inset"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-[100%] border-2 border-[#00E5FF]/50 scale-75 blur-[1px]"></div>
        </motion.div>

        {/* Floating Core Group */}
        <motion.div
          className="relative flex items-center justify-center z-10"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Rotating Energy Rings */}
          {[
            { size: 220, duration: 20, rotateX: 65, rotateY: 20, delay: 0 },
            { size: 180, duration: 15, rotateX: 45, rotateY: -30, delay: 0.5 },
            { size: 140, duration: 12, rotateX: 75, rotateY: 60, delay: 1 }
          ].map((ring, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border border-[#00E5FF]/40"
              style={{
                width: ring.size,
                height: ring.size,
                transformStyle: 'preserve-3d',
              }}
              animate={{ 
                rotateZ: 360,
                boxShadow: [
                  "0 0 5px rgba(0,229,255,0.1) inset, 0 0 5px rgba(0,229,255,0.1)",
                  "0 0 10px rgba(0,229,255,0.3) inset, 0 0 10px rgba(0,229,255,0.3)",
                  "0 0 5px rgba(0,229,255,0.1) inset, 0 0 5px rgba(0,229,255,0.1)"
                ]
              }}
              transition={{ 
                rotateZ: { duration: ring.duration, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: ring.delay }
              }}
            >
              {/* Ring Transform Wrapper */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{ transform: `rotateX(${ring.rotateX}deg) rotateY(${ring.rotateY}deg)` }}
              >
                {/* Glowing Nodes on Rings */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#00E5FF,0_0_20px_#00E5FF]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-[#00E5FF] rounded-full shadow-[0_0_8px_#00E5FF]"></div>
              </div>
            </motion.div>
          ))}

          {/* Central AI Core Sphere */}
          <motion.div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center"
            animate={{ 
              rotateY: 360,
              rotateX: 360
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Core Base Glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/40 to-[#007BFF]/40 rounded-full blur-md"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Core Wireframe/Neural Lines */}
            <div className="absolute inset-0 rounded-full border-2 border-[#00E5FF]/60 shadow-[0_0_30px_rgba(0,229,255,0.6)_inset]">
              {/* Latitude/Longitude Lines */}
              <div className="absolute inset-0 rounded-full border border-[#00E5FF]/40" style={{ transform: 'rotateX(45deg)' }}></div>
              <div className="absolute inset-0 rounded-full border border-[#00E5FF]/40" style={{ transform: 'rotateX(-45deg)' }}></div>
              <div className="absolute inset-0 rounded-full border border-[#00E5FF]/40" style={{ transform: 'rotateY(45deg)' }}></div>
              <div className="absolute inset-0 rounded-full border border-[#00E5FF]/40" style={{ transform: 'rotateY(-45deg)' }}></div>
            </div>

            {/* Inner Bright Core */}
            <motion.div 
              className="absolute w-12 h-12 bg-white rounded-full blur-[8px]"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Floating Particles */}
          {particles.map((p) => (
            <motion.div
              key={`particle-${p.id}`}
              className="absolute bg-white rounded-full shadow-[0_0_8px_#00E5FF]"
              style={{
                width: p.size,
                height: p.size,
              }}
              animate={{
                x: [
                  Math.cos(p.angle) * p.radius,
                  Math.cos(p.angle + Math.PI) * p.radius,
                  Math.cos(p.angle + Math.PI * 2) * p.radius
                ],
                y: [
                  Math.sin(p.angle) * p.radius,
                  Math.sin(p.angle + Math.PI) * p.radius,
                  Math.sin(p.angle + Math.PI * 2) * p.radius
                ],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 4 / p.speed,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-32 bg-[#020617] overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#007BFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Illustration / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-md mx-auto lg:max-w-none flex items-center justify-center"
          >
            <FloatingAICore />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 mb-6 self-start">
              <div className="px-3 py-1 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 backdrop-blur-sm">
                <span className="text-[#00E5FF] text-xs font-bold tracking-widest uppercase">About Us</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Transforming Businesses with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#007BFF] drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">AI Automation</span> & Smart Digital Solutions
            </h2>

            <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-10">
              <p>
                SwiftOps Automation helps businesses streamline operations using advanced AI agents, intelligent automation systems, and custom digital workflows. Our mission is to simplify complex business processes, increase productivity, and help companies scale faster through modern automation technology.
              </p>
              <p>
                We specialize in AI chatbots, workflow automation, business process optimization, and smart integrations designed to save time, reduce costs, and improve customer experience.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-[#00E5FF]/30 transition-colors duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <NeonButton href="#contact">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </NeonButton>
              <NeonButton href="#services" className="!bg-transparent !border-white/20 hover:!border-[#00E5FF]/50 hover:!bg-[#00E5FF]/10">
                View Our Services
              </NeonButton>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
