import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowRight, MapPin, ExternalLink, Github } from 'lucide-react'
import {
  SiReact, SiVuedotjs, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss, SiNodedotjs, SiLaravel, SiPhp,
  SiExpress, SiMysql, SiMongodb, SiPostgresql, SiSupabase,
  SiFirebase, SiGit, SiDocker, SiPostman, SiLinux,
} from 'react-icons/si'
import { Brain, Workflow, Bot } from 'lucide-react'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { Card3D } from '@/components/ui/Card3D'
import { FloatingShape } from '@/components/3d/FloatingShape'
import { projects } from '@/data/projects'

// Lazy load the heavy Three.js hero canvas
const HeroCanvas = lazy(() =>
  import('@/components/3d/HeroCanvas').then(m => ({ default: m.HeroCanvas }))
)
const TechGlobe = lazy(() =>
  import('@/components/3d/TechGlobe').then(m => ({ default: m.TechGlobe }))
)

const up = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  hidden: {},
}

// ── HERO ───────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll()
  const textY  = useTransform(scrollY, [0, 500], [0, -80])
  const canvasY = useTransform(scrollY, [0, 600], [0, 60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
      {/* Full-screen 3D canvas */}
      <motion.div
        style={{ y: canvasY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </motion.div>

      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(17,17,16,0.65) 0%, rgba(17,17,16,0.35) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(17,17,16,0.4) 0%, transparent 40%, transparent 60%, rgba(17,17,16,0.9) 100%)' }}
        aria-hidden="true"
      />

      {/* Text content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-16"
      >
        <div className="rm-container">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-6 max-w-3xl">

            {/* Status badge */}
            <motion.div variants={up}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono"
                style={{ background: 'rgba(207,69,0,0.12)', borderColor: 'rgba(207,69,0,0.3)', color: '#F5874A', backdropFilter: 'blur(8px)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available for projects
                <span className="mx-1.5 opacity-30">·</span>
                <MapPin size={10} />Iloilo, Philippines
              </span>
            </motion.div>

            {/* Name — Vlad-style split */}
            <motion.div variants={up}>
              <h1 className="t-hero leading-none" style={{ fontSize: 'clamp(3.5rem,12vw,10rem)', color: '#F5F3EE', textShadow: '0 4px 40px rgba(207,69,0,0.3)' }}>
                Roberto
              </h1>
              <div className="flex items-end gap-3">
                <h1 className="t-hero leading-none"
                  style={{ fontSize: 'clamp(3.5rem,12vw,10rem)', color: 'transparent', WebkitTextStroke: '2px #F5F3EE', textShadow: '0 4px 40px rgba(207,69,0,0.2)' }}>
                  Mediana
                </h1>
                <span className="t-hero leading-none pb-1" style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', color: '#E8702A' }}>Jr.</span>
              </div>
            </motion.div>

            {/* Roles */}
            <motion.div variants={up}>
              <p style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 'clamp(1rem,2.5vw,1.375rem)', color: 'rgba(245,243,238,0.75)', letterSpacing: '-0.02em' }}>
                Full-Stack Developer &amp; Web Penetration Tester
              </p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: '0.9375rem', color: 'rgba(245,243,238,0.45)', marginTop: '0.25rem' }}>
                BSIT Student · West Visayas State University – Janiuay Campus
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={up} className="flex flex-wrap items-center gap-3 pt-1">
              <a href="/assets/resume-placeholder.pdf" className="btn-primary">
                Resume <ArrowUpRight size={15} />
              </a>
              <Link to="/contact" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(245,243,238,0.8)' }}>
                Get In Touch
              </Link>
              <SocialLinks className="ml-1" />
            </motion.div>

            {/* Stats */}
            <motion.div variants={up}>
              <div style={{ height: 1, background: 'rgba(245,243,238,0.12)', margin: '0.5rem 0 1.5rem' }} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { num: '4th',  label: 'Year Student' },
                  { num: '2027', label: 'Expected Grad' },
                  { num: '20+',  label: 'Technologies' },
                  { num: '3+',   label: 'Projects Built' },
                ].map(s => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontWeight: 800, fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.05em', color: '#F5F3EE' }}>{s.num}</p>
                    <p className="t-eyebrow mt-1" style={{ color: 'rgba(245,243,238,0.4)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-2.5 z-10 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(17,17,16,0.7)', backdropFilter: 'blur(12px)' }}>
        <div className="flex whitespace-nowrap animate-ticker" style={{ width: '200%' }}>
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex items-center gap-8 mr-8">
              {['React', 'Laravel', 'Node.js', 'TypeScript', 'Vue.js', 'PostgreSQL', 'Docker', 'Kali Linux', 'Next.js', 'MongoDB', 'Supabase', 'PHP', 'Express', 'Git', 'OpenAI'].map(t => (
                <span key={t} className="font-mono text-xs" style={{ color: 'rgba(245,243,238,0.35)' }}>
                  {t} <span style={{ color: '#E8702A' }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ABOUT ──────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="rm-section relative overflow-hidden" style={{ background: 'var(--section-bg-alt)' }}>
      {/* Decorative 3D shape */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-70 pointer-events-none hidden lg:block">
        <FloatingShape type="icosahedron" color="#CF4500" size={140} />
      </div>

      <div className="rm-container relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">01</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">About</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <h2 className="t-display text-3xl sm:text-4xl mb-5" style={{ color: 'var(--text-1)' }}>
              Designing products people actually enjoy using
            </h2>
            <p className="t-body text-base mb-4">
              I'm a BSIT student with a genuine interest in how software is built, structured, and maintained.
              I work across both frontend and backend — writing clean interfaces and reliable server-side logic.
            </p>
            <p className="t-body text-base mb-6">
              From capstone projects to web security exercises, I approach every build as an opportunity to
              learn something new and ship something useful.
            </p>
            <Link to="/about" className="btn-ghost text-sm">Full Story <ArrowRight size={13} /></Link>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 gap-3">
            {[
              { label: 'Degree',     value: 'B.S. Information Technology' },
              { label: 'University', value: 'WVSU – Janiuay Campus' },
              { label: 'Status',     value: 'Incoming 4th Year · 2027' },
              { label: 'Focus',      value: 'Full-Stack Development' },
            ].map(item => (
              <motion.div key={item.label} variants={staggerItemVariants}>
                <Card3D className="bento-card flex flex-col gap-2">
                  <p className="t-eyebrow">{item.label}</p>
                  <p style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-1)' }}>{item.value}</p>
                </Card3D>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}

// ── WORKS ──────────────────────────────────────────────────────────
type WorkFilter = 'All' | 'School' | 'Capstone' | 'Personal'

const catColors: Record<string,string> = { school:'rgba(99,102,241,0.12)', capstone:'rgba(207,69,0,0.10)', personal:'rgba(34,197,94,0.10)' }
const catText:   Record<string,string> = { school:'#818cf8', capstone:'var(--accent-h)', personal:'#4ade80' }
const catMap:    Record<string, WorkFilter> = { school:'School', capstone:'Capstone', personal:'Personal' }

function WorksSection() {
  const [filter, setFilter] = useState<WorkFilter>('All')
  const filters: WorkFilter[] = ['All', 'School', 'Capstone', 'Personal']
  const filtered = projects.filter(p => filter === 'All' ? true : catMap[p.category] === filter)

  return (
    <section className="rm-section relative overflow-hidden">
      {/* Left accent shape */}
      <div className="absolute left-4 top-24 opacity-40 pointer-events-none hidden xl:block">
        <FloatingShape type="tetrahedron" color="#CF4500" size={100} />
      </div>

      <div className="rm-container relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">02</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Works</span>
        </div>

        <ScrollReveal>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="t-display text-3xl sm:text-4xl" style={{ color: 'var(--text-1)' }}>Selected Works</h2>
            <div className="flex items-center gap-1 p-1 rounded-xl border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`filter-tab ${filter === f ? 'active' : ''}`}>{f}</button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <Card3D className="project-card group h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden" style={{ background: 'var(--border)' }}>
                    {project.image && !project.image.includes('placeholder')
                      ? <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      : <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-25">
                          <span className="text-3xl">🖥️</span>
                          <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>Project Preview</span>
                        </div>
                    }
                    <span className="absolute top-3 left-3 text-xs font-mono px-2 py-0.5 rounded-md"
                      style={{ background: catColors[project.category] ?? 'var(--accent-dim)', color: catText[project.category] ?? 'var(--accent-h)', backdropFilter: 'blur(8px)' }}>
                      {catMap[project.category] ?? project.category}
                    </span>
                    {project.status === 'in-progress' && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-mono"
                        style={{ background: 'rgba(0,0,0,0.6)', color: '#4ade80' }}>
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />In Progress
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div>
                      <p className="t-eyebrow mb-1">{project.role} · {project.date}</p>
                      <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text-1)' }}>{project.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-2)' }}>{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map(t => <span key={t} className="rm-tag">{t}</span>)}
                      {project.technologies.length > 4 && <span className="rm-tag">+{project.technologies.length - 4}</span>}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Link to={`/projects/${project.slug}`} className="btn-primary text-xs py-1.5 px-3 flex-1 justify-center">View Project</Link>
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-2"><Github size={13} /></a>}
                      {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-2"><ExternalLink size={13} /></a>}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-3">🚧</p>
            <p style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, color: 'var(--text-1)' }}>Projects coming soon</p>
          </div>
        )}
        <ScrollReveal className="mt-10 flex justify-center">
          <Link to="/projects" className="btn-ghost">View All Projects <ArrowRight size={13} /></Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ── SKILLS ─────────────────────────────────────────────────────────
const skills = [
  { title: 'Full-Stack Web Development', desc: 'End-to-end web apps with React, Vue.js, Laravel, Node.js, and modern databases.' },
  { title: 'Database Design',            desc: 'Schema design for MySQL, PostgreSQL, MongoDB, Supabase, and Firebase.' },
  { title: 'Web Penetration Testing',    desc: 'Security assessments using Kali Linux and ethical hacking methodologies.' },
  { title: 'UI/UX Design',               desc: 'Clean, accessible interfaces that prioritize usability and visual clarity.' },
  { title: 'API Development',            desc: 'RESTful APIs, authentication, and third-party integrations with Laravel & Express.' },
  { title: 'AI & LLM Integration',       desc: 'Experimenting with OpenAI API and Hugging Face for web-integrated AI tools.' },
]

function SkillsSection() {
  return (
    <section className="rm-section" style={{ background: 'var(--section-bg-alt)' }}>
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">03</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Skills</span>
        </div>
        <ScrollReveal>
          <h2 className="t-display text-3xl sm:text-4xl mb-8" style={{ color: 'var(--text-1)' }}>Core Skills</h2>
        </ScrollReveal>
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(s => (
            <motion.div key={s.title} variants={staggerItemVariants}>
              <Card3D className="skill-card h-full">
                <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.02em', color: 'var(--text-1)', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
              </Card3D>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}

// ── TECH GLOBE ─────────────────────────────────────────────────────
const toolsGrid = [
  { name: 'React',      Icon: SiReact,      color: '#61dafb' },
  { name: 'Vue.js',     Icon: SiVuedotjs,   color: '#42b883' },
  { name: 'Next.js',    Icon: SiNextdotjs,  color: 'currentColor' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  { name: 'Tailwind',   Icon: SiTailwindcss,color: '#06b6d4' },
  { name: 'HTML5',      Icon: SiHtml5,      color: '#e34f26' },
  { name: 'CSS',        Icon: SiCss,        color: '#1572b6' },
  { name: 'Node.js',    Icon: SiNodedotjs,  color: '#339933' },
  { name: 'Laravel',    Icon: SiLaravel,    color: '#ff2d20' },
  { name: 'PHP',        Icon: SiPhp,        color: '#777bb4' },
  { name: 'Express',    Icon: SiExpress,    color: 'currentColor' },
  { name: 'MySQL',      Icon: SiMysql,      color: '#4479a1' },
  { name: 'MongoDB',    Icon: SiMongodb,    color: '#47a248' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
  { name: 'Supabase',   Icon: SiSupabase,   color: '#3ecf8e' },
  { name: 'Firebase',   Icon: SiFirebase,   color: '#ffca28' },
  { name: 'Git',        Icon: SiGit,        color: '#f05032' },
  { name: 'Docker',     Icon: SiDocker,     color: '#2496ed' },
  { name: 'Postman',    Icon: SiPostman,    color: '#ff6c37' },
  { name: 'Kali Linux', Icon: SiLinux,      color: '#557c94' },
  { name: 'OpenAI',     Icon: Bot,          color: '#10a37f' },
  { name: 'AI/LLMs',   Icon: Brain,        color: 'var(--accent-h)' },
  { name: 'REST APIs',  Icon: Workflow,     color: 'var(--accent)' },
]

function ToolsSection() {
  return (
    <section className="rm-section overflow-hidden">
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">04</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Toolkits</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <h2 className="t-display text-3xl sm:text-4xl mb-5" style={{ color: 'var(--text-1)' }}>My Toolkit</h2>
              <p className="t-body text-base mb-6">Technologies I actively use across frontend, backend, databases, and security tooling.</p>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {toolsGrid.map(({ name, Icon, color }) => (
                <motion.div key={name} variants={staggerItemVariants}>
                  <Card3D className="tool-card" intensity={8} lift={5}>
                    <Icon size={24} style={{ color }} />
                    <span className="font-mono text-xs text-center leading-tight" style={{ color: 'var(--text-2)' }}>{name}</span>
                  </Card3D>
                </motion.div>
              ))}
            </StaggerReveal>
            <ScrollReveal className="mt-6">
              <Link to="/tech-stack" className="btn-ghost text-sm">Full Stack <ArrowRight size={13} /></Link>
            </ScrollReveal>
          </div>

          {/* 3D Globe */}
          <ScrollReveal>
            <Suspense fallback={
              <div className="flex items-center justify-center h-80">
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
              </div>
            }>
              <TechGlobe size={480} />
            </Suspense>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ── EXPERTISE ──────────────────────────────────────────────────────
const expertise = [
  { num: '(1)', title: 'Full-Stack Web Development',     desc: 'End-to-end development from database schema to responsive UI using React, Laravel, Node.js.' },
  { num: '(2)', title: 'Web Penetration Testing',         desc: 'Security assessments using Kali Linux, identifying vulnerabilities and ethical hacking.' },
  { num: '(3)', title: 'UI/UX Design & Prototyping',      desc: 'Clean, accessible interfaces with clear hierarchy and smooth user flows.' },
  { num: '(4)', title: 'RESTful API & Backend Systems',   desc: 'Documented APIs using Laravel and Express.js with authentication and database integration.' },
  { num: '(5)', title: 'Database Architecture',           desc: 'SQL and NoSQL data models across MySQL, PostgreSQL, MongoDB, Supabase, and Firebase.' },
  { num: '(6)', title: 'AI Integration & Experimentation',desc: 'Integrating OpenAI API and Hugging Face models into custom web workflows.' },
]

function ExpertiseSection() {
  return (
    <section className="rm-section" style={{ background: 'var(--section-bg-alt)' }}>
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">05</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Expertise</span>
        </div>
        <ScrollReveal>
          <h2 className="t-display text-3xl sm:text-4xl mb-2" style={{ color: 'var(--text-1)' }}>What I Do</h2>
        </ScrollReveal>
        <div className="mt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          {expertise.map((item, i) => (
            <ScrollReveal key={item.num} delay={i * 0.04}>
              <div className="expertise-item group">
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: '0.75rem', color: 'var(--text-3)', paddingTop: '0.125rem' }}>{item.num}</span>
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                  <h3 className="expertise-title font-semibold text-base mb-1 sm:mb-0 sm:w-64 flex-shrink-0 transition-colors duration-200"
                    style={{ fontFamily: "'Geist', sans-serif", letterSpacing: '-0.02em', color: 'var(--text-1)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-8">
          <Link to="/services" className="btn-ghost text-sm">All Services <ArrowRight size={13} /></Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ── CONTACT CTA ────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section className="rm-section relative overflow-hidden">
      {/* Right accent shape */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none hidden lg:block">
        <FloatingShape type="torus" color="#CF4500" size={160} />
      </div>

      <div className="rm-container relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">06</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Contact</span>
        </div>
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="t-display text-3xl sm:text-5xl mb-4" style={{ color: 'var(--text-1)' }}>
                Let's build something great
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-2)', fontFamily: "'Geist', sans-serif" }}>
                I'm open to collaborations, academic partnerships, and freelance projects. Let's talk.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">Email Me <ArrowUpRight size={14} /></Link>
                <SocialLinks showLabels />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Email',    value: 'your.email@example.com', note: 'Update in socials.ts' },
                { label: 'Location', value: 'Iloilo, Philippines',     note: 'Available remotely' },
                { label: 'Status',   value: 'Open to collaborations',  note: 'Acad projects welcome' },
              ].map(item => (
                <Card3D key={item.label} className="bento-card flex items-center justify-between gap-4" intensity={6} lift={4}>
                  <div>
                    <p className="t-eyebrow mb-0.5">{item.label}</p>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-1)' }}>{item.value}</p>
                  </div>
                  <span className="rm-tag text-xs shrink-0">{item.note}</span>
                </Card3D>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ── PAGE ASSEMBLY ──────────────────────────────────────────────────
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <ToolsSection />
      <ExpertiseSection />
      <ContactSection />
    </PageTransition>
  )
}
