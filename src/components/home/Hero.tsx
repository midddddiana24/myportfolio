import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { DateTime } from '@/components/ui/DateTime'
import { staggerContainer, staggerItem } from '@/utils/animations'

const HeroScene = lazy(() =>
  import('@/components/3d/HeroScene').then((m) => ({ default: m.HeroScene }))
)

// ===================================================
// Hero — Main homepage hero section
// ===================================================

const technologies = ['React', 'Laravel', 'Node.js', 'TypeScript', 'Vue.js', 'PostgreSQL']

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background mesh gradient */}
      <div className="absolute inset-0 mesh-bg pointer-events-none" aria-hidden="true" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="rm-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">

          {/* ── Left column: text ─────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Status badge */}
            <motion.div variants={staggerItem}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border"
                style={{
                  background: 'var(--accent-dim)',
                  borderColor: 'rgba(124,58,237,0.3)',
                  color: 'var(--accent-light)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--accent-light)' }}
                />
                Incoming 4th Year BSIT Student · Open to Collaborations
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={staggerItem} className="flex flex-col gap-2">
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-balance overflow-wrap-anywhere min-w-0"
                style={{ color: 'var(--text-primary)' }}>
                Roberto{' '}
                <span className="gradient-text">Mediana</span>{' '}
                <span style={{ color: 'var(--text-primary)' }}>Jr.</span>
              </h1>

              {/* Role line */}
              <div className="flex items-center gap-3 mt-2">
                <span
                  className="h-px flex-shrink-0 w-8"
                  style={{ background: 'var(--accent)' }}
                />
                <p
                  className="font-display font-medium text-xl sm:text-2xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Aspiring Full-Stack Developer
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Building modern, practical, and user-focused digital experiences
              through full-stack development. Currently studying at{' '}
              <span style={{ color: 'var(--text-primary)' }}>
                West Visayas State University – Janiuay Campus
              </span>{' '}
              and continuously building real projects.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">
                View My Projects
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Let's Connect
              </Link>
            </motion.div>

            {/* Social links + live time */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2"
            >
              <SocialLinks />
              <div
                className="h-px sm:h-6 sm:w-px w-16"
                style={{ background: 'var(--border)' }}
                aria-hidden="true"
              />
              <DateTime compact />
            </motion.div>

            {/* Tech tags */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
              <span
                className="text-xs font-mono flex items-center gap-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                <Sparkles size={12} />
                Working with:
              </span>
              {technologies.map((tech) => (
                <span key={tech} className="rm-tag">
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column: 3D scene ─────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative h-80 lg:h-[520px] w-full flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Glow orb behind 3D */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="w-64 h-64 rounded-full blur-3xl opacity-30"
                style={{ background: 'var(--accent)' }}
              />
            </div>

            {/* Profile image placeholder */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Profile photo placeholder"
            >
              <div
                className="w-48 h-48 rounded-full border-2 flex flex-col items-center justify-center text-center p-4 z-10"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                <span className="text-2xl mb-1">📸</span>
                <span className="text-xs font-mono">Your Photo Here</span>
                <span className="text-xs mt-0.5 opacity-60">Replace in Hero.tsx</span>
              </div>
            </div>

            {/* 3D canvas behind the photo */}
            <div className="absolute inset-0 pointer-events-none">
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden md:flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 group"
            aria-label="Scroll down"
          >
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Scroll
            </span>
            <ChevronDown
              size={18}
              className="animate-bounce"
              style={{ color: 'var(--accent-light)' }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
