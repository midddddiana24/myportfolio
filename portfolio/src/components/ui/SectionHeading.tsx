import { cn } from '@/utils/cn'
import { ScrollReveal } from './ScrollReveal'

interface SectionHeadingProps {
  eyebrow?: string; title: string; subtitle?: string; align?: 'left'|'center'; className?: string
}

export function SectionHeading({ eyebrow, title, subtitle, align='left', className }: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <ScrollReveal className={cn('mb-12 lg:mb-16', className)}>
      <div className={cn(isCenter && 'text-center')}>
        {eyebrow && <p className={cn('t-eyebrow mb-3', isCenter && 'justify-center')}>{eyebrow}</p>}
        <h2 className="t-display text-3xl sm:text-4xl lg:text-5xl text-balance" style={{ color:'var(--text-1)', letterSpacing:'-0.04em' }}>{title}</h2>
        {subtitle && <p className={cn('mt-4 text-base sm:text-lg max-w-2xl leading-relaxed', isCenter && 'mx-auto')} style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>{subtitle}</p>}
      </div>
    </ScrollReveal>
  )
}
