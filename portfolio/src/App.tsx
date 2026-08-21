import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { Navbar }          from '@/components/layout/Navbar'
import { Footer }          from '@/components/layout/Footer'
import { ScrollProgress }  from '@/components/ui/ScrollProgress'
import { ScrollToTop }     from '@/components/ui/ScrollToTop'
import { CustomCursor }    from '@/components/ui/CustomCursor'
import { EasterEgg }       from '@/components/ui/EasterEgg'
import { Preloader }       from '@/components/ui/Preloader'
import { ParticleCanvas }  from '@/components/3d/ParticleCanvas'
import { SmoothScroll }    from '@/components/motion/SmoothScroll'
import { PageCurtain }     from '@/components/motion/PageCurtain'

const Home          = lazy(() => import('@/pages/Home'))
const About         = lazy(() => import('@/pages/About'))
const TechStack     = lazy(() => import('@/pages/TechStack'))
const Services      = lazy(() => import('@/pages/Services'))
const Projects      = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Contact       = lazy(() => import('@/pages/Contact'))
const NotFound      = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status">
      <div className="w-7 h-7 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<Home />} />
        <Route path="/about"          element={<About />} />
        <Route path="/tech-stack"     element={<TechStack />} />
        <Route path="/services"       element={<Services />} />
        <Route path="/projects"       element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="*"               element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  return (
    <BrowserRouter>
      {/* Preloader — must be outside SmoothScroll */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Custom cursor (desktop only) */}
      {!isTouchDevice && <CustomCursor />}

      {/* Easter egg overlay */}
      <EasterEgg />

      {/* Global 2D particle background */}
      <ParticleCanvas />

      {/* Lenis smooth scroll wraps everything */}
      <SmoothScroll>
        <div className="min-h-screen flex flex-col relative z-[1]"
          style={{ background: 'transparent', color: 'var(--text-1)' }}>
          <ScrollProgress />

          {/* Page transition curtain */}
          <PageCurtain />

          <Navbar />

          <div className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </div>

          <Footer />
        </div>
      </SmoothScroll>

      <ScrollToTop />
    </BrowserRouter>
  )
}
