import { Clock } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useDateTime } from '@/hooks/useDateTime'

interface DateTimeProps { className?: string; showIcon?: boolean; compact?: boolean }

export function DateTime({ className, showIcon=true, compact=false }: DateTimeProps) {
  const { date, time } = useDateTime()
  if (compact) {
    return (
      <div className={cn('flex items-center gap-1.5', className)} style={{ fontFamily:"'Geist Mono', monospace", fontSize:'0.6875rem', color:'var(--text-3)' }} aria-live="polite">
        {showIcon && <Clock size={11} />}
        <span>{time}</span>
      </div>
    )
  }
  return (
    <div className={cn('flex flex-col gap-0.5', className)} aria-live="polite">
      <div className="flex items-center gap-1.5" style={{ fontFamily:"'Geist Mono', monospace", fontSize:'0.6875rem', color:'var(--text-3)' }}>
        {showIcon && <Clock size={11} />}
        <span>{date}</span>
      </div>
      <div style={{ fontFamily:"'Geist Mono', monospace", fontSize:'0.875rem', fontWeight:500, color:'var(--text-2)' }}>{time}</div>
    </div>
  )
}
