import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import { fadeUp } from '@/utils/animations'

// ===================================================
// ScrollReveal — Scroll-triggered animation wrapper
// ===================================================

interface ScrollRevealProps {
  children: ReactNode
  variants?: Variants
  className?: string
  delay?: number
  once?: boolean
  threshold?: number
}

export function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const modifiedVariants: Variants = {
    ...variants,
    visible: {
      ...(typeof variants.visible === 'object' ? variants.visible : {}),
      transition: {
        ...(typeof variants.visible === 'object' &&
        'transition' in variants.visible &&
        typeof variants.visible.transition === 'object'
          ? variants.visible.transition
          : {}),
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={modifiedVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Stagger container for multiple children ─────────
interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function StaggerReveal({ children, className, once = true }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { itemVariants as staggerItemVariants }
