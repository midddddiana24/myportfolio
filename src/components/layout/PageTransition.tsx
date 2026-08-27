import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// ================================================================
// PageTransition — fade + slight y shift between routes
// ================================================================

interface PageTransitionProps { children: ReactNode; className?: string }

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      role="main"
    >
      {children}
    </motion.main>
  )
}
