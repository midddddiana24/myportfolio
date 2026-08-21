import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ================================================================
// Preloader — RM branded splash screen
// Hides Three.js canvas flash · Minimum 1.8s display · Smooth exit
// ================================================================

interface PreloaderProps { onComplete: () => void }

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')

  useEffect(() => {
    // Simulate load progress
    const steps = [15, 30, 50, 65, 80, 92, 100]
    const delays = [120, 200, 250, 300, 280, 350, 200]
    let i = 0
    const tick = () => {
      if (i >= steps.length) return
      setProgress(steps[i])
      if (steps[i] === 100) {
        setTimeout(() => { setPhase('done') }, 400)
        setTimeout(onComplete, 900)
      }
      i++
      setTimeout(tick, delays[i - 1] ?? 200)
    }
    // Enforce minimum display time
    const minTimer = setTimeout(tick, 200)
    return () => clearTimeout(minTimer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--bg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* RM Logo animate in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            {/* Animated SVG mark */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-label="RM Logo">
              <rect width="64" height="64" rx="16" fill="var(--accent)" fillOpacity="0.12" />
              <rect x="1" y="1" width="62" height="62" rx="15" stroke="var(--accent)" strokeOpacity="0.3" />
              <motion.text
                x="8" y="44"
                fontFamily="'Geist Mono', monospace" fontWeight="700" fontSize="28"
                fill="var(--accent)" letterSpacing="-1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.4 }}
              >
                RM
              </motion.text>
              <motion.circle cx="56" cy="52" r="4" fill="var(--accent)"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} />
            </svg>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.03em', color: 'var(--text-1)' }}
            >
              roberto<span style={{ color: 'var(--accent)' }}>.</span>
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '180px' }}
          >
            <div style={{ width: '100%', height: '2px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent-h))', borderRadius: '999px', transformOrigin: 'left' }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
              {progress < 100 ? 'Loading experience...' : 'Ready'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
