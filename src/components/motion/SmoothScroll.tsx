import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ================================================================
// SmoothScroll — Lenis + GSAP ticker sync.
//
// Skipped entirely under prefers-reduced-motion. Lenis intercepts the
// wheel and animates the scroll position over ~1.2s, which is exactly
// the kind of motion that triggers vestibular symptoms — and it is the
// most motion-heavy thing on the site, so honouring the preference in
// the 3D scenes while ignoring it here would be backwards. With Lenis
// absent, the browser scrolls natively and GSAP's ScrollTrigger falls
// back to its own scroll handling, so nothing else needs changing.
// ================================================================

let lenisInstance: Lenis | null = null
/** Null when reduced motion is active — callers must handle that. */
export function getLenis() { return lenisInstance }

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })
    lenisInstance = lenis

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(onTick)
      // Restore GSAP's default lag smoothing, otherwise disabling it leaks
      // out of this component and affects every later animation.
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      lenisInstance = null
      ScrollTrigger.refresh()
    }
  }, [reduced])

  return <>{children}</>
}
