import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { projects, projectCategories } from '@/data/projects'
import type { CategoryKey } from '@/data/projects'
import { cn } from '@/utils/cn'

// ===================================================
// Projects Page
// ===================================================

const categoryColors: Record<string, string> = {
  school: '#818cf8',
  capstone: '#a78bfa',
  personal: '#c4b5fd',
}
const categoryBg: Record<string, string> = {
  school: 'rgba(99,102,241,0.12)',
  capstone: 'rgba(124,58,237,0.12)',
  personal: 'rgba(167,139,250,0.12)',
}

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
}
const statusColors: Record<string, string> = {
  completed: '#86efac',
  'in-progress': '#fcd34d',
  planned: '#93c5fd',
}

// ── Project Card ────────────────────────────────────
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rm-card overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div
        className="relative h-48 overflow-hidden flex items-center justify-center"
        style={{ background: 'var(--bg)' }}
      >
        {project.image && !project.image.includes('placeholder') ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="flex flex-col items-center gap-2 opacity-40"
            aria-label="Project preview placeholder"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--card)' }}
            >
              <span className="text-2xl">🖥️</span>
            </div>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              Project Preview
            </span>
          </div>
        )}

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-xs font-mono px-2 py-1 rounded-lg"
          style={{
            background: categoryBg[project.category] ?? 'var(--accent-dim)',
            color: categoryColors[project.category] ?? 'var(--accent-light)',
          }}
        >
          {projectCategories.find((c) => c.key === project.category)?.label ?? project.category}
        </span>

        {/* Status */}
        <span
          className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full flex items-center gap-1"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: statusColors[project.status] ?? 'var(--text-muted)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: statusColors[project.status] ?? 'var(--text-muted)' }}
          />
          {statusLabels[project.status] ?? project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p
            className="text-xs font-mono mb-1"
            style={{ color: 'var(--text-muted)' }}
          >
            {project.role} · {project.date}
          </p>
          <h3
            className="font-display font-bold text-base"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </h3>
        </div>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: 'var(--text-muted)' }}
        >
          {project.shortDescription}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="rm-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rm-tag">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/projects/${project.slug}`}
            className="btn-primary text-xs py-2 px-4 flex-1 justify-center"
          >
            View Project
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-2.5"
              aria-label={`${project.title} on GitHub`}
            >
              <Github size={15} />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-2.5"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ── Page ────────────────────────────────────────────
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <PageTransition className="pt-24">

      {/* Header */}
      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading
            eyebrow="Portfolio"
            title="My Projects"
            subtitle="Systems, applications, and experiments built throughout my academic and development journey."
          />

          {/* Filter tabs */}
          <ScrollReveal>
            <div
              className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl w-fit"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
              role="tablist"
              aria-label="Filter projects by category"
            >
              <Filter size={14} style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }} />
              {projectCategories.map((cat) => {
                const isActive = activeCategory === cat.key
                const count =
                  cat.key === 'all'
                    ? projects.length
                    : projects.filter((p) => p.category === cat.key).length

                return (
                  <button
                    key={cat.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.key)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5'
                    )}
                    style={{
                      background: isActive ? 'var(--accent)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                    }}
                  >
                    {cat.label}
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-md font-mono"
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg)',
                        color: isActive ? '#fff' : 'var(--text-muted)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section
        className="rm-section pt-0 pb-20"
        aria-label="Projects grid"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="rm-container">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="text-5xl mb-4">🚧</div>
                <h3
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  No projects in this category yet
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  This portfolio is continuously evolving as I build and learn.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Growing note */}
          <ScrollReveal className="mt-16">
            <div
              className="bento-card text-center py-10 max-w-lg mx-auto"
            >
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                🌱 Still Growing
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                This portfolio is continuously evolving as I build, learn, and
                explore new technologies. More projects will be added over time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  )
}
