import { cn } from '@/utils/cn'

interface RMLogoProps {
  size?: number; className?: string; showText?: boolean
}

export function RMLogo({ size = 32, className, showText = false }: RMLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* currentColor, not a literal, so the mark follows whatever ground it
          is standing on: ink on paper by default, white inside an .ink-band.
          This is what retires the `logo-invert` filter the navbar used to
          need — a hue-rotate hack that only existed because the fill was
          hardcoded white and had to be flipped back over the light hero. */}
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="RM logo"
        style={{ color: 'var(--accent)' }}>
        <rect width="32" height="32" fill="currentColor" fillOpacity="0.08" />
        <rect x="0.5" y="0.5" width="31" height="31" stroke="currentColor" strokeOpacity="0.3" />
        <text x="4" y="22" fontFamily="'DM Mono', monospace" fontWeight="500" fontSize="14"
          fill="currentColor" letterSpacing="-0.5">RM</text>
        <circle cx="28" cy="25" r="2" fill="currentColor" />
      </svg>
      {showText && (
        <span style={{ fontFamily:"'DM Mono', monospace", fontWeight:500, fontSize:'0.75rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-1)' }}>
          rm<span style={{ color:'var(--accent)' }}>.</span>dev
        </span>
      )}
    </div>
  )
}
