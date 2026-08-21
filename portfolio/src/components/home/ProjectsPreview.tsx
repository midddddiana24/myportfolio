import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { projects } from '@/data/projects'

// ===================================================
// ProjectsPreview — Featured project cards on homepage
// ===================================================

const categoryLabels: Record<string, string> = {
  school: 'School Project',
  capstone: 'Capstone',
  personal: 'Personal Project',
}

const categoryColors: Record<string, string> = {
  school: 'rgba(99,102,241,0.15)',
  capstone: 'rgba(124,58,237,0.15)',
  personal: 'rgba(167,139,250,0.15)',
}

const categoryTextColors: Record<string, string> = {
  school: '#818cf8',
  capstone: '#a78bfa',
  personal: '#c4b5fd',
}

// Show featured projects (or first 3)
const featuredProjects = projects
  .filter((p) => p.featured)
  .slice(0, 3)
  .concat(projects.filter((p) => !p.featured).slice(0, Math.max(0, 3 - projects.filter((p) => p.featured).length)))
  .slice(0, 3)

export function ProjectsPreview() {
  const hasProjects = featuredProjects.length > 0

  return (
    <section className="rm-section" aria-labelledby="projects-heading">
      <div className="rm-container">
        <SectionHeading
          eyebrow="My Projects"
          title="What I've been building"
          subtitle="A look at the systems and applications I've developed throughout my academic journey."
        />

        {hasProjects ? (
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <motion.article
                key={project.id}
                variants={staggerItemVariants}
                className="rm-card overflow-hidden group flex flex-col"
              >
                {/* Project image */}
                <div
                  className="relative h-44 flex items-center justify-center overflow-hidden"
                  style={{ background: 'var(--card)' }}
                >
                  {project.image && !project.image.includes('placeholder') ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: 'var(--accent-dim)' }}
                      >
                        <span className="text-2xl">🖥️</span>
                      </div>
                      <span
                        className="text-xs font-mono"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Project Preview
                      </span>
                    </div>
                  )}

                  {/* Category badge */}
                  <span
                    className="absolute top-3 left-3 text-xs font-mono px-2 py-1 rounded-lg font-medium"
                    style={{
                      background: categoryColors[project.category] ?? 'var(--accent-dim)',
                      color: categoryTextColors[project.category] ?? 'var(--accent-light)',
                    }}
                  >
                    {categoryLabels[project.category] ?? project.category}
                  </span>

                  {/* Status dot */}
                  {project.status === 'in-progress' && (
                    <span className="absolute top-3 right-3 flex items-center gap-1.5 text-xs px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.6)', color: '#86efac' }}
                    >
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      In Progress
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <h3
                    className="font-display font-bold text-base"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rm-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rm-tag">
                        +{project.technologies.length - 3}
                      </span>
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
                        className="btn-ghost p-2"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost p-2"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </StaggerReveal>
        ) : (
          /* Empty state */
          <ScrollReveal>
            <div
              className="bento-card text-center py-16"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <div className="text-4xl mb-4">🚧</div>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Projects Coming Soon
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                This portfolio is continuously evolving as I build, learn, and explore new technologies.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* View all projects */}
        <ScrollReveal delay={0.2} className="mt-10 flex justify-center">
          <Link to="/projects" className="btn-primary">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
