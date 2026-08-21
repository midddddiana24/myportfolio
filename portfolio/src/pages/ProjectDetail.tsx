import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Github, ExternalLink, CheckCircle, Lightbulb, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { projects } from '@/data/projects'

const g = { fontFamily:"'Geist', sans-serif" }
const gm = { fontFamily:"'Geist Mono', monospace" }

export default function ProjectDetail() {
  const { slug } = useParams<{ slug:string }>()
  const navigate = useNavigate()
  const project = projects.find(p => p.slug === slug)
  const idx = projects.findIndex(p => p.slug === slug)
  const prev = idx > 0 ? projects[idx-1] : null
  const next = idx < projects.length-1 ? projects[idx+1] : null

  if (!project) return (
    <PageTransition className="pt-28">
      <div className="rm-container rm-section text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 style={{ ...g, fontWeight:700, fontSize:'1.5rem', color:'var(--text-1)', marginBottom:'0.75rem' }}>Project Not Found</h1>
        <Link to="/projects" className="btn-primary text-sm"><ArrowLeft size={14}/>Back to Projects</Link>
      </div>
    </PageTransition>
  )

  return (
    <PageTransition className="pt-28">

      {/* Header */}
      <section className="rm-section pb-10">
        <div className="rm-container">
          <button onClick={() => navigate(-1)} className="btn-ghost text-sm mb-8 inline-flex">
            <ArrowLeft size={14}/>Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="rm-tag rm-tag-accent font-mono text-xs">{project.category === 'capstone' ? 'Capstone' : project.category === 'school' ? 'School' : 'Personal'}</span>
                <span className="rm-tag font-mono text-xs" style={{ color:project.status==='in-progress'?'#fbbf24':project.status==='completed'?'#4ade80':'var(--text-3)' }}>
                  {project.status==='in-progress'?'● In Progress':project.status}
                </span>
              </div>

              <motion.h1 style={{ ...g, fontWeight:800, fontSize:'clamp(1.75rem,4vw,3rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'1rem' }}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
                {project.title}
              </motion.h1>

              <p className="text-lg leading-relaxed mb-6" style={{ color:'var(--text-2)', ...g }}>{project.fullDescription}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[{label:'Role',value:project.role},{label:'Year',value:project.date},{label:'Type',value:project.type.replace('-',' ')},{label:'Status',value:project.status}].map(m=>(
                  <div key={m.label}>
                    <p className="t-eyebrow mb-0.5">{m.label}</p>
                    <p style={{ ...g, fontWeight:600, fontSize:'0.875rem', color:'var(--text-1)', textTransform:'capitalize' }}>{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm"><Github size={14}/>GitHub</a>}
                {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm"><ExternalLink size={14}/>Live Demo</a>}
              </div>
            </div>

            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden h-64 sm:h-80 flex items-center justify-center border"
                style={{ background:'var(--card)', borderColor:'var(--border)' }}>
                {project.image && !project.image.includes('placeholder')
                  ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  : <div className="flex flex-col items-center gap-2 opacity-25">
                      <span className="text-5xl">🖥️</span>
                      <span style={{ ...gm, fontSize:'0.75rem', color:'var(--text-3)' }}>Screenshot Placeholder</span>
                    </div>
                }
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech + Tools */}
      <section className="py-12" style={{ background:'var(--section-bg-alt)' }}>
        <div className="rm-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <h2 style={{ ...g, fontWeight:700, fontSize:'1.125rem', letterSpacing:'-0.02em', color:'var(--text-1)', marginBottom:'1rem' }}>Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(t=><span key={t} className="rm-tag">{t}</span>)}
              </div>
            </ScrollReveal>
            {project.tools && project.tools.length > 0 && (
              <ScrollReveal delay={0.1}>
                <h2 style={{ ...g, fontWeight:700, fontSize:'1.125rem', letterSpacing:'-0.02em', color:'var(--text-1)', marginBottom:'1rem' }}>Tools</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map(t=><span key={t} style={{ ...gm, fontSize:'0.6875rem', padding:'0.25rem 0.625rem', borderRadius:'5px', background:'var(--card)', border:'1px solid var(--border)', color:'var(--text-2)' }}>{t}</span>)}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Case study cards */}
      {(project.problem || project.solution || project.features) && (
        <section className="py-12">
          <div className="rm-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {project.problem && (
                <ScrollReveal>
                  <div className="bento-card h-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.15)' }}>
                      <Target size={16} style={{ color:'#f87171' }} />
                    </div>
                    <h3 style={{ ...g, fontWeight:700, fontSize:'0.9375rem', color:'var(--text-1)', marginBottom:'0.5rem' }}>The Problem</h3>
                    <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)' }}>{project.problem}</p>
                  </div>
                </ScrollReveal>
              )}
              {project.solution && (
                <ScrollReveal delay={0.08}>
                  <div className="bento-card h-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.15)' }}>
                      <Lightbulb size={16} style={{ color:'#4ade80' }} />
                    </div>
                    <h3 style={{ ...g, fontWeight:700, fontSize:'0.9375rem', color:'var(--text-1)', marginBottom:'0.5rem' }}>The Solution</h3>
                    <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)' }}>{project.solution}</p>
                  </div>
                </ScrollReveal>
              )}
              {project.features && project.features.length > 0 && (
                <ScrollReveal delay={0.16}>
                  <div className="bento-card h-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background:'var(--accent-dim)', border:'1px solid rgba(207,69,0,0.15)' }}>
                      <CheckCircle size={16} style={{ color:'var(--accent-h)' }} />
                    </div>
                    <h3 style={{ ...g, fontWeight:700, fontSize:'0.9375rem', color:'var(--text-1)', marginBottom:'0.5rem' }}>Key Features</h3>
                    <ul className="flex flex-col gap-1.5">
                      {project.features.map(f=><li key={f} className="flex items-start gap-2 text-xs" style={{ color:'var(--text-2)', ...g }}>
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background:'var(--accent)' }}/>{f}
                      </li>)}
                    </ul>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Learning outcomes */}
      {project.learningOutcomes && project.learningOutcomes.length > 0 && (
        <section className="py-12" style={{ background:'var(--section-bg-alt)' }}>
          <div className="rm-container">
            <ScrollReveal>
              <h2 style={{ ...g, fontWeight:700, fontSize:'1.25rem', letterSpacing:'-0.02em', color:'var(--text-1)', marginBottom:'1rem' }}>What I Learned</h2>
              <div className="flex flex-wrap gap-2">
                {project.learningOutcomes.map(o=><span key={o} className="px-3 py-1.5 rounded-lg border text-sm" style={{ ...g, background:'var(--card)', borderColor:'var(--border)', color:'var(--text-2)' }}>{o}</span>)}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="py-10">
        <div className="rm-container">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            {prev
              ? <Link to={`/projects/${prev.slug}`} className="btn-ghost text-sm flex-1 sm:flex-none justify-start gap-3">
                  <ArrowLeft size={14}/>
                  <div className="text-left">
                    <p style={{ ...gm, fontSize:'0.625rem', color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Previous</p>
                    <p style={{ ...g, fontWeight:600, fontSize:'0.875rem', color:'var(--text-1)' }}>{prev.title}</p>
                  </div>
                </Link>
              : <div />}
            {next && (
              <Link to={`/projects/${next.slug}`} className="btn-ghost text-sm flex-1 sm:flex-none justify-end gap-3">
                <div className="text-right">
                  <p style={{ ...gm, fontSize:'0.625rem', color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Next</p>
                  <p style={{ ...g, fontWeight:600, fontSize:'0.875rem', color:'var(--text-1)' }}>{next.title}</p>
                </div>
                <ArrowRight size={14}/>
              </Link>
            )}
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
