import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

const metrics = [
  {
    label: 'Workflow Automation Rate',
    value: 87,
    suffix: '%',
    description: 'Tasks Automated',
  },
  {
    label: 'Operational Processing Speed',
    value: 6.4,
    suffix: 'x',
    description: 'Faster Execution',
    decimal: true,
  },
  {
    label: 'AI Decision Accuracy',
    value: 98.7,
    suffix: '%',
    description: 'Model Precision',
    decimal: true,
  },
  {
    label: 'Manual Intervention Reduced',
    value: -72,
    suffix: '%',
    description: 'Human Dependency',
  },
];

export function AIPerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 heading-glow">
            AI-Driven <span className="text-neon-blue neon-text">Performance Intelligence</span>
          </h2>
          <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
            Real-time automation metrics powered by intelligent systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} isVisible={isVisible} index={index} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent shadow-neon-glow" />
            <blockquote
              className={`text-center pt-8 ${isVisible ? 'animate-fade-in-slide' : 'opacity-0'}`}
              style={{ animationDelay: '400ms' }}
            >
              <p className="text-xl md:text-2xl text-white/90 font-inter italic mb-6 leading-relaxed">
                &ldquo;SwiftOps AI automation reduced operational delays by 43% within 90
                days.&rdquo;
              </p>
              <footer className="text-neon-blue font-inter font-semibold">
                — Operations Director, FinTech Company
              </footer>
            </blockquote>
          </div>
        </div>

        <div
          className={`relative max-w-7xl mx-auto ${isVisible ? 'animate-fade-in-slide' : 'opacity-0'}`}
          style={{ animationDelay: '500ms' }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-neon-blue/30 shadow-neon-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-blue/5 animate-pulse-glow" />
            <img
              src="/assets/generated/workflow-connected.dim_1200x600.png"
              alt="Connected Workflow Visualization"
              className="relative w-full h-auto workflow-image"
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-neon-blue shadow-neon-glow animate-pulse-node" />
              <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-neon-blue shadow-neon-glow animate-pulse-node" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-neon-blue shadow-neon-glow animate-pulse-node" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-neon-blue shadow-neon-glow animate-pulse-node" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  isVisible,
  index,
}: {
  metric: {
    label: string;
    value: number;
    suffix: string;
    description: string;
    decimal?: boolean;
  };
  isVisible: boolean;
  index: number;
}) {
  const count = useCounterAnimation(
    metric.decimal ? metric.value * 10 : Math.abs(metric.value),
    2000,
    isVisible
  );

  const displayValue = metric.decimal ? (count / 10).toFixed(1) : count;
  const finalValue = metric.value < 0 ? `-${displayValue}` : displayValue;

  return (
    <div
      className={`glass-card p-8 text-center space-y-4 hover:border-neon-blue/50 transition-all duration-300 ${
        isVisible ? 'animate-fade-in-slide' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="text-white/70 font-inter text-sm uppercase tracking-wider mb-2">
        {metric.label}
      </h3>
      <div className="text-5xl md:text-6xl font-orbitron font-bold text-neon-blue neon-text">
        {finalValue}
        {metric.suffix}
      </div>
      <p className="text-white/60 font-inter text-base">{metric.description}</p>
    </div>
  );
}
