import { useRef, useEffect, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ================================================================
// HorizontalScroll — GSAP ScrollTrigger pinned horizontal scroll
// Section pins while the inner track scrolls left → right
// The signature project showcase effect on premium portfolios
// ================================================================

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
  speed?: number    // 1 = normal, 0.5 = slower, 2 = faster
}

export function HorizontalScroll({
  children,
  className,
  speed = 1,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    // Skip on mobile — too cramped
    if (window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const totalScrollWidth = track.scrollWidth - track.clientWidth + 120

      gsap.to(track, {
        x: () => -totalScrollWidth * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          end: () => `+=${totalScrollWidth * speed * 1.2}`,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [speed])

  return (
    <section ref={sectionRef} className={className} style={{ overflow: 'hidden' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          padding: '0 5vw',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </section>
  )
}
