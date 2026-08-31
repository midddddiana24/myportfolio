import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Github, ExternalLink, CheckCircle, Lightbulb, Target } from 'lucide-react'
import { PageTransition }  from '@/components/layout/PageTransition'
import { TextReveal }      from '@/components/motion/TextReveal'
import { ClipReveal }      from '@/components/motion/ClipReveal'
import { MagneticButton }  from '@/components/motion/MagneticButton'
import { SafeImage }       from '@/components/ui/SafeImage'
import { projects }        from '@/data/projects'
import { DUR_SLOW }        from '@/lib/gsap'

const mono = { fontFamily:"'DM Mono', monospace" }
const sans = { fontFamily:"'DM Sans', sans-serif" }
// `sans` was doing two jobs — it set the face for the page title AND for every
// paragraph under it, which worked only while one family covered both. Anton
// cannot carry running text, so the display role gets its own constant.
const display = { fontFamily:"'Anton', sans-serif", fontWeight:400, textTransform:'uppercase' as const }

// Shared by both branches below: shown when a project has no screenshot AND
// when the referenced file fails to load. Previously only the first case was
// handled, so a missing file fell through to the browser's broken-image glyph
// instead of this panel.
const screenshotPlaceholder = (
  <div style={{ textAlign:'center', opacity:0.15 }}>
    <p aria-hidden="true" style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>🖥️</p>
    <p style={{ ...mono, fontSize:'0.6875rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)' }}>Screenshot Placeholder</p>
  </div>
)

export default function ProjectDetail() {
  const { slug }   = useParams<{ slug: string }>()
  const navigate   = useNavigate()
  const project    = projects.find(p => p.slug === slug)
  const idx        = projects.findIndex(p => p.slug === slug)
  const prev       = idx > 0 ? projects[idx - 1] : null
  const next       = idx < projects.length - 1 ? projects[idx + 1] : null

  if (!project) return (
    <PageTransition className="pt-28">
      <div className="rm-container rm-section" style={{ textAlign:'center' }}>
        <p style={{ fontSize:'4rem', marginBottom:'1.5rem', opacity:0.2 }}>404</p>
        <h1 style={{ ...display, fontSize:'1.5rem', letterSpacing:'0em', color:'var(--text-1)', marginBottom:'1rem' }}>Project Not Found</h1>
        <MagneticButton strength={0.3}>
          <Link to="/projects" className="btn-primary text-sm"><ArrowLeft size={14}/> Back to Projects</Link>
        </MagneticButton>
      </div>
    </PageTransition>
  )

  return (
    <PageTransition className="pt-28">
      {/* Hero */}
      <section className="rm-section" style={{ background:'var(--bg-base)' }}>
        <div className="rm-container">
          {/* Back */}
          <MagneticButton strength={0.3}>
            <button onClick={() => navigate(-1)} className="btn-ghost text-sm mb-12" style={{ fontSize:'0.6875rem', ...mono, letterSpacing:'0.08em', textTransform:'uppercase' }}>
              <ArrowLeft size={13} /> Back
            </button>
          </MagneticButton>

          {/* Category + status */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem', marginBottom:'1.5rem' }}>
            <span style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', padding:'0.3rem 0.75rem', border:'1px solid rgba(var(--figure-rgb), 0.18)', color:'var(--accent)', background:'rgba(var(--figure-rgb), 0.04)' }}>
              {project.category === 'capstone' ? 'Capstone' : project.category === 'school' ? 'School' : 'Personal'}
            </span>
            <span style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', padding:'0.3rem 0.75rem', border:'1px solid var(--border)', color: project.status === 'completed' ? 'var(--accent)' : project.status === 'in-progress' ? 'var(--text-2)' : 'var(--text-muted)' }}>
              {project.status === 'in-progress' ? '● In Progress' : project.status}
            </span>
          </div>

          <TextReveal as="h1" trigger="load" splitBy="words" delay={0.1} duration={DUR_SLOW} stagger={0.06} skewY={3}
            style={{ ...display, fontSize:'clamp(2rem,6vw,5rem)', letterSpacing:'-0.015em', color:'var(--text-1)', lineHeight:1, marginBottom:'1.5rem' }}>
            {project.title}
          </TextReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <ClipReveal direction="down">
                <p style={{ ...sans, fontSize:'1.0625rem', color:'var(--text-muted)', lineHeight:1.75, marginBottom:'2rem' }}>
                  {project.fullDescription}
                </p>
              </ClipReveal>

              {/* Meta grid */}
              <ClipReveal direction="down" delay={0.1}>
                <div className="grid grid-cols-2 gap-px border" style={{ background:'var(--chip)', borderColor:'var(--border)', marginBottom:'2rem' }}>
                  {[{l:'Role',v:project.role},{l:'Year',v:project.date},{l:'Type',v:project.type.replace('-',' ')},{l:'Status',v:project.status}].map(m => (
                    <div key={m.l} style={{ background:'var(--bg-base)', padding:'1rem 1.25rem' }}>
                      <p style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.375rem' }}>{m.l}</p>
                      <p style={{ ...sans, fontWeight:600, fontSize:'0.875rem', color:'var(--text-1)', textTransform:'capitalize' }}>{m.v}</p>
                    </div>
                  ))}
                </div>
              </ClipReveal>

              {/* Links */}
              <ClipReveal direction="down" delay={0.15}>
                <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                  {project.githubUrl && (
                    <MagneticButton strength={0.3}>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
                        <Github size={14}/> GitHub
                      </a>
                    </MagneticButton>
                  )}
                  {project.liveDemoUrl && (
                    <MagneticButton strength={0.3}>
                      <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                        <ExternalLink size={14}/> Live Demo
                      </a>
                    </MagneticButton>
                  )}
                </div>
              </ClipReveal>
            </div>

            {/* Screenshot */}
            <ClipReveal direction="left">
              <div style={{ border:'1px solid var(--border)', aspectRatio:'16/10', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-surface)' }}>
                {project.image && !project.image.includes('placeholder')
                  ? <SafeImage src={project.image} alt={project.title}
                      style={{ width:'100%', height:'100%', objectFit:'cover' }}
                      fallback={screenshotPlaceholder} />
                  : screenshotPlaceholder
                }
              </div>
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* Tech + Tools */}
      <section className="py-16 border-t" style={{ borderColor:'var(--border)', background:'var(--bg-surface)' }}>
        <div className="rm-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ClipReveal direction="down">
              <p style={{ ...mono, fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem' }}>Technologies</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                {project.technologies.map(t => <span key={t} className="rm-tag">{t}</span>)}
              </div>
            </ClipReveal>
            {project.tools && project.tools.length > 0 && (
              <ClipReveal direction="down" delay={0.1}>
                <p style={{ ...mono, fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'1rem' }}>Tools</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                  {project.tools.map(t => <span key={t} style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.08em', padding:'0.25rem 0.625rem', border:'1px solid var(--border)', color:'var(--text-muted)', textTransform:'uppercase' }}>{t}</span>)}
                </div>
              </ClipReveal>
            )}
          </div>
        </div>
      </section>

      {/* Case study */}
      {(project.problem || project.solution || project.features) && (
        <section className="py-16 border-t" style={{ borderColor:'var(--border)', background:'var(--bg-base)' }}>
          <div className="rm-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px border-l" style={{ background:'var(--chip)', borderColor:'var(--border)' }}>
              {project.problem && (
                <ClipReveal direction="down">
                  <div style={{ background:'var(--bg-base)', padding:'2rem' }}>
                    <Target size={18} style={{ color:'var(--accent)', marginBottom:'1rem' }} />
                    <p style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.75rem' }}>The Problem</p>
                    <p style={{ ...sans, fontSize:'0.9375rem', color:'var(--text-muted)', lineHeight:1.65 }}>{project.problem}</p>
                  </div>
                </ClipReveal>
              )}
              {project.solution && (
                <ClipReveal direction="down" delay={0.08}>
                  <div style={{ background:'var(--bg-base)', padding:'2rem' }}>
                    <Lightbulb size={18} style={{ color:'var(--accent)', marginBottom:'1rem' }} />
                    <p style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.75rem' }}>The Solution</p>
                    <p style={{ ...sans, fontSize:'0.9375rem', color:'var(--text-muted)', lineHeight:1.65 }}>{project.solution}</p>
                  </div>
                </ClipReveal>
              )}
              {project.features && project.features.length > 0 && (
                <ClipReveal direction="down" delay={0.16}>
                  <div style={{ background:'var(--bg-base)', padding:'2rem' }}>
                    <CheckCircle size={18} style={{ color:'var(--accent)', marginBottom:'1rem' }} />
                    <p style={{ ...mono, fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.75rem' }}>Key Features</p>
                    <ul style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                      {project.features.map(f => (
                        <li key={f} style={{ ...sans, fontSize:'0.875rem', color:'var(--text-muted)', display:'flex', gap:'0.5rem', alignItems:'flex-start' }}>
                          <span style={{ color:'var(--accent)', flexShrink:0, marginTop:'0.2rem' }}>—</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ClipReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Learning outcomes */}
      {project.learningOutcomes && project.learningOutcomes.length > 0 && (
        <section className="py-16 border-t" style={{ borderColor:'var(--border)', background:'var(--bg-surface)' }}>
          <div className="rm-container">
            <ClipReveal direction="down">
              <p style={{ ...mono, fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1.25rem' }}>What I Learned</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.625rem' }}>
                {project.learningOutcomes.map(o => (
                  <span key={o} style={{ ...sans, fontSize:'0.875rem', color:'var(--text-muted)', padding:'0.5rem 1rem', border:'1px solid var(--border)' }}>{o}</span>
                ))}
              </div>
            </ClipReveal>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="py-12 border-t" style={{ borderColor:'var(--border)', background:'var(--bg-base)' }}>
        <div className="rm-container">
          <div style={{ display:'flex', justifyContent:'space-between', gap:'1rem' }}>
            {prev ? (
              <MagneticButton strength={0.3}>
                <Link to={`/projects/${prev.slug}`} className="btn-ghost text-sm" style={{ gap:'0.875rem' }}>
                  <ArrowLeft size={14} />
                  <div style={{ textAlign:'left' }}>
                    <p style={{ ...mono, fontSize:'0.5rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)' }}>Previous</p>
                    <p style={{ ...display, fontSize:'0.875rem', letterSpacing:'0.02em', color:'var(--text-1)' }}>{prev.title}</p>
                  </div>
                </Link>
              </MagneticButton>
            ) : <div />}
            {next && (
              <MagneticButton strength={0.3}>
                <Link to={`/projects/${next.slug}`} className="btn-ghost text-sm" style={{ gap:'0.875rem' }}>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ ...mono, fontSize:'0.5rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)' }}>Next</p>
                    <p style={{ ...display, fontSize:'0.875rem', letterSpacing:'0.02em', color:'var(--text-1)' }}>{next.title}</p>
                  </div>
                  <ArrowRight size={14} />
                </Link>
              </MagneticButton>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
