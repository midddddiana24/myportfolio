import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// ===================================================
// ScrollProgress — Thin scroll indicator at the top
// ===================================================

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setIsVisible(v > 0.01))
    return () => unsub()
  }, [scrollYProgress])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
        boxShadow: '0 0 8px var(--accent-glow)',
      }}
    />
  )
}
