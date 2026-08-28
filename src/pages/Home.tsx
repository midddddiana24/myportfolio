import { useRef, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, ArrowDown, Github } from 'lucide-react'
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
import { ClipReveal }        from '@/components/motion/ClipReveal'
import { Marquee }           from '@/components/motion/Marquee'
import { PageTransition }    from '@/components/layout/PageTransition'
import { SocialLinks }       from '@/components/ui/SocialLinks'
import { StatCounter }       from '@/components/ui/StatCounter'
import { projects }          from '@/data/projects'

const TerrainCanvas = lazy(() => import('@/components/3d/TerrainCanvas').then(m => ({ default: m.TerrainCanvas })))
const WireGlobe = lazy(() => import('@/components/3d/WireGlobe').then(m => ({ default: m.WireGlobe })))

// ================================================================
// Home v7 — rojvillacampa-exact design
// Lime accent · Space Grotesk · DM Mono · No border-radius
// ================================================================

// ── HERO ──────────────────────────────────────────────────────────
function Hero() {
  const tagRef    = useRef<HTMLDivElement>(null)
  const subtextRef= useRef<HTMLParagraphElement>(null)
  const ctaRef    = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const availRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.9 })
      tl.fromTo(tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR_NORMAL, ease: EASE_POWER4 }
      )
      .fromTo(subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR_NORMAL, ease: EASE_POWER4 }, '-=0.3'
      )
      .fromTo(ctaRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: DUR_NORMAL, ease: 'back.out(1.7)' }, '-=0.35'
      )
      .fromTo(scrollRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: EASE_POWER4 }, '-=0.2'
      )
      .fromTo(availRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }, '-=0.4'
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden pt-28" aria-label="Hero">

      {/* Backdrop — wireframe terrain with a travelling scan. See TerrainCanvas. */}
      <Suspense fallback={<div className="terrain-fallback" aria-hidden="true" />}>
        <TerrainCanvas />
      </Suspense>

      {/* Legibility scrim, weighted left where the display type sits.
          Must stay pointer-events:none or it eats the terrain drag. */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true"
        style={{ background:'linear-gradient(100deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.70) 38%, rgba(10,10,10,0.26) 70%, rgba(10,10,10,0.10) 100%)' }} />

      <div className="rm-container relative z-10 flex flex-col flex-1">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 flex-1 items-center py-12 lg:py-0">

          {/* LEFT column */}
          <div className="flex flex-col gap-7">
            {/* Eyebrow */}
            <div ref={tagRef} style={{ opacity:0 }}>
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#5a5a5a' }}>
                Full-Stack Developer · Iloilo, Philippines
              </span>
            </div>

            {/* Headline — char-by-char reveal */}
            <div>
              <TextReveal
                as="h1"
                trigger="load"
                splitBy="chars"
                delay={1.9}
                duration={0.8}
                stagger={0.025}
                skewY={4}
                style={{
                  fontFamily:"'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: '#f0f0f0',
                  display: 'block',
                }}
              >
                Building
              </TextReveal>
              <TextReveal
                as="h1"
                trigger="load"
                splitBy="chars"
                delay={2.05}
                duration={0.8}
                stagger={0.025}
                skewY={4}
                style={{
                  fontFamily:"'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: '#f0f0f0',
                  display: 'block',
                }}
              >
                digital
              </TextReveal>
              <TextReveal
                as="h1"
                trigger="load"
                splitBy="chars"
                delay={2.2}
                duration={0.8}
                stagger={0.025}
                skewY={4}
                style={{
                  fontFamily:"'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                  display: 'block',
                }}
              >
                experiences.
              </TextReveal>
            </div>

            {/* Subtext */}
            <p ref={subtextRef} style={{ opacity:0, fontFamily:"'Space Grotesk', sans-serif", fontSize:'1.0625rem', color:'#5a5a5a', lineHeight:1.65, maxWidth:'480px' }}>
              BSIT student at West Visayas State University – Janiuay Campus. Building practical
              web applications and exploring the intersection of software and security.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} style={{ opacity:0, display:'flex', flexWrap:'wrap', gap:'1rem' }}>
              <MagneticButton strength={0.3}>
                <Link to="/projects" className="btn-primary">
                  View My Work
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <a href="/assets/resume-placeholder.pdf" className="btn-ghost">
                  Download CV
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT column — accent glow element */}
          <div className="hidden lg:flex items-center justify-center relative" aria-hidden="true">
            <div className="relative w-full aspect-square max-w-xs flex items-center justify-center">
              {/* Lime glow orb */}
              <div style={{
                width:'200px', height:'200px', borderRadius:'50%',
                background:'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 50%, transparent 70%)',
                filter:'blur(20px)',
                position:'absolute',
              }} />
              {/* RM monogram */}
              <div style={{
                fontFamily:"'Space Grotesk', sans-serif",
                fontWeight:700,
                fontSize:'7rem',
                letterSpacing:'-0.05em',
                color:'rgba(255,255,255,0.06)',
                userSelect:'none',
                lineHeight:1,
              }}>
                RM
              </div>
              {/* Decorative border */}
              <div style={{
                position:'absolute', inset:'2rem',
                border:'1px solid rgba(255,255,255,0.10)',
                borderRadius:0,
              }} />
              <div style={{
                position:'absolute', inset:'0',
                border:'1px solid rgba(255,255,255,0.05)',
                borderRadius:0,
              }} />
              {/* Corner dots */}
              {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([x,y], i) => (
                <div key={i} style={{
                  position:'absolute',
                  left: x === -1 ? '2rem' : 'calc(100% - 2rem - 4px)',
                  top:  y === -1 ? '2rem' : 'calc(100% - 2rem - 4px)',
                  width:'4px', height:'4px', background:'#ffffff',
                  borderRadius:0,
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between py-6 border-t" style={{ borderColor:'#1f1f1f' }}>
          {/* Availability */}
          <div ref={availRef} style={{ opacity:0, display:'flex', alignItems:'center', gap:'0.625rem' }}>
            <div className="avail-dot" />
            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#5a5a5a' }}>
              Available for freelance
            </span>
          </div>

          {/* Scroll indicator */}
          <div ref={scrollRef} style={{ opacity:0, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#5a5a5a' }}>
              Scroll
            </span>
            <div className="scroll-line-anim">
              <ArrowDown size={14} color="#5a5a5a" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── ABOUT — 01 ────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="rm-section relative overflow-hidden" style={{ background:'#0a0a0a' }}>
      <div className="rm-container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">/ About me</span>
          <div className="rule flex-1" />
          <span className="eyebrow">01</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: watermark + eyebrow */}
          <div className="relative">
            <div className="section-watermark absolute -left-4 -top-8 select-none" aria-hidden="true">01</div>
            <div className="relative z-10">
              <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.06}
                style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1.1 }}>
                Building the web, one pixel at a time.
              </TextReveal>
            </div>
          </div>

          {/* Right: bio + stats */}
          <div>
            <ClipReveal direction="down">
              <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', lineHeight:1.75, marginBottom:'1.25rem' }}>
                I'm an IT student with a genuine passion for building software that solves real problems.
                I work across the full stack — from clean, responsive UIs to reliable server-side logic
                and database architecture.
              </p>
              <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', lineHeight:1.75, marginBottom:'2rem' }}>
                Currently pursuing my BSIT at West Visayas State University – Janiuay Campus and actively
                building my capstone system while exploring web security and AI integrations.
              </p>
            </ClipReveal>

            {/* Stat counters */}
            <ClipReveal direction="down" delay={0.15}>
              <div className="grid grid-cols-3 gap-0 border-t border-l" style={{ borderColor:'#1f1f1f' }}>
                {[
                  { target:4, suffix:'th', label:'Year of Study' },
                  { target:20, suffix:'+', label:'Technologies' },
                  { target:3, suffix:'+', label:'Projects Built' },
                ].map(s => (
                  <div key={s.label} className="border-b border-r p-5" style={{ borderColor:'#1f1f1f' }}>
                    <StatCounter target={s.target} suffix={s.suffix} label={s.label} duration={1800}
                      className={undefined} />
                  </div>
                ))}
              </div>
            </ClipReveal>

            <ClipReveal direction="down" delay={0.25}>
              <div className="mt-6">
                <MagneticButton strength={0.3}>
                  <Link to="/about" className="btn-ghost text-sm">
                    More About Me <ArrowRight size={14} />
                  </Link>
                </MagneticButton>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── WORK / PROJECTS — 02 ──────────────────────────────────────────
const catLabels: Record<string,string> = { school:'School', capstone:'Capstone', personal:'Personal' }

function WorkSection() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = listRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rows = el.querySelectorAll('.project-row')
    const ctx  = gsap.context(() => {
      rows.forEach(row => {
        gsap.fromTo(row,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: DUR_NORMAL, ease: EASE_POWER4,
            scrollTrigger: { trigger: row, start: 'top 88%', once: true } }
        )
      })
    }, listRef)
    return () => ctx.revert()
  }, [])

  const featuredProj = projects.find(p => p.featured) ?? projects[0]

  return (
    <section className="rm-section" style={{ background:'#111111' }}>
      <div className="rm-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="eyebrow">/ Selected work</span>
          <div className="rule flex-1" />
          <span className="eyebrow">02</span>
        </div>

        <div className="flex items-end justify-between mb-14">
          <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.08}
            style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2.5rem,6vw,5rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1 }}>
            Things I've built.
          </TextReveal>
          <MagneticButton strength={0.3} className="hidden sm:inline-flex">
            <Link to="/projects" className="btn-ghost text-xs" style={{ fontFamily:"'DM Mono', monospace", letterSpacing:'0.08em', textTransform:'uppercase' }}>
              View All
            </Link>
          </MagneticButton>
        </div>

        {/* Featured project — large card */}
        {featuredProj && (
          <ClipReveal direction="down" className="mb-3">
            <div className="project-card relative overflow-hidden" style={{ minHeight:'360px' }} data-cursor="view">
              {/* Image reveal on hover */}
              {featuredProj.image && !featuredProj.image.includes('placeholder') && (
                <div className="project-thumb">
                  <img src={featuredProj.image} alt={featuredProj.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="relative z-10 p-8 flex flex-col justify-between" style={{ minHeight:'360px' }}>
                <div className="flex items-start justify-between">
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#ffffff' }}>
                    Featured · Capstone
                  </span>
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.1em', color:'#5a5a5a' }}>
                    {featuredProj.date}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(1.5rem,4vw,2.5rem)', letterSpacing:'-0.03em', color:'#f0f0f0', marginBottom:'0.75rem' }}>
                    {featuredProj.title}
                  </h3>
                  <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.9375rem', color:'#5a5a5a', maxWidth:'520px', lineHeight:1.6, marginBottom:'1.25rem' }}>
                    {featuredProj.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featuredProj.technologies.slice(0,5).map(t => <span key={t} className="rm-tag">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-3">
                    <MagneticButton strength={0.3}>
                      <Link to={`/projects/${featuredProj.slug}`} className="btn-primary text-sm">
                        View Case Study <ArrowUpRight size={14} />
                      </Link>
                    </MagneticButton>
                    {featuredProj.githubUrl && (
                      <MagneticButton strength={0.3}>
                        <a href={featuredProj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding:'0.75rem' }}>
                          <Github size={16} />
                        </a>
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ClipReveal>
        )}

        {/* Project list rows */}
        <div ref={listRef} className="border-t mt-2" style={{ borderColor:'#1f1f1f' }}>
          {projects.map((project, i) => (
            <div key={project.id} className="project-row" data-cursor="view">
              {/* Hover thumbnail */}
              {project.image && !project.image.includes('placeholder') && (
                <div className="project-thumb" aria-hidden="true">
                  <img src={project.image} alt="" className="w-full h-full object-cover" />
                  <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.6)' }} />
                </div>
              )}

              <Link to={`/projects/${project.slug}`} className="relative z-10 flex items-center justify-between p-6 md:p-8 gap-4 group">
                {/* Left: number + title */}
                <div className="flex items-center gap-6 min-w-0">
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', color:'#2a2a2a', letterSpacing:'0.05em', flexShrink:0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(1rem,2.5vw,1.375rem)', letterSpacing:'-0.02em', color:'#f0f0f0', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', transition:'color 0.2s' }}
                      className="group-hover:text-[#ffffff]">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1 hidden sm:flex">
                      {project.technologies.slice(0,3).map(t => <span key={t} className="rm-tag" style={{ fontSize:'0.5625rem' }}>{t}</span>)}
                    </div>
                  </div>
                </div>

                {/* Right: category + year + arrow */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="hidden md:block" style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#5a5a5a' }}>
                    {catLabels[project.category]}
                  </span>
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', color:'#2a2a2a' }}>{project.date}</span>
                  <ArrowUpRight size={16} style={{ color:'#2a2a2a', transition:'color 0.2s, transform 0.2s' }}
                    className="group-hover:text-[#ffffff] group-hover:rotate-12" />
                </div>
              </Link>
            </div>
          ))}

          {/* Growing message */}
          <div className="py-8 px-6 flex items-center gap-4" style={{ borderBottom:'1px solid #1f1f1f' }}>
            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', color:'#2a2a2a' }}>—</span>
            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#2a2a2a' }}>
              More projects in progress — portfolio growing continuously
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SKILLS — 03 ───────────────────────────────────────────────────
const skillGroups = [
  { cat:'Frontend',  items:['React', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { cat:'Backend',   items:['Laravel', 'Node.js', 'Express.js', 'PHP', 'REST APIs'] },
  { cat:'Database',  items:['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase', 'Firebase'] },
  { cat:'Tools',     items:['Git', 'Docker', 'Kali Linux', 'Postman', 'CI/CD', 'OpenAI', 'Hugging Face'] },
]

const toolsGrid = [
  { name:'React',      Icon:SiReact,      color:'#8a8a8a' },
  { name:'Vue.js',     Icon:SiVuedotjs,   color:'#8a8a8a' },
  { name:'Next.js',    Icon:SiNextdotjs,  color:'#f0f0f0' },
  { name:'TypeScript', Icon:SiTypescript, color:'#8a8a8a' },
  { name:'JavaScript', Icon:SiJavascript, color:'#8a8a8a' },
  { name:'Tailwind',   Icon:SiTailwindcss,color:'#8a8a8a' },
  { name:'HTML5',      Icon:SiHtml5,      color:'#8a8a8a' },
  { name:'CSS',        Icon:SiCss,        color:'#8a8a8a' },
  { name:'Node.js',    Icon:SiNodedotjs,  color:'#8a8a8a' },
  { name:'Laravel',    Icon:SiLaravel,    color:'#8a8a8a' },
  { name:'PHP',        Icon:SiPhp,        color:'#8a8a8a' },
  { name:'Express',    Icon:SiExpress,    color:'#f0f0f0' },
  { name:'MySQL',      Icon:SiMysql,      color:'#8a8a8a' },
  { name:'MongoDB',    Icon:SiMongodb,    color:'#8a8a8a' },
  { name:'PostgreSQL', Icon:SiPostgresql, color:'#8a8a8a' },
  { name:'Supabase',   Icon:SiSupabase,   color:'#8a8a8a' },
  { name:'Firebase',   Icon:SiFirebase,   color:'#8a8a8a' },
  { name:'Git',        Icon:SiGit,        color:'#8a8a8a' },
  { name:'Docker',     Icon:SiDocker,     color:'#8a8a8a' },
  { name:'Kali Linux', Icon:SiLinux,      color:'#8a8a8a' },
  { name:'Postman',    Icon:SiPostman,    color:'#8a8a8a' },
  { name:'OpenAI',     Icon:Bot,          color:'#8a8a8a' },
  { name:'AI/LLMs',   Icon:Brain,        color:'#ffffff' },
  { name:'REST APIs',  Icon:Workflow,     color:'#ffffff' },
]

function SkillsSection() {
  return (
    <section className="rm-section relative overflow-hidden" style={{ background:'#0a0a0a' }}>
      {/* Scroll-driven wireframe globe. See WireGlobe. */}
      <Suspense fallback={null}><WireGlobe /></Suspense>

      <div className="rm-container relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">/ Expertise</span>
          <div className="rule flex-1" />
          <span className="eyebrow">03</span>
        </div>

        <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
          style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2.5rem,6vw,5rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1, marginBottom:'4rem' }}>
          Tools of the trade.
        </TextReveal>

        {/* Skill group list */}
        <div className="border-t mb-20" style={{ borderColor:'#1f1f1f' }}>
          {skillGroups.map((group, i) => (
            <ClipReveal key={group.cat} direction="right" delay={i * 0.07}>
              <div className="py-6 border-b grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 items-start" style={{ borderColor:'#1f1f1f' }}>
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#5a5a5a' }}>
                  {group.cat}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span key={item} style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:500, fontSize:'0.9375rem', color:'#f0f0f0', letterSpacing:'-0.01em' }}>
                      {item}
                      <span style={{ color:'#2a2a2a', marginLeft:'0.5rem' }}>·</span>
                    </span>
                  ))}
                </div>
              </div>
            </ClipReveal>
          ))}
        </div>

        {/* Marquee icon rows */}
        <div className="flex flex-col gap-4">
          <Marquee speed="normal" gap="2.5rem">
            {toolsGrid.slice(0, 12).map(({ name, Icon, color }) => (
              <div key={name} className="flex items-center gap-2.5 px-1 flex-shrink-0">
                <Icon size={20} style={{ color, flexShrink:0 }} />
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.75rem', letterSpacing:'0.06em', color:'#2a2a2a', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                  {name}
                </span>
              </div>
            ))}
          </Marquee>
          <Marquee speed="normal" reverse gap="2.5rem">
            {toolsGrid.slice(12).map(({ name, Icon, color }) => (
              <div key={name} className="flex items-center gap-2.5 px-1 flex-shrink-0">
                <Icon size={20} style={{ color, flexShrink:0 }} />
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.75rem', letterSpacing:'0.06em', color:'#2a2a2a', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                  {name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}

// ── CONTACT — 04 ──────────────────────────────────────────────────
function ContactSection() {
  const emailRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = emailRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const line = el.querySelector('.email-line') as HTMLElement
    if (!line) return

    const onEnter = () => gsap.to(line, { scaleX: 1, transformOrigin: 'left center', duration: 0.4, ease: EASE_POWER4 })
    const onLeave = () => gsap.to(line, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: EASE_POWER4 })

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <section className="rm-section" style={{ background:'#111111' }}>
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">/ Get in touch</span>
          <div className="rule flex-1" />
          <span className="eyebrow">04</span>
        </div>

        {/* Center-aligned contact */}
        <div className="max-w-2xl">
          <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.08}
            style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2.5rem,6vw,5rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1, marginBottom:'2rem' }}>
            Let's work together.
          </TextReveal>

          <ClipReveal direction="down" delay={0.2}>
            <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', lineHeight:1.7, marginBottom:'3rem', maxWidth:'480px' }}>
              I'm open to collaborations, academic partnerships, and freelance projects.
              Whether you have a project in mind or just want to talk tech — reach out.
            </p>
          </ClipReveal>

          {/* Email — magnetic + underline slide */}
          <ClipReveal direction="down" delay={0.3}>
            <MagneticButton strength={0.2}>
              <a ref={emailRef} href="mailto:your.email@example.com"
                className="block relative mb-10 group"
                style={{ width:'fit-content' }}>
                <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(1.25rem,3vw,2rem)', letterSpacing:'-0.03em', color:'#f0f0f0', transition:'color 0.3s' }}
                  className="group-hover:text-[#ffffff]">
                  your.email@example.com
                </span>
                <div className="email-line" style={{ position:'absolute', bottom:'-4px', left:0, right:0, height:'1px', background:'#ffffff', transform:'scaleX(0)' }} />
              </a>
            </MagneticButton>
          </ClipReveal>

          {/* Social links */}
          <ClipReveal direction="down" delay={0.4}>
            <SocialLinks showLabels className="mb-12" />
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ASSEMBLY ─────────────────────────────────────────────────
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <AboutSection />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
    </PageTransition>
  )
}
