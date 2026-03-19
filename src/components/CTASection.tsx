import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { NeonButton } from './ui/NeonButton'

// --- Section 1: Full Screen CTA ---
export function CTASection() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#020617] via-[#031A2E] to-[#042C3A]">
      {/* Animated Particle Field - Reduced counts for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Desktop particles — reduced from 30 to 15 */}
        <div className="hidden md:block">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`desktop-${i}`}
              className="absolute w-1 h-1 bg-[#00E5FF]/40 rounded-full"
              animate={{
                y: [Math.random() * 100 - 50, Math.random() * -100 - 50],
                x: [Math.random() * 100 - 50, Math.random() * -100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        {/* Mobile particles — reduced from 10 to 5 */}
        <div className="md:hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`mobile-${i}`}
              className="absolute w-1 h-1 bg-[#00E5FF]/40 rounded-full"
              animate={{
                y: [Math.random() * 50 - 25, Math.random() * -50 - 25],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 6 + Math.random() * 4, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Neural Network Lines (Faint) — Desktop only */}
      <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M0,500 Q300,300 600,600 T1200,400 T1800,500" 
            fill="none" 
            stroke="#00E5FF" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,300 Q400,500 800,200 T1600,400 T2000,300" 
            fill="none" 
            stroke="#007BFF" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 md:mb-12 tracking-tight drop-shadow-[0_0_20px_rgba(0,229,255,0.2)]"
        >
          Ready to Automate Your Business?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative inline-block group"
        >
          {/* Pulse Effect */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#00E5FF] rounded-2xl blur-xl"
          />
          
          <NeonButton href="#contact">
            Get Started with SwiftOps
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </NeonButton>
        </motion.div>
      </div>
    </section>
  )
}
