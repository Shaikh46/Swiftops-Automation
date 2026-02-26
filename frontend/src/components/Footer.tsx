import { SiFacebook, SiX, SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'swiftops-automation';

  const footerLinks = {
    Company: ['About', 'Careers', 'Press', 'Blog'],
    Services: ['AI Agents', 'AI Chatbots', 'Automation', 'Development'],
    Resources: ['Documentation', 'Support', 'API Reference', 'Community'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  };

  const socialLinks = [
    { icon: SiFacebook, href: '#', label: 'Facebook' },
    { icon: SiX, href: '#', label: 'X (Twitter)' },
    { icon: SiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: SiInstagram, href: 'https://instagram.com/SwiftOps__Automation06', label: 'Instagram' },
    { icon: SiGithub, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-deep-accent border-t border-neon-blue/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-2xl font-orbitron font-bold text-white brand-title-shadow">
                SWIFTOPS
              </span>
              <span className="text-sm font-orbitron tracking-widest text-neon-cyan automation-neon-glow">
                AUTOMATION
              </span>
            </div>
            <p className="text-white/60 font-inter text-sm mb-4">
              Intelligent Automation. Engineered for Scale.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center hover:bg-neon-blue/20 hover:shadow-neon-glow transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-neon-blue group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-orbitron font-bold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-neon-blue font-inter text-sm transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neon-blue/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 font-inter text-sm text-center md:text-left">
            © {currentYear} SwiftOps Automation. All Rights Reserved.
          </p>
          <p className="text-white/60 font-inter text-sm flex items-center gap-2">
            Built with{' '}
            <Heart className="w-4 h-4 text-neon-blue fill-neon-blue animate-pulse" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-blue hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
