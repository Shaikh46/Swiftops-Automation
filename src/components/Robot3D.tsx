'use client'

import { useEffect, useState } from 'react'
import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'

export function Robot3D() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Don't render on desktop
  if (!isMobile) return null

  return (
    <div className="w-full px-4 my-8 robot-3d-container relative z-20">
      <Card className="w-full h-[400px] bg-black/[0.96] relative overflow-hidden rounded-2xl border border-cyan-500/20">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#00fff7"
        />

        <div className="flex flex-col h-full">
          {/* Spline takes most space - BIGGER SIZE */}
          <div className="flex-1 relative min-h-[300px] flex items-center justify-center">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-110" /* 10% bigger */
            />
            {/* Overlay to hide branding */}
            <div className="absolute bottom-0 right-0 w-32 h-12 bg-black/80 blur-md pointer-events-none"></div>
          </div>

          {/* Text content below */}
          <div className="p-4 text-center relative z-10 bg-black/40 backdrop-blur-sm pb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 shadow-cyan-500/50 drop-shadow-md">
              AI Automation at Your Fingertips
            </h2>
            <p className="mt-2 text-neutral-300 text-sm">
              Let our 3D robot guide you through automation possibilities
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
