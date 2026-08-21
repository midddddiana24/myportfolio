import { useRef, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Github } from 'lucide-react'
import {
  SiReact, SiVuedotjs, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss, SiNodedotjs, SiLaravel, SiPhp,
  SiExpress, SiMysql, SiMongodb, SiPostgresql, SiSupabase,
  SiFirebase, SiGit, SiDocker, SiPostman, SiLinux,
} from 'react-icons/si'
import { Brain, Workflow, Bot } from 'lucide-react'
import { gsap, EASE_POWER4, DUR_SLOW, DUR_NORMAL } from '@/lib/gsap'
import { TextReveal }        from '@/components/motion/TextReveal'
import { MagneticButton }    from '@/components/motion/MagneticButton'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { HorizontalScroll }  from '@/components/motion/HorizontalScroll'
import { PageTransition }    from '@/components/layout/PageTransition'
import { SocialLinks }       from '@/components/ui/SocialLinks'
import { StatCounter }       from '@/components/ui/StatCounter'
import { Card3D }            from '@/components/ui/Card3D'
import { FloatingShape }     from '@/components/3d/FloatingShape'
import { GitHubStats }       from '@/components/home/GitHubStats'
import { projects }          from '@/data/projects'

const HeroCanvas = lazy(() => import('@/components/3d/HeroCanvas').then(m => ({ default: m.HeroCanvas })))
const TechGlobe  = lazy(() => import('@/components/3d/TechGlobe').then(m => ({ default: m.TechGlobe })))

// ================================================================
// HOME v6 — GSAP + Lenis animations
// Signature: split-text reveals · clip-path wipes · horizontal scroll
//            magnetic buttons · parallax · scroll-synced numbers
// ================================================================

// ── HERO ──────────────────────────────────────────────────────────
function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef     = useRef<HTMLDivElement>(null)
  const roleRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.95 }) // After preloader

      // Status badge
      tl.fromTo(tagRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: DUR_NORMAL, ease: EASE_POWER4 }
      )
      // Role
      tl.fromTo(roleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: DUR_NORMAL, ease: EASE_POWER4 },
        '-=0.5'
      )
      // CTAs
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DUR_NORMAL, ease: EASE_POWER4 },
        '-=0.4'
      )
      // Divider line draws in
      tl.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.7, ease: EASE_POWER4 },
        '-=0.3'
      )
      // Stats
      tl.fromTo(statsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: DUR_NORMAL, ease: EASE_POWER4 },
        '-=0.5'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const textCol = el.querySelector('.hero-text-col') as HTMLElement
    if (!textCol) return
    const anim = gsap.to(textCol, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => { anim.kill() }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-20">
      {/* Full-screen 3D canvas */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}><HeroCanvas /></Suspense>
      </div>

      {/* Overlay gradients */}
      <div className="absolute inset-0 z-[1]" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(17,17,16,0.7) 0%, rgba(17,17,16,0.3) 60%, transparent 100%)',
      }} />
      <div className="absolute inset-0 z-[1]" aria-hidden="true" style={{
        background: 'linear-gradient(to bottom, rgba(17,17,16,0.4) 0%, transparent 40%, transparent 60%, rgba(17,17,16,0.95) 100%)',
      }} />

      {/* Text */}
      <div className="rm-container relative z-10 hero-text-col">
        <div className="flex flex-col gap-6 max-w-3xl">

          {/* Status badge */}
          <div ref={tagRef} style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono"
              style={{ background:'rgba(207,69,0,0.12)', borderColor:'rgba(207,69,0,0.3)', color:'#F5874A', backdropFilter:'blur(8px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for projects · Iloilo, Philippines
            </span>
          </div>

          {/* Name — TextReveal character split */}
          <div>
            <TextReveal
              as="h1"
              trigger="load"
              splitBy="words"
              delay={1.95}
              duration={DUR_SLOW}
              stagger={0.12}
              style={{ fontSize:'clamp(3.5rem,12vw,10rem)', fontFamily:"'Geist', sans-serif", fontWeight:800, lineHeight:1, letterSpacing:'-0.05em', color:'#F5F3EE', textShadow:'0 4px 40px rgba(207,69,0,0.3)' }}
            >
              Roberto
            </TextReveal>
            <div style={{ display:'flex', alignItems:'flex-end', gap:'0.75rem' }}>
              <TextReveal
                as="h1"
                trigger="load"
                splitBy="words"
                delay={2.1}
                duration={DUR_SLOW}
                stagger={0.12}
                style={{ fontSize:'clamp(3.5rem,12vw,10rem)', fontFamily:"'Geist', sans-serif", fontWeight:800, lineHeight:1, letterSpacing:'-0.05em', color:'transparent', WebkitTextStroke:'2px #F5F3EE' }}
              >
                Mediana
              </TextReveal>
              <TextReveal
                as="span"
                trigger="load"
                splitBy="words"
                delay={2.25}
                duration={DUR_SLOW}
                style={{ fontSize:'clamp(2rem,5vw,4.5rem)', fontFamily:"'Geist', sans-serif", fontWeight:800, lineHeight:1, paddingBottom:'0.25rem', color:'#E8702A' }}
              >
                Jr.
              </TextReveal>
            </div>
          </div>

          {/* Role */}
          <p ref={roleRef} style={{ opacity:0, fontFamily:"'Geist', sans-serif", fontWeight:600, fontSize:'clamp(1rem,2.5vw,1.375rem)', color:'rgba(245,243,238,0.75)', letterSpacing:'-0.02em' }}>
            Full-Stack Developer &amp; Web Penetration Tester
            <span style={{ display:'block', fontWeight:400, fontSize:'0.9375rem', color:'rgba(245,243,238,0.45)', marginTop:'0.25rem' }}>
              BSIT Student · West Visayas State University – Janiuay Campus
            </span>
          </p>

          {/* CTAs — Magnetic */}
          <div ref={ctaRef} style={{ opacity:0, display:'flex', flexWrap:'wrap', alignItems:'center', gap:'0.75rem', paddingTop:'0.25rem' }}>
            <MagneticButton strength={0.4}>
              <a href="/assets/resume-placeholder.pdf" className="btn-primary">
                Resume <ArrowUpRight size={15} />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link to="/contact" className="btn-ghost" style={{ borderColor:'rgba(255,255,255,0.2)', color:'rgba(245,243,238,0.8)' }}>
                Get In Touch
              </Link>
            </MagneticButton>
            <SocialLinks className="ml-1" />
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{ opacity:0 }}>
            <div ref={lineRef} style={{ height:1, background:'rgba(245,243,238,0.12)', margin:'0.5rem 0 1.5rem', transformOrigin:'left' }} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[{ n:4, s:'th', l:'Year Student' },{ n:2027, s:'', l:'Expected Grad' },{ n:20, s:'+', l:'Technologies' },{ n:3, s:'+', l:'Projects Built' }].map(({ n, s, l }) => (
                <div key={l}>
                  <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'2rem', lineHeight:1, letterSpacing:'-0.05em', color:'#F5F3EE' }}>{n}{s}</p>
                  <p className="t-eyebrow mt-1" style={{ color:'rgba(245,243,238,0.4)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-2.5 z-10 border-t" style={{ borderColor:'rgba(255,255,255,0.07)', background:'rgba(17,17,16,0.75)', backdropFilter:'blur(12px)' }}>
        <div className="flex whitespace-nowrap animate-ticker" style={{ width:'200%' }}>
          {[...Array(2)].map((_,i) => (
            <div key={i} className="flex items-center gap-8 mr-8">
              {['React','Laravel','Node.js','TypeScript','Vue.js','PostgreSQL','Docker','Kali Linux','Next.js','MongoDB','Supabase','PHP'].map(t => (
                <span key={t} className="font-mono text-xs" style={{ color:'rgba(245,243,238,0.3)' }}>{t} <span style={{ color:'#E8702A' }}>·</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ABOUT ─────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="rm-section relative overflow-hidden" style={{ background:'var(--section-bg-alt)' }}>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none hidden lg:block">
        <FloatingShape type="icosahedron" color="#CF4500" size={140} />
      </div>
      <div className="rm-container relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-num">01</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">About</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.06}
              style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(1.75rem,4vw,2.75rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'1.25rem' }}>
              Turning ideas into working software
            </TextReveal>
            <ClipReveal direction="down" delay={0.2}>
              <p className="text-base leading-relaxed mb-6" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                I'm a BSIT student with a genuine interest in how software is built, structured, and maintained —
                working across both frontend and backend. I learn by building real things: management systems,
                booking platforms, web apps, and experimenting with AI integrations.
              </p>
            </ClipReveal>
            <ClipReveal direction="down" delay={0.35}>
              <MagneticButton strength={0.3}>
                <Link to="/about" className="btn-ghost text-sm">Full Story <ArrowRight size={13} /></Link>
              </MagneticButton>
            </ClipReveal>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:'Degree',     value:'B.S. Information Technology' },
              { label:'University', value:'WVSU – Janiuay Campus' },
              { label:'Status',     value:'Incoming 4th Year · 2027' },
              { label:'Focus',      value:'Full-Stack Development' },
            ].map((item, i) => (
              <ClipReveal key={item.label} direction="down" delay={i * 0.08}>
                <Card3D className="bento-card flex flex-col gap-2">
                  <p className="t-eyebrow">{item.label}</p>
                  <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'0.8125rem', color:'var(--text-1)' }}>{item.value}</p>
                </Card3D>
              </ClipReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FEATURED PROJECT (large spotlight) ────────────────────────────
function FeaturedProject() {
  const proj = projects.find(p => p.featured) ?? projects[0]
  if (!proj) return null

  return (
    <section className="rm-section overflow-hidden">
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-num">02</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Featured Project</span>
        </div>

        <ClipReveal direction="down">
          <Card3D className="group relative rounded-3xl overflow-hidden border" intensity={6} lift={8} style={{ borderColor:'var(--border)', background:'var(--card)', minHeight:'420px', display:'flex', flexDirection:'column' }}>
            {/* Big image area */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] flex items-center justify-center overflow-hidden"
              style={{ background: 'var(--bg)' }}>
              {proj.image && !proj.image.includes('placeholder')
                ? <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                : <div className="flex flex-col items-center gap-3 opacity-20">
                    <span className="text-6xl">🖥️</span>
                    <span className="font-mono text-sm" style={{ color:'var(--text-3)' }}>Project Screenshot</span>
                    <span className="font-mono text-xs opacity-60" style={{ color:'var(--text-3)' }}>Add to /public/assets/projects/</span>
                  </div>
              }
              {/* Overlay gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'linear-gradient(to top, rgba(17,17,16,0.8) 0%, transparent 60%)' }} />
            </div>

            {/* Info bar */}
            <div className="p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="rm-tag rm-tag-accent mb-2 inline-block">Capstone Project</span>
                <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'1.5rem', letterSpacing:'-0.03em', color:'var(--text-1)' }}>{proj.title}</h3>
                <p className="text-sm mt-1 max-w-lg" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>{proj.shortDescription}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <MagneticButton strength={0.3}>
                  <Link to={`/projects/${proj.slug}`} className="btn-primary text-sm">View Case Study <ArrowUpRight size={14} /></Link>
                </MagneticButton>
                {proj.githubUrl && (
                  <MagneticButton strength={0.3}>
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-2.5"><Github size={16} /></a>
                  </MagneticButton>
                )}
              </div>
            </div>
          </Card3D>
        </ClipReveal>
      </div>
    </section>
  )
}

// ── WORKS — HORIZONTAL SCROLL ─────────────────────────────────────
type WF = 'All'|'School'|'Capstone'|'Personal'
const catColors: Record<string,string> = { school:'rgba(99,102,241,0.12)', capstone:'rgba(207,69,0,0.10)', personal:'rgba(34,197,94,0.10)' }
const catText:   Record<string,string> = { school:'#818cf8', capstone:'var(--accent-h)', personal:'#4ade80' }
const catMap:    Record<string, WF>    = { school:'School', capstone:'Capstone', personal:'Personal' }

function WorksSection() {
  return (
    <section style={{ background:'var(--section-bg-alt)' }}>
      <div className="rm-container py-16 lg:py-24">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">03</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Selected Works</span>
        </div>
        <div className="flex items-end justify-between mb-8">
          <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.08}
            style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1 }}>
            Selected Works
          </TextReveal>
          <MagneticButton strength={0.3}>
            <Link to="/projects" className="btn-ghost text-sm hidden sm:inline-flex">All Projects <ArrowRight size={13} /></Link>
          </MagneticButton>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <HorizontalScroll className="bg-transparent" speed={1}>
        {projects.map((project, i) => (
          <Card3D key={project.id} intensity={8} lift={10} style={{ flexShrink:0, width:'clamp(300px, 38vw, 500px)', height:'440px', display:'flex', flexDirection:'column', background:'var(--card)', border:'1px solid var(--border)', borderRadius:'20px', overflow:'hidden' }}>
            {/* Image */}
            <div className="relative flex-1 overflow-hidden" style={{ background:'var(--bg)', minHeight:'260px' }}>
              {project.image && !project.image.includes('placeholder')
                ? <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                : <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-20">
                    <span className="text-4xl">🖥️</span>
                    <span className="font-mono text-sm" style={{ color:'var(--text-3)' }}>0{i+1}</span>
                  </div>
              }
              <span className="absolute top-4 left-4 text-xs font-mono px-2 py-0.5 rounded-md"
                style={{ background:catColors[project.category]??'var(--accent-dim)', color:catText[project.category]??'var(--accent-h)', backdropFilter:'blur(8px)' }}>
                {catMap[project.category]}
              </span>
              <span className="absolute top-4 right-4 font-mono text-xs opacity-40" style={{ color:'var(--text-1)' }}>0{i+1}</span>
            </div>
            {/* Info */}
            <div className="p-5 flex flex-col gap-3">
              <div>
                <p className="t-eyebrow mb-1">{project.date}</p>
                <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1rem', letterSpacing:'-0.02em', color:'var(--text-1)' }}>{project.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0,4).map(t => <span key={t} className="rm-tag">{t}</span>)}
              </div>
              <Link to={`/projects/${project.slug}`} className="btn-primary text-xs py-1.5 justify-center" style={{ marginTop:'auto' }}>View Project</Link>
            </div>
          </Card3D>
        ))}
        {/* "Coming soon" card */}
        <Card3D intensity={8} lift={10} style={{ flexShrink:0, width:'clamp(260px, 30vw, 400px)', height:'440px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'var(--card)', border:'1px dashed var(--border)', borderRadius:'20px', gap:'1rem', padding:'2rem', textAlign:'center' }}>
          <span style={{ fontSize:'3rem', opacity:0.3 }}>🌱</span>
          <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, color:'var(--text-1)' }}>More Coming Soon</p>
          <p className="text-sm" style={{ color:'var(--text-3)', fontFamily:"'Geist', sans-serif" }}>This portfolio grows with every project I build.</p>
        </Card3D>
      </HorizontalScroll>

      <div className="rm-container py-8">
        <MagneticButton strength={0.3}>
          <Link to="/projects" className="btn-ghost text-sm sm:hidden">All Projects <ArrowRight size={13} /></Link>
        </MagneticButton>
      </div>
    </section>
  )
}

// ── VALUE PROPS ────────────────────────────────────────────────────
const valueProps = [
  { emoji:'⚡', title:'Fast Learner',         desc:'I pick up new frameworks and tools quickly, applying them to real projects immediately.' },
  { emoji:'🔐', title:'Security-Aware',        desc:'Understanding web vulnerabilities from the attacker\'s perspective makes my code more secure.' },
  { emoji:'🎯', title:'Problem-First',         desc:'I focus on solving the actual problem before touching code — planning saves debugging.' },
  { emoji:'📦', title:'End-to-End Builder',   desc:'Frontend to backend to deployment — I can own the full stack of any project.' },
]

function ValueProps() {
  return (
    <section className="rm-section" style={{ background:'var(--section-bg-alt)' }}>
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-num">04</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Why Work With Me</span>
        </div>
        <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
          style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(1.75rem,4vw,3rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'2.5rem' }}>
          What I bring to every project
        </TextReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {valueProps.map((v, i) => (
            <ClipReveal key={v.title} direction="down" delay={i * 0.1}>
              <Card3D className="bento-card flex flex-col gap-3 h-full" intensity={10} lift={8}>
                <span style={{ fontSize:'2rem' }}>{v.emoji}</span>
                <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1rem', letterSpacing:'-0.02em', color:'var(--text-1)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>{v.desc}</p>
              </Card3D>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SKILLS + STATS ─────────────────────────────────────────────────
const skills = [
  { title:'Full-Stack Web Development', desc:'End-to-end apps with React, Vue.js, Laravel, Node.js, and modern databases.' },
  { title:'Web Penetration Testing',    desc:'Security assessments using Kali Linux and ethical hacking techniques.' },
  { title:'UI/UX Design',              desc:'Clean, accessible interfaces that prioritize usability and visual clarity.' },
  { title:'API Development',           desc:'RESTful APIs, auth systems, and third-party integrations.' },
  { title:'Database Architecture',     desc:'SQL and NoSQL data models across MySQL, PostgreSQL, MongoDB, Supabase.' },
  { title:'AI & LLM Integration',      desc:'OpenAI API and Hugging Face models integrated into web workflows.' },
]

function SkillsSection() {
  return (
    <section className="rm-section overflow-hidden">
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-num">05</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Skills</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
              style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(1.75rem,4vw,3rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'1.5rem' }}>
              Core Skills
            </TextReveal>
            <div className="flex flex-col border-t" style={{ borderColor:'var(--border)' }}>
              {skills.map((s, i) => (
                <ClipReveal key={s.title} direction="right" delay={i * 0.07}>
                  <div className="py-5 border-b grid grid-cols-[1rem_1fr] gap-4 group" style={{ borderColor:'var(--border)' }}>
                    <span className="font-mono text-xs mt-0.5" style={{ color:'var(--text-3)' }}>0{i+1}</span>
                    <div>
                      <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'0.9375rem', letterSpacing:'-0.02em', color:'var(--text-1)', marginBottom:'0.25rem', transition:'color 0.2s' }} className="group-hover:text-accent">{s.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>{s.desc}</p>
                    </div>
                  </div>
                </ClipReveal>
              ))}
            </div>
          </div>
          {/* Stats counters */}
          <div className="flex flex-col gap-8">
            <ClipReveal direction="left">
              <div className="bento-card">
                <p className="t-eyebrow mb-6">By the numbers</p>
                <div className="grid grid-cols-2 gap-8">
                  <StatCounter target={20} suffix="+"  label="Technologies Known"    duration={2000} />
                  <StatCounter target={3}  suffix="+"  label="Projects Built"         duration={1500} />
                  <StatCounter target={4}  suffix="th" label="Year of Study"          duration={1200} />
                  <StatCounter target={2}  suffix=""   label="Capstone Systems Built"  duration={1000} />
                </div>
              </div>
            </ClipReveal>
            {/* Currently building card */}
            <ClipReveal direction="left" delay={0.15}>
              <div className="bento-card border" style={{ borderColor:'rgba(207,69,0,0.2)', background:'var(--accent-dim)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="t-eyebrow" style={{ color:'var(--accent-h)' }}>Currently Building</p>
                </div>
                <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--text-1)', letterSpacing:'-0.02em' }}>MIS Service Request System</h3>
                <p className="text-sm mt-1 leading-relaxed" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                  Capstone project — a role-based IT service request management system built with Laravel and MySQL.
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {['Laravel','MySQL','PHP','Tailwind CSS'].map(t => <span key={t} className="rm-tag">{t}</span>)}
                </div>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TOOLKIT ────────────────────────────────────────────────────────
const toolsGrid = [
  { name:'React',      Icon:SiReact,      color:'#61dafb' },
  { name:'Vue.js',     Icon:SiVuedotjs,   color:'#42b883' },
  { name:'Next.js',    Icon:SiNextdotjs,  color:'currentColor' },
  { name:'TypeScript', Icon:SiTypescript, color:'#3178c6' },
  { name:'JavaScript', Icon:SiJavascript, color:'#f7df1e' },
  { name:'Tailwind',   Icon:SiTailwindcss,color:'#06b6d4' },
  { name:'HTML5',      Icon:SiHtml5,      color:'#e34f26' },
  { name:'CSS',        Icon:SiCss,        color:'#1572b6' },
  { name:'Node.js',    Icon:SiNodedotjs,  color:'#339933' },
  { name:'Laravel',    Icon:SiLaravel,    color:'#ff2d20' },
  { name:'PHP',        Icon:SiPhp,        color:'#777bb4' },
  { name:'Express',    Icon:SiExpress,    color:'currentColor' },
  { name:'MySQL',      Icon:SiMysql,      color:'#4479a1' },
  { name:'MongoDB',    Icon:SiMongodb,    color:'#47a248' },
  { name:'PostgreSQL', Icon:SiPostgresql, color:'#336791' },
  { name:'Supabase',   Icon:SiSupabase,   color:'#3ecf8e' },
  { name:'Firebase',   Icon:SiFirebase,   color:'#ffca28' },
  { name:'Git',        Icon:SiGit,        color:'#f05032' },
  { name:'Docker',     Icon:SiDocker,     color:'#2496ed' },
  { name:'Postman',    Icon:SiPostman,    color:'#ff6c37' },
  { name:'Kali Linux', Icon:SiLinux,      color:'#557c94' },
  { name:'OpenAI',     Icon:Bot,          color:'#10a37f' },
  { name:'AI/LLMs',   Icon:Brain,        color:'var(--accent-h)' },
  { name:'REST APIs',  Icon:Workflow,     color:'var(--accent)' },
]

function ToolkitSection() {
  return (
    <section className="rm-section" style={{ background:'var(--section-bg-alt)' }}>
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-num">06</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Toolkit</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
              style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(1.75rem,4vw,3rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'1rem' }}>
              My Toolkit
            </TextReveal>
            <p className="t-body text-base mb-6">Technologies I actively use across frontend, backend, databases, and security.</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {toolsGrid.map(({ name, Icon, color }, idx) => (
                <ClipReveal key={name} direction="down" delay={idx * 0.025}>
                  <Card3D className="tool-card" intensity={8} lift={5}>
                    <Icon size={24} style={{ color }} />
                    <span className="font-mono text-xs text-center leading-tight" style={{ color:'var(--text-2)' }}>{name}</span>
                  </Card3D>
                </ClipReveal>
              ))}
            </div>
            <ClipReveal direction="down" delay={0.3}>
              <MagneticButton strength={0.3} className="mt-5">
                <Link to="/tech-stack" className="btn-ghost text-sm">Full Stack <ArrowRight size={13} /></Link>
              </MagneticButton>
            </ClipReveal>
          </div>
          <ClipReveal direction="left">
            <Suspense fallback={<div style={{ height:480, display:'flex', alignItems:'center', justifyContent:'center' }}><div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor:'var(--accent)', borderTopColor:'transparent' }} /></div>}>
              <TechGlobe size={480} />
            </Suspense>
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}

// ── EXPERTISE ──────────────────────────────────────────────────────
const expertise = [
  { num:'(1)', title:'Full-Stack Web Development',     desc:'End-to-end from schema to UI.' },
  { num:'(2)', title:'Web Penetration Testing',         desc:'Ethical hacking and vulnerability assessment.' },
  { num:'(3)', title:'UI/UX Design & Prototyping',      desc:'Accessible, intentional interface design.' },
  { num:'(4)', title:'RESTful API & Backend Systems',   desc:'Laravel and Express APIs with auth.' },
  { num:'(5)', title:'Database Architecture',           desc:'SQL and NoSQL across multiple platforms.' },
  { num:'(6)', title:'AI Integration & Experimentation',desc:'OpenAI API and Hugging Face in web apps.' },
]

function ExpertiseSection() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = listRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = el.querySelectorAll('.exp-row')
    const ctx = gsap.context(() => {
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity:0, x:-40 },
          { opacity:1, x:0, duration:0.7, ease:EASE_POWER4,
            scrollTrigger: { trigger:item, start:'top 88%', once:true } }
        )
      })
    }, listRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="rm-section">
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-num">07</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Expertise</span>
        </div>
        <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
          style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.1, marginBottom:'1rem' }}>
          What I Do
        </TextReveal>
        <div ref={listRef} className="border-t mt-4" style={{ borderColor:'var(--border)' }}>
          {expertise.map(item => (
            <div key={item.num} className="exp-row expertise-item group" style={{ opacity:0 }}>
              <span style={{ fontFamily:"'Geist Mono', monospace", fontWeight:500, fontSize:'0.75rem', color:'var(--text-3)', paddingTop:'0.125rem' }}>{item.num}</span>
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                <h3 className="expertise-title font-semibold text-base mb-1 sm:mb-0 sm:w-64 flex-shrink-0" style={{ fontFamily:"'Geist', sans-serif", letterSpacing:'-0.02em', color:'var(--text-1)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <MagneticButton strength={0.3}>
            <Link to="/services" className="btn-ghost text-sm">All Services <ArrowRight size={13} /></Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

// ── GITHUB STATS ──────────────────────────────────────────────────
function GitHubSection() {
  return <GitHubStats />
}

// ── CONTACT CTA ────────────────────────────────────────────────────
function ContactSection() {
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity:0, y:40 },
        { opacity:1, y:0, duration:DUR_SLOW, ease:EASE_POWER4,
          scrollTrigger:{ trigger:el, start:'top 85%', once:true } }
      )
    }, headRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="rm-section relative overflow-hidden">
      <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none hidden lg:block">
        <FloatingShape type="torus" color="#CF4500" size={160} />
      </div>
      <div className="rm-container relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-num">09</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Contact</span>
        </div>
        <div ref={headRef} style={{ opacity:0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.08}
              style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(2rem,5vw,4rem)', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1.05, marginBottom:'1rem' }}>
              Let's build something great
            </TextReveal>
            <p className="text-base leading-relaxed mb-8" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
              Open to collaborations, academic partnerships, and freelance projects.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton strength={0.35}>
                <Link to="/contact" className="btn-primary">Email Me <ArrowUpRight size={14} /></Link>
              </MagneticButton>
              <SocialLinks showLabels />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label:'Email',    value:'your.email@example.com', note:'Update in socials.ts' },
              { label:'Location', value:'Iloilo, Philippines',     note:'Available remotely' },
              { label:'Status',   value:'Open to collaborations',  note:'Academic projects welcome' },
            ].map(item => (
              <ClipReveal key={item.label} direction="left">
                <Card3D className="bento-card flex items-center justify-between gap-4" intensity={6} lift={4}>
                  <div>
                    <p className="t-eyebrow mb-0.5">{item.label}</p>
                    <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:600, fontSize:'0.875rem', color:'var(--text-1)' }}>{item.value}</p>
                  </div>
                  <span className="rm-tag text-xs shrink-0">{item.note}</span>
                </Card3D>
              </ClipReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <AboutSection />
      <FeaturedProject />
      <WorksSection />
      <ValueProps />
      <SkillsSection />
      <ToolkitSection />
      <ExpertiseSection />
      <GitHubSection />
      <ContactSection />
    </PageTransition>
  )
}
