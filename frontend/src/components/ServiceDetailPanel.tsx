import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { ServiceData } from '../data/servicesData';
import { NeuralNetworkAnimation } from './animations/NeuralNetworkAnimation';
import { ChatBubblesAnimation } from './animations/ChatBubblesAnimation';
import { EmailPipelineAnimation } from './animations/EmailPipelineAnimation';
import { WorkflowNodesAnimation } from './animations/WorkflowNodesAnimation';
import { WebsiteAssemblyAnimation } from './animations/WebsiteAssemblyAnimation';
import { MobileDeviceAnimation } from './animations/MobileDeviceAnimation';
import { EagleClickAnimation } from './EagleClickAnimation';
import { useCTAClick } from '../hooks/useCTAClick';

interface ServiceDetailPanelProps {
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDetailPanel({ service, isOpen, onClose }: ServiceDetailPanelProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  const triggerAnimation = useCallback(() => {
    setShowAnimation(true);
  }, []);

  const { handleCTAClick, isLocked } = useCTAClick(triggerAnimation);

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false);
    // Close the panel after animation completes (scroll is handled by useCTAClick)
    onClose();
  }, [onClose]);

  if (!service) return null;

  const renderAnimation = () => {
    switch (service.id) {
      case 'ai-agents':
        return <NeuralNetworkAnimation />;
      case 'ai-chatbots':
        return <ChatBubblesAnimation />;
      case 'email-automation':
        return <EmailPipelineAnimation />;
      case 'workflow-automation':
        return <WorkflowNodesAnimation />;
      case 'website-development':
        return <WebsiteAssemblyAnimation />;
      case 'app-development':
        return <MobileDeviceAnimation />;
      default:
        return null;
    }
  };

  const Icon = service.icon;

  return (
    <>
      {/* Eagle Click Animation Overlay */}
      <EagleClickAnimation
        isActive={showAnimation}
        onComplete={handleAnimationComplete}
      />

      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card p-8 md:p-12"
          style={{
            background: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(0, 229, 255, 0.3)',
            boxShadow: '0 0 60px rgba(0, 229, 255, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-neon-blue/30 hover:border-neon-blue transition-all duration-300 group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white/70 group-hover:text-neon-blue transition-colors" />
          </button>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Animation */}
            <div className="flex items-center justify-center">
              <div className="w-full h-80 bg-black/20 rounded-xl border border-neon-blue/20 overflow-hidden">
                {renderAnimation()}
              </div>
            </div>

            {/* Right side - Details */}
            <div className="space-y-6">
              {/* Icon and Title */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-neon-blue/10 rounded-xl flex items-center justify-center border border-neon-blue/30">
                  <Icon className="w-8 h-8 text-neon-blue" />
                </div>
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                  {service.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-white/80 font-inter leading-relaxed">
                {service.detailedDescription}
              </p>

              {/* Features */}
              <div>
                <h3 className="text-xl font-orbitron font-semibold text-neon-blue mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-white/70 font-inter"
                    >
                      <div className="w-1.5 h-1.5 bg-neon-blue rounded-full mt-2 flex-shrink-0" style={{ boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCTAClick}
                disabled={isLocked.current}
                className="neon-button-primary w-full mt-6"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
