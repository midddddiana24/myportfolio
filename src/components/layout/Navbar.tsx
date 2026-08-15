import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RMLogo } from '@/components/ui/RMLogo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { navItems } from '@/data/socials'
import { cn } from '@/utils/cn'

// ===================================================
// Navbar — Floating glass navbar with mobile drawer
// ===================================================

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  // Track scroll for background opacity
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      {/* ── Main Navbar ─────────────────────────────── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'py-3' : 'py-5'
        )}
        role="banner"
      >
        <div
          className={cn(
            'rm-container transition-all duration-300',
          )}
        >
          <nav
            className={cn(
              'flex items-center justify-between px-4 sm:px-6 rounded-2xl transition-all duration-300',
              isScrolled
                ? 'py-3 glass shadow-lg shadow-black/20'
                : 'py-4'
            )}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <NavLink
              to="/"
              aria-label="Go to homepage"
              className="flex-shrink-0"
            >
              <RMLogo showText size={36} />
            </NavLink>

            {/* Desktop Nav */}
            <ul
              className="hidden md:flex items-center gap-1"
              role="list"
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'text-white bg-accent/90'
                          : 'hover:bg-white/5'
                      )
                    }
                    style={({ isActive }) => ({
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      background: isActive ? 'var(--accent)' : undefined,
                    })}
                    end={item.href === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle size="sm" />

              {/* CTA */}
              <NavLink
                to="/contact"
                className="hidden sm:inline-flex btn-primary text-sm py-2 px-4"
              >
                Let's Connect
              </NavLink>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className={cn(
                  'md:hidden w-9 h-9 inline-flex items-center justify-center rounded-xl',
                  'border transition-colors duration-200'
                )}
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Open navigation menu"
                aria-expanded={isMobileOpen}
              >
                <Menu size={18} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile Drawer ───────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 flex flex-col overflow-y-auto"
              style={{
                background: 'var(--surface)',
                borderLeft: '1px solid var(--border)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between p-5"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <RMLogo showText size={32} />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-xl border transition-colors duration-200"
                  style={{
                    background: 'var(--card)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Close navigation menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1" role="list">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <NavLink
                        to={item.href}
                        className="flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={({ isActive }) => ({
                          background: isActive ? 'var(--accent-dim)' : 'transparent',
                          color: isActive ? 'var(--accent-light)' : 'var(--text-secondary)',
                          borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                        })}
                        end={item.href === '/'}
                      >
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div
                className="p-5"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <NavLink
                  to="/contact"
                  className="btn-primary w-full justify-center text-sm py-3"
                >
                  Let's Connect
                </NavLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
