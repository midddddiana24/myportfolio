import { cn } from '@/utils/cn'

interface RMLogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export function RMLogo({ size = 32, className, showText = false }: RMLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="RM logo">
        <rect width="32" height="32" rx="8" fill="var(--accent)" fillOpacity="0.10" />
        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="var(--accent)" strokeOpacity="0.25" />
        <text x="4" y="22" fontFamily="'Geist Mono', monospace" fontWeight="700" fontSize="15" fill="var(--accent)" letterSpacing="-0.5">RM</text>
        <circle cx="28" cy="25" r="2" fill="var(--accent)" />
      </svg>
      {showText && (
        <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
          roberto<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
      )}
    </div>
  )
}
