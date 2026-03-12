import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Menu, X, ArrowRight, Bot, Zap, Workflow } from 'lucide-react'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ServicesSection } from './components/ServicesSection'
import { FounderSection } from './components/FounderSection'
import { ContactSection } from './components/ContactSection'
import { NeonButton } from './components/ui/NeonButton'
import { GlobalLogoAnimation } from './components/ui/GlobalLogoAnimation'
import { TestimonialsSection } from './components/TestimonialsSection'
import SplashCursor from './components/ui/SplashCursor'
import { GlowTrail } from './components/ui/GlowTrail'

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

function StatsSection() {
  return (
    <section className="relative w-full py-24 bg-[#020617] overflow-hidden">
      {/* Moving Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-30">
        <motion.div 
          animate={{ y: [0, 40] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Trusted Automation Platform
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="relative bg-[#0a121e]/60 backdrop-blur-xl border border-[#00E5FF]/20 rounded-2xl p-8 text-center overflow-hidden group"
            >
              {/* Subtle glow behind numbers */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-[40px] group-hover:bg-[#00E5FF]/20 transition-colors duration-500"></div>
              
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-slate-400 text-sm font-medium tracking-widest uppercase mt-4 relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

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

function WorkflowSection() {
  return (
    <section id="workflow" className="relative w-full py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            How SwiftOps Works
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-white/10 -translate-y-1/2 z-0">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          >
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={{ 
                  hidden: { opacity: 0, y: 30, scale: 0.98 }, 
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } 
                }}
                className="bg-[#0a121e]/80 backdrop-blur-xl border border-[#00E5FF]/30 rounded-2xl p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group smooth-transition"
                style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
              >
                {/* Pulse when appearing */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: [0, 0.3, 0], scale: [0.8, 1.1, 1.2] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.2), duration: 0.8 }}
                  className="absolute inset-0 bg-[#00E5FF]/20 rounded-2xl blur-xl pointer-events-none"
                />

                <div className="relative mx-auto w-16 h-16 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#00E5FF]/10 rounded-xl border border-[#00E5FF]/40 transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <motion.div
                    initial={{ rotate: -15 }}
                    whileInView={{ rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.4) }}
                  >
                    <step.icon className="w-8 h-8 text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// --- Section 1: Full Screen CTA ---
function CTASection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#020617] via-[#031A2E] to-[#042C3A]">
      {/* Animated Particle Field - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Desktop particles */}
        <div className="hidden md:block">
          {[...Array(30)].map((_, i) => (
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
        {/* Mobile particles (reduced count) */}
        <div className="md:hidden">
          {[...Array(10)].map((_, i) => (
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

      {/* Neural Network Lines (Faint) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
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
          className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tight drop-shadow-[0_0_20px_rgba(0,229,255,0.2)]"
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
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </NeonButton>
        </motion.div>
      </div>
    </section>
  )
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Automation', href: '#workflow' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section
      const sections = ['home', 'services', 'workflow', 'about', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
      
      if (targetId === 'contact') {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.classList.add('ring-2', 'ring-[#00ffff]', 'ring-offset-4', 'ring-offset-black', 'transition-all', 'duration-500')
          setTimeout(() => {
            contactSection.classList.remove('ring-2', 'ring-[#00ffff]', 'ring-offset-4', 'ring-offset-black')
          }, 1500)
        }
      }
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,10,30,0.8)] backdrop-blur-[12px] border-b border-[rgba(0,255,255,0.4)] shadow-[0_0_30px_rgba(0,255,255,0.4)]'
          : 'bg-[rgba(5,10,30,0.4)] backdrop-blur-[8px] border-b border-[rgba(0,255,255,0.2)] shadow-[0_0_15px_rgba(0,255,255,0.2)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        {/* Logo */}
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-3 group z-10">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.6)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.9)] transition-shadow duration-300 border border-[rgba(0,255,255,0.3)]">
            <img src="/images/swiftops-logo.jpeg" alt="SwiftOps Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-[#00ffff] font-bold tracking-[0.15em] text-base uppercase leading-tight drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
              style={{ fontSize: "20px" }}>SwiftOps</span>
            <span
              className="text-white/90 font-medium tracking-[0.2em] text-[10px] uppercase leading-tight"
              style={{ fontSize: "12px" }}>Automation</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
              className={`relative transition-all duration-300 text-[13px] font-semibold tracking-[0.1em] uppercase group py-2 ${
                activeSection === link.href.replace('#', '') 
                  ? 'text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]' 
                  : 'text-white/70 hover:text-[#00ffff] hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]'
              }`}
            >
              {link.name}
              {/* Animated Underline */}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-[#00ffff] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.9)] ${
                activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block z-10">
          <motion.a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider overflow-hidden rounded-full group bg-gradient-to-r from-[rgba(0,255,255,0.1)] to-[rgba(0,150,255,0.1)] border border-[rgba(0,255,255,0.5)] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:border-[#00ffff] transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00ffff] to-[#0088ff] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">Get Started</span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-[rgba(0,255,255,0.3)] bg-[rgba(0,255,255,0.05)] text-[#00ffff] hover:bg-[rgba(0,255,255,0.1)] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300 z-[10000]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]" /> : <Menu className="w-6 h-6 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-[rgba(5,10,30,0.95)] backdrop-blur-[15px] border-b border-[rgba(0,255,255,0.3)] shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,255,255,0.2)] md:hidden flex flex-col overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 text-sm font-bold tracking-[0.15em] uppercase ${
                    activeSection === link.href.replace('#', '') 
                      ? 'bg-[rgba(0,255,255,0.1)] text-[#00ffff] border-l-2 border-[#00ffff] shadow-[inset_10px_0_20px_-10px_rgba(0,255,255,0.3)]' 
                      : 'text-white/70 hover:bg-[rgba(0,255,255,0.05)] hover:text-[#00ffff] border-l-2 border-transparent hover:border-[rgba(0,255,255,0.5)]'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 px-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="flex items-center justify-center w-full py-3.5 text-sm font-bold text-white uppercase tracking-wider rounded-lg bg-gradient-to-r from-[rgba(0,255,255,0.2)] to-[rgba(0,150,255,0.2)] border border-[rgba(0,255,255,0.5)] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:border-[#00ffff] transition-all duration-300"
                >
                  <span className="drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">Get Started</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoadingComplete = () => {
      setIsLoading(false);
    };

    // Check if loader is already gone
    if (!document.getElementById('initial-loader')) {
      setIsLoading(false);
    } else {
      window.addEventListener('initial-loading-complete', handleLoadingComplete);
    }

    return () => {
      window.removeEventListener('initial-loading-complete', handleLoadingComplete);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="bg-black text-white min-h-screen"
        style={{ 
          visibility: isLoading ? 'hidden' : 'visible',
          height: isLoading ? '100vh' : 'auto',
          overflow: isLoading ? 'hidden' : 'visible'
        }}
      >
        <Navbar />

        <HeroSection />
        <AboutSection />
        <StatsSection />
        <WorkflowSection />
        <ServicesSection />
        <TestimonialsSection />
        <FounderSection />
        <CTASection />
        <ContactSection />

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Brand */}
            <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_0_8px_rgba(0,229,255,0.5)] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-shadow duration-300">
                <img src="/images/swiftops-logo.jpeg" alt="SwiftOps Logo" className="w-full h-full object-contain" loading="lazy" />
              </div>
              <span className="text-neutral-400 text-sm font-medium group-hover:text-[#00E5FF] transition-colors duration-300">SwiftOps Automation</span>
            </a>

            {/* Links */}
            <div className="flex items-center gap-6 text-neutral-600 text-xs">
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-neutral-400 transition-colors">Services</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-neutral-400 transition-colors">Contact</a>
              <a href="https://automateze.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">automateze.com</a>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.8)]"></div>
              <span className="text-neutral-600 text-xs">All Systems Online</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/3 text-center">
            <p className="text-neutral-700 text-xs">
              © {new Date().getFullYear()} SwiftOps Automation · Built by Shaikh Zeeshan
            </p>
          </div>
        </div>
      </footer>
      <GlobalLogoAnimation />
    </motion.div>
    <SplashCursor
      SIM_RESOLUTION={128}
      DYE_RESOLUTION={1440}
      DENSITY_DISSIPATION={3.5}
      VELOCITY_DISSIPATION={2}
      PRESSURE={0.1}
      CURL={3}
      SPLAT_RADIUS={0.2}
      SPLAT_FORCE={6000}
      COLOR_UPDATE_SPEED={10}
    />
    <GlowTrail />
    </>
  )
}

export default App
