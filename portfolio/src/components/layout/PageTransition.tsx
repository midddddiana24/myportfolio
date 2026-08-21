import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageVariants } from '@/utils/animations'

// ===================================================
// PageTransition — Smooth fade-in/out between routes
// ===================================================

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      role="main"
    >
      {children}
    </motion.main>
  )
}
