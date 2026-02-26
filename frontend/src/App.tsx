import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { EliteClientProfilesSection } from './components/EliteClientProfilesSection';
import { AIPerformanceSection } from './components/AIPerformanceSection';
import { FinalCTASection } from './components/FinalCTASection';
import { ContactSection } from './components/ContactSection';
import { FounderSection } from './components/FounderSection';
import { Footer } from './components/Footer';
import { NeonCursor } from './components/NeonCursor';
import { IntroAnimation } from './components/IntroAnimation';
import { useSectionAnimation } from './hooks/useSectionAnimation';

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // Section animations with adjusted thresholds and delays
  const heroAnimation = useSectionAnimation({ threshold: 0.1 });
  const aboutAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });
  const servicesAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });
  const statsAnimation = useSectionAnimation({ threshold: 0.15, animationDelay: 100 });
  const howItWorksAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });
  const integrationsAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });
  const clientProfilesAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });
  const performanceAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });
  const ctaAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });
  const founderAnimation = useSectionAnimation({ threshold: 0.1, animationDelay: 80 });

  useEffect(() => {
    // Check if intro animation has already been played in this session
    const hasViewedIntro = sessionStorage.getItem('introAnimationPlayed');
    
    if (!hasViewedIntro) {
      // Show intro animation on first visit
      setShowIntro(true);
      sessionStorage.setItem('introAnimationPlayed', 'true');
    } else {
      // Skip intro if already viewed
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setContentVisible(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      <div
        className={`transition-opacity duration-500 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NeonCursor />
        <Navbar />
        <main>
          <div ref={heroAnimation.ref} className={`section-animate ${heroAnimation.isVisible ? 'section-visible' : ''}`}>
            <HeroSection />
          </div>
          <div ref={aboutAnimation.ref} className={`section-animate ${aboutAnimation.isVisible ? 'section-visible' : ''}`}>
            <AboutUsSection />
          </div>
          <div ref={servicesAnimation.ref} className={`section-animate ${servicesAnimation.isVisible ? 'section-visible' : ''}`}>
            <ServicesSection />
          </div>
          <div ref={statsAnimation.ref} className={`section-animate ${statsAnimation.isVisible ? 'section-visible' : ''}`}>
            <StatsSection />
          </div>
          <div ref={howItWorksAnimation.ref} className={`section-animate ${howItWorksAnimation.isVisible ? 'section-visible' : ''}`}>
            <HowItWorksSection />
          </div>
          <div ref={integrationsAnimation.ref} className={`section-animate ${integrationsAnimation.isVisible ? 'section-visible' : ''}`}>
            <IntegrationsSection />
          </div>
          <div ref={clientProfilesAnimation.ref} className={`section-animate ${clientProfilesAnimation.isVisible ? 'section-visible' : ''}`}>
            <EliteClientProfilesSection />
          </div>
          <div ref={performanceAnimation.ref} className={`section-animate ${performanceAnimation.isVisible ? 'section-visible' : ''}`}>
            <AIPerformanceSection />
          </div>
          <div ref={ctaAnimation.ref} className={`section-animate ${ctaAnimation.isVisible ? 'section-visible' : ''}`}>
            <FinalCTASection />
          </div>
          <ContactSection />
          <div ref={founderAnimation.ref} className={`section-animate ${founderAnimation.isVisible ? 'section-visible' : ''}`}>
            <FounderSection />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
