import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// ================================================================
// PageTransition — fade + slight y shift between routes
//
// Renders the page's <main> landmark and carries id="main", the target
// of App.tsx's skip link. AnimatePresence runs in mode="wait", so the
// outgoing page finishes exiting before the next mounts and only one
// #main is ever in the document. tabIndex={-1} makes it focusable
// programmatically (but not tabbable) so focus can be moved there.
// ================================================================

interface PageTransitionProps { children: ReactNode; className?: string }

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.main>
  )
}
