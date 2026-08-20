import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { projects, projectCategories } from '@/data/projects'
import type { CategoryKey } from '@/data/projects'

const catColors: Record<string,string> = { school:'rgba(99,102,241,0.12)', capstone:'rgba(207,69,0,0.10)', personal:'rgba(34,197,94,0.10)' }
const catText:   Record<string,string> = { school:'#818cf8', capstone:'var(--accent-h)', personal:'#4ade80' }
const statusColor: Record<string,string> = { completed:'#4ade80', 'in-progress':'#fbbf24', planned:'#60a5fa' }

export default function Projects() {
  const [active, setActive] = useState<CategoryKey>('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <PageTransition className="pt-28">

      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading eyebrow="Portfolio" title="My Projects" subtitle="Systems, applications, and experiments built throughout my academic and development journey." />

          {/* Filter */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border w-fit mb-12"
              style={{ background:'var(--card)', borderColor:'var(--border)' }}>
              {projectCategories.map(cat => {
                const count = cat.key === 'all' ? projects.length : projects.filter(p => p.category === cat.key).length
                return (
                  <button key={cat.key} onClick={() => setActive(cat.key)}
                    className={`filter-tab ${active === cat.key ? 'active' : ''}`}>
                    {cat.label}
                    <span className="ml-1.5 font-mono text-xs px-1.5 rounded" style={{
                      background: active === cat.key ? 'rgba(207,69,0,0.15)' : 'var(--bg)',
                      color: active === cat.key ? 'var(--accent-h)' : 'var(--text-3)',
                    }}>{count}</span>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div key="grid" layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <motion.article key={p.id} layout
                    initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
                    transition={{ duration:0.35, delay:i*0.05, ease:[0.22,1,0.36,1] }}
                    className="project-card group">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden" style={{ background:'var(--border)' }}>
                      {p.image && !p.image.includes('placeholder')
                        ? <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        : <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-25">
                            <span className="text-3xl">🖥️</span>
                            <span className="font-mono text-xs" style={{ color:'var(--text-3)' }}>Project Preview</span>
                          </div>
                      }
                      <span className="absolute top-3 left-3 text-xs font-mono px-2 py-0.5 rounded-md"
                        style={{ background:catColors[p.category]??'var(--accent-dim)', color:catText[p.category]??'var(--accent-h)', backdropFilter:'blur(8px)' }}>
                        {projectCategories.find(c=>c.key===p.category)?.label}
                      </span>
                      <span className="absolute top-3 right-3 flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full"
                        style={{ background:'rgba(0,0,0,0.55)', color:statusColor[p.status]??'var(--text-3)' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background:statusColor[p.status], opacity:p.status==='in-progress'?1:0.5 }} />
                        {p.status==='in-progress'?'In Progress':p.status}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <div>
                        <p className="t-eyebrow mb-1">{p.role} · {p.date}</p>
                        <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1rem', letterSpacing:'-0.02em', color:'var(--text-1)' }}>{p.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed flex-1" style={{ color:'var(--text-2)' }}>{p.shortDescription}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.technologies.slice(0,4).map(t=><span key={t} className="rm-tag">{t}</span>)}
                        {p.technologies.length>4 && <span className="rm-tag">+{p.technologies.length-4}</span>}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Link to={`/projects/${p.slug}`} className="btn-primary text-xs py-1.5 px-3 flex-1 justify-center">View Project</Link>
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-2" aria-label="GitHub"><Github size={13}/></a>}
                        {p.liveDemoUrl && <a href={p.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-2" aria-label="Live Demo"><ExternalLink size={13}/></a>}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="text-center py-24">
                <p className="text-5xl mb-3">🚧</p>
                <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, color:'var(--text-1)', marginBottom:'0.5rem' }}>No projects in this category yet</p>
                <p className="text-sm" style={{ color:'var(--text-3)' }}>This portfolio is continuously evolving as I build and learn.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <ScrollReveal className="mt-14">
            <div className="bento-card text-center py-10 max-w-lg mx-auto">
              <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'0.9375rem', color:'var(--text-1)', marginBottom:'0.25rem' }}>🌱 Still Growing</p>
              <p className="text-sm leading-relaxed" style={{ color:'var(--text-3)' }}>
                This portfolio is continuously evolving as I build, learn, and explore new technologies.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
