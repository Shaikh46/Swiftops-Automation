# Specification

## Summary
**Goal:** Make all "Get Started" buttons in the Services section play the existing EagleClickAnimation before navigating to the #contact section, without changing any button styles or other site behavior.

**Planned changes:**
- In `ServiceDetailPanel`, update the "Get Started" button click handler to trigger `EagleClickAnimation` immediately on click, block scrolling/navigation while the animation plays, and then smoothly scroll to `#contact` using the existing cinematic scroll utility once the animation's `onComplete` callback fires.
- In `ServicesSection`, apply the same animation-then-scroll behavior to any "Get Started" buttons rendered directly in service cards (outside of `ServiceDetailPanel`).
- Reuse the existing `useCTAClick` hook / `EagleClickAnimation` integration — no new animation code introduced.
- All other buttons (navbar, hero, header, footer) remain completely unaffected.

**User-visible outcome:** Clicking any "Get Started" button in the Services section plays the eagle click animation overlay, then smoothly scrolls the user to the Get In Touch / contact section after the animation completes.
