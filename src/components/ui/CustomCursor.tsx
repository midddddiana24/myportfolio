import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ================================================================
// CustomCursor v2 — Dot + Ring with VIEW state on project cards
// Ring uses GSAP quickTo for maximum perf
//
// Owns the `custom-cursor` class on <html>. The global `cursor: none`
// rule in index.css is scoped to that class, so hiding the system
// cursor and drawing a replacement are now the same decision — see the
// comment on that rule for the bug this prevents.
// ================================================================

type CursorState = 'default' | 'link' | 'button' | 'view' | 'canvas'

export function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const labelRef  = useRef<HTMLSpanElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const stateRef  = useRef<CursorState>('default')
  const reduced   = useReducedMotion()

  // Claim the class only while we're really drawing a cursor. Runs as its
  // own effect so it stays correct if `reduced` flips mid-session.
  useEffect(() => {
    if (reduced) return
    const root = document.documentElement
    root.classList.add('custom-cursor')
    return () => root.classList.remove('custom-cursor')
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // GSAP quickTo for ring — smoothest possible follow
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      // Dot: instant
      gsap.set(dot, { x: e.clientX - 5, y: e.clientY - 5 })

      // Ring: smooth lag
      xTo(e.clientX - 20)
      yTo(e.clientY - 20)

      // Detect hover target
      const target = e.target as HTMLElement
      let newState: CursorState = 'default'

      if (target.closest('[data-cursor="view"], .project-row, .project-card'))
        newState = 'view'
      else if (target.closest('canvas'))
        newState = 'canvas'
      else if (target.closest('button, .btn-primary, .btn-ghost, .filter-tab, .stt-btn, [data-cursor="button"]'))
        newState = 'button'
      else if (target.closest('a, [role="button"], .nav-link, [data-cursor="link"]'))
        newState = 'link'

      if (newState !== stateRef.current) {
        stateRef.current = newState
        setState(newState)
      }
    }

    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    const onClick = () => {
      gsap.fromTo(ring, { scale: 0.8 }, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.5)' })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('click', onClick)
    }
  }, [reduced])

  // A ring that trails the pointer by 0.45s is the definition of gratuitous
  // motion, so under reduced motion we render nothing and let the real
  // system cursor do its job. The effect above leaves the class off, which
  // is what un-hides it.
  if (reduced) return null

  // Ring size / style by state
  const ringSize     = state === 'view' ? 72 : state === 'canvas' ? 56 : state === 'link' ? 52 : state === 'button' ? 44 : 40
  const ringBg       = state === 'view' ? 'rgba(255,255,255,0.92)' : state === 'link' ? 'rgba(255,255,255,0.06)' : 'transparent'
  const ringBorder   = state === 'view' ? 'none' : '1.5px solid #ffffff'
  const dotVisible   = state === 'view' || state === 'link' ? 0 : 1
  const labelVisible = state === 'view' ? 1 : 0

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 10, height: 10, borderRadius: '50%',
        background: '#ffffff',
        opacity: dotVisible,
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(255,255,255,0.35)',
        transition: 'opacity 0.2s',
        willChange: 'transform',
      }} />

      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998,
        width: ringSize, height: ringSize,
        marginLeft: -(ringSize - 40) / 2,
        marginTop:  -(ringSize - 40) / 2,
        borderRadius: '50%',
        border: ringBorder,
        background: ringBg,
        pointerEvents: 'none',
        transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), background 0.25s, border 0.25s, margin 0.3s',
        willChange: 'transform',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span ref={labelRef} style={{
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          fontSize: '0.5625rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#0a0a0a',
          opacity: labelVisible,
          transition: 'opacity 0.2s',
          userSelect: 'none',
        }}>
          VIEW
        </span>
      </div>
    </>
  )
}
