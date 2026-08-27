import type { ReactNode } from 'react'

// ================================================================
// Marquee — Infinite horizontal scroll ticker
// Used for skills section and tech stack
// ================================================================

interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  gap?: string
}

export function Marquee({ children, reverse = false, speed = 'normal', className, gap = '3rem' }: MarqueeProps) {
  const duration = speed === 'slow' ? '36s' : speed === 'fast' ? '18s' : '26s'

  return (
    <div className={`overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${reverse ? 'marqueeRev' : 'marquee'} ${duration} linear infinite`,
          gap,
        }}
      >
        {/* Two copies for seamless loop */}
        <div style={{ display: 'flex', gap, flexShrink: 0 }}>{children}</div>
        <div style={{ display: 'flex', gap, flexShrink: 0 }}>{children}</div>
      </div>
    </div>
  )
}
