import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react'
import { gsap, EASE_POWER4 } from '@/lib/gsap'

// ================================================================
// TextReveal v2 — char-by-char OR word-by-word with skewY
// The signature animation from rojvillacampa
// No paid GSAP SplitText required
// ================================================================

interface TextRevealProps {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  stagger?: number
  trigger?: 'load' | 'scroll'
  splitBy?: 'words' | 'chars'
  skewY?: number
  once?: boolean
}

function split(text: string, mode: 'words' | 'chars'): string[] {
  return mode === 'chars'
    ? text.split('').map(c => c === ' ' ? '\u00A0' : c)
    : text.split(' ')
}

export function TextReveal({
  children,
  as: Tag = 'div',
  className,
  style,
  delay = 0,
  duration = 1.0,
  stagger = 0.03,
  trigger = 'scroll',
  splitBy = 'words',
  skewY = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rawText = el.textContent ?? ''
    const parts   = split(rawText, splitBy)
    const isWords = splitBy === 'words'

    // Build DOM: each part = overflow:hidden wrapper + inner span
    el.innerHTML = ''
    const inners: HTMLSpanElement[] = []

    parts.forEach((part, i) => {
      const outer  = document.createElement('span')
      outer.style.cssText = 'overflow:hidden;display:inline-block;vertical-align:top'
      const inner  = document.createElement('span')
      inner.style.cssText = `display:inline-block;transform:translateY(110%) skewY(${skewY}deg)`
      inner.textContent   = part
      outer.appendChild(inner)
      el.appendChild(outer)
      inners.push(inner)
      // Add space between words
      if (isWords && i < parts.length - 1) el.appendChild(document.createTextNode(' '))
    })

    const animProps = {
      y: '0%',
      skewY: 0,
      duration,
      stagger,
      ease: EASE_POWER4,
    }

    let ctx: gsap.Context

    if (trigger === 'load') {
      ctx = gsap.context(() => {
        gsap.fromTo(inners, { y: '110%', skewY }, { ...animProps, delay })
      })
    } else {
      ctx = gsap.context(() => {
        gsap.fromTo(inners, { y: '110%', skewY }, {
          ...animProps, delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once },
        })
      })
    }

    return () => {
      ctx.revert()
      el.textContent = rawText
    }
  }, [delay, duration, stagger, trigger, splitBy, skewY, once])

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>
}

// ── Simplified CSS version for simple reveals ─────────────────
export function TextRevealCSS({
  children, className, delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <span className={className} style={{ overflow: 'hidden', display: 'inline-block' }}>
      <span style={{ display: 'inline-block', animation: `slideUp 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s both` }}>
        {children}
      </span>
    </span>
  )
}
