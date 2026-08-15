import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

// ===================================================
// RM Portfolio — App Router
// ===================================================

// Lazy load pages for better initial bundle size
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const TechStack = lazy(() => import('@/pages/TechStack'))
const Services = lazy(() => import('@/pages/Services'))
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Contact = lazy(() => import('@/pages/Contact'))

// Loading fallback
function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{
            borderColor: 'var(--accent)',
            borderTopColor: 'transparent',
          }}
        />
        <span
          className="text-xs font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          Loading...
        </span>
      </div>
    </div>
  )
}

// AnimatePresence needs access to location
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tech-stack" element={<TechStack />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
              <span className="text-6xl">404</span>
              <h1
                className="font-display font-bold text-2xl"
                style={{ color: 'var(--text-primary)' }}
              >
                Page Not Found
              </h1>
              <a href="/" className="btn-primary text-sm">
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
      >
        {/* Global scroll progress bar */}
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />

        {/* Pages */}
        <div className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}
