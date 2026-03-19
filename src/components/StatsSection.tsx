import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// --- Section 3: Trusted Automation Platform (Counters) ---
const stats = [
  { value: 500, suffix: '+', label: 'Tasks Automated' },
  { value: 10000, suffix: 'h+', label: 'Time Saved' },
  { value: 50, suffix: '+', label: 'Businesses Supported' },
]

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const [count, setCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return;

    let startTime: number
    const duration = 1800 // 1.8 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setCount(Math.floor(easeOut * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsFinished(true)
      }
    }

    requestAnimationFrame(animate)
  }, [value, isInView])

  return (
    <div ref={ref} className="relative inline-block">
      <span className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00E5FF] relative z-10">
        {count}{suffix}
      </span>
      {/* Pulse effect when finished */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-[#00E5FF] blur-[20px] rounded-full z-0"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="relative w-full py-20 md:py-24 bg-[#020617] overflow-hidden">
      {/* Moving Grid Pattern — CSS-only, no framer-motion */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-30">
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Trusted Automation Platform
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="relative bg-[#0a121e]/60 backdrop-blur-lg border border-[#00E5FF]/20 rounded-2xl p-6 md:p-8 text-center overflow-hidden group"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Subtle glow behind numbers */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-[40px] group-hover:bg-[#00E5FF]/20 transition-colors duration-500"></div>
              
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-slate-400 text-xs sm:text-sm font-medium tracking-widest uppercase mt-4 relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
