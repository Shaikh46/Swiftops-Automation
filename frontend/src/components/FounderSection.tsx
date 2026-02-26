export function FounderSection() {
  return (
    <section id="founder" className="py-24 relative overflow-hidden">
      {/* Animated Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-neon-cyan/5 to-neon-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Glassmorphism Card with Floating Animation */}
          <div
            className="backdrop-blur-xl bg-gray-900/40 border border-neon-cyan/30 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-float"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 229, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 229, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 229, 255, 0.2)';
            }}
          >
            <div className="text-center space-y-6">
              {/* Founder Name */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white">
                Shaikh Zeeshan
              </h2>

              {/* Role with Neon Highlight */}
              <div className="inline-block">
                <p className="text-xl md:text-2xl font-inter font-semibold bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-cyan bg-clip-text text-transparent animate-pulse">
                  Founder & CEO
                </p>
                <div className="h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent mt-2 rounded-full" />
              </div>

              {/* Description */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto px-4">
                Shaikh Zeeshan is the Founder & CEO of SwiftOps Automation, focused on building intelligent AI-driven automation solutions that help businesses streamline operations, improve efficiency, and scale through modern cloud and AI technologies.
              </p>

              {/* Decorative Elements */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
