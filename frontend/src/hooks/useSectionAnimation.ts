import { useEffect, useRef, useState } from 'react';

interface UseSectionAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationDelay?: number;
}

/**
 * Custom hook that uses IntersectionObserver to detect when sections enter the viewport
 * and applies fade-in and translateY animations with GPU acceleration
 */
export function useSectionAnimation(options: UseSectionAnimationOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', animationDelay = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (animationDelay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, animationDelay);
          } else {
            setIsVisible(true);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, animationDelay]);

  return { ref, isVisible };
}
