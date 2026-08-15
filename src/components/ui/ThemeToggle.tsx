import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useTheme } from '@/hooks/useTheme'

// ===================================================
// ThemeToggle — Dark / Light mode switch
// ===================================================

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md'
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme()

  const iconSize = size === 'sm' ? 15 : 18

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl transition-all duration-300',
        'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        size === 'sm' ? 'w-8 h-8' : 'w-10 h-10',
        className
      )}
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--text-secondary)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Moon size={iconSize} style={{ color: 'var(--accent-light)' }} />
        ) : (
          <Sun size={iconSize} style={{ color: 'var(--accent)' }} />
        )}
      </motion.div>
    </button>
  )
}
