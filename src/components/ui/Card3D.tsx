import { useRef, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

// ================================================================
// Card3D — CSS 3D perspective tilt with mouse-tracked glare sheen
// Works on every card across the entire site
// ================================================================

interface Card3DProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  intensity?: number    // tilt degrees max (default 12)
  glare?: boolean       // show glare effect (default true)
  lift?: number         // Z lift in px on hover (default 10)
}

export function Card3D({
  children, className, style,
  intensity = 12, glare = true, lift = 10,
}: Card3DProps) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const card  = cardRef.current
      const shine = glareRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const cx   = rect.left + rect.width  / 2
      const cy   = rect.top  + rect.height / 2
      const dx   = (e.clientX - cx) / (rect.width  / 2)  // -1 to +1
      const dy   = (e.clientY - cy) / (rect.height / 2)  // -1 to +1

      const rotY =  dx * intensity
      const rotX = -dy * intensity

      card.style.transform = [
        `perspective(900px)`,
        `rotateY(${rotY}deg)`,
        `rotateX(${rotX}deg)`,
        `translateZ(${lift}px)`,
        `scale(1.015)`,
      ].join(' ')

      // Dynamic shadow follows tilt
      card.style.boxShadow = [
        `${-dx * 18}px ${-dy * 18}px 40px rgba(255,255,255,0.10)`,
        `0 ${lift * 2}px ${lift * 4}px rgba(0,0,0,0.25)`,
      ].join(', ')

      // Glare position
      if (glare && shine) {
        const gx = ((e.clientX - rect.left) / rect.width)  * 100
        const gy = ((e.clientY - rect.top)  / rect.height) * 100
        shine.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14) 0%, transparent 65%)`
        shine.style.opacity = '1'
      }
    })
  }

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current)
    const card  = cardRef.current
    const shine = glareRef.current
    if (!card) return
    card.style.transform    = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)'
    card.style.boxShadow    = ''
    if (shine) shine.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className={cn(className)}
      style={{
        ...style,
        transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1), box-shadow 0.18s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: 'absolute', inset: 0,
            opacity: 0,
            borderRadius: 'inherit',
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
      )}
      {children}
    </div>
  )
}
