import {
  SiReact, SiVuedotjs, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss, SiNodedotjs, SiLaravel, SiPhp,
  SiExpress, SiMysql, SiMongodb, SiPostgresql, SiSupabase,
  SiFirebase, SiGit, SiDocker, SiPostman, SiLinux,
} from 'react-icons/si'
import { Brain, Workflow, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { techCategories, getTechByCategory } from '@/data/techStack'
import type { TechCategory } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  openai:Bot, huggingface:Brain, react:SiReact, vuejs:SiVuedotjs, nextjs:SiNextdotjs,
  typescript:SiTypescript, javascript:SiJavascript, tailwindcss:SiTailwindcss,
  html5:SiHtml5, css3:SiCss, nodejs:SiNodedotjs, laravel:SiLaravel, php:SiPhp,
  express:SiExpress, api:Workflow, mysql:SiMysql, mongodb:SiMongodb,
  postgresql:SiPostgresql, supabase:SiSupabase, firebase:SiFirebase,
  git:SiGit, docker:SiDocker, linux:SiLinux, postman:SiPostman, cicd:Workflow,
}

function TechGrid({ category }: { category: TechCategory }) {
  const items = getTechByCategory(category)
  return (
    <StaggerReveal className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
      {items.map(tech => {
        const Icon = iconMap[tech.icon] ?? Brain
        return (
          <motion.div key={tech.name} variants={staggerItemVariants} className="tool-card" title={tech.name}>
            <div style={{ color:tech.color??'var(--accent-h)' }}><Icon size={26} /></div>
            <span className="font-mono text-xs text-center leading-tight" style={{ color:'var(--text-2)' }}>{tech.name}</span>
          </motion.div>
        )
      })}
    </StaggerReveal>
  )
}

export default function TechStack() {
  return (
    <PageTransition className="pt-28">
      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading eyebrow="Tech Stack" title="Technologies I work with" subtitle="The tools, frameworks, and platforms I use across frontend, backend, databases, and development workflows." align="center" />
        </div>
      </section>

      {techCategories.map((cat, i) => (
        <section key={cat.key} className="py-12" style={i%2!==0?{background:'var(--section-bg-alt)'}:{}} aria-labelledby={`tech-${cat.key}`}>
          <div className="rm-container">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-7">
                <div>
                  <h2 id={`tech-${cat.key}`} style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1.25rem', letterSpacing:'-0.03em', color:'var(--text-1)' }}>
                    {cat.label}
                  </h2>
                  <p className="font-mono text-xs mt-0.5" style={{ color:'var(--text-3)' }}>{cat.description}</p>
                </div>
              </div>
            </ScrollReveal>
            <TechGrid category={cat.key} />
          </div>
        </section>
      ))}

      <section className="py-14">
        <div className="rm-container">
          <ScrollReveal>
            <div className="bento-card text-center py-10 max-w-xl mx-auto">
              <p className="text-sm leading-relaxed" style={{ color:'var(--text-3)', fontFamily:"'Geist', sans-serif" }}>
                These technologies represent tools I actively use or have used in academic and personal projects.
                I'm continuously learning and expanding this stack as I grow as a developer.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
