import { useRef, useEffect, type ReactNode } from 'react'
import { gsap, ScrollTrigger, EASE_POWER4, DUR_SLOW } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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
  const reduced = useReducedMotion()
  const { from, to } = getClip(direction)

  useEffect(() => {
    // Reduced motion is handled in the render below by not clipping at all.
    // It must NOT be handled by bailing out here: the clip lived in the JSX
    // style, so returning early left every wrapped block clipped to zero
    // height forever. ClipReveal wraps most of the content on About,
    // Contact, Home, Projects, ProjectDetail, Services and TechStack, so
    // that one early return blanked nearly the whole site for anyone who
    // asks their OS to reduce motion.
    if (reduced) return
    const el = ref.current
    if (!el) return

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
  }, [direction, duration, delay, once, reduced, from, to])

  return (
    // `from`, not a hardcoded inset: the starting clip was always the 'up'
    // variant regardless of `direction`, so a right/left/down reveal began
    // clipped from the wrong edge and visibly jumped when GSAP took over.
    <div ref={ref} className={className}
      style={{ ...style, clipPath: reduced ? undefined : from }}>
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
  const reduced = useReducedMotion()

  useEffect(() => {
    // Safe to bail out here, unlike ClipReveal: nothing is hidden up front,
    // so skipping the tween just leaves the element sitting still.
    if (reduced) return
    const el = ref.current
    if (!el) return

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

    return () => {
      anim.kill()
      ScrollTrigger.getAll()
        .filter(st => st.trigger === el)
        .forEach(st => st.kill())
    }
  }, [speed, reduced])

  return (
    <div ref={ref} className={className}
      style={reduced ? undefined : { willChange: 'transform' }}>
      {children}
    </div>
  )
}
