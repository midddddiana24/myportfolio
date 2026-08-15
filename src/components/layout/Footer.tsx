import { NavLink } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { RMLogo } from '@/components/ui/RMLogo'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { DateTime } from '@/components/ui/DateTime'
import { navItems } from '@/data/socials'

// ===================================================
// Footer — Professional footer with nav and socials
// ===================================================

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer
      className="relative mt-auto pt-16 pb-8"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
      role="contentinfo"
    >
      {/* Top accent gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="rm-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <RMLogo showText size={36} />
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              BSIT student at West Visayas State University — Janiuay Campus.
              Building modern web applications and systems.
            </p>
            <SocialLinks />
          </div>

          {/* Navigation column */}
          <nav
            className="flex flex-col gap-3"
            aria-label="Footer navigation"
          >
            <h3
              className="text-xs font-mono uppercase tracking-widest font-medium mb-1"
              style={{ color: 'var(--accent-light)' }}
            >
              Navigation
            </h3>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Info column */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs font-mono uppercase tracking-widest font-medium"
              style={{ color: 'var(--accent-light)' }}
            >
              Info
            </h3>
            <div className="flex flex-col gap-2">
              <span
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                West Visayas State University
              </span>
              <span
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                Janiuay Campus, Iloilo, Philippines
              </span>
              <span
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                BSIT — Expected Graduation: 2027
              </span>
            </div>
            {/* Live time */}
            <DateTime compact className="mt-2" />
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ background: 'var(--border)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: 'var(--text-muted)' }}
          >
            © {currentYear} Roberto Mediana Jr. All rights reserved.
          </p>
          <p
            className="text-xs flex items-center gap-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            Built with
            <Heart
              size={12}
              className="fill-current"
              style={{ color: 'var(--accent)' }}
              aria-hidden="true"
            />
            using React & modern web tech.
          </p>
        </div>
      </div>
    </footer>
  )
}
