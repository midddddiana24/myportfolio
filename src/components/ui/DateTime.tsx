import { Clock } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useDateTime } from '@/hooks/useDateTime'

interface DateTimeProps { className?: string; showIcon?: boolean; compact?: boolean }

export function DateTime({ className, showIcon=true, compact=false }: DateTimeProps) {
  const { date, time } = useDateTime()
  const mono = { fontFamily:"'DM Mono', monospace" }

  if (compact) return (
    <div className={cn('flex items-center gap-1.5', className)} style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.1em', color:'var(--text-subtle)' }} aria-live="polite">
      {showIcon && <Clock size={10} />}
      <span>{time}</span>
    </div>
  )

  return (
    <div className={cn('flex flex-col gap-0.5', className)} aria-live="polite">
      <div style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.08em', color:'var(--text-subtle)', display:'flex', alignItems:'center', gap:'0.375rem' }}>
        {showIcon && <Clock size={10} />}<span>{date}</span>
      </div>
      <div style={{ ...mono, fontSize:'0.75rem', fontWeight:400, color:'var(--text-muted)' }}>{time}</div>
    </div>
  )
}
