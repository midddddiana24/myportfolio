import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Code2, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

// ===================================================
// AboutPreview — Compact about me section on homepage
// ===================================================

const highlights = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'BSIT · WVSU Janiuay',
  },
  {
    icon: Code2,
    label: 'Focus',
    value: 'Full-Stack Development',
  },
  {
    icon: Layers,
    label: 'Stack',
    value: 'React · Laravel · Node.js',
  },
]

export function AboutPreview() {
  return (
    <section className="rm-section" aria-labelledby="about-preview-heading">
      <div className="rm-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ─────────────────────────── */}
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="Turning ideas into working software"
              subtitle="I'm an IT student passionate about building systems that solve real problems — from booking platforms to web applications."
            />

            <ScrollReveal delay={0.15}>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                As an incoming 4th year BSIT student at{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  West Visayas State University – Janiuay Campus
                </strong>
                , I focus on learning by building — working across both frontend
                and backend stacks, experimenting with AI tools, and continuously
                sharpening my development skills.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link to="/about" className="btn-ghost inline-flex">
                Learn More About Me
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>

          {/* ── Right: Highlights ──────────────────── */}
          <StaggerReveal className="flex flex-col gap-4">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  variants={staggerItemVariants}
                  className="bento-card flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'var(--accent-dim)',
                      border: '1px solid rgba(124,58,237,0.2)',
                    }}
                  >
                    <Icon size={18} style={{ color: 'var(--accent-light)' }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-0.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-semibold font-display"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}
