import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// ================================================================
// ScrollToTop — Appears after 30% scroll · Smooth scroll to top
// ================================================================

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setVisible(pct > 0.28)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed', bottom: '1.75rem', right: '1.75rem',
            zIndex: 500, width: '42px', height: '42px',
            borderRadius: '12px',
            background: 'var(--accent)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'none',
            boxShadow: '0 4px 20px var(--accent-glow)',
            transition: 'box-shadow 0.2s',
          }}
          whileHover={{ scale: 1.08, boxShadow: '0 6px 28px var(--accent-glow)' }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowUp size={17} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
