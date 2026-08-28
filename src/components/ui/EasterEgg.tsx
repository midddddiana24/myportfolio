import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKonamiCode } from '@/hooks/useKonamiCode'

function FireworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth; canvas.height = window.innerHeight

    interface P { x:number; y:number; vx:number; vy:number; alpha:number; size:number; color:string }
    const particles: P[] = []
    const colors = ['#ffffff','#e4e4e4','#f0f0f0','#8a8a8a','#c8c8c8']

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
  const activated = useKonamiCode()
  return (
    <AnimatePresence>
      {activated && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          style={{ position:'fixed', inset:0, zIndex:9990, background:'rgba(10,10,10,0.92)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <FireworkCanvas />
          <motion.div initial={{ scale:0.8, y:24 }} animate={{ scale:1, y:0 }} exit={{ scale:0.85, y:16 }}
            transition={{ type:'spring', stiffness:260, damping:22 }}
            style={{ position:'relative', zIndex:1, textAlign:'center', padding:'3rem 3.5rem', background:'#111111', border:'1px solid #1f1f1f', maxWidth:'400px' }}>
            <p style={{ fontSize:'3rem', marginBottom:'1rem' }}>🎉</p>
            <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'1.75rem', letterSpacing:'-0.04em', color:'#f0f0f0', marginBottom:'0.5rem' }}>You found it!</h2>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#ffffff', marginBottom:'1rem' }}>↑ ↑ ↓ ↓ ← → ← → B A</p>
            <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.9375rem', color:'#5a5a5a', lineHeight:1.6 }}>
              Props to curious developers who explore. I appreciate you. 🚀
            </p>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.1em', color:'#2a2a2a', marginTop:'1.5rem' }}>Auto-closes in 5s</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
