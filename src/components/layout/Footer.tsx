import { NavLink } from 'react-router-dom'
import { ArrowUp }  from 'lucide-react'
import { RMLogo }   from '@/components/ui/RMLogo'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { DateTime }    from '@/components/ui/DateTime'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { navItems }    from '@/data/socials'

// ================================================================
// Footer — Minimal dark editorial footer matching spec
// © left · built-by right · back-to-top center
// ================================================================

const year = new Date().getFullYear()

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{ borderTop:'1px solid var(--border)', background:'var(--bg-base)' }} role="contentinfo">

      {/* Top section */}
      <div className="rm-container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <RMLogo showText size={28} />
            <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.875rem', color:'var(--text-muted)', lineHeight:1.65, maxWidth:'280px' }}>
              BSIT student at WVSU – Janiuay Campus. Building modern web applications and systems.
            </p>
            <SocialLinks />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'1.25rem' }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {navItems.map(item => (
                <li key={item.href}>
                  <NavLink to={item.href}
                    style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.875rem', color:'var(--text-muted)', transition:'color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info */}
          <div>
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'1.25rem' }}>
              Info
            </p>
            <div className="flex flex-col gap-2" style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.875rem', color:'var(--text-muted)' }}>
              <span>WVSU – Janiuay Campus</span>
              <span>Iloilo, Philippines</span>
              <span>Expected: 2027</span>
            </div>
            <DateTime compact className="mt-4" />
          </div>
        </div>
      </div>

      {/* Bottom bar — spec layout */}
      <div className="rm-container py-5 border-t" style={{ borderColor:'var(--border)' }}>
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.1em', color:'var(--text-subtle)' }}>
            © {year} Roberto Mediana Jr.
          </p>

          {/* Center — back to top */}
          <MagneticButton strength={0.4}>
            <button onClick={scrollTop} className="stt-btn" aria-label="Back to top">
              <ArrowUp size={14} />
            </button>
          </MagneticButton>

          {/* Right */}
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.1em', color:'var(--text-subtle)' }}>
            Designed &amp; built by Roberto M. Jr.
          </p>
        </div>
      </div>
    </footer>
  )
}
