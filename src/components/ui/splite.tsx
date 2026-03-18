'use client'

import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'

// PERF: Lazy-load the heavy Spline runtime (~200KB) into its own chunk
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * Hybrid SplineScene component:
 * - Immediately renders a lightweight CSS robot animation (the fallback)
 * - Lazily loads the real Spline 3D scene in a separate chunk
 * - Once Spline is ready, it replaces the CSS fallback seamlessly
 * - Zero performance impact on initial page load (FCP, LCP unaffected)
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const [splineLoaded, setSplineLoaded] = useState(false)

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {/* CSS Robot Fallback — visible until Spline finishes loading */}
      {!splineLoaded && <SplineFallback />}

      {/* Real Spline 3D Scene — lazy-loaded, replaces fallback when ready */}
      <Suspense fallback={null}>
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            splineLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Spline
            scene={scene}
            className="w-full h-full"
            onLoad={() => setSplineLoaded(true)}
          />
        </div>
      </Suspense>
    </div>
  )
}

/**
 * Lightweight CSS-based AI robot animation.
 * Renders instantly as the loading state while the real 3D Spline scene loads.
 */
function SplineFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.15)_0%,transparent_60%)]"></div>

      {/* Main Robot Container */}
      <div className="relative w-48 h-56 sm:w-56 sm:h-64 md:w-72 md:h-80 lg:w-96 lg:h-[28rem] flex items-center justify-center" style={{ perspective: '800px' }}>
        
        {/* Orbiting Ring 1 */}
        <motion.div
          className="absolute w-full h-full rounded-full border border-cyan-400/30"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(70deg)' }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00E5FF,0_0_20px_#00E5FF]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#00E5FF]"></div>
        </motion.div>

        {/* Orbiting Ring 2 */}
        <motion.div
          className="absolute w-[85%] h-[85%] rounded-full border border-cyan-300/20"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(55deg) rotateY(25deg)' }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#00E5FF]"></div>
        </motion.div>

        {/* Robot Body — Geometric Holographic */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Head */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-b from-cyan-400/10 to-cyan-900/20 backdrop-blur-sm shadow-[0_0_30px_rgba(0,229,255,0.3),inset_0_0_20px_rgba(0,229,255,0.1)] flex items-center justify-center mb-2">
            {/* Eyes */}
            <div className="flex gap-3 sm:gap-4">
              <motion.div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00E5FF,0_0_20px_#00E5FF]"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00E5FF,0_0_20px_#00E5FF]"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              />
            </div>
            {/* Antenna */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-t from-cyan-400/60 to-transparent">
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00E5FF]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Neck */}
          <div className="w-4 h-2 sm:w-5 sm:h-2.5 bg-gradient-to-b from-cyan-400/30 to-cyan-400/10 rounded-sm mb-1"></div>

          {/* Torso */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl border-2 border-cyan-400/40 bg-gradient-to-b from-cyan-400/8 to-cyan-900/15 backdrop-blur-sm shadow-[0_0_20px_rgba(0,229,255,0.2),inset_0_0_15px_rgba(0,229,255,0.05)] flex items-center justify-center">
            {/* Core Light */}
            <motion.div
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-cyan-400/30 shadow-[0_0_20px_#00E5FF,0_0_40px_rgba(0,229,255,0.4)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Circuit Lines */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-cyan-400/15 rounded-lg"></div>
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-cyan-400/10 rounded-md"></div>
          </div>

          {/* Arms */}
          <div className="absolute top-[5.5rem] sm:top-[6.5rem] md:top-[7.5rem] lg:top-[9rem] left-0 right-0 flex justify-between px-0">
            <motion.div
              className="w-3 h-10 sm:w-3.5 sm:h-12 md:w-4 md:h-14 lg:w-4 lg:h-16 rounded-full border border-cyan-400/30 bg-gradient-to-b from-cyan-400/10 to-transparent -ml-4 sm:-ml-5"
              animate={{ rotateZ: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="w-3 h-10 sm:w-3.5 sm:h-12 md:w-4 md:h-14 lg:w-4 lg:h-16 rounded-full border border-cyan-400/30 bg-gradient-to-b from-cyan-400/10 to-transparent -mr-4 sm:-mr-5"
              animate={{ rotateZ: [3, -3, 3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Ground Shadow/Platform */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-40 lg:w-48 h-3 sm:h-4 rounded-[100%] bg-cyan-400/10 blur-md"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Data Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            animate={{
              y: [20, -40, 20],
              x: [Math.sin(i) * 30, Math.cos(i) * -30, Math.sin(i) * 30],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.4,
            }}
            style={{
              left: `${30 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}

        {/* Loading indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse"></div>
            <span className="text-[9px] text-cyan-400/50 tracking-wider uppercase">Loading 3D</span>
            <div className="w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
