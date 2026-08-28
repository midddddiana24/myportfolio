import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:0.001 })
  const [vis, setVis] = useState(false)
  useEffect(() => { const u = scrollYProgress.on('change', v => setVis(v > 0.01)); return u }, [scrollYProgress])
  if (!vis) return null
  return (
    <motion.div className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{ height:'2px', scaleX, background:'#ffffff', boxShadow:'0 0 8px rgba(255,255,255,0.30)' }} />
  )
}
