import { useCallback, useRef } from 'react';

/**
 * Premium CTA click hook implementing animation-first interaction flow:
 * 1. Immediately trigger neon flash + glow pulse + eagle animation
 * 2. Lock navigation for 700ms (animation duration)
 * 3. Smooth cinematic scroll to #contact over 800ms
 * 4. Auto-focus first input with 2s neon glow
 * 5. Restore interactivity
 */
export function useCTAClick(onTriggerAnimation: () => void) {
  const isLockedRef = useRef(false);

  const handleCTAClick = useCallback(
    (e?: React.MouseEvent<HTMLElement>) => {
      // Prevent rapid multi-clicks
      if (isLockedRef.current) return;
      isLockedRef.current = true;

      // Pause magnetic cursor effect immediately
      window.dispatchEvent(new CustomEvent('pause-magnetic-cursor'));

      // STEP 1: Trigger animation immediately
      onTriggerAnimation();

      // STEP 2: Wait for animation to complete (700ms)
      setTimeout(() => {
        // STEP 3: Smooth cinematic scroll to #contact
        cinematicScrollToContact().then(() => {
          // STEP 4: Auto-focus first input with neon glow
          focusFirstContactInput();

          // STEP 5: After neon glow fades (2s), restore everything
          setTimeout(() => {
            isLockedRef.current = false;
            // Resume magnetic cursor effect
            window.dispatchEvent(new CustomEvent('resume-magnetic-cursor'));
          }, 2200);
        });
      }, 700);
    },
    [onTriggerAnimation]
  );

  return { handleCTAClick, isLocked: isLockedRef };
}

/**
 * Cinematic scroll to #contact section using requestAnimationFrame
 * with premium cubic-bezier easing over 800ms
 */
function cinematicScrollToContact(): Promise<void> {
  return new Promise((resolve) => {
    const contactEl = document.getElementById('contact');
    if (!contactEl) {
      resolve();
      return;
    }

    const startY = window.pageYOffset;
    const targetY = contactEl.getBoundingClientRect().top + window.pageYOffset - 100;
    const distance = targetY - startY;
    const duration = 800; // 800ms cinematic scroll
    let startTime: number | null = null;

    // Premium cubic-bezier easing: ease-in-out-quart
    function easeInOutQuart(t: number): number {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuart(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

/**
 * Focus the first input in the #contact section and apply neon glow
 */
function focusFirstContactInput(): void {
  const contactEl = document.getElementById('contact');
  if (!contactEl) return;

  const firstInput = contactEl.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    'input, textarea'
  );

  if (firstInput) {
    firstInput.focus();
    firstInput.classList.add('neon-input-focus-glow');

    // Remove glow class after 2 seconds
    setTimeout(() => {
      firstInput.classList.remove('neon-input-focus-glow');
    }, 2000);
  }
}
