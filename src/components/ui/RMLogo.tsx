import { cn } from '@/utils/cn'

// ===================================================
// RM Logo — Roberto Mediana Jr. Personal Brand Mark
// A clean developer monogram: RM in a terminal-bracket style
// ===================================================

interface RMLogoProps {
  size?: number
  className?: string
  showText?: boolean
  textClassName?: string
}

export function RMLogo({
  size = 36,
  className,
  showText = false,
  textClassName,
}: RMLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* SVG Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="RM logo"
        role="img"
      >
        {/* Background rect with subtle border */}
        <rect
          width="40"
          height="40"
          rx="10"
          fill="var(--accent)"
          fillOpacity="0.12"
        />
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          rx="9.5"
          stroke="var(--accent)"
          strokeOpacity="0.4"
        />

        {/* Left bracket */}
        <path
          d="M8 10 L4 20 L8 30"
          stroke="var(--accent-light)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* R letterform */}
        <text
          x="10"
          y="26"
          fontFamily="'Syne', system-ui, sans-serif"
          fontWeight="800"
          fontSize="18"
          fill="var(--accent-light)"
          letterSpacing="-0.5"
        >
          R
        </text>

        {/* M letterform */}
        <text
          x="22"
          y="26"
          fontFamily="'Syne', system-ui, sans-serif"
          fontWeight="800"
          fontSize="18"
          fill="white"
          fillOpacity="0.9"
          letterSpacing="-0.5"
        >
          M
        </text>

        {/* Right bracket */}
        <path
          d="M32 10 L36 20 L32 30"
          stroke="var(--accent-light)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Optional wordmark */}
      {showText && (
        <span
          className={cn(
            'font-display font-bold text-lg tracking-tight',
            textClassName
          )}
          style={{ color: 'var(--text-primary)' }}
        >
          Roberto
          <span style={{ color: 'var(--accent-light)' }}> M</span>
        </span>
      )}
    </div>
  )
}

// ── Favicon SVG (exported as string for public/favicon.svg) ──
export const faviconSVGString = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="#7c3aed"/>
  <text x="4" y="23" font-family="system-ui" font-weight="800" font-size="16" fill="white">RM</text>
</svg>`
