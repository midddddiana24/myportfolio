import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'

const facts = [
  { label:'Degree', value:'B.S. Information Technology' },
  { label:'University', value:'WVSU – Janiuay Campus' },
  { label:'Year', value:'Incoming 4th Year' },
  { label:'Goal', value:'Full-Stack Developer' },
]

export function AboutPreview() {
  return (
    <section className="rm-section" style={{ background:'var(--section-bg-alt)' }}>
      <div className="rm-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <ScrollReveal>
              <p className="t-eyebrow mb-3">About Me</p>
              <h2 style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(1.75rem,4vw,2.75rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'1.25rem' }}>
                Turning ideas into working software
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed mb-6" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                I'm an IT student with a genuine interest in how software is built, structured, and maintained —
                working across both frontend and backend stacks.
              </p>
              <Link to="/about" className="btn-ghost inline-flex">More About Me <ArrowRight size={14}/></Link>
            </ScrollReveal>
          </div>
          <StaggerReveal className="grid grid-cols-2 gap-3">
            {facts.map(fact => (
              <motion.div key={fact.label} variants={staggerItemVariants} className="bento-card flex flex-col gap-2">
                <p className="t-eyebrow">{fact.label}</p>
                <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'0.8125rem', color:'var(--text-1)', letterSpacing:'-0.01em' }}>{fact.value}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}
