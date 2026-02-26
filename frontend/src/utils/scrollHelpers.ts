/**
 * Smoothly scrolls to a target element with offset to account for sticky header
 * @param targetId - The ID of the target element (with or without #)
 * @param offset - Additional offset in pixels (default: 100 for navbar height + padding)
 */
export function smoothScrollToElement(targetId: string, offset: number = 100): void {
  const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const element = document.getElementById(id);
  
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Triggers a highlight effect on the target element
 * @param targetId - The ID of the target element (with or without #)
 */
export function triggerHighlightEffect(targetId: string): void {
  const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const element = document.getElementById(id);
  
  if (!element) {
    return;
  }

  // Dispatch custom event to trigger highlight
  const event = new CustomEvent('scrollHighlight', { detail: { targetId: id } });
  element.dispatchEvent(event);
}

/**
 * Scrolls to a section by ID and optionally triggers highlight effect
 * @param sectionId - The ID of the section to scroll to (without #)
 * @param highlight - Whether to trigger highlight effect (default: true)
 */
export function scrollToSection(sectionId: string, highlight: boolean = true): void {
  smoothScrollToElement(sectionId, 100);
  if (highlight) {
    setTimeout(() => {
      triggerHighlightEffect(sectionId);
    }, 700);
  }
}

/**
 * Cinematic scroll to a target element using requestAnimationFrame
 * with premium cubic-bezier easing over 800ms. Returns a Promise.
 * @param targetId - The ID of the target element (with or without #)
 * @param offset - Offset from top in pixels (default: 100)
 */
export function cinematicScrollTo(targetId: string, offset: number = 100): Promise<void> {
  return new Promise((resolve) => {
    const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
    const element = document.getElementById(id);

    if (!element) {
      resolve();
      return;
    }

    const startY = window.pageYOffset;
    const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const distance = targetY - startY;
    const duration = 800;
    let startTime: number | null = null;

    // Premium ease-in-out-quart
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
