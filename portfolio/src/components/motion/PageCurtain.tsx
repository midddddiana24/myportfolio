import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, EASE_POWER4, DUR_NORMAL, DUR_FAST } from '@/lib/gsap'

// ================================================================
// PageCurtain — The sliding panel that covers the screen on every
// page transition. Classic premium portfolio effect.
//
// Animation:
//   1. Link clicked → curtain slides IN from bottom-right
//   2. Route changes
//   3. Curtain slides OUT to top-left
// ================================================================

export function PageCurtain() {
  const panelRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Re-run on every route change
  useEffect(() => {
    const panel = panelRef.current
    const label = labelRef.current
    if (!panel || !label) return

    // Kill any running animation
    gsap.killTweensOf([panel, label])

    // Slide the curtain OUT (exit) — panel leaves to top
    const tl = gsap.timeline()

    // First: curtain enters from bottom
    tl.set(panel, { scaleY: 1, transformOrigin: 'bottom center', display: 'flex' })
    tl.fromTo(panel,
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: DUR_NORMAL, ease: EASE_POWER4 }
    )
    // Label fades in
    tl.fromTo(label,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: DUR_FAST, ease: EASE_POWER4 },
      '-=0.3'
    )
    // Then: curtain exits to top
    tl.to(panel,
      { scaleY: 0, transformOrigin: 'top center', duration: DUR_NORMAL, ease: EASE_POWER4 },
      '+=0.15'
    )
    tl.set(panel, { display: 'none' })

    return () => { tl.kill() }
  }, [location.pathname])

  // Map pathname to a display label
  const labels: Record<string, string> = {
    '/':           'Home',
    '/about':      'About',
    '/tech-stack': 'Tech Stack',
    '/services':   'Services',
    '/projects':   'Projects',
    '/contact':    'Contact',
  }
  const pageLabel = labels[location.pathname] ?? 'Portfolio'

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'var(--accent)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <div
        ref={labelRef}
        style={{
          fontFamily: "'Geist', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 8vw, 5rem)',
          letterSpacing: '-0.05em',
          color: '#fff',
          opacity: 0,
        }}
      >
        {pageLabel}
      </div>
    </div>
  )
}
