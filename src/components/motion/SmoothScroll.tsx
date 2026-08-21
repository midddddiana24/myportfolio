import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'

// ================================================================
// SmoothScroll — Lenis butter-smooth scroll + GSAP ScrollTrigger sync
// The entire site scrolls through this for that premium fluid feel
// ================================================================

let lenisInstance: Lenis | null = null

export function getLenis() { return lenisInstance }

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Lenis config — tuned for that "rojvillacampa" feel
    const lenis = new Lenis({
      duration:  1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })
    lenisInstance = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // RAF loop keeping Lenis in sync
    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Remove lag smoothing so ScrollTrigger doesn't stutter
    ScrollTrigger.normalizeScroll(false)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return <>{children}</>
}
