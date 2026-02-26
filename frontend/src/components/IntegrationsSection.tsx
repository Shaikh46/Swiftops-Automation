import { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  const integrations = [
    'Slack',
    'Google Workspace',
    'Microsoft 365',
    'Salesforce',
    'HubSpot',
    'Zapier',
    'Stripe',
    'Shopify',
    'WordPress',
    'Notion',
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(0, 123, 255, 0.05) 50%, rgba(0, 229, 255, 0.05) 100%)',
          backgroundSize: '200% 200%',
        }}
      >
        <div className="absolute inset-0 animate-gradient-shift" 
          style={{
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, transparent 50%, rgba(0, 229, 255, 0.08) 100%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            hasAnimated 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Seamless <span className="text-neon-blue neon-text">Integrations</span>
          </h2>
          <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
            Connect with 500+ tools and platforms to automate your entire workflow
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-left">
              {[...integrations, ...integrations].map((integration, index) => (
                <div
                  key={`${integration}-${index}`}
                  className={`flex-shrink-0 mx-8 px-8 py-4 glass-card integration-card group transition-all duration-700 ease-out ${
                    hasAnimated 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  }`}
                  style={{
                    transitionDelay: `${(index % integrations.length) * 0.1}s`,
                    willChange: 'transform, opacity',
                  }}
                >
                  <span 
                    className="text-xl font-inter font-semibold text-white/80 group-hover:text-neon-blue transition-colors duration-300 inline-block animate-integration-float md:animate-integration-float"
                    style={{
                      animationDelay: `${(index % integrations.length) * 0.3}s`,
                    }}
                  >
                    {integration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
