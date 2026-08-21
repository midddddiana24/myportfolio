import { useEffect, useRef, useState } from 'react'

// ================================================================
// StatCounter — Counts up from 0 to target when scrolled into view
// ================================================================

interface StatCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number   // ms
  label: string
  className?: string
}

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }

export function StatCounter({
  target, suffix = '', prefix = '', duration = 1800, label, className,
}: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setCount(target); return }

    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOut(progress) * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])

  return (
    <div ref={ref} className={className}>
      <p style={{
        fontFamily: "'Geist', sans-serif", fontWeight: 800,
        fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.05em',
        color: 'var(--text-1)',
      }}>
        {prefix}{count}{suffix}
      </p>
      <p className="t-eyebrow mt-1" style={{ color: 'var(--text-3)' }}>{label}</p>
    </div>
  )
}
