'use client'

import { Suspense, lazy, useState, useEffect } from 'react'

// PERF: Lazy-load the heavy Spline runtime (~200KB) into its own chunk
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * Optimized SplineScene component:
 * - Defers Spline loading until browser is idle (requestIdleCallback)
 * - Has no visual fallback to prevent swapping/flicker
 * - Renders nothing until the actual Spline scene is ready
 * - Zero performance impact on initial page load (FCP, LCP unaffected)
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  // PERF: Defer Spline download until browser is idle — keeps main thread free for hydration
  useEffect(() => {
    const ric = typeof window !== 'undefined' && 'requestIdleCallback' in window
      ? window.requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 200);
    const id = ric(() => setShouldLoad(true));
    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(id as number);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {/* Real Spline 3D Scene — deferred + lazy-loaded, reveals seamlessly when ready (no placeholder swaps) */}
      {shouldLoad && (
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
      )}
    </div>
  )
}
