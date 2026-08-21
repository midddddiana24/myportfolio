import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { SocialLinks } from '@/components/ui/SocialLinks'

// ============================================================
// Hero v2 — Editorial style (Vlad/Paul-inspired + Claude warm)
// Big display type · Warm layout · Minimal decoration
// ============================================================

const stagger = {
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  hidden:  {},
}
const up = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const techBadges = [
  'React', 'Laravel', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL',
]

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
      aria-label="Hero"
    >
      {/* Grain texture */}
      <div className="grain absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* Radial gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'var(--gradient-hero)' }}
        aria-hidden="true"
      />

      {/* Subtle decorative blob */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-[0.06] pointer-events-none blur-3xl"
        style={{ background: 'var(--accent)', animation: 'blob 12s ease-in-out infinite' }}
        aria-hidden="true"
      />

      <div className="rm-container relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 max-w-5xl"
        >

          {/* ── Status row ─────────────────────────────── */}
          <motion.div variants={up} className="flex flex-wrap items-center gap-3">
            {/* Available badge */}
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wide"
              style={{
                background: 'rgba(34,197,94,0.06)',
                borderColor: 'rgba(34,197,94,0.2)',
                color: '#16a34a',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for Collaborations
            </span>

            <span
              className="inline-flex items-center gap-1.5 text-xs font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              <MapPin size={11} />
              Iloilo, Philippines
            </span>
          </motion.div>

          {/* ── Main heading ────────────────────────────── */}
          <div className="flex flex-col gap-1">
            {/* Name — editorial split */}
            <motion.div variants={up} className="flex flex-col leading-none overflow-hidden">
              {/*  "Roberto" in Instrument Serif italic — the editorial / voice layer  */}
              <span
                className="t-editorial block"
                style={{
                  fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.0,
                }}
              >
                Roberto
              </span>

              {/*  "Mediana Jr." in Plus Jakarta Sans ultra-bold  */}
              <span
                className="t-display block"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                }}
              >
                Mediana Jr.
              </span>
            </motion.div>

            {/* Role — smaller, editorial weight */}
            <motion.div
              variants={up}
              className="flex items-center gap-3 mt-3"
            >
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: 'var(--accent)' }}
              />
              <p
                className="font-display font-semibold text-base sm:text-lg tracking-tight"
                style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
              >
                Aspiring Full-Stack Developer
                <span
                  className="mx-3 opacity-30"
                  aria-hidden="true"
                >·</span>
                BSIT Student
              </p>
            </motion.div>
          </div>

          {/* ── Description ─────────────────────────────── */}
          <motion.p
            variants={up}
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Building modern, practical, and user-focused digital experiences
            through full-stack development. Studying at{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              West Visayas State University – Janiuay Campus
            </span>{' '}
            · Incoming 4th Year · Expected 2027.
          </motion.p>

          {/* ── CTA row ─────────────────────────────────── */}
          <motion.div variants={up} className="flex flex-wrap items-center gap-3">
            <Link to="/projects" className="btn-primary">
              View Projects
              <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Let's Connect
              <ArrowUpRight size={15} />
            </Link>
            <SocialLinks className="ml-1" />
          </motion.div>

          {/* ── Stats row ───────────────────────────────── */}
          <motion.div variants={fadeIn}>
            <div
              className="h-px w-full mb-7"
              style={{ background: 'var(--border)' }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { num: '4th',  label: 'Year Student' },
                { num: '2027', label: 'Expected Grad' },
                { num: '7+',   label: 'Technologies' },
                { num: '1',    label: 'Capstone Project' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    className="font-display font-bold text-2xl sm:text-3xl"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
                  >
                    {stat.num}
                  </span>
                  <span
                    className="t-eyebrow"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Tech badges ──────────────────────────────── */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-2">
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                className="rm-tag"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Profile photo — floats bottom-right ─────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute right-16 xl:right-24 bottom-0 z-10"
        aria-label="Profile photo"
      >
        {/*
          Replace this div with your real photo:
          <img src="/assets/photo.jpg" alt="Roberto Mediana Jr."
               className="w-72 xl:w-80 h-auto object-cover" style={{...}} />
        */}
        <div
          className="relative w-64 xl:w-72 flex flex-col items-center justify-end pb-0"
          style={{ height: '380px' }}
        >
          {/* Placeholder silhouette */}
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-t-3xl border-t border-x"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <span className="text-5xl opacity-30">📸</span>
            <div className="text-center">
              <p
                className="font-mono text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Your Photo Here
              </p>
              <p
                className="font-mono text-xs opacity-50 mt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Replace in Hero.tsx
              </p>
            </div>
          </div>

          {/* Floating name card */}
          <div
            className="absolute -left-12 top-1/3 px-4 py-2.5 rounded-xl shadow-lg"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-elevated)',
            }}
          >
            <p className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              Roberto M. Jr.
            </p>
            <p className="t-eyebrow" style={{ color: 'var(--text-muted)' }}>
              Full-Stack Dev
            </p>
          </div>

          {/* WVSU badge */}
          <div
            className="absolute -right-6 top-1/2 px-3 py-2 rounded-xl text-xs font-mono"
            style={{
              background: 'var(--accent-dim)',
              border: '1px solid rgba(212,82,10,0.15)',
              color: 'var(--accent-light)',
            }}
          >
            WVSU Janiuay
          </div>
        </div>
      </motion.div>

    </section>
  )
}
