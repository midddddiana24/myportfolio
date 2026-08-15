import { Clock } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useDateTime } from '@/hooks/useDateTime'

// ===================================================
// DateTime — Live date and time display
// ===================================================

interface DateTimeProps {
  className?: string
  showIcon?: boolean
  compact?: boolean
}

export function DateTime({
  className,
  showIcon = true,
  compact = false,
}: DateTimeProps) {
  const { date, time } = useDateTime()

  if (compact) {
    return (
      <div
        className={cn('flex items-center gap-1.5 font-mono text-xs', className)}
        style={{ color: 'var(--text-muted)' }}
        aria-label={`Current time: ${time}`}
        aria-live="polite"
      >
        {showIcon && <Clock size={12} />}
        <span>{time}</span>
      </div>
    )
  }

  return (
    <div
      className={cn('flex flex-col gap-0.5', className)}
      aria-live="polite"
      aria-label={`Current date and time: ${date}, ${time}`}
    >
      <div
        className="flex items-center gap-1.5 font-mono text-xs"
        style={{ color: 'var(--text-muted)' }}
      >
        {showIcon && <Clock size={12} />}
        <span>{date}</span>
      </div>
      <div
        className="font-mono text-base font-medium"
        style={{ color: 'var(--text-secondary)' }}
      >
        {time}
      </div>
    </div>
  )
}
