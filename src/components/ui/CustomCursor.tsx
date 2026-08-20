import { useEffect, useRef, useState } from 'react'

// ================================================================
// CustomCursor — Glowing dot + trailing ring cursor
// Hides default OS cursor · Reacts to links/buttons/canvas
// ================================================================

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hoverType, setHoverType] = useState<'default' | 'link' | 'button' | 'canvas'>('default')
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPos  = useRef({ x: 0, y: 0 })
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    // Hide system cursor
    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Dot snaps immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`
      }
      // Detect hover target
      const target = e.target as HTMLElement
      if (target.closest('canvas'))        setHoverType('canvas')
      else if (target.closest('button, [role="button"], .btn-primary, .btn-ghost')) setHoverType('button')
      else if (target.closest('a, [data-cursor="link"]')) setHoverType('link')
      else setHoverType('default')
    }

    // Ring follows with lerp
    const animate = () => {
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    document.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      document.documentElement.style.cursor = ''
    }
  }, [])

  // Styles by hover state
  const ringScale = hoverType === 'link' ? 'scale(1.7)' : hoverType === 'button' ? 'scale(1.4)' : hoverType === 'canvas' ? 'scale(2.2)' : 'scale(1)'
  const dotOpacity = hoverType === 'link' ? 0 : 1
  const ringOpacity = hoverType === 'canvas' ? 0.35 : 0.65
  const ringBg = hoverType === 'link' ? 'var(--accent-dim)' : hoverType === 'button' ? 'var(--accent-dim)' : 'transparent'

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--accent)',
          opacity: dotOpacity,
          pointerEvents: 'none',
          transition: 'opacity 0.2s',
          boxShadow: '0 0 8px var(--accent-glow)',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          background: ringBg,
          opacity: ringOpacity,
          pointerEvents: 'none',
          transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1), opacity 0.2s, background 0.2s',
          transform: ringScale,
          willChange: 'transform',
        }}
      />
    </>
  )
}
