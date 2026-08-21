import { useEffect, useRef, useState } from 'react'

const SEQUENCE = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a',
]

export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false)
  const buf = useRef<string[]>([])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      buf.current = [...buf.current, e.key].slice(-SEQUENCE.length)
      if (buf.current.join(',') === SEQUENCE.join(',')) {
        setActivated(true)
        setTimeout(() => setActivated(false), 5000)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return activated
}
