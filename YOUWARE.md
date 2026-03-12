# SWIFTOPS AUTOMATION — Landing Page

## Project Overview
Premium futuristic landing page for SwiftOps Automation — an AI & business automation agency.

## Tech Stack
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** — deep black / electric cyan (#00d4ff) design system
- **Framer Motion** — all page animations and modal spring transitions
- **Lucide React** — icons
- **@splinetool/react-spline** — 3D robot in hero section
- **clsx + tailwind-merge** — class utilities (`cn()`)

## Directory Structure
```
src/
  components/
    ui/
      splite.tsx       ← Spline 3D scene with Suspense fallback
      spotlight.tsx    ← SVG spotlight effect component
    HeroSection.tsx    ← Full-screen hero with 3D robot + neon branding
    ServicesSection.tsx← 6-card services grid with expandable modal
    ContactSection.tsx ← Contact info with glassmorphism cards
  lib/
    utils.ts           ← cn() utility function
  App.tsx              ← Root layout with nav + footer
  index.css            ← Tailwind base styles
```

## Key Features
1. **Hero** — Spline 3D robot (right), neon SWIFTOPS branding (left), spotlight animation
2. **Services** — 6 cards (AI Agents, Chatbots, Email, Workflow, Web Dev, App Dev) with click-to-expand modal
3. **Contact** — Shaikh Zeeshan's details: phone, email, website with glassmorphism cards
4. **Nav** — Fixed top bar with Get Started CTA
5. **Footer** — System Online badge

## Contact Info (in ContactSection)
- Phone: +919960751076 / +917666426388
- Email: zeeshan.automation06@gmail.com
- Website: https://automateze.com

## Build Command
```
npm run build
```

## Path Alias
`@` maps to `./src/` — configured in both `vite.config.ts` and `tsconfig.app.json`.

## Animations
- **SplashCursor** — WebGL-based fluid simulation cursor effect (ReactBits). Renders a fixed fullscreen canvas overlay with `pointer-events: none` and `z-index: 9999`. Located at `src/components/ui/SplashCursor.tsx`, imported and rendered in `App.tsx` at root level.

## Design Tokens
- Background: #050505 / #0a0a1a
- Accent: Electric Cyan #00d4ff
- Grid lines, pulsing orbs, neon box shadows throughout
- Spotlight animation: `animate-spotlight` (defined in tailwind.config.js keyframes)
