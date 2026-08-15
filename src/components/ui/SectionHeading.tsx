import { cn } from '@/utils/cn'
import { ScrollReveal } from './ScrollReveal'

// ===================================================
// SectionHeading — Reusable section title + subtitle
// ===================================================

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <ScrollReveal className={cn('mb-12 lg:mb-16', className)}>
      <div className={cn(isCenter && 'text-center')}>
        {/* Eyebrow label */}
        {eyebrow && (
          <div
            className={cn(
              'inline-flex items-center gap-2 mb-3',
              isCenter && 'justify-center'
            )}
          >
            <div
              className="h-px w-6"
              style={{ background: 'var(--accent)' }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest font-medium"
              style={{ color: 'var(--accent-light)' }}
            >
              {eyebrow}
            </span>
            <div
              className="h-px w-6"
              style={{ background: 'var(--accent)' }}
            />
          </div>
        )}

        {/* Main heading */}
        <h2
          className={cn(
            'font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-balance',
            'overflow-wrap-anywhere min-w-0'
          )}
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={cn(
              'mt-4 text-base sm:text-lg max-w-2xl leading-relaxed',
              isCenter && 'mx-auto'
            )}
            style={{ color: 'var(--text-secondary)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  )
}
