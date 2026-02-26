import { Check } from 'lucide-react';
import { scrollToSection } from '../utils/scrollHelpers';

export function AboutUsSection() {
  const features = [
    'AI-Powered Automation',
    'Custom Business Solutions',
    'Fast & Scalable Systems',
    '24/7 Smart Support',
  ];

  const handleConsultationClick = () => {
    scrollToSection('contact');
  };

  const handleServicesClick = () => {
    scrollToSection('services');
  };

  return (
    <section id="about" className="py-24 relative bg-black/40">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: AI Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <img
                src="/assets/generated/ai-automation-illustration.dim_800x600.png"
                alt="AI automation illustration"
                className="w-full h-auto max-w-lg mx-auto rounded-lg"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.4))',
                }}
              />
              {/* Additional glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 rounded-lg blur-xl" />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-gray-900/60 border border-neon-cyan/20 rounded-2xl p-8 shadow-2xl space-y-6">
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                About SwiftOps Automation
              </h2>

              {/* Subheading */}
              <h3 className="text-xl md:text-2xl font-inter font-semibold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
                Transforming Businesses with AI Automation & Smart Digital Solutions
              </h3>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  SwiftOps Automation helps businesses streamline operations using advanced AI agents, intelligent automation systems, and custom digital workflows. Our mission is to simplify complex business processes, increase productivity, and help companies scale faster through modern automation technology.
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  We specialize in AI chatbots, workflow automation, business process optimization, and smart integrations designed to save time, reduce costs, and improve customer experience.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-colors duration-300">
                      <Check className="w-4 h-4 text-neon-cyan" />
                    </div>
                    <span className="text-gray-200 text-base md:text-lg font-inter">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={handleConsultationClick}
                  className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 transform hover:scale-105"
                >
                  Get Free Consultation
                </button>
                <button
                  onClick={handleServicesClick}
                  className="px-6 py-3 rounded-lg font-semibold border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300"
                >
                  View Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
