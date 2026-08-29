import { useEffect, useState } from 'react'

/**
 * Tracks `prefers-reduced-motion: reduce`, live.
 *
 * The canonical place to ask this question. Seven older components still
 * call matchMedia inline inside an effect — TerrainCanvas, WireGlobe,
 * ParticleCanvas, ClipReveal, TextReveal, StatCounter and useScrollReveal.
 * Those work and are deliberately left alone, but most read the value once
 * at mount, so toggling the OS setting does nothing for them until a
 * remount. This hook re-renders on change instead. Prefer it in new code.
 *
 * Returns false during SSR/prerender, where there is no matchMedia and no
 * motion to speak of anyway.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return reduced
}
