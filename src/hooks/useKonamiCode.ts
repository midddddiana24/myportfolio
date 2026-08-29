import { useCallback, useEffect, useRef, useState } from 'react'

const SEQUENCE = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a',
]

/**
 * Watches for the Konami code. Returns the flag plus an explicit dismiss so
 * the overlay can be closed with Escape instead of only timing out — a
 * full-screen panel that ignores every key for five seconds is a trap.
 *
 * The auto-close timer is tracked in a ref and cleared on both dismiss and
 * unmount. It used to be a bare setTimeout: entering the code twice in five
 * seconds stacked timers, so the second reveal was cut short by the first
 * one's callback, and unmounting mid-reveal left it to fire into nothing.
 */
export function useKonamiCode(): [boolean, () => void] {
  const [activated, setActivated] = useState(false)
  const buf   = useRef<string[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  const dismiss = useCallback(() => {
    clear()
    setActivated(false)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Case-insensitive so the final "b a" still lands with caps lock on or
      // shift held; e.key would otherwise be 'B'/'A' and silently miss.
      buf.current = [...buf.current, e.key.length === 1 ? e.key.toLowerCase() : e.key]
        .slice(-SEQUENCE.length)
      if (buf.current.join(',') === SEQUENCE.join(',')) {
        clear()
        setActivated(true)
        timer.current = setTimeout(() => {
          timer.current = null
          setActivated(false)
        }, 5000)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clear()
    }
  }, [])

  return [activated, dismiss]
}
