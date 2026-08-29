import { useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ================================================================
// MagneticButton — Cursor magnetically attracted to button center
// The exact effect on rojvillacampa and premium portfolio sites
// ================================================================

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number    // How far it moves toward cursor (0–1)
  onClick?: () => void
  as?: 'button' | 'a' | 'div'
  href?: string
  target?: string
  rel?: string
  'aria-label'?: string
}

export function MagneticButton({
  children,
  className,
  style,
  strength = 0.35,
  onClick,
  as: Tag = 'button',
  href,
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref  = useRef<HTMLElement>(null)
  const rafRef = useRef<number>(0)
  const reduced = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) * strength
    const dy   = (e.clientY - cy) * strength

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      gsap.to(el, {
        x: dx, y: dy,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
  }

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current)
    gsap.to(ref.current, {
      x: 0, y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
  }

  const props: Record<string, unknown> = {
    ref,
    className,
    style: { display: 'inline-block', ...(reduced ? {} : { willChange: 'transform' }), ...style },
    // Under reduced motion the element stays put: no handlers attached, so
    // no transform is ever written and nothing needs resetting. Dropping
    // willChange too, since promoting a layer that will never animate just
    // costs memory.
    onMouseMove:  reduced ? undefined : handleMouseMove,
    onMouseLeave: reduced ? undefined : handleMouseLeave,
    onClick,
    'aria-label': ariaLabel,
  }
  if (href)   props.href   = href
  if (target) props.target = target
  if (rel)    props.rel    = rel

  return <Tag {...props}>{children}</Tag>
}
