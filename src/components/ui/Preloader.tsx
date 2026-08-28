import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Lime green branded preloader — spec timing
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone]         = useState(false)

  useEffect(() => {
    const steps  = [10, 25, 45, 62, 78, 91, 100]
    const delays = [100, 180, 220, 280, 250, 320, 180]
    let i = 0
    const tick = () => {
      if (i >= steps.length) return
      setProgress(steps[i])
      if (steps[i] === 100) {
        setTimeout(() => setDone(true), 350)
        setTimeout(onComplete, 820)
      }
      i++; setTimeout(tick, delays[i - 1] ?? 200)
    }
    setTimeout(tick, 150)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="loader"
          initial={{ opacity:1 }} exit={{ opacity:0, scale:1.03 }}
          transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
          style={{ position:'fixed', inset:0, zIndex:9999, background:'#0a0a0a',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2.5rem' }}>

          {/* RM mark */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" fill="#ffffff" fillOpacity="0.06" />
              <rect x="0.5" y="0.5" width="55" height="55" stroke="#ffffff" strokeOpacity="0.2" />
              <text x="9" y="38" fontFamily="'DM Mono', monospace" fontWeight="500" fontSize="24" fill="#ffffff" letterSpacing="-1">RM</text>
              <circle cx="48" cy="45" r="3" fill="#ffffff" />
            </svg>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}
              style={{ fontFamily:"'DM Mono', monospace", fontWeight:400, fontSize:'0.6875rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'#5a5a5a' }}>
              rm<span style={{ color:'#ffffff' }}>.</span>dev
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', width:'160px' }}>
            <div style={{ width:'100%', height:'1px', background:'#1f1f1f', overflow:'hidden' }}>
              <motion.div style={{ height:'100%', background:'#ffffff', width:`${progress}%`, transition:'width 0.35s ease-out' }} />
            </div>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#2a2a2a' }}>
              {progress < 100 ? `Loading — ${progress}%` : 'Ready'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
