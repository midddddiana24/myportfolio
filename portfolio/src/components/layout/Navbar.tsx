import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RMLogo } from '@/components/ui/RMLogo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { navItems } from '@/data/socials'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="rm-container">
          <nav className={`flex items-center justify-between px-5 rounded-xl transition-all duration-300 ${scrolled ? 'py-2.5 glass shadow-sm' : 'py-4'}`} aria-label="Main navigation">
            <NavLink to="/" aria-label="Home"><RMLogo showText size={30} /></NavLink>

            <ul className="hidden md:flex items-center gap-0.5" role="list">
              {navItems.map(item => (
                <li key={item.href}>
                  <NavLink to={item.href} end={item.href === '/'} className="block px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-semibold"
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--text-1)' : 'var(--text-2)',
                      background: isActive ? 'var(--card)' : 'transparent',
                      fontFamily: "'Geist', sans-serif", letterSpacing: '-0.01em',
                    })}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle size="sm" />
              {/* Available badge */}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all"
                style={{ background: 'var(--accent-dim)', borderColor: 'rgba(207,69,0,0.2)', color: 'var(--accent-h)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available
              </span>
              <button onClick={() => setOpen(true)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border"
                style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text-1)' }} aria-label="Open menu">
                <Menu size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60]" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="fixed top-0 right-0 bottom-0 z-[70] w-64 flex flex-col"
              style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              aria-modal="true" role="dialog">
              <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--border)' }}>
                <RMLogo showText size={28} />
                <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg border"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text-1)' }}><X size={15} /></button>
              </div>
              <nav className="flex-1 p-4">
                <ul className="flex flex-col gap-0.5">
                  {navItems.map((item, i) => (
                    <motion.li key={item.href} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 + 0.06 }}>
                      <NavLink to={item.href} end={item.href === '/'} className="flex px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                        style={({ isActive }) => ({
                          background: isActive ? 'var(--accent-dim)' : 'transparent',
                          color: isActive ? 'var(--accent-h)' : 'var(--text-2)',
                          fontFamily: "'Geist', sans-serif",
                        })}>
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
                <NavLink to="/contact" className="btn-primary w-full justify-center text-sm py-2.5">Hire Me</NavLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
