import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30 })
  const [visible, setVisible] = useState(false)
  useEffect(() => { const u = scrollYProgress.on('change', v => setVisible(v>0.01)); return u }, [scrollYProgress])
  if (!visible) return null
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX, background:'linear-gradient(90deg, var(--accent), var(--accent-h))', boxShadow:'0 0 6px var(--accent-glow)' }} />
  )
}
