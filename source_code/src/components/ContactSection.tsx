import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, Instagram, Mail, Send, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a5 5 0 0 0 5 5h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a7 7 0 0 1-7-7v-1a1 1 0 0 1 1-1z" />
  </svg>
)

const contactCards = [
  {
    id: 'name',
    label: 'Name',
    value: 'Shaikh Zeeshan',
    icon: User,
    tag: 'Founder & CEO',
    href: null,
    hoverColor: 'group-hover:text-[#00f0ff]',
    glowColor: 'group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]',
    containerGlow: 'group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+91 76664 26388',
    icon: Phone,
    href: 'tel:+917666426388',
    hoverColor: 'group-hover:text-[#00f0ff]',
    glowColor: 'group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]',
    containerGlow: 'group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+91 99607 51076',
    icon: WhatsAppIcon,
    href: 'https://wa.me/919960751076',
    external: true,
    hoverColor: 'group-hover:text-[#00FFA3]',
    glowColor: 'group-hover:drop-shadow-[0_0_15px_rgba(0,255,163,0.8)]',
    containerGlow: 'group-hover:shadow-[0_0_20px_rgba(0,255,163,0.2)]',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: 'SwiftOps__Automation06',
    icon: Instagram,
    href: 'https://www.instagram.com/swiftops__automation06/',
    external: true,
    hoverColor: 'group-hover:text-[#c300ff]',
    glowColor: 'group-hover:drop-shadow-[0_0_15px_rgba(195,0,255,0.8)]',
    containerGlow: 'group-hover:shadow-[0_0_20px_rgba(195,0,255,0.2)]',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'zeeshan.automation06@gmail.com',
    icon: Mail,
    href: 'mailto:zeeshan.automation06@gmail.com',
    hoverColor: 'group-hover:text-[#00f0ff]',
    glowColor: 'group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]',
    containerGlow: 'group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  }
}

export function ContactSection() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 bg-gradient-to-b from-black to-[#020617] overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#c300ff]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
          >
            Get in <span className="text-[#00f0ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Touch</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-slate-400 text-lg md:text-xl font-medium"
          >
            Let's build intelligent automation for your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 contact-grid-highlight-target rounded-[20px] transition-all duration-500"
          >
            {contactCards.map((card) => {
              const CardWrapper = card.href ? motion.a : motion.div;
              const wrapperProps = card.href ? {
                href: card.href,
                target: card.external ? "_blank" : undefined,
                rel: card.external ? "noopener noreferrer" : undefined,
              } : {};

              return (
                <CardWrapper
                  key={card.id}
                  {...wrapperProps}
                  variants={cardVariants}
                  className={`
                    group relative flex flex-col p-6 rounded-2xl
                    bg-white/[0.02] border border-white/5 backdrop-blur-sm
                    transition-all duration-500 ease-out
                    hover:-translate-y-1 hover:bg-white/[0.04] hover:border-white/10
                    ${card.containerGlow}
                    ${card.id === 'email' ? 'sm:col-span-2' : ''}
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`
                      p-3 rounded-xl bg-white/5 text-slate-400
                      transition-all duration-500
                      ${card.hoverColor} ${card.glowColor}
                    `}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    {card.tag && (
                      <span className="px-3 py-1 text-xs font-bold tracking-wider text-[#00f0ff] bg-[#00f0ff]/10 rounded-full border border-[#00f0ff]/20">
                        {card.tag}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
                    <p className="text-lg font-semibold text-white tracking-wide">{card.value}</p>
                  </div>

                  {/* Hover Gradient Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-b-2xl"></div>
                </CardWrapper>
              );
            })}
          </motion.div>

          {/* AI-like Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#0a121e]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    {['Name', 'Email', 'Company'].map((field) => (
                      <div key={field} className="relative group">
                        <input
                          type={field === 'Email' ? 'email' : 'text'}
                          placeholder={field}
                          required
                          onFocus={() => setFocusedField(field)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:bg-white/10 transition-all duration-300 min-h-[56px]"
                        />
                        {/* AI Focus Glow Underline */}
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#c300ff] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${focusedField === field ? 'w-full shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'w-0'}`} />
                        
                        {/* Subtle Particle Burst on Focus */}
                        {focusedField === field && (
                          <motion.div 
                            initial={{ opacity: 1, scale: 0 }}
                            animate={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.6 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#00f0ff]/20 rounded-full blur-md pointer-events-none"
                          />
                        )}
                      </div>
                    ))}
                    
                    <div className="relative group">
                      <textarea
                        placeholder="How can we help automate your business?"
                        rows={4}
                        required
                        onFocus={() => setFocusedField('Message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:bg-white/10 transition-all duration-300 resize-none"
                      />
                      <div className={`absolute bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#c300ff] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${focusedField === 'Message' ? 'w-full shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'w-0'}`} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] transition-all duration-300 hover:bg-[#00f0ff]/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] min-h-[56px] overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-[#00f0ff] border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                    {/* Hover sweep */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-[#00f0ff]/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,240,255,0.4)]"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#00f0ff]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">We'll get back to you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
