import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    name: "Marcus Chen",
    title: "Chief Technology Officer",
    industry: "FINTECH",
    quote: "SwiftOps AI transformed our transaction processing pipeline. The automation accuracy and speed exceeded our most optimistic projections.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Sarah Mitchell",
    title: "VP of Operations",
    industry: "SAAS",
    quote: "Implementation was seamless, and the ROI was immediate. Our operational efficiency increased by 67% within the first quarter.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "David Rodriguez",
    title: "Head of Engineering",
    industry: "ENTERPRISE AI",
    quote: "The intelligent workflow automation allows our team to focus on innovation. SwiftOps handles complexity that would require an entire department.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
  }
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // MOBILE: Detect active card on scroll for neon border glow
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(newIndex);
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 bg-[#020617] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 mb-6 tracking-tight">
            Elite Client Profiles
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent mx-auto opacity-50"></div>
        </motion.div>

        {/* MOBILE: Swipeable Carousel with scroll-snap */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:mx-0 md:px-0"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`
                  relative group shrink-0 w-[85vw] md:w-auto snap-center
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${isActive ? 'scale-100' : 'scale-[0.98] opacity-70 md:scale-100 md:opacity-100'}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                
                <div className={`
                  relative h-full flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm transition-all duration-500
                  border ${isActive ? 'border-[#00f0ff]/50 shadow-[0_0_30px_rgba(0,240,255,0.15)]' : 'border-white/5 hover:border-[#00f0ff]/30'}
                `}>
                  
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-full bg-[#00f0ff] blur-md transition-opacity duration-500 ${isActive ? 'opacity-40 animate-pulse' : 'opacity-20 group-hover:opacity-50 group-hover:animate-pulse'}`}></div>
                    <div className="relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-b from-[#00f0ff] to-[#00f0ff]/20">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full border-2 border-[#020617]"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Client Info */}
                  <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                  <p className="text-[#00f0ff] font-medium text-sm mb-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">{testimonial.title}</p>
                  <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase mb-6">{testimonial.industry}</p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent mb-6"></div>

                  {/* Quote */}
                  <div className="relative flex-grow flex flex-col justify-center">
                    <Quote className="absolute -top-4 -left-2 w-8 h-8 text-[#00f0ff]/10 rotate-180" />
                    <p className="text-neutral-300 text-sm leading-relaxed italic relative z-10">
                      "{testimonial.quote}"
                    </p>
                    <Quote className="absolute -bottom-4 -right-2 w-8 h-8 text-[#00f0ff]/10" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {testimonials.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.8)]' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
