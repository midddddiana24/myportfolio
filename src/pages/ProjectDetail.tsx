import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Github, ExternalLink, CheckCircle, Lightbulb, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { projects } from '@/data/projects'

// ===================================================
// ProjectDetail — Individual project case study page
// ===================================================

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const project = projects.find((p) => p.slug === slug)
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return (
      <PageTransition className="pt-24">
        <div className="rm-container rm-section text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1
            className="font-display font-bold text-2xl mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Project Not Found
          </h1>
          <p
            className="text-sm mb-6"
            style={{ color: 'var(--text-muted)' }}
          >
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/projects" className="btn-primary">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="pt-24">

      {/* ── Hero ───────────────────────────────────── */}
      <section className="rm-section pb-8">
        <div className="rm-container">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="btn-ghost text-sm py-2 px-4 mb-8 inline-flex"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          {/* Project header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-lg"
                  style={{
                    background: 'var(--accent-dim)',
                    color: 'var(--accent-light)',
                  }}
                >
                  {project.category === 'capstone'
                    ? 'Capstone Project'
                    : project.category === 'school'
                    ? 'School Project'
                    : 'Personal Project'}
                </span>
                <span
                  className="text-xs font-mono px-2 py-1 rounded-lg"
                  style={{
                    background: 'var(--card)',
                    color:
                      project.status === 'completed'
                        ? '#86efac'
                        : project.status === 'in-progress'
                        ? '#fcd34d'
                        : 'var(--text-muted)',
                  }}
                >
                  {project.status === 'in-progress' ? '● In Progress' : project.status}
                </span>
              </div>

              <motion.h1
                className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {project.title}
              </motion.h1>

              <p
                className="text-base sm:text-lg leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.fullDescription}
              </p>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Year', value: project.date },
                  { label: 'Type', value: project.type.replace('-', ' ') },
                  { label: 'Category', value: project.category },
                ].map((meta) => (
                  <div key={meta.label}>
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-0.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {meta.label}
                    </p>
                    <p
                      className="text-sm font-medium capitalize"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {meta.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-sm"
                  >
                    <Github size={16} />
                    View on GitHub
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Hero image */}
            <ScrollReveal>
              <div
                className="rounded-2xl overflow-hidden h-64 sm:h-80 flex items-center justify-center"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                {project.image && !project.image.includes('placeholder') ? (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 opacity-40">
                    <span className="text-5xl">🖥️</span>
                    <span
                      className="text-sm font-mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Screenshot Placeholder
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Replace in /public/assets/projects/
                    </span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Tech & Tools ───────────────────────────── */}
      <section
        className="rm-section py-12"
        style={{ background: 'var(--surface)' }}
      >
        <div className="rm-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Technologies */}
            <ScrollReveal>
              <h2
                className="font-display font-bold text-lg mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rm-tag text-sm px-3 py-1.5">
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <ScrollReveal delay={0.1}>
                <h2
                  className="font-display font-bold text-lg mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Tools & Workflow
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-2.5 py-1.5 rounded-lg border"
                      style={{
                        background: 'var(--card)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── Case Study ─────────────────────────────── */}
      {(project.problem || project.solution || project.features) && (
        <section className="rm-section py-12">
          <div className="rm-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Problem */}
              {project.problem && (
                <ScrollReveal>
                  <div className="bento-card h-full">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <Target size={18} style={{ color: '#f87171' }} />
                    </div>
                    <h3
                      className="font-display font-bold text-base mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      The Problem
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.problem}
                    </p>
                  </div>
                </ScrollReveal>
              )}

              {/* Solution */}
              {project.solution && (
                <ScrollReveal delay={0.1}>
                  <div className="bento-card h-full">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      <Lightbulb size={18} style={{ color: '#86efac' }} />
                    </div>
                    <h3
                      className="font-display font-bold text-base mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      The Solution
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.solution}
                    </p>
                  </div>
                </ScrollReveal>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <ScrollReveal delay={0.2}>
                  <div className="bento-card h-full">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'var(--accent-dim)', border: '1px solid rgba(124,58,237,0.2)' }}
                    >
                      <CheckCircle size={18} style={{ color: 'var(--accent-light)' }} />
                    </div>
                    <h3
                      className="font-display font-bold text-base mb-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Key Features
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {project.features.map((feat) => (
                        <li
                          key={feat}
                          className="text-sm flex items-start gap-2"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <span
                            className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                            style={{ background: 'var(--accent)' }}
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Learning Outcomes ──────────────────────── */}
      {project.learningOutcomes && project.learningOutcomes.length > 0 && (
        <section
          className="rm-section py-12"
          style={{ background: 'var(--surface)' }}
        >
          <div className="rm-container">
            <ScrollReveal>
              <h2
                className="font-display font-bold text-xl mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                What I Learned
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.learningOutcomes.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl text-sm border"
                    style={{
                      background: 'var(--card)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Project Navigation ─────────────────────── */}
      <section className="py-12">
        <div className="rm-container">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="btn-ghost text-sm flex-1 sm:flex-none justify-start"
              >
                <ArrowLeft size={16} />
                <div className="text-left">
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Previous
                  </p>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="btn-ghost text-sm flex-1 sm:flex-none justify-end"
              >
                <div className="text-right">
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Next
                  </p>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
