import { motion } from 'framer-motion'
import { Bot, Workflow, Zap } from 'lucide-react'

// --- Section 2: How SwiftOps Works ---
const workflowSteps = [
  {
    icon: Bot,
    title: "AI Analysis",
    description: "We analyze your business processes to identify automation opportunities."
  },
  {
    icon: Workflow,
    title: "System Design",
    description: "Custom AI agents and workflows are designed for your specific needs."
  },
  {
    icon: Zap,
    title: "Deployment",
    description: "Seamless integration and launch with 24/7 monitoring and support."
  }
]

export function WorkflowSection() {
  return (
    <section id="automation" className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            How SwiftOps Works
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute pointer-events-none top-1/2 left-[10%] right-[10%] h-px bg-white/10 -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent origin-left shadow-[0_0_10px_#00E5FF]"
            />
            {/* Traveling Particle */}
            <motion.div
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#00E5FF,0_0_30px_#00E5FF]"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10"
          >
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={{ 
                  hidden: { opacity: 0, y: 30, scale: 0.98 }, 
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } 
                }}
                className="bg-[#0a121e]/80 backdrop-blur-lg border border-[#00E5FF]/30 rounded-2xl p-6 md:p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group smooth-transition"
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="relative mx-auto w-14 h-14 md:w-16 md:h-16 mb-5 md:mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 pointer-events-none bg-[#00E5FF]/10 rounded-xl border border-[#00E5FF]/40 transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <step.icon className="w-7 h-7 md:w-8 md:h-8 text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] relative z-10" />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
