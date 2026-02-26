import { useState } from 'react';
import { ServiceData } from '../data/servicesData';

export function useServicePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceData | null>(null);

  const openPanel = (service: ServiceData) => {
    setActiveService(service);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    // Delay clearing the active service to allow exit animation
    setTimeout(() => setActiveService(null), 500);
  };

  return {
    isOpen,
    activeService,
    openPanel,
    closePanel,
  };
}
