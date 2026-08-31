import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RMLogo }          from '@/components/ui/RMLogo'
import { MagneticButton }  from '@/components/motion/MagneticButton'
import { getLenis }        from '@/components/motion/SmoothScroll'
import { navItems }        from '@/data/socials'

// ================================================================
// Navbar — Transparent → blur on scroll, DM Mono links, magnetic CTA
// ================================================================

// How far down the fixed header reaches. Used to work out which section is
// currently underneath it; see the `overInk` effect below.
const HEADER_H = 76

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [overInk, setOverInk]   = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()
  const panelRef   = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false) }, [location])

  // Two things tracked on one handler. `scrolled` is the blur. `overInk` is
  // legibility: the header is fixed, the page is paper by default but punctuated
  // with .ink-band sections, and ink-coloured nav links vanish over a black one.
  //
  // This replaces a `light` flag that asked the narrower question "is the white
  // hero still under me". That worked while the hero was the only ground change
  // on the site; the moment Work and Contact became bands it would have been
  // wrong in two places on Home and would need another special case for every
  // band added later. Asking "is a dark section under me" instead is the same
  // amount of code and self-maintaining — a new .ink-band anywhere is handled
  // by having been given the class.
  //
  // Every band is measured rather than just the first: on Home two of them
  // pass under the header at different scroll depths. `some` short-circuits on
  // the first hit and there are only ever a handful of bands, so this stays
  // cheap enough for a passive scroll handler. Re-subscribed per navigation,
  // because arriving on a route with bands produces no scroll event of its own.
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 80)
      setOverInk(
        Array.from(document.querySelectorAll('.ink-band')).some(el => {
          const r = el.getBoundingClientRect()
          // Straddling the header strip: already reaches above its bottom edge
          // and has not yet finished passing its top edge.
          return r.top < HEADER_H && r.bottom > 0
        })
      )
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('scroll', fn)
      window.removeEventListener('resize', fn)
    }
  }, [location])
  useEffect(() => {
    // body overflow alone does NOT lock the page while Lenis is running: Lenis
    // drives window scroll itself, so the content kept moving behind the open
    // drawer. Ask Lenis to stop as well. Under reduced motion getLenis() is
    // null and the plain overflow lock is the whole story.
    document.body.style.overflow = open ? 'hidden' : ''
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    return () => { document.body.style.overflow = ''; getLenis()?.start() }
  }, [open])

  // Dialog keyboard contract: Escape closes, Tab stays inside the panel, focus
  // enters on open and returns to the trigger on close. `aria-modal` hides the
  // page behind it from assistive tech but does nothing about Tab, so without
  // the wrap below focus walked straight out into the hidden header links.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return

    const SELECTOR = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(SELECTOR))
        .filter(el => el.offsetParent !== null)

    focusable()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return }
      if (e.key !== 'Tab') return
      const list = focusable()
      if (!list.length) return
      const first = list[0]
      const last  = list[list.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault(); first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      // Send focus back where it came from; otherwise closing the drawer drops
      // focus on <body> and the next Tab restarts from the top of the page.
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-blur' : ''} ${overInk ? 'ink-scope' : ''}`}>
        <div className="rm-container">
          <nav className="flex items-center justify-between py-5" aria-label="Main navigation">
            {/* Logo. No class switching: the mark paints with currentColor from
                var(--accent), so it follows whichever ground the header is
                scoped to on its own. */}
            <NavLink to="/" aria-label="Home">
              <RMLogo showText size={28} />
            </NavLink>

            {/* Desktop links — DM Mono uppercase.
                No inline colour for the active state: react-router appends an
                `active` class when className is a string, and .nav-link.active
                already sets it from var(--text-*), which flips with the scope.
                The inline style that used to be here hard-coded #ffffff and
                would have overridden both. */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {navItems.map(item => (
                <li key={item.href}>
                  <MagneticButton strength={0.25} as="div">
                    <NavLink to={item.href} end={item.href === '/'} className="nav-link">
                      {item.label}
                    </NavLink>
                  </MagneticButton>
                </li>
              ))}
            </ul>

            {/* Right: Hire Me + mobile trigger */}
            <div className="flex items-center gap-4">
              <MagneticButton strength={0.3} className="hidden sm:inline-flex">
                <NavLink to="/contact" className="btn-ghost" style={{ padding:'0.5rem 1.25rem', fontSize:'0.75rem', letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:"'DM Mono', monospace" }}>
                  Hire Me
                </NavLink>
              </MagneticButton>

              {/* Mobile menu. Colours moved out of the inline style and into
                  .nav-burger so a stylesheet rule can reach them. */}
              <button ref={triggerRef} onClick={() => setOpen(true)} className="md:hidden nav-burger"
                aria-label="Open menu" aria-expanded={open} aria-haspopup="dialog">
                <Menu size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60]" style={{ background:'rgba(var(--figure-rgb), 0.45)', backdropFilter:'blur(6px)' }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setOpen(false)} />
            <motion.aside ref={panelRef} className="fixed top-0 right-0 bottom-0 z-[70] w-64 flex flex-col"
              style={{ background:'var(--bg-surface)', borderLeft:'1px solid var(--border)' }}
              initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
              transition={{ type:'spring', stiffness:280, damping:28 }}
              aria-modal="true" role="dialog" aria-label="Site menu">
              <div className="flex items-center justify-between p-5" style={{ borderBottom:'1px solid var(--border)' }}>
                <RMLogo showText size={24} />
                {/* aria-label is load-bearing: the only child is an icon, so
                    without it this button is announced as just "button". */}
                <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center border"
                  style={{ border:'1px solid var(--border)', background:'transparent', color:'var(--text-1)' }}
                  aria-label="Close menu">
                  <X size={14} />
                </button>
              </div>
              <nav className="flex-1 p-5">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, i) => (
                    <motion.li key={item.href}
                      initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
                      transition={{ delay: i*0.05 + 0.08 }}>
                      <NavLink to={item.href} end={item.href === '/'}
                        className="block px-3 py-3 nav-link text-xs">
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="p-5" style={{ borderTop:'1px solid var(--border)' }}>
                <NavLink to="/contact" className="btn-primary w-full justify-center text-xs py-3"
                  style={{ fontFamily:"'DM Mono', monospace", letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  Hire Me
                </NavLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
