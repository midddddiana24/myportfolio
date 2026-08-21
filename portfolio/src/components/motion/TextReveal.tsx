import { useRef, useEffect, type ReactNode } from 'react'
import { gsap, EASE_POWER4, DUR_SLOW } from '@/lib/gsap'

// ================================================================
// TextReveal — The signature "slide up from mask" animation
// Each word gets wrapped in overflow:hidden · chars slide up on cue
// Works on page load (timeline) OR scroll trigger
// ================================================================

interface TextRevealProps {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
  stagger?: number
  trigger?: 'load' | 'scroll'
  splitBy?: 'words' | 'chars' | 'lines'
  once?: boolean
}

// Splits a string into word spans wrapped in overflow-hidden masks
function splitToWords(text: string): HTMLSpanElement[] {
  return text.split(' ').map(word => {
    const outer = document.createElement('span')
    outer.style.cssText = 'overflow:hidden;display:inline-block;vertical-align:top'
    const inner = document.createElement('span')
    inner.style.cssText = 'display:inline-block;transform:translateY(110%)'
    inner.textContent = word
    outer.appendChild(inner)
    return outer
  })
}

// Splits into individual character spans
function splitToChars(text: string): HTMLSpanElement[] {
  return text.split('').map((char) => {
    const outer = document.createElement('span')
    outer.style.cssText = 'overflow:hidden;display:inline-block'
    const inner = document.createElement('span')
    inner.style.cssText = 'display:inline-block;transform:translateY(110%)'
    inner.textContent = char === ' ' ? '\u00A0' : char
    outer.appendChild(inner)
    return outer
  })
}

export function TextReveal({
  children,
  as: Tag = 'div',
  className,
  style,
  delay = 0,
  duration = DUR_SLOW,
  stagger = 0.05,
  trigger = 'scroll',
  splitBy = 'words',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Grab all direct text nodes
    const text = el.textContent ?? ''
    el.innerHTML = ''

    let spans: HTMLSpanElement[]
    if (splitBy === 'chars') {
      spans = splitToChars(text)
      spans.forEach((s, i) => {
        if (i < spans.length - 1 && s.textContent !== '\u00A0') {
          // Add space after word groups
        }
        el.appendChild(s)
      })
    } else {
      spans = splitToWords(text)
      spans.forEach((s, i) => {
        el.appendChild(s)
        if (i < spans.length - 1) {
          const space = document.createTextNode(' ')
          el.appendChild(space)
        }
      })
    }

    // Get the inner elements (what we animate)
    const inners = spans.map(s => s.querySelector('span')).filter(Boolean)

    let anim: gsap.core.Tween | gsap.core.Timeline

    if (trigger === 'load') {
      anim = gsap.to(inners, {
        y: '0%',
        duration,
        stagger,
        delay,
        ease: EASE_POWER4,
      })
    } else {
      anim = gsap.to(inners, {
        y: '0%',
        duration,
        stagger,
        ease: EASE_POWER4,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once,
        },
      })
    }

    return () => {
      if (anim) anim.kill()
      // Restore element
      el.textContent = text
    }
  }, [delay, duration, stagger, trigger, splitBy, once])

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>
}

// ── Simpler version using IntersectionObserver for non-GSAP contexts ──
export function TextRevealCSS({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <span
      className={className}
      style={{ overflow: 'hidden', display: 'inline-block' }}
    >
      <span
        style={{
          display: 'inline-block',
          animation: `slideUp 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
        }}
      >
        {children}
      </span>
    </span>
  )
}
