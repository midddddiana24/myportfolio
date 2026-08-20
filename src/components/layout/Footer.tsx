import { NavLink } from 'react-router-dom'
import { RMLogo } from '@/components/ui/RMLogo'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { DateTime } from '@/components/ui/DateTime'
import { navItems } from '@/data/socials'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="pt-14 pb-8 border-t" style={{ borderColor:'var(--border)', background:'var(--surface)' }} role="contentinfo">
      <div className="rm-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <RMLogo showText size={30} />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
              BSIT student at West Visayas State University — Janiuay Campus. Building modern web applications and systems.
            </p>
            <SocialLinks />
          </div>
          <nav aria-label="Footer navigation">
            <p className="t-eyebrow mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {navItems.map(item => (
                <li key={item.href}>
                  <NavLink to={item.href} className="text-sm transition-colors duration-150" style={{ color:'var(--text-3)', fontFamily:"'Geist', sans-serif", fontWeight:500 }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-1)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="t-eyebrow mb-4">Info</p>
            <div className="flex flex-col gap-2 text-sm" style={{ color:'var(--text-3)', fontFamily:"'Geist', sans-serif" }}>
              <span>WVSU – Janiuay Campus</span>
              <span>Iloilo, Philippines</span>
              <span>Expected Graduation: 2027</span>
            </div>
            <DateTime compact className="mt-4" />
          </div>
        </div>
        <div className="rm-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color:'var(--text-3)', fontFamily:"'Geist Mono', monospace" }}>© {year} Roberto Mediana Jr. All rights reserved.</p>
          <p className="text-xs" style={{ color:'var(--text-3)', fontFamily:"'Geist Mono', monospace" }}>Built with React + Geist</p>
        </div>
      </div>
    </footer>
  )
}
