import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Clock, Award, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { certifications } from '@/data/certifications'

const journey = [
  { period:'2021 – Present', title:'BSIT Student', org:'West Visayas State University – Janiuay Campus',
    desc:'Studying core computing, software engineering, data structures, databases, and system development. Actively building academic systems and exploring modern web frameworks.' },
  { period:'2023 – Present', title:'Full-Stack Web Development', org:'Self-directed & Academic Projects',
    desc:'Building full-stack applications using React, Laravel, Node.js, and modern databases. Working on capstone projects, academic systems, and personal builds to develop practical experience.' },
  { period:'2024 – Present', title:'Web Penetration Testing', org:'Self-directed Learning · Kali Linux',
    desc:'Learning ethical hacking methodologies, web application security assessments, and vulnerability identification using industry-standard tools.' },
  { period:'2024 – Present', title:'AI & LLM Experimentation', org:'Personal Projects',
    desc:'Exploring AI integrations using OpenAI API and Hugging Face models. Building projects that combine language models with web applications.' },
]

export default function About() {
  return (
    <PageTransition className="pt-28">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="rm-section pb-12">
        <div className="rm-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative flex justify-center lg:justify-start">
                {/* Photo placeholder */}
                <div className="relative w-72 h-80 rounded-2xl border flex flex-col items-center justify-center gap-3"
                  style={{ background:'var(--card)', borderColor:'var(--border)' }}>
                  <span className="text-5xl opacity-30">📸</span>
                  <div className="text-center">
                    <p className="font-mono text-sm" style={{ color:'var(--text-3)' }}>Your Photo Here</p>
                    <p className="font-mono text-xs mt-0.5 opacity-50" style={{ color:'var(--text-3)' }}>Replace in About.tsx</p>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-2xl opacity-10 rounded-br-2xl"
                    style={{ background:'var(--accent)' }} />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-5 -right-2 sm:right-4 px-4 py-2.5 rounded-xl border"
                  style={{ background:'var(--surface)', borderColor:'var(--border)', boxShadow:'var(--shadow-lg)' }}>
                  <p className="t-eyebrow mb-0.5">Expected Graduation</p>
                  <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'1.5rem', color:'var(--accent)', letterSpacing:'-0.04em' }}>2027</p>
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <p className="t-eyebrow mb-3">About Me</p>
                <h1 style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(2.25rem,5vw,3.5rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'1.25rem' }}>
                  Roberto Mediana Jr.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-lg leading-relaxed mb-4" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                  I'm an IT student with a genuine interest in how software is built, structured, and maintained.
                  I enjoy working across both frontend and backend — writing clean interfaces and reliable server logic.
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                  Whether it's a management system for a capstone project, a web security exercise, or experimenting
                  with AI integrations — I approach every project as an opportunity to build something useful.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <SocialLinks showLabels className="mb-5" />
                <Link to="/contact" className="btn-primary">Let's Connect <ArrowRight size={15} /></Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ─────────────────────────────── */}
      <section className="rm-section py-14" style={{ background:'var(--section-bg-alt)' }}>
        <div className="rm-container">
          <SectionHeading eyebrow="Education" title="Academic Background" />
          <ScrollReveal>
            <div className="bento-card flex flex-col sm:flex-row gap-5 items-start sm:items-center max-w-2xl">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:'var(--accent-dim)', border:'1px solid rgba(207,69,0,0.15)' }}>
                <GraduationCap size={26} style={{ color:'var(--accent-h)' }} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1rem', letterSpacing:'-0.02em', color:'var(--text-1)' }}>
                    Bachelor of Science in Information Technology
                  </h3>
                  <span className="rm-tag rm-tag-accent">In Progress</span>
                </div>
                <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:600, fontSize:'0.875rem', color:'var(--accent-h)', marginBottom:'0.25rem' }}>
                  West Visayas State University – Janiuay Campus
                </p>
                <div className="flex items-center gap-3 text-xs font-mono" style={{ color:'var(--text-3)' }}>
                  <span>Incoming 4th Year</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={11} />Expected: 2027</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Journey ───────────────────────────────── */}
      <section className="rm-section py-14">
        <div className="rm-container">
          <SectionHeading eyebrow="Development Journey" title="Currently Building" subtitle="My path as a developer — the skills I'm sharpening and the work I'm doing." />
          <div className="relative border-t" style={{ borderColor:'var(--border)' }}>
            {journey.map((item, i) => (
              <ScrollReveal key={item.title} delay={i*0.07}>
                <div className="py-7 border-b grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-4 sm:gap-8"
                  style={{ borderColor:'var(--border)' }}>
                  <div>
                    <span className="font-mono text-xs" style={{ color:'var(--accent-h)' }}>{item.period}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1rem', letterSpacing:'-0.02em', color:'var(--text-1)', marginBottom:'0.25rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:500, fontSize:'0.8125rem', color:'var(--accent-h)', marginBottom:'0.5rem' }}>{item.org}</p>
                    <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)' }}>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ─────────────────────────── */}
      <section className="rm-section py-14" style={{ background:'var(--section-bg-alt)' }}>
        <div className="rm-container">
          <SectionHeading eyebrow="Certifications" title="Credentials & Certificates" />

          {certifications.length === 0 || !certifications[0].image ? (
            <ScrollReveal>
              <div className="bento-card text-center py-16 max-w-lg mx-auto">
                <Award size={32} className="mx-auto mb-3 opacity-30" style={{ color:'var(--text-2)' }} />
                <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--text-1)', marginBottom:'0.5rem' }}>Certificates Coming Soon</h3>
                <p className="text-sm" style={{ color:'var(--text-3)' }}>
                  Add your certificates to{' '}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background:'var(--card)', color:'var(--accent-h)' }}>
                    src/data/certifications.ts
                  </code>
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map(cert => (
                <motion.div key={cert.id} variants={staggerItemVariants} className="cert-card group">
                  <div className="h-44 flex items-center justify-center p-4" style={{ background:'var(--bg)' }}>
                    {cert.image
                      ? <img src={cert.image} alt={cert.title} className="max-w-full max-h-full object-contain" loading="lazy" />
                      : <Award size={28} style={{ color:'var(--text-3)' }} />}
                  </div>
                  <div className="p-4">
                    <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'0.875rem', color:'var(--text-1)', marginBottom:'0.25rem' }}>{cert.title}</p>
                    <p className="font-mono text-xs" style={{ color:'var(--text-3)', marginBottom:'0.5rem' }}>{cert.issuer}{cert.date && ` · ${cert.date}`}</p>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs transition-colors"
                        style={{ color:'var(--accent-h)' }}>
                        View Credential <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>
          )}
        </div>
      </section>

    </PageTransition>
  )
}
