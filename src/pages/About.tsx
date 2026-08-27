import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Award } from 'lucide-react'
import { PageTransition }    from '@/components/layout/PageTransition'
import { TextReveal }        from '@/components/motion/TextReveal'
import { ClipReveal }        from '@/components/motion/ClipReveal'
import { MagneticButton }    from '@/components/motion/MagneticButton'
import { SocialLinks }       from '@/components/ui/SocialLinks'
import { StatCounter }       from '@/components/ui/StatCounter'
import { certifications }    from '@/data/certifications'
import { DUR_SLOW }          from '@/lib/gsap'

const journey = [
  { period:'2021 – Present', title:'BSIT Student', org:'West Visayas State University – Janiuay Campus', desc:'Core computing, software engineering, data structures, databases, and system development.' },
  { period:'2023 – Present', title:'Full-Stack Development', org:'Self-directed & Academic Projects', desc:'React, Laravel, Node.js, and modern databases — capstone projects and personal builds.' },
  { period:'2024 – Present', title:'Web Penetration Testing', org:'Kali Linux · Ethical Hacking', desc:'Security assessments, vulnerability identification, and ethical hacking techniques.' },
  { period:'2024 – Present', title:'AI & LLM Experimentation', org:'OpenAI API · Hugging Face', desc:'Integrating language models into web applications and building AI-assisted tools.' },
]

export default function About() {
  return (
    <PageTransition className="pt-28">

      {/* Hero */}
      <section className="rm-section" style={{ background:'#0a0a0a' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ About</span>
            <div className="rule flex-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Photo */}
            <ClipReveal direction="right">
              <div style={{ position:'relative', width:'100%', maxWidth:'400px' }}>
                <div style={{ width:'100%', aspectRatio:'3/4', background:'#111111', border:'1px solid #1f1f1f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem' }}>
                  <span style={{ fontSize:'4rem', opacity:0.15 }}>📸</span>
                  <div style={{ textAlign:'center' }}>
                    <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#2a2a2a' }}>Your Photo Here</p>
                    <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'#1f1f1f', marginTop:'0.25rem' }}>Replace in About.tsx</p>
                  </div>
                </div>
                {/* Corner accent */}
                <div style={{ position:'absolute', bottom:'-1rem', right:'-1rem', width:'4rem', height:'4rem', border:'1px solid #c8f269', borderRadius:0 }} />
                <div style={{ position:'absolute', bottom:'-0.5rem', right:'-0.5rem', width:'2rem', height:'2rem', background:'#c8f269', borderRadius:0 }} />
              </div>
            </ClipReveal>

            {/* Text */}
            <div>
              <TextReveal as="h1" trigger="load" splitBy="words" delay={0.1} duration={DUR_SLOW} stagger={0.06} skewY={3}
                style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1.1, marginBottom:'1.5rem' }}>
                Roberto Mediana Jr.
              </TextReveal>

              <ClipReveal direction="down">
                <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#c8f269', marginBottom:'1.25rem' }}>
                  BSIT Student · Full-Stack Developer · Web Pentester
                </p>
                <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', lineHeight:1.75, marginBottom:'1.25rem' }}>
                  I'm an IT student with a genuine interest in how software is built, structured, and maintained. I work across both frontend and backend — writing clean interfaces and reliable server-side logic.
                </p>
                <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', lineHeight:1.75, marginBottom:'2rem' }}>
                  From capstone systems to web security exercises, I approach every project as an opportunity to build something useful and learn something new.
                </p>
              </ClipReveal>

              <ClipReveal direction="down" delay={0.15}>
                <SocialLinks showLabels className="mb-6" />
                <MagneticButton strength={0.3}>
                  <Link to="/contact" className="btn-primary">Let's Connect <ArrowRight size={14} /></Link>
                </MagneticButton>
              </ClipReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="rm-section" style={{ background:'#111111' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ Education</span>
            <div className="rule flex-1" />
          </div>

          <ClipReveal direction="down">
            <div style={{ border:'1px solid #1f1f1f', padding:'2.5rem' }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#c8f269', marginBottom:'0.75rem' }}>
                    2021 – 2027 (Expected)
                  </p>
                  <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(1.25rem,3vw,1.75rem)', letterSpacing:'-0.03em', color:'#f0f0f0', marginBottom:'0.5rem' }}>
                    Bachelor of Science in Information Technology
                  </h2>
                  <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a' }}>
                    West Visayas State University – Janiuay Campus
                  </p>
                </div>
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', padding:'0.375rem 0.75rem', border:'1px solid rgba(200,242,105,0.2)', color:'#c8f269', background:'rgba(200,242,105,0.04)', borderRadius:0 }}>
                  In Progress
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-0 mt-8 border-t" style={{ borderColor:'#1f1f1f' }}>
                {[{target:4,suffix:'th',label:'Year'},{target:2027,suffix:'',label:'Graduation'},{target:20,suffix:'+',label:'Technologies'}].map(s => (
                  <div key={s.label} className="border-r p-6 last:border-r-0" style={{ borderColor:'#1f1f1f' }}>
                    <StatCounter target={s.target} suffix={s.suffix} label={s.label} duration={1600} />
                  </div>
                ))}
              </div>
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="rm-section" style={{ background:'#0a0a0a' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ Journey</span>
            <div className="rule flex-1" />
          </div>

          <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
            style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1.1, marginBottom:'3.5rem' }}>
            Currently Building
          </TextReveal>

          <div className="border-t" style={{ borderColor:'#1f1f1f' }}>
            {journey.map((item, i) => (
              <ClipReveal key={item.title} direction="right" delay={i * 0.08}>
                <div style={{ padding:'2rem 0', borderBottom:'1px solid #1f1f1f', display:'grid', gridTemplateColumns:'10rem 1fr', gap:'2rem' }}>
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.1em', color:'#c8f269', paddingTop:'0.125rem' }}>
                    {item.period}
                  </span>
                  <div>
                    <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'1rem', letterSpacing:'-0.02em', color:'#f0f0f0', marginBottom:'0.25rem' }}>{item.title}</h3>
                    <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#5a5a5a', marginBottom:'0.625rem' }}>{item.org}</p>
                    <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.9375rem', color:'#5a5a5a', lineHeight:1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </ClipReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="rm-section" style={{ background:'#111111' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ Certifications</span>
            <div className="rule flex-1" />
          </div>

          {!certifications[0]?.image ? (
            <ClipReveal direction="down">
              <div style={{ border:'1px solid #1f1f1f', padding:'4rem', textAlign:'center' }}>
                <Award size={28} style={{ color:'#2a2a2a', margin:'0 auto 1rem' }} />
                <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, color:'#f0f0f0', marginBottom:'0.5rem' }}>Certificates Coming Soon</p>
                <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.1em', color:'#2a2a2a' }}>
                  Add to src/data/certifications.ts · Place images in public/assets/certs/
                </p>
              </div>
            </ClipReveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:'#1f1f1f' }}>
              {certifications.map((cert) => (
                <ClipReveal key={cert.id} direction="down">
                  <div style={{ background:'#111111', padding:0, overflow:'hidden' }}>
                    <div style={{ height:'180px', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
                      {cert.image ? <img src={cert.image} alt={cert.title} style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }} loading="lazy" /> : <Award size={24} style={{ color:'#2a2a2a' }} />}
                    </div>
                    <div style={{ padding:'1.5rem', borderTop:'1px solid #1f1f1f' }}>
                      <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'0.875rem', color:'#f0f0f0', marginBottom:'0.25rem' }}>{cert.title}</p>
                      <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#5a5a5a' }}>{cert.issuer}{cert.date && ` · ${cert.date}`}</p>
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                          style={{ display:'inline-flex', alignItems:'center', gap:'0.25rem', fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.08em', color:'#c8f269', marginTop:'0.625rem', transition:'opacity 0.2s' }}>
                          View <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </ClipReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
