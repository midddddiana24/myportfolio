import {
  SiReact, SiVuedotjs, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiLaravel, SiPhp, SiExpress,
  SiMysql, SiMongodb, SiPostgresql, SiSupabase, SiFirebase,
  SiGit, SiDocker, SiPostman, SiLinux,
} from 'react-icons/si'
import { Brain, Workflow, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { techCategories, getTechByCategory } from '@/data/techStack'
import type { TechCategory } from '@/types'

// ===================================================
// TechStack Page
// ===================================================

// Map tech names → react-icons component
const iconMap: Record<string, React.ElementType> = {
  openai: Bot,
  huggingface: Brain,
  react: SiReact,
  vuejs: SiVuedotjs,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  html5: SiHtml5,
  css3: SiCss,
  nodejs: SiNodedotjs,
  laravel: SiLaravel,
  php: SiPhp,
  express: SiExpress,
  api: Workflow,
  mysql: SiMysql,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  git: SiGit,
  docker: SiDocker,
  linux: SiLinux,
  postman: SiPostman,
  cicd: Workflow,
}

function TechGrid({ category }: { category: TechCategory }) {
  const items = getTechByCategory(category)

  return (
    <StaggerReveal className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
      {items.map((tech) => {
        const Icon = iconMap[tech.icon] ?? Brain

        return (
          <motion.div
            key={tech.name}
            variants={staggerItemVariants}
            className="tech-card"
            title={tech.name}
          >
            <div
              className="w-9 h-9 flex items-center justify-center rounded-lg"
              style={{ color: tech.color ?? 'var(--accent-light)' }}
            >
              <Icon size={26} />
            </div>
            <span
              className="text-xs font-medium text-center leading-tight"
              style={{ color: 'var(--text-secondary)' }}
            >
              {tech.name}
            </span>
          </motion.div>
        )
      })}
    </StaggerReveal>
  )
}

export default function TechStack() {
  return (
    <PageTransition className="pt-24">

      {/* Header */}
      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Technologies I work with"
            subtitle="The tools, frameworks, and platforms I use across frontend, backend, databases, and development workflows."
            align="center"
          />
        </div>
      </section>

      {/* Categories */}
      {techCategories.map((cat, i) => (
        <section
          key={cat.key}
          className="rm-section py-12"
          style={i % 2 !== 0 ? { background: 'var(--surface)' } : {}}
          aria-labelledby={`tech-${cat.key}`}
        >
          <div className="rm-container">
            <ScrollReveal>
              <div className="flex items-start gap-4 mb-8">
                <div>
                  <h2
                    id={`tech-${cat.key}`}
                    className="font-display font-bold text-xl sm:text-2xl"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cat.label}
                  </h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <TechGrid category={cat.key} />
          </div>
        </section>
      ))}

      {/* Disclaimer */}
      <section className="py-12">
        <div className="rm-container">
          <ScrollReveal>
            <div
              className="bento-card text-center py-10 max-w-xl mx-auto"
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                These technologies represent tools I actively use or have used in
                academic and personal projects. I'm continuously learning and
                expanding this stack as I grow as a developer.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  )
}
