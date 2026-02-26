import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const profiles = [
  {
    name: 'Marcus Chen',
    position: 'Chief Technology Officer',
    companyType: 'FinTech',
    testimonial:
      'SwiftOps AI transformed our transaction processing pipeline. The automation accuracy and speed exceeded our most optimistic projections.',
    profileImage: '/assets/generated/profile-executive-1.dim_200x200.png',
  },
  {
    name: 'Sarah Mitchell',
    position: 'VP of Operations',
    companyType: 'SaaS',
    testimonial:
      'Implementation was seamless, and the ROI was immediate. Our operational efficiency increased by 67% within the first quarter.',
    profileImage: '/assets/generated/profile-executive-2.dim_200x200.png',
  },
  {
    name: 'David Rodriguez',
    position: 'Head of Engineering',
    companyType: 'Enterprise AI',
    testimonial:
      'The intelligent workflow automation freed our team to focus on innovation. SwiftOps handles complexity that would require an entire department.',
    profileImage: '/assets/generated/profile-executive-3.dim_200x200.png',
  },
];

export function EliteClientProfilesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 heading-glow">
            Elite <span className="text-neon-blue neon-text">Client Profiles</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {profiles.map((profile, index) => (
            <div
              key={profile.name}
              className={`glass-card p-8 space-y-6 hover:scale-105 hover:border-neon-blue/60 transition-all duration-300 group ${
                isVisible ? 'animate-fade-in-slide' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-neon-blue/20 blur-xl group-hover:bg-neon-blue/40 transition-all duration-300" />
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="relative w-32 h-32 rounded-full object-cover border-2 border-neon-blue shadow-neon-glow group-hover:shadow-[0_0_30px_rgba(0,229,255,0.8)] transition-all duration-300"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-neon-blue font-inter text-sm font-semibold mb-1">
                    {profile.position}
                  </p>
                  <p className="text-white/60 font-inter text-xs uppercase tracking-wider">
                    {profile.companyType}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-neon-blue to-transparent" />
                <p className="text-white/80 font-inter text-sm leading-relaxed pt-4 italic">
                  &ldquo;{profile.testimonial}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
