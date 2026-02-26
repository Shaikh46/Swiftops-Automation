import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Link, Zap, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: 'Connect Your Systems',
    description: 'Integrate your existing tools and platforms with our automation engine.',
    icon: Link,
  },
  {
    title: 'Deploy AI Agents',
    description: 'Configure intelligent agents to handle your specific workflows and tasks.',
    icon: Zap,
  },
  {
    title: 'Automate & Scale',
    description: 'Watch your business grow as automation handles the heavy lifting.',
    icon: TrendingUp,
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            How It <span className="text-neon-blue neon-text">Works</span>
          </h2>
          <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
            Three simple steps to transform your business with intelligent automation
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue/20 via-neon-blue to-neon-blue/20 -translate-y-1/2">
            <div className="energy-pulse" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="glass-card p-8 text-center space-y-4 hover:scale-105 transition-all duration-300">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto relative z-10">
                        <Icon className="w-10 h-10 text-neon-blue" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-neon-blue/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-neon-blue animate-pulse-ring" />
                    </div>
                    <h3 className="text-2xl font-orbitron font-bold text-white">{step.title}</h3>
                    <p className="text-white/70 font-inter">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
