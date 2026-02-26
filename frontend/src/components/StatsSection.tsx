import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

const stats = [
  { value: 10, suffix: 'M+', label: 'Tasks Automated' },
  { value: 500, suffix: '+', label: 'Integrations' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 50, suffix: '+', label: 'Clients' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  isVisible,
  index,
}: {
  stat: { value: number; suffix: string; label: string };
  isVisible: boolean;
  index: number;
}) {
  const count = useCounterAnimation(stat.value, 2000, isVisible);

  return (
    <div
      className={`text-center space-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-5xl md:text-6xl font-orbitron font-bold text-neon-blue neon-text">
        {count}
        {stat.suffix}
      </div>
      <div className="text-white/70 font-inter text-lg relative">
        {stat.label}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-neon-blue shadow-neon-glow animate-glow-underline" />
      </div>
    </div>
  );
}
