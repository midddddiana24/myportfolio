import { useRef, useEffect, type ReactNode } from 'react'
import { gsap, ScrollTrigger, EASE_POWER4, DUR_SLOW } from '@/lib/gsap'

// ================================================================
// ClipReveal — clip-path wipe reveal for images, sections, blocks
// Animates from hidden (clipped) to fully visible on scroll entry
// ================================================================

type Direction = 'up' | 'down' | 'left' | 'right'

interface ClipRevealProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  direction?: Direction
  duration?: number
  delay?: number
  once?: boolean
}

function getClip(dir: Direction) {
  switch (dir) {
    case 'up':    return { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' }
    case 'down':  return { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' }
    case 'left':  return { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' }
    case 'right': return { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' }
  }
}

export function ClipReveal({
  children,
  className,
  style,
  direction = 'down',
  duration = DUR_SLOW,
  delay = 0,
  once = true,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { from, to } = getClip(direction)

    const anim = gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: to,
        duration,
        delay,
        ease: EASE_POWER4,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once,
        },
      }
    )

    return () => {
      anim.kill()
      ScrollTrigger.getAll()
        .filter(st => st.trigger === el)
        .forEach(st => st.kill())
    }
  }, [direction, duration, delay, once])

  return (
    <div ref={ref} className={className} style={{ ...style, clipPath: 'inset(100% 0 0 0)' }}>
      {children}
    </div>
  )
}

// ── Parallax image wrapper ─────────────────────────────────────
interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number   // 0.2 = subtle, 0.5 = dramatic
}

export function Parallax({ children, className, speed = 0.25 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const anim = gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top',
      },
    })

    return () => { anim.kill() }
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
