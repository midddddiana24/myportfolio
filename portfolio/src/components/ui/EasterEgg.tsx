import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKonamiCode } from '@/hooks/useKonamiCode'

// ================================================================
// EasterEgg — Konami Code (↑↑↓↓←→←→BA) triggers this celebration
// ================================================================

function FireworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle { x:number; y:number; vx:number; vy:number; alpha:number; color:string; size:number }
    const particles: Particle[] = []
    const colors = ['#CF4500','#E8702A','#F5874A','#ffffff','#F5F3EE','#FFCC88']

    for (let b = 0; b < 8; b++) {
      const bx = Math.random() * canvas.width
      const by = Math.random() * canvas.height * 0.7 + 50
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60
        const speed = 2 + Math.random() * 5
        particles.push({
          x: bx, y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 3,
        })
      }
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.alpha -= 0.012
        if (p.alpha <= 0) continue
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (particles.some(p => p.alpha > 0)) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }} />
}

export function EasterEgg() {
  const activated = useKonamiCode()

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          style={{
            position:'fixed', inset:0, zIndex:9990,
            background:'rgba(15,14,13,0.88)', backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}
        >
          <FireworkCanvas />

          <motion.div
            initial={{ scale:0.7, y:30 }} animate={{ scale:1, y:0 }}
            exit={{ scale:0.8, y:20 }} transition={{ type:'spring', stiffness:260, damping:22 }}
            style={{
              position:'relative', zIndex:1, textAlign:'center',
              padding:'3rem 3.5rem', borderRadius:'24px',
              background:'var(--card)', border:'1px solid var(--border)',
              maxWidth:'420px',
            }}
          >
            <p style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>🎉</p>
            <h2 style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'1.75rem', letterSpacing:'-0.04em', color:'var(--text-1)', marginBottom:'0.5rem' }}>
              You found it!
            </h2>
            <p style={{ fontFamily:"'Geist Mono', monospace", fontSize:'0.75rem', letterSpacing:'0.08em', color:'var(--accent-h)', textTransform:'uppercase', marginBottom:'1rem' }}>
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
            <p style={{ fontFamily:"'Geist', sans-serif", fontSize:'0.9375rem', color:'var(--text-2)', lineHeight:1.6 }}>
              Congrats on unlocking the Konami Code easter egg!<br />
              I appreciate curious developers who explore things. 🚀
            </p>
            <p style={{ fontFamily:"'Geist Mono', monospace", fontSize:'0.6875rem', color:'var(--text-3)', marginTop:'1.5rem' }}>
              Auto-closes in 5 seconds...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
