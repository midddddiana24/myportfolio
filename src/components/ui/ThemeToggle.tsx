import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' }) {
  const { isDark, toggleTheme } = useTheme()
  const s = size === 'sm' ? 14 : 16
  return (
    <button
      onClick={toggleTheme}
      className={cn('inline-flex items-center justify-center rounded-lg border transition-all duration-150', size === 'sm' ? 'w-8 h-8' : 'w-9 h-9', className)}
      style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text-2)' }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={isDark ? 'moon' : 'sun'} initial={{ rotate: -20, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 20, opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }}>
          {isDark ? <Moon size={s} style={{ color: 'var(--accent-h)' }} /> : <Sun size={s} style={{ color: 'var(--accent)' }} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
