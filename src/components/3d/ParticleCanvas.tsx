import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

// ================================================================
// ParticleCanvas — ambient dot-and-line web behind the page content.
//
// Deliberately NOT rendered on the home route. Home now carries the
// wireframe terrain in the hero and the wireframe globe in Expertise,
// and this canvas draws ink dots joined by ink hairlines — the
// same visual idea a third time. Three overlapping line systems in
// one viewport read as noise and blunt the terrain, which is the
// thing the page is actually built around. On every other route this
// is the only ambient texture, so it stays.
//
// To bring it back on Home, delete the `onHome` guard below.
// ================================================================

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
}

/** Line and dot alphas are quantised into a few buckets so the whole
 *  frame draws in ~7 canvas calls instead of one per dot and one per
 *  connection. At 90 particles the naive version issued well over a
 *  thousand stroke() calls every frame; each one is a separate path
 *  submission, which is the actual cost here — not the distance maths. */
const LINE_BUCKETS = 4
const DOT_BUCKETS  = 3

export function ParticleCanvas() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (onHome) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0, h = 0

    const resize = () => {
      const pw = w || window.innerWidth
      const ph = h || window.innerHeight
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
      // Rescale into the new box so particles aren't stranded outside it,
      // where they'd sit against a wall until the bounce test frees them.
      for (const p of particles) {
        p.x = (p.x / pw) * w
        p.y = (p.y / ph) * h
      }
    }

    const count = window.innerWidth < 768 ? 40 : 90
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    resize()
    window.addEventListener('resize', resize, { passive: true })

    // A 2D canvas cannot resolve var(), so the ink channel is read off the
    // document once per mount and interpolated into the rgba() strings below.
    // Reading it rather than hardcoding means the canvas follows the palette
    // if --figure-rgb is ever retuned, instead of silently drifting out of it.
    // documentElement is the right element to read: this canvas is
    // position:fixed over the whole viewport, so it never sits inside an
    // .ink-band and always stands on the page ground.
    const figure = getComputedStyle(document.documentElement)
      .getPropertyValue('--figure-rgb').trim() || '10, 10, 10'

    // Halved from the values this used on the near-black ground. The texture
    // is now ink on paper, which means it shares a colour with the body copy
    // sitting on top of it — dark noise behind dark text costs far more
    // legibility than light noise behind light text did. With the element's
    // own opacity: 0.75 the effective alphas land near 0.135 and 0.05.
    const dim      = 0.18
    const lineDim  = 0.07
    const maxDist  = 130

    const paint = (advance: boolean) => {
      ctx.clearRect(0, 0, w, h)

      const dots = Array.from({ length: DOT_BUCKETS }, () => new Path2D())
      for (const p of particles) {
        if (advance) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        // opacity is seeded in 0.2..0.7
        const t = (p.opacity - 0.2) / 0.5
        const b = Math.min(DOT_BUCKETS - 1, Math.max(0, Math.floor(t * DOT_BUCKETS)))
        dots[b].moveTo(p.x + p.size, p.y)
        dots[b].arc(p.x, p.y, p.size, 0, Math.PI * 2)
      }
      for (let b = 0; b < DOT_BUCKETS; b++) {
        const a = (0.2 + ((b + 0.5) / DOT_BUCKETS) * 0.5) * dim
        ctx.fillStyle = `rgba(${figure}, ${a})`
        ctx.fill(dots[b])
      }

      const lines = Array.from({ length: LINE_BUCKETS }, () => new Path2D())
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 >= maxDist * maxDist) continue   // skip the sqrt entirely
          const near = 1 - Math.sqrt(d2) / maxDist
          const k = Math.min(LINE_BUCKETS - 1, Math.floor(near * LINE_BUCKETS))
          lines[k].moveTo(a.x, a.y)
          lines[k].lineTo(b.x, b.y)
        }
      }
      ctx.lineWidth = 0.7
      for (let k = 0; k < LINE_BUCKETS; k++) {
        ctx.strokeStyle = `rgba(${figure}, ${((k + 0.5) / LINE_BUCKETS) * lineDim})`
        ctx.stroke(lines[k])
      }
    }

    if (reduced) {
      // One still frame: the texture is the point, the drift isn't.
      paint(false)
    } else {
      const loop = () => { paint(true); raf = requestAnimationFrame(loop) }
      loop()
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced, onHome])

  if (onHome) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.75,
      }}
    />
  )
}
