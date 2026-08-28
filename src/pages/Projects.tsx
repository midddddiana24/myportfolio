import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { ClipReveal }     from '@/components/motion/ClipReveal'
import { TextReveal }     from '@/components/motion/TextReveal'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { projects, projectCategories } from '@/data/projects'
import type { CategoryKey } from '@/data/projects'
import { DUR_SLOW } from '@/lib/gsap'

const catColors: Record<string,string> = { school:'rgba(255,255,255,0.04)', capstone:'rgba(255,255,255,0.10)', personal:'rgba(255,255,255,0.06)' }
const catText:   Record<string,string> = { school:'#8a8a8a', capstone:'#ffffff', personal:'#c8c8c8' }

export default function Projects() {
  const [active, setActive] = useState<CategoryKey>('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <PageTransition className="pt-28">
      <section className="rm-section">
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-4">
            <span className="eyebrow">/ Portfolio</span>
            <div className="rule flex-1" />
            <span className="eyebrow">Work</span>
          </div>

          <TextReveal as="h1" trigger="load" splitBy="words" delay={0.1} duration={DUR_SLOW} stagger={0.07} skewY={3}
            style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2.5rem,7vw,6rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1, marginBottom:'3rem' }}>
            My Projects.
          </TextReveal>

          {/* Filter */}
          <ClipReveal direction="down">
            <div className="flex flex-wrap items-center gap-1 p-1 border mb-12 w-fit" style={{ borderColor:'#1f1f1f', background:'#111111' }}>
              {projectCategories.map(cat => {
                const count = cat.key === 'all' ? projects.length : projects.filter(p => p.category === cat.key).length
                return (
                  <button key={cat.key} onClick={() => setActive(cat.key)} className={`filter-tab ${active === cat.key ? 'active' : ''}`}>
                    {cat.label}
                    <span style={{ marginLeft:'0.4rem', fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', opacity:0.6 }}>({count})</span>
                  </button>
                )
              })}
            </div>
          </ClipReveal>

          {/* List rows */}
          <div className="border-t" style={{ borderColor:'#1f1f1f' }}>
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? filtered.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
                  transition={{ duration:0.4, delay:i*0.05, ease:[0.22,1,0.36,1] }}>
                  <div className="project-row" data-cursor="view">
                    {p.image && !p.image.includes('placeholder') && (
                      <div className="project-thumb">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                        <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.65)' }} />
                      </div>
                    )}
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center p-6 md:p-8">
                      <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', color:'#2a2a2a', letterSpacing:'0.05em' }}>
                        {String(i+1).padStart(2,'0')}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(1rem,2.5vw,1.375rem)', letterSpacing:'-0.02em', color:'#f0f0f0' }}>{p.title}</span>
                          <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.2rem 0.5rem', border:`1px solid ${catColors[p.category]}`, color:catText[p.category], background:catColors[p.category] }}>
                            {p.category}
                          </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color:'#5a5a5a', fontFamily:"'Space Grotesk', sans-serif" }}>{p.shortDescription.slice(0,100)}…</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.technologies.slice(0,4).map(t => <span key={t} className="rm-tag" style={{ fontSize:'0.5625rem' }}>{t}</span>)}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'#2a2a2a' }}>{p.date}</span>
                        <MagneticButton strength={0.3}>
                          <Link to={`/projects/${p.slug}`} className="btn-ghost" style={{ padding:'0.5rem 0.875rem', fontSize:'0.6875rem', fontFamily:"'DM Mono', monospace", letterSpacing:'0.08em', textTransform:'uppercase' }}>
                            View <ArrowUpRight size={12} />
                          </Link>
                        </MagneticButton>
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color:'#5a5a5a', transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#ffffff'}} onMouseLeave={e=>{e.currentTarget.style.color='#5a5a5a'}}><Github size={15}/></a>}
                        {p.liveDemoUrl && <a href={p.liveDemoUrl} target="_blank" rel="noopener noreferrer" style={{ color:'#5a5a5a', transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#ffffff'}} onMouseLeave={e=>{e.currentTarget.style.color='#5a5a5a'}}><ExternalLink size={15}/></a>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="py-20 text-center">
                  <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, color:'#f0f0f0', marginBottom:'0.5rem' }}>No projects yet</p>
                  <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.1em', color:'#2a2a2a' }}>Continuously evolving…</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
