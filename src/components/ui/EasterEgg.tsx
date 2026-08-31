import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function FireworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth; canvas.height = window.innerHeight

    interface P { x:number; y:number; vx:number; vy:number; alpha:number; size:number; color:string }
    const particles: P[] = []
    // Ink, not white. A 2D canvas cannot resolve var(), and these particles
    // are painted over the overlay's rgba(var(--ground-rgb), 0.92) wash — so
    // on paper a white firework is a firework you cannot see. Spread across
    // the ramp rather than flat ink so the burst still has depth.
    const colors = ['#0a0a0a','#2a2a2a','#3a3a3a','#5a5a5a','#8a8a8a']

    for (let b = 0; b < 6; b++) {
      const bx = Math.random() * canvas.width, by = Math.random() * canvas.height * 0.6 + 50
      for (let i = 0; i < 70; i++) {
        const angle = (Math.PI*2*i)/70, speed = 2+Math.random()*5
        particles.push({ x:bx, y:by, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed-2,
          alpha:1, size:2+Math.random()*2.5, color:colors[Math.floor(Math.random()*colors.length)] })
      }
    }
    let raf: number
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      for (const p of particles) {
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.1; p.alpha-=0.01
        if (p.alpha<=0) continue
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
        ctx.fillStyle=p.color; ctx.globalAlpha=p.alpha; ctx.fill()
      }
      ctx.globalAlpha=1
      if (particles.some(p=>p.alpha>0)) raf=requestAnimationFrame(draw)
    }
    raf=requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }} />
}

export function EasterEgg() {
  const [activated, dismiss] = useKonamiCode()
  const reduced   = useReducedMotion()

  // Escape closes it. A full-screen overlay with no dismissable control is a
  // trap even when it times out — five seconds is a long time to be stuck
  // looking at something you can't leave.
  useEffect(() => {
    if (!activated) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [activated, dismiss])

  return (
    <AnimatePresence>
      {activated && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          role="status" aria-live="polite" aria-label="Easter egg unlocked"
          onClick={dismiss}
          style={{ position:'fixed', inset:0, zIndex:9990, background:'rgba(var(--ground-rgb), 0.92)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* The reward panel still appears — the person typed a ten-key
              cheat code to get here and should get their payoff. It's the
              420 particles flying outward under gravity that go, since a
              deliberate reveal is no reason to override a stated need. */}
          {!reduced && <FireworkCanvas />}
          <motion.div initial={{ scale:0.8, y:24 }} animate={{ scale:1, y:0 }} exit={{ scale:0.85, y:16 }}
            transition={{ type:'spring', stiffness:260, damping:22 }}
            style={{ position:'relative', zIndex:1, textAlign:'center', padding:'3rem 3.5rem', background:'var(--bg-surface)', border:'1px solid var(--border)', maxWidth:'400px' }}>
            {/* Decorative: the heading already says "You found it!", so
                announcing "party popper" first adds nothing. */}
            <p aria-hidden="true" style={{ fontSize:'3rem', marginBottom:'1rem' }}>🎉</p>
            <h2 style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'1.75rem', letterSpacing:'0em', color:'var(--text-1)', marginBottom:'0.5rem' }}>You found it!</h2>
            <p aria-label="Up up down down left right left right B A"
              style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem' }}>↑ ↑ ↓ ↓ ← → ← → B A</p>
            <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.9375rem', color:'var(--text-muted)', lineHeight:1.6 }}>
              Props to curious developers who explore. I appreciate you. 🚀
            </p>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.1em', color:'var(--text-subtle)', marginTop:'1.5rem' }}>Press Esc to close · auto-closes in 5s</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
