import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Menu, X, ArrowRight, Bot, Zap, Workflow } from 'lucide-react'
import { HeroSection } from './components/HeroSection'
import { NeonButton } from './components/ui/NeonButton'

// PERF: Lazy load GPU-intensive cursor effects — defer until after page is interactive
const SplashCursor = lazy(() => import('./components/ui/SplashCursor'))
const GlowTrail = lazy(() => import('./components/ui/GlowTrail').then(m => ({ default: m.GlowTrail })))

// PERF: Lazy load below-fold sections
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })))
const ServicesSection = lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })))
const PricingSection = lazy(() => import('./components/PricingSection').then(m => ({ default: m.PricingSection })))
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })))
const FounderSection = lazy(() => import('./components/FounderSection').then(m => ({ default: m.FounderSection })))
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })))

const StatsSection = lazy(() => import('./components/StatsSection').then(m => ({ default: m.StatsSection })))
const WorkflowSection = lazy(() => import('./components/WorkflowSection').then(m => ({ default: m.WorkflowSection })))
const CTASection = lazy(() => import('./components/CTASection').then(m => ({ default: m.CTASection })))

// Minimal loading fallback for lazy sections
const SectionFallback = () => (
  <div className="w-full min-h-[40vh] flex items-center justify-center bg-transparent">
    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// PERF: True Lazy Loading wrapper. Fetch chunks only when scrolled into view.
function LazySection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0, margin: "400px 0px" });
  return <div ref={ref}>{isInView ? children : <SectionFallback />}</div>;
}

// PERF: Delayed wrapper for heavy WebGL/Mouse interactions to unblock initial load
function InteractiveOnly({ children }: { children: React.ReactNode }) {
  const [interacted, setInteracted] = useState(false);
  useEffect(() => {
    const enable = () => setInteracted(true);
    window.addEventListener('scroll', enable, { once: true, passive: true });
    window.addEventListener('mousemove', enable, { once: true, passive: true });
    window.addEventListener('touchstart', enable, { once: true, passive: true });
    const timer = setTimeout(enable, 6000);
    return () => {
      window.removeEventListener('scroll', enable);
      window.removeEventListener('mousemove', enable);
      window.removeEventListener('touchstart', enable);
      clearTimeout(timer);
    };
  }, []);
  if (!interacted) return null;
  return <>{children}</>;
}

// Sections moved to lazy imports

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // PERF: Throttled scroll handler — rAF prevents redundant calls during same frame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          const sections = ['home', 'services', 'automation', 'pricing', 'about', 'contact']
          const current = sections.find(section => {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              return rect.top <= 150 && rect.bottom >= 150
            }
            return false
          })
          if (current) setActiveSection(current)
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Automation', id: 'automation' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
      
      // Add highlight ring on contact section
      if (id === 'contact') {
        element.classList.add('ring-2', 'ring-[#00ffff]', 'ring-offset-4', 'ring-offset-black', 'transition-all', 'duration-500');
        setTimeout(() => element.classList.remove('ring-2', 'ring-[#00ffff]', 'ring-offset-4', 'ring-offset-black'), 1500);
      }
      
      setMobileOpen(false);
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(5,10,30,0.85)] backdrop-blur-xl border-b border-[rgba(0,255,255,0.4)] shadow-[0_0_30px_rgba(0,255,255,0.15)]'
            : 'bg-[rgba(5,10,30,0.4)] backdrop-blur-md border-b border-[rgba(0,255,255,0.15)] shadow-[0_0_10px_rgba(0,255,255,0.05)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-20 flex items-center justify-between relative">
          {/* Logo — fluid sizing from 320px up */}
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 group z-10 shrink-0 outline-none">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.6)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.9)] transition-shadow duration-300 border border-[rgba(0,255,255,0.3)]">
              <img src="/images/swiftops-logo.jpeg" alt="SwiftOps Logo" width="40" height="40" fetchPriority="high" decoding="async" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#00ffff] font-bold tracking-[0.08em] sm:tracking-[0.1em] lg:tracking-[0.15em] text-[13px] sm:text-sm lg:text-base uppercase leading-tight drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
                SwiftOps
              </span>
              <span className="text-white/80 font-medium tracking-[0.12em] sm:tracking-[0.15em] lg:tracking-[0.2em] text-[8px] sm:text-[9px] lg:text-[11px] uppercase leading-tight">
                Automation
              </span>
            </div>
          </button>

          {/* Desktop nav — centered links (hidden below lg) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + (i * 0.08) }}
                className={`relative transition-all duration-300 text-[12px] xl:text-[13px] font-semibold tracking-[0.1em] uppercase group py-2 whitespace-nowrap outline-none cursor-pointer ${
                  activeSection === link.id
                    ? 'text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]' 
                    : 'text-white/60 hover:text-[#00ffff] hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#00ffff] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.9)] ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA (hidden below lg) */}
          <div className="hidden lg:block z-10">
           <motion.button
              onClick={() => scrollToSection('contact')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-5 xl:px-6 py-2 xl:py-2.5 text-xs xl:text-sm font-bold text-white uppercase tracking-wider overflow-hidden rounded-full group bg-gradient-to-r from-[rgba(0,255,255,0.1)] to-[rgba(0,150,255,0.1)] border border-[rgba(0,255,255,0.5)] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:border-[#00ffff] transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00ffff] to-[#0088ff] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">Get Started</span>
            </motion.button>
          </div>

          {/* Hamburger — visible below lg */}
          <button
            className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl border border-[rgba(0,255,255,0.3)] bg-[rgba(0,255,255,0.05)] text-[#00ffff] active:bg-[rgba(0,255,255,0.15)] active:scale-95 transition-all duration-200 z-[10000] touch-manipulation"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu Overlay — below lg */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[rgba(2,6,23,0.97)] backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col justify-center items-center h-full px-6 sm:px-10 safe-bottom"
            >
              {/* Nav Links — staggered entry */}
              <nav className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-sm">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.1 + (i * 0.06), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full text-center py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold tracking-[0.15em] uppercase transition-all duration-300 min-h-[56px] flex items-center justify-center outline-none cursor-pointer touch-manipulation ${
                      activeSection === link.id
                        ? 'bg-[rgba(0,255,255,0.12)] text-[#00ffff] border border-[rgba(0,255,255,0.3)] shadow-[0_0_25px_rgba(0,255,255,0.15)]' 
                        : 'text-white/60 hover:text-white active:bg-[rgba(0,255,255,0.08)] active:text-[#00ffff] border border-transparent'
                    }`}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeNavDot"
                        className="w-1.5 h-1.5 bg-[#00ffff] rounded-full ml-3 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 sm:mt-10 w-full max-w-sm"
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center w-full py-4 sm:py-5 text-sm sm:text-base font-bold text-white uppercase tracking-[0.15em] rounded-2xl bg-gradient-to-r from-[rgba(0,255,255,0.15)] to-[rgba(0,100,255,0.15)] border border-[rgba(0,255,255,0.5)] shadow-[0_0_20px_rgba(0,255,255,0.2)] active:shadow-[0_0_30px_rgba(0,255,255,0.5)] active:scale-[0.98] transition-all duration-300 min-h-[56px] touch-manipulation outline-none cursor-pointer"
                >
                  <span className="drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">Get Started</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </button>
              </motion.div>

              {/* Bottom branding */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 sm:mt-14 text-white/20 text-[10px] sm:text-xs tracking-[0.2em] uppercase"
              >
                SwiftOps Automation
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-black text-white min-h-screen"
        style={{ 
          visibility: 'visible',
          height: 'auto',
          overflow: 'visible'
        }}
      >
        <Navbar />

        <HeroSection />
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <StatsSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <WorkflowSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <PricingSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <FounderSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <CTASection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </LazySection>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-8 md:py-10 safe-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5">
            {/* Brand */}
            <button onClick={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'instant', block: 'start' }); }} className="flex items-center gap-3 group outline-none cursor-pointer bg-transparent border-none p-0">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_0_8px_rgba(0,229,255,0.5)] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-shadow duration-300">
                <img src="/images/swiftops-logo.jpeg" alt="SwiftOps Logo" width="32" height="32" decoding="async" className="w-full h-full object-contain" loading="lazy" />
              </div>
              <span className="text-neutral-400 text-sm font-medium group-hover:text-[#00E5FF] transition-colors duration-300">SwiftOps Automation</span>
            </button>

            {/* Links */}
            <div className="flex items-center gap-4 md:gap-6 text-neutral-600 text-xs">
              <button onClick={() => { document.getElementById('services')?.scrollIntoView({ behavior: 'instant', block: 'start' }); }} className="hover:text-neutral-400 transition-colors min-h-[44px] flex items-center outline-none cursor-pointer bg-transparent border-none p-0">Services</button>
              <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' }); }} className="hover:text-neutral-400 transition-colors min-h-[44px] flex items-center outline-none cursor-pointer bg-transparent border-none p-0">Contact</button>
              <a href="https://automateze.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors min-h-[44px] flex items-center">automateze.com</a>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.8)]"></div>
              <span className="text-neutral-600 text-xs">All Systems Online</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-neutral-700 text-xs">
              © {new Date().getFullYear()} SwiftOps Automation · Built by Shaikh Zeeshan
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
    {/* PERF: Lazy load GPU-intensive effects after page is interactive */}
    <InteractiveOnly>
      <Suspense fallback={null}>
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
        />
      </Suspense>
      <Suspense fallback={null}>
        <GlowTrail />
      </Suspense>
    </InteractiveOnly>
    </>
  )
}

export default App
