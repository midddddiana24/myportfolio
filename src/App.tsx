import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ParticleCanvas } from '@/components/3d/ParticleCanvas'

const Home         = lazy(() => import('@/pages/Home'))
const About        = lazy(() => import('@/pages/About'))
const TechStack    = lazy(() => import('@/pages/TechStack'))
const Services     = lazy(() => import('@/pages/Services'))
const Projects     = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Contact      = lazy(() => import('@/pages/Contact'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
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
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
            <span className="font-mono text-6xl" style={{ color: 'var(--text-3)' }}>404</span>
            <h1 style={{ fontFamily:"'Geist', sans-serif", fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-1)' }}>Page Not Found</h1>
            <a href="/" className="btn-primary text-sm">Go Home</a>
          </div>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Global particle background (persistent across pages) */}
      <ParticleCanvas />

      <div className="min-h-screen flex flex-col relative z-[1]"
        style={{ background: 'transparent', color: 'var(--text-1)' }}>
        <ScrollProgress />
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
