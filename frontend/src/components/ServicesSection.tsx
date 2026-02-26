import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useRef } from 'react';
import { servicesData } from '../data/servicesData';
import { useServicePanel } from '../hooks/useServicePanel';
import { ServiceDetailPanel } from './ServiceDetailPanel';

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const { isOpen, activeService, openPanel, closePanel } = useServicePanel();

  return (
    <>
      <section id="services" ref={sectionRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
              Our <span className="text-neon-blue neon-text">Services</span>
            </h2>
            <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
              Comprehensive automation solutions designed to transform your business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => openPanel(service)}
                  className={`glass-card group hover:scale-105 transition-all duration-300 cursor-pointer ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 229, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 229, 255, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 229, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  <div className="relative overflow-hidden">
                    <div className="shimmer-overlay" />
                    <div className="p-8 space-y-4">
                      <div
                        className="w-16 h-16 bg-neon-blue/10 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          animation: 'icon-float 3s ease-in-out infinite',
                        }}
                      >
                        <Icon className="w-8 h-8 text-neon-blue group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-2xl font-orbitron font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/70 font-inter">{service.description}</p>
                      <div className="pt-2 text-neon-blue text-sm font-inter font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to learn more →
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceDetailPanel service={activeService} isOpen={isOpen} onClose={closePanel} />
    </>
  );
}
