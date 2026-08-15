import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, BookOpen, Cpu, Award, ExternalLink, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { certifications } from '@/data/certifications'

// ===================================================
// About Page
// ===================================================

const journeyItems = [
  {
    icon: BookOpen,
    period: '2021 – Present',
    title: 'BSIT Student',
    org: 'West Visayas State University – Janiuay Campus',
    description:
      'Studying core computing, software engineering, data structures, databases, and system development. Actively building academic systems and exploring modern web frameworks.',
  },
  {
    icon: Cpu,
    period: '2023 – Present',
    title: 'Full-Stack Web Development',
    org: 'Self-directed learning & Academic Projects',
    description:
      'Building full-stack applications using React, Laravel, Node.js, and modern databases. Working on capstone projects, academic systems, and personal builds to develop practical experience.',
  },
  {
    icon: Cpu,
    period: '2024 – Present',
    title: 'AI & LLM Experimentation',
    org: 'Personal Projects',
    description:
      'Exploring AI integrations using OpenAI API and Hugging Face models. Building small projects that combine language models with web applications.',
  },
]

export default function About() {
  return (
    <PageTransition className="pt-24">

      {/* ── Hero ───────────────────────────────────── */}
      <section className="rm-section pb-12" aria-label="About me overview">
        <div className="rm-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo placeholder */}
            <ScrollReveal>
              <div className="relative flex justify-center lg:justify-start">
                <div
                  className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden flex items-center justify-center"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Placeholder */}
                  <div className="flex flex-col items-center gap-3 text-center p-6">
                    <span className="text-5xl">📸</span>
                    <div>
                      <p
                        className="font-mono text-sm font-medium"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Your Photo Here
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Replace in About.tsx
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div
                    className="absolute bottom-0 right-0 w-24 h-24 opacity-20 rounded-tl-3xl"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden="true"
                  />
                </div>

                {/* Floating badge */}
                <div
                  className="absolute -bottom-4 -right-4 sm:right-8 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  <p
                    className="text-xs font-mono"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Expected Graduation
                  </p>
                  <p
                    className="font-display font-bold text-lg"
                    style={{ color: 'var(--accent-light)' }}
                  >
                    2027
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-6" style={{ background: 'var(--accent)' }} />
                  <span
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: 'var(--accent-light)' }}
                  >
                    About Me
                  </span>
                </div>
                <h1
                  className="font-display font-bold text-4xl sm:text-5xl mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Roberto Mediana Jr.
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p
                  className="text-lg leading-relaxed mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  I'm an IT student with a genuine interest in how software is
                  built, structured, and maintained. I enjoy working across both
                  the frontend and backend — writing clean interfaces and
                  reliable server logic.
                </p>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Whether it's a management system for a capstone project, a
                  booking platform, or experimenting with AI integrations — I
                  approach every project as an opportunity to learn something
                  new and build something useful.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <SocialLinks showLabels className="mb-6" />
                <Link to="/contact" className="btn-primary">
                  Let's Connect
                  <ArrowRight size={16} />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ──────────────────────────────── */}
      <section
        className="rm-section"
        style={{ background: 'var(--surface)' }}
        aria-labelledby="education-heading"
      >
        <div className="rm-container">
          <SectionHeading
            eyebrow="Education"
            title="Academic Background"
          />

          <ScrollReveal>
            <div
              className="bento-card flex flex-col sm:flex-row gap-6 items-start sm:items-center"
              style={{ maxWidth: '680px' }}
            >
              {/* University icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'var(--accent-dim)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}
              >
                <GraduationCap size={28} style={{ color: 'var(--accent-light)' }} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Bachelor of Science in Information Technology
                  </h3>
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-lg"
                    style={{
                      background: 'var(--accent-dim)',
                      color: 'var(--accent-light)',
                    }}
                  >
                    In Progress
                  </span>
                </div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: 'var(--accent-light)' }}
                >
                  West Visayas State University – Janiuay Campus
                </p>
                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span>Incoming 4th Year</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    Expected: 2027
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Development Journey ────────────────────── */}
      <section className="rm-section" aria-labelledby="journey-heading">
        <div className="rm-container">
          <SectionHeading
            eyebrow="Development Journey"
            title="Currently Building"
            subtitle="My path as a developer — the skills I'm sharpening and the work I'm doing."
          />

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'var(--border)' }}
              aria-hidden="true"
            />

            <StaggerReveal className="flex flex-col gap-8">
              {journeyItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    variants={staggerItemVariants}
                    className="sm:pl-16 relative flex flex-col gap-1"
                  >
                    {/* Icon dot */}
                    <div
                      className="hidden sm:flex absolute left-0 w-10 h-10 rounded-full items-center justify-center"
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--accent)',
                        boxShadow: '0 0 0 4px var(--bg)',
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--accent-light)' }} />
                    </div>

                    {/* Period */}
                    <span
                      className="text-xs font-mono"
                      style={{ color: 'var(--accent-light)' }}
                    >
                      {item.period}
                    </span>

                    {/* Card */}
                    <div className="bento-card">
                      <h3
                        className="font-display font-bold text-base mb-0.5"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-xs font-medium mb-2"
                        style={{ color: 'var(--accent-light)' }}
                      >
                        {item.org}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ── Certifications ─────────────────────────── */}
      <section
        className="rm-section"
        style={{ background: 'var(--surface)' }}
        aria-labelledby="certs-heading"
      >
        <div className="rm-container">
          <SectionHeading
            eyebrow="Certifications"
            title="Credentials & Certificates"
            subtitle="Professional development and academic certifications."
          />

          {certifications.length === 0 || (certifications.length === 1 && !certifications[0].image) ? (
            <ScrollReveal>
              <div
                className="bento-card text-center py-16 max-w-lg mx-auto"
              >
                <Award size={36} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <h3
                  className="font-display font-bold text-base mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Certificates Coming Soon
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Add your certificates to{' '}
                  <code
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--card)', color: 'var(--accent-light)' }}
                  >
                    src/data/certifications.ts
                  </code>{' '}
                  and place images in{' '}
                  <code
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--card)', color: 'var(--accent-light)' }}
                  >
                    public/assets/certs/
                  </code>
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={staggerItemVariants}
                  className="cert-card group"
                >
                  {/* Certificate image */}
                  <div
                    className="relative h-44 flex items-center justify-center p-4"
                    style={{ background: 'var(--bg)' }}
                  >
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{ background: 'var(--card)' }}
                      >
                        <Award size={28} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p
                      className="font-display font-bold text-sm mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cert.title}
                    </p>
                    <p
                      className="text-xs mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {cert.issuer}
                      {cert.date && ` · ${cert.date}`}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs inline-flex items-center gap-1 transition-colors duration-200"
                        style={{ color: 'var(--accent-light)' }}
                      >
                        View Credential
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>
          )}
        </div>
      </section>

    </PageTransition>
  )
}
