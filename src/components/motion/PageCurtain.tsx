import { useEffect, useRef } from 'react'
import { useLocation }       from 'react-router-dom'
import { gsap, EASE_POWER4, DUR_NORMAL, DUR_FAST } from '@/lib/gsap'

// Lime green curtain page transition
export function PageCurtain() {
  const panelRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const panel = panelRef.current
    const label = labelRef.current
    if (!panel || !label) return

    gsap.killTweensOf([panel, label])
    const tl = gsap.timeline()

    tl.set(panel, { scaleY:1, transformOrigin:'bottom center', display:'flex' })
    tl.fromTo(panel,
      { scaleY:0, transformOrigin:'bottom center' },
      { scaleY:1, duration:DUR_NORMAL, ease:EASE_POWER4 }
    )
    tl.fromTo(label,
      { opacity:0, y:20 },
      { opacity:1, y:0, duration:DUR_FAST, ease:EASE_POWER4 }, '-=0.35'
    )
    tl.to(panel,
      { scaleY:0, transformOrigin:'top center', duration:DUR_NORMAL, ease:EASE_POWER4 }, '+=0.12'
    )
    tl.set(panel, { display:'none' })

    return () => { tl.kill() }
  }, [location.pathname])

  const labels: Record<string,string> = {
    '/':'/home', '/about':'/about', '/tech-stack':'/stack',
    '/services':'/services', '/projects':'/work', '/contact':'/contact',
  }
  const lbl = labels[location.pathname] ?? '/page'

  return (
    <div ref={panelRef} style={{
      position:'fixed', inset:0, zIndex:9997, background:'#ffffff',
      display:'none', alignItems:'center', justifyContent:'center', pointerEvents:'none',
    }} aria-hidden="true">
      <div ref={labelRef} style={{
        fontFamily:"'DM Mono', monospace", fontWeight:400,
        fontSize:'clamp(1.5rem,6vw,4rem)', letterSpacing:'0.08em',
        textTransform:'uppercase', color:'#0a0a0a', opacity:0,
      }}>
        {lbl}
      </div>
    </div>
  )
}
