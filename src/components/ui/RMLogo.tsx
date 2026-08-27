import { cn } from '@/utils/cn'

interface RMLogoProps {
  size?: number; className?: string; showText?: boolean
}

export function RMLogo({ size = 32, className, showText = false }: RMLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="RM logo">
        <rect width="32" height="32" fill="#c8f269" fillOpacity="0.08" />
        <rect x="0.5" y="0.5" width="31" height="31" stroke="#c8f269" strokeOpacity="0.3" />
        <text x="4" y="22" fontFamily="'DM Mono', monospace" fontWeight="500" fontSize="14"
          fill="#c8f269" letterSpacing="-0.5">RM</text>
        <circle cx="28" cy="25" r="2" fill="#c8f269" />
      </svg>
      {showText && (
        <span style={{ fontFamily:"'DM Mono', monospace", fontWeight:500, fontSize:'0.75rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#f0f0f0' }}>
          rm<span style={{ color:'#c8f269' }}>.</span>dev
        </span>
      )}
    </div>
  )
}
