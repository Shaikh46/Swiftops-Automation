import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MessageSquare, Mail, Workflow, Globe, Smartphone, CheckCircle2, X } from 'lucide-react'

// --- Custom Animations for Cards & Modal ---

const AIAgentsAnimation = ({ isHovered = false }: { isHovered?: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center perspective-1000">
    {/* Particle field */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00E5FF]/40 rounded-full"
          animate={{
            y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: (isHovered ? 1.5 : 3) + Math.random() * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
    
    {/* Neural Sphere */}
    <motion.div
      animate={{ rotateY: 360, rotateX: 360 }}
      transition={{ duration: isHovered ? 10 : 20, repeat: Infinity, ease: "linear" }}
      className="relative w-24 h-24 sm:w-32 sm:h-32 transform-style-3d"
    >
      {/* Core */}
      <div className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 bg-[#00E5FF] rounded-full blur-[20px] opacity-50 animate-pulse"></div>
      <div className="absolute inset-0 m-auto w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-[0_0_30px_#00E5FF]"></div>
      
      {/* Orbits & Nodes */}
      {[0, 1, 2].map((orbit) => (
        <div key={orbit} className="absolute inset-0 border border-[#00E5FF]/30 rounded-full" style={{ transform: `rotateX(${orbit * 60}deg) rotateY(${orbit * 60}deg)` }}>
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: (isHovered ? 2 : 4) + orbit, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 sm:w-3 sm:h-3 -ml-1 -mt-1 sm:-ml-1.5 sm:-mt-1.5 bg-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]"></div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  </div>
)

const AIChatbotsAnimation = ({ isHovered = false }: { isHovered?: boolean }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[240px] sm:max-w-sm bg-[#0a121e]/80 backdrop-blur-md border border-[#00E5FF]/20 rounded-2xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 shadow-[0_10px_30px_rgba(0,229,255,0.1)]"
    >
      {/* User Message */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="self-end bg-white/10 rounded-2xl rounded-tr-sm p-2 sm:p-3 max-w-[80%]"
      >
        <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-white/40 rounded mb-1.5 sm:mb-2"></div>
        <div className="w-10 sm:w-16 h-1.5 sm:h-2 bg-white/40 rounded"></div>
      </motion.div>
      
      {/* Typing Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 0.5, duration: isHovered ? 1 : 1.5, times: [0, 0.2, 1], repeat: Infinity, repeatDelay: 2 }}
        className="self-start bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-2xl rounded-tl-sm p-2 sm:p-3 flex gap-1"
      >
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#00E5FF] rounded-full" />
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#00E5FF] rounded-full" />
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#00E5FF] rounded-full" />
      </motion.div>
      
      {/* AI Response */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="self-start bg-gradient-to-r from-[#00E5FF]/20 to-[#007BFF]/20 border border-[#00E5FF]/30 rounded-2xl rounded-tl-sm p-2 sm:p-3 max-w-[80%] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
      >
        <div className="w-20 sm:w-32 h-1.5 sm:h-2 bg-[#00E5FF]/80 rounded mb-1.5 sm:mb-2"></div>
        <div className="w-24 sm:w-40 h-1.5 sm:h-2 bg-[#00E5FF]/80 rounded mb-1.5 sm:mb-2"></div>
        <div className="w-12 sm:w-20 h-1.5 sm:h-2 bg-[#00E5FF]/80 rounded"></div>
      </motion.div>
    </motion.div>
  </div>
)

const EmailAutomationAnimation = ({ isHovered = false }: { isHovered?: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Pipeline */}
    <div className="absolute w-3/4 h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: isHovered ? 1 : 2, repeat: Infinity, ease: "linear" }}
        className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
      />
    </div>
    
    {/* Nodes */}
    <div className="absolute w-3/4 flex justify-between items-center">
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 0px #00E5FF", "0 0 20px #00E5FF", "0 0 0px #00E5FF"] }}
            transition={{ duration: isHovered ? 1 : 2, repeat: Infinity, delay: i * (isHovered ? 0.3 : 0.6) }}
            className="w-4 h-4 sm:w-6 sm:h-6 bg-[#0a121e] border-2 border-[#00E5FF] rounded-full z-10 relative"
          />
        </div>
      ))}
    </div>
    
    {/* Envelopes */}
    {[0, 1].map((i) => (
      <motion.div
        key={i}
        initial={{ left: "12.5%", opacity: 0 }}
        animate={{ left: "87.5%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: isHovered ? 1.5 : 3, repeat: Infinity, delay: i * (isHovered ? 0.75 : 1.5), ease: "linear" }}
        className="absolute top-1/2 -translate-y-1/2 -mt-4 sm:-mt-6 w-6 h-4 sm:w-8 sm:h-6 bg-gradient-to-br from-[#00E5FF] to-[#007BFF] rounded shadow-[0_0_15px_#00E5FF] flex items-center justify-center"
      >
        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
      </motion.div>
    ))}
  </div>
)

const WorkflowAutomationAnimation = ({ isHovered = false }: { isHovered?: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: isHovered ? 10 : 20, repeat: Infinity, ease: "linear" }} className="relative w-32 h-32 sm:w-48 sm:h-48">
      {/* Center */}
      <div className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 bg-[#00E5FF]/20 border border-[#00E5FF]/50 rounded-xl flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(0,229,255,0.3)] z-20">
        <Workflow className="w-6 h-6 sm:w-8 sm:h-8 text-[#00E5FF]" />
      </div>
      
      {/* Orbiting Nodes */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 90}deg)` }}>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: isHovered ? 10 : 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/2 -ml-4 sm:-ml-5 w-8 h-8 sm:w-10 sm:h-10 bg-[#0a121e] border border-[#007BFF]/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,123,255,0.2)]"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#00E5FF] rounded-full animate-pulse" />
          </motion.div>
          {/* Connecting Line */}
          <div className="absolute top-8 sm:top-10 left-1/2 w-px h-10 sm:h-14 bg-gradient-to-b from-[#007BFF]/50 to-[#00E5FF]/50 -ml-[0.5px]">
            <motion.div
              animate={{ y: [0, 40] }}
              transition={{ duration: isHovered ? 0.75 : 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="w-full h-3 sm:h-4 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
            />
          </div>
        </div>
      ))}
    </motion.div>
  </div>
)

const WebsiteDevelopmentAnimation = ({ isHovered = false }: { isHovered?: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center perspective-1000">
    <motion.div
      initial={{ rotateX: 20, y: 20, opacity: 0 }}
      animate={{ rotateX: 0, y: 0, opacity: 1 }}
      transition={{ duration: 1, type: "spring" }}
      className="w-48 h-32 sm:w-64 sm:h-40 bg-[#0a121e]/80 backdrop-blur-md border border-[#00E5FF]/30 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,229,255,0.15)] flex flex-col"
    >
      {/* Browser Header */}
      <div className="h-4 sm:h-5 bg-white/5 border-b border-white/10 flex items-center px-2 gap-1 sm:gap-1.5">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/80"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/80"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/80"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3">
        {/* Hero */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full h-8 sm:h-12 bg-gradient-to-r from-[#00E5FF]/20 to-[#007BFF]/20 rounded origin-left border border-[#00E5FF]/20"
        />
        
        {/* Grid */}
        <div className="flex gap-2 sm:gap-3 flex-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-1/3 h-full bg-white/5 rounded origin-top"
          />
          <div className="w-2/3 flex flex-col gap-1.5 sm:gap-2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="w-full h-2 sm:h-3 bg-white/10 rounded" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="w-3/4 h-2 sm:h-3 bg-white/10 rounded" />
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1, boxShadow: isHovered ? "0 0 15px rgba(0,229,255,0.6)" : "0 0 10px rgba(0,229,255,0.3)" }} 
              transition={{ delay: 1 }} 
              className="w-1/2 h-2 sm:h-3 bg-[#00E5FF]/40 rounded" 
            />
          </div>
        </div>
      </div>
      
      {/* Cursor */}
      <motion.div
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 30, y: 15, opacity: 1 }}
        transition={{ delay: 1.2, duration: isHovered ? 0.5 : 1 }}
        className="absolute w-3 h-3 sm:w-4 sm:h-4 z-20"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>
  </div>
)

const AppDevelopmentAnimation = ({ isHovered = false }: { isHovered?: boolean }) => (
  <div className="relative w-full h-full flex items-center justify-center perspective-1000">
    <motion.div
      animate={{ y: [-5, 5, -5], rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
      transition={{ duration: isHovered ? 3 : 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-24 h-44 sm:w-32 sm:h-56 bg-black border-[3px] sm:border-[4px] border-white/20 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,229,255,0.2)] overflow-hidden flex flex-col"
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-3 sm:h-4 bg-white/20 rounded-b-lg sm:rounded-b-xl z-20"></div>
      
      {/* Screen */}
      <div className="flex-1 bg-gradient-to-b from-[#0a121e] to-black p-2 sm:p-3 pt-6 sm:pt-8 flex flex-col gap-2 sm:gap-3 relative">
        {/* Light Sweep */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: isHovered ? 1.5 : 3, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent -skew-y-12 z-10 pointer-events-none"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full aspect-square bg-gradient-to-br from-[#00E5FF] to-[#007BFF] rounded-lg sm:rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)]"
        />
        
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="w-full aspect-square bg-white/10 rounded-md sm:rounded-lg"
            />
          ))}
        </div>
      </div>
    </motion.div>
  </div>
)

// --- Services Data ---

const services = [
  {
    title: 'AI Agents',
    description: 'Autonomous AI systems that perform tasks, analyze data, and execute workflows without constant human input.',
    features: [
      'Intelligent workflow agents',
      'Automated decision systems',
      'Data processing automation',
      'Cross-platform task execution'
    ],
    icon: Bot,
    Animation: AIAgentsAnimation
  },
  {
    title: 'AI Chatbots',
    description: 'Conversational AI assistants designed to engage visitors, capture leads, and provide instant support.',
    features: [
      'Website AI chat assistants',
      'Customer support automation',
      'Lead qualification bots',
      'Multi-platform messaging'
    ],
    icon: MessageSquare,
    Animation: AIChatbotsAnimation
  },
  {
    title: 'Email Automation',
    description: 'AI-driven email systems that manage campaigns, follow-ups, and customer nurturing automatically.',
    features: [
      'Automated outreach campaigns',
      'Smart follow-up sequences',
      'Lead nurturing workflows',
      'CRM email integration'
    ],
    icon: Mail,
    Animation: EmailAutomationAnimation
  },
  {
    title: 'Workflow Automation',
    description: 'Smart integrations that connect tools and automate business processes across your entire system.',
    features: [
      'Cross-platform integrations',
      'Automated business operations',
      'Data synchronization pipelines',
      'Task automation workflows'
    ],
    icon: Workflow,
    Animation: WorkflowAutomationAnimation
  },
  {
    title: 'Website Development',
    description: 'High-performance websites engineered for speed, scalability, and conversion.',
    features: [
      'AI-powered landing pages',
      'Conversion-optimized design',
      'SEO-ready architecture',
      'Scalable web systems'
    ],
    icon: Globe,
    Animation: WebsiteDevelopmentAnimation
  },
  {
    title: 'App Development',
    description: 'Custom mobile and web applications built with modern frameworks and AI integrations.',
    features: [
      'Mobile application development',
      'SaaS platform development',
      'AI-powered applications',
      'Backend and API systems'
    ],
    icon: Smartphone,
    Animation: AppDevelopmentAnimation
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

const panelVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  }
}

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedService])

  return (
    <section id="services" className="relative w-full py-20 md:py-32 bg-gradient-to-b from-black to-[#020617] overflow-hidden">
      {/* Futuristic AI Grid Background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-60"></div>
      
      {/* Ambient Neon Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#007BFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-24 text-center max-w-3xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-[#00E5FF]/10 blur-[60px] rounded-full pointer-events-none hidden md:block"></div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-2 hover:drop-shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300"
          >
            Our Services
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto mt-6 mb-6 origin-center shadow-[0_0_10px_rgba(0,229,255,0.5)]"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-lg md:text-xl tracking-wide font-medium"
          >
            Intelligent Systems
          </motion.p>
        </div>

        {/* Large Vertical Panels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={panelVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              onClick={() => setSelectedService(service)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedService(service);
                }
              }}
              tabIndex={0}
              role="button"
              className="group relative bg-[rgba(10,18,30,0.65)] backdrop-blur-lg border border-white/[0.08] rounded-2xl sm:rounded-[26px] p-5 sm:p-6 lg:p-8 overflow-hidden transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,229,255,0.15)] hover:border-[#00E5FF]/50 flex flex-col h-full transform-gpu cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Light Sweep Animation on Hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 pointer-events-none z-20"></div>
              
              {/* Ambient Glow inside panel */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-[80px] group-hover:bg-[#00E5FF]/15 transition-colors duration-700 pointer-events-none"></div>

              {/* Animation Area */}
              <div className="w-full h-40 sm:h-48 md:h-56 mb-6 sm:mb-8 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-[#00E5FF]/30 transition-colors duration-500 shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05),transparent_70%)] group-hover:bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.1),transparent_70%)] transition-colors duration-500"></div>
                <service.Animation isHovered={hoveredIndex === index} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <service.icon className="w-6 h-6 text-[#00E5FF] group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-all duration-300" strokeWidth={1.5} />
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight group-hover:text-[#00E5FF] transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00E5FF]/20 transition-colors duration-300">
                          <CheckCircle2 className="w-3 h-3 text-[#00E5FF]" />
                        </div>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Premium Animated Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[rgba(10,18,30,0.85)] backdrop-blur-lg border border-[#00E5FF]/30 rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_0_80px_rgba(0,229,255,0.15)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Neon Border */}
              <div className="absolute inset-0 rounded-[28px] shadow-[0_0_50px_rgba(0,229,255,0.2)_inset,0_0_50px_rgba(0,229,255,0.2)] pointer-events-none opacity-50"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/50 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <X className="w-5 h-5 text-white/60 group-hover:text-[#00E5FF] transition-colors" />
              </button>

              {/* Animation Area */}
              <div className="w-full h-48 sm:h-64 md:h-96 bg-gradient-to-b from-black/60 to-transparent border-b border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.15),transparent_70%)]"></div>
                <selectedService.Animation isHovered={true} />
              </div>

              {/* Content Area */}
              <div className="p-5 sm:p-8 md:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5FF]/10 to-[#007BFF]/10 border border-[#00E5FF]/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                      <selectedService.icon className="w-6 h-6 text-[#00E5FF]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    {selectedService.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
