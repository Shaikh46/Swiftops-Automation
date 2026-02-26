import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { EagleLogo } from './EagleLogo';
import { EagleClickAnimation } from './EagleClickAnimation';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scrollHelpers';
import { useCTAClick } from '../hooks/useCTAClick';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const createRipple = useRippleEffect();
  const activeSection = useActiveSection(['home', 'services', 'about', 'contact']);

  // CTA click hook — triggers animation then scrolls to #contact
  const { handleCTAClick, isLocked } = useCTAClick(() => {
    setShowAnimation(true);
    setIsMobileMenuOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    createRipple(e);
    setTargetSection(sectionId);
    setShowAnimation(true);
    setIsMobileMenuOpen(false);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    if (targetSection) {
      scrollToSection(targetSection);
      setTargetSection(null);
    }
    // Note: if triggered by CTA (no targetSection), useCTAClick handles the scroll
  };

  const handleGetStartedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    handleCTAClick(e);
  };

  const navigationLinks = [
    { href: '#home', sectionId: 'home', label: 'Home' },
    { href: '#services', sectionId: 'services', label: 'Services' },
    { href: '#about', sectionId: 'about', label: 'About' },
    { href: '#contact', sectionId: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full overflow-x-hidden ${
          isScrolled
            ? 'bg-glass backdrop-blur-md border-b border-neon-cyan/20 shadow-neon-glow'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between w-full">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 group cursor-pointer transition-all duration-300 hover:scale-[1.03]">
              <EagleLogo variant="icon" size={40} />
              <div className="flex flex-col items-center gap-0">
                <span className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold tracking-wider text-white leading-none brand-title-shadow whitespace-nowrap">
                  SwiftOps
                </span>
                <span className="text-xs sm:text-sm md:text-base font-orbitron leading-none whitespace-nowrap text-neon-cyan automation-neon-glow">
                  Automation
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.sectionId}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                  className={`neon-button-link whitespace-nowrap text-sm lg:text-base ${
                    activeSection === link.sectionId ? 'text-cyan-400 border-b-2 border-cyan-400' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Get Started CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={handleGetStartedClick}
                disabled={isLocked.current}
                className="neon-button relative overflow-hidden whitespace-nowrap px-3 md:px-4 lg:px-6 text-sm lg:text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-all duration-300 border border-neon-cyan/30 hover:shadow-neon-glow"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-neon-cyan" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[280px] sm:w-[320px] bg-deep-accent/95 backdrop-blur-xl border-l border-neon-cyan/20 z-[200]"
        >
          <SheetHeader className="border-b border-neon-cyan/20 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-orbitron font-bold text-white tracking-wider">
                MENU
              </SheetTitle>
              <SheetClose asChild>
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-neon-cyan" />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>

          <nav className="flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className={`flex items-center px-4 py-3 rounded-lg font-orbitron text-base transition-all duration-300 ${
                  activeSection === link.sectionId
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 shadow-neon-glow'
                    : 'text-white/80 hover:text-neon-cyan hover:bg-neon-cyan/10 border border-transparent hover:border-neon-cyan/20'
                }`}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={handleGetStartedClick}
              disabled={isLocked.current}
              className="neon-button relative overflow-hidden whitespace-nowrap mt-4 w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Get Started
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      <EagleClickAnimation isActive={showAnimation} onComplete={handleAnimationComplete} />
    </>
  );
}
