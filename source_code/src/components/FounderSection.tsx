import { motion } from 'framer-motion'

export function FounderSection() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.03),transparent_70%)]"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00E5FF]/30 rounded-full"
            animate={{
              y: [Math.random() * 100 - 50, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group relative bg-[#0a121e]/60 backdrop-blur-[24px] border border-white/[0.08] rounded-[32px] p-10 md:p-16 text-center overflow-hidden transition-all duration-500 hover:border-[#00E5FF]/40 hover:shadow-[0_20px_60px_-15px_rgba(0,229,255,0.2)]"
        >
          {/* Hover Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/5 group-hover:to-transparent transition-colors duration-500"></div>
          
          {/* Top Edge Highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Floating Animation Container */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00E5FF] transition-all duration-500">
                Shaikh Zeeshan
              </h3>
              
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 mb-8 shadow-[0_0_15px_rgba(0,229,255,0.15)] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-shadow duration-500">
                <span className="text-[#00E5FF] text-sm font-bold tracking-widest uppercase">
                  Founder & CEO
                </span>
              </div>
            </motion.div>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              "Shaikh Zeeshan is the Founder & CEO of SwiftOps Automation, focused on building intelligent AI-driven automation solutions that help businesses streamline operations, improve efficiency, and scale through modern cloud and AI technologies."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
