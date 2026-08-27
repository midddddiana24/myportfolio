import {
  SiReact, SiVuedotjs, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss, SiNodedotjs, SiLaravel, SiPhp,
  SiExpress, SiMysql, SiMongodb, SiPostgresql, SiSupabase,
  SiFirebase, SiGit, SiDocker, SiPostman, SiLinux,
} from 'react-icons/si'
import { Brain, Workflow, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition }  from '@/components/layout/PageTransition'
import { TextReveal }      from '@/components/motion/TextReveal'
import { ClipReveal }      from '@/components/motion/ClipReveal'
import { Marquee }         from '@/components/motion/Marquee'
import { techCategories, getTechByCategory } from '@/data/techStack'
import type { TechCategory } from '@/types'
import { DUR_SLOW } from '@/lib/gsap'

const iconMap: Record<string, React.ElementType> = {
  openai:Bot, huggingface:Brain, react:SiReact, vuejs:SiVuedotjs, nextjs:SiNextdotjs,
  typescript:SiTypescript, javascript:SiJavascript, tailwindcss:SiTailwindcss,
  html5:SiHtml5, css3:SiCss, nodejs:SiNodedotjs, laravel:SiLaravel, php:SiPhp,
  express:SiExpress, api:Workflow, mysql:SiMysql, mongodb:SiMongodb,
  postgresql:SiPostgresql, supabase:SiSupabase, firebase:SiFirebase,
  git:SiGit, docker:SiDocker, linux:SiLinux, postman:SiPostman, cicd:Workflow,
}

function TechCategorySection({ category, idx }: { category: TechCategory; idx: number }) {
  const info  = techCategories.find(c => c.key === category)!
  const items = getTechByCategory(category)

  return (
    <section className="py-16 border-b" style={{ borderColor:'#1f1f1f', background: idx % 2 === 0 ? '#0a0a0a' : '#111111' }}>
      <div className="rm-container">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 items-start">
          {/* Label */}
          <ClipReveal direction="right">
            <div>
              <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#c8f269', marginBottom:'0.5rem' }}>
                {String(idx + 1).padStart(2, '0')}
              </p>
              <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'1.25rem', letterSpacing:'-0.03em', color:'#f0f0f0', marginBottom:'0.5rem' }}>
                {info.label}
              </h2>
              <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.08em', color:'#5a5a5a' }}>
                {info.description}
              </p>
            </div>
          </ClipReveal>

          {/* Icon grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-px" style={{ background:'#1f1f1f' }}>
            {items.map((tech, i) => {
              const Icon = iconMap[tech.icon] ?? Brain
              return (
                <motion.div key={tech.name}
                  initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  viewport={{ once: true }}
                  style={{ background: idx % 2 === 0 ? '#0a0a0a' : '#111111', padding:'1.5rem 1rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.625rem', transition:'background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a' }}
                  onMouseLeave={e => { e.currentTarget.style.background = idx % 2 === 0 ? '#0a0a0a' : '#111111' }}
                >
                  <Icon size={26} style={{ color: tech.color ?? '#c8f269', flexShrink:0 }} />
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#5a5a5a', textAlign:'center', lineHeight:1.3 }}>
                    {tech.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TechStack() {
  const allIcons = techCategories.flatMap(cat =>
    getTechByCategory(cat.key).map(t => ({ ...t, Icon: iconMap[t.icon] ?? Brain }))
  )

  return (
    <PageTransition className="pt-28">
      {/* Header */}
      <section className="rm-section" style={{ background:'#0a0a0a' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ Tech Stack</span>
            <div className="rule flex-1" />
          </div>

          <TextReveal as="h1" trigger="load" splitBy="words" delay={0.1} duration={DUR_SLOW} stagger={0.07} skewY={3}
            style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2.5rem,8vw,7rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1, marginBottom:'1.5rem' }}>
            My Toolkit.
          </TextReveal>

          <ClipReveal direction="down">
            <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', lineHeight:1.65, maxWidth:'520px' }}>
              Technologies I use across frontend, backend, databases, and security tooling.
              Continuously expanding as I build new projects.
            </p>
          </ClipReveal>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="py-8 border-y overflow-hidden" style={{ borderColor:'#1f1f1f', background:'#111111' }}>
        <Marquee speed="normal" gap="3rem">
          {allIcons.map(({ name, Icon, color }) => (
            <div key={name} className="flex items-center gap-2.5 flex-shrink-0">
              <Icon size={18} style={{ color: color ?? '#c8f269' }} />
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#2a2a2a', whiteSpace:'nowrap' }}>
                {name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Categories */}
      {techCategories.map((cat, idx) => (
        <TechCategorySection key={cat.key} category={cat.key} idx={idx} />
      ))}

      {/* Disclaimer */}
      <section className="py-16" style={{ background:'#0a0a0a' }}>
        <div className="rm-container">
          <ClipReveal direction="down">
            <div style={{ border:'1px solid #1f1f1f', padding:'2rem', display:'flex', alignItems:'flex-start', gap:'1.5rem' }}>
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.1em', color:'#c8f269', flexShrink:0 }}>NOTE</span>
              <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.9375rem', color:'#5a5a5a', lineHeight:1.65 }}>
                These represent tools I actively use or have used in academic and personal projects.
                I'm continuously learning and expanding this stack.
              </p>
            </div>
          </ClipReveal>
        </div>
      </section>
    </PageTransition>
  )
}
