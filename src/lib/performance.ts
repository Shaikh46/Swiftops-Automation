import { useState, useEffect } from 'react';

export interface PerformanceConfig {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
}

export function usePerformanceConfig(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>({
    isMobile: false,
    isLowEnd: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const getStatus = (): PerformanceConfig => {
      const isMobile = mobileQuery.matches;
      const prefersReducedMotion = motionQuery.matches;

      let isLowEnd = isMobile;
      if (typeof navigator !== 'undefined') {
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = (navigator as any).deviceMemory || 4;
        if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
          isLowEnd = true;
        }
        // Also check Network Connection if available
        const connection = (navigator as any).connection;
        if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
          isLowEnd = true;
        }
      }

      return { isMobile, isLowEnd, prefersReducedMotion };
    };

    // Set initial configuration
    setConfig(getStatus());

    const handleChange = () => {
      setConfig(getStatus());
    };

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handleChange);
      motionQuery.addEventListener('change', handleChange);
    } else {
      (mobileQuery as any).addListener(handleChange);
      (motionQuery as any).addListener(handleChange);
    }

    return () => {
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener('change', handleChange);
        motionQuery.removeEventListener('change', handleChange);
      } else {
        (mobileQuery as any).removeListener(handleChange);
        (motionQuery as any).removeListener(handleChange);
      }
    };
  }, []);

  return config;
}
