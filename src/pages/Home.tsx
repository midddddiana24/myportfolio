import { useRef, useEffect, useState, lazy, Suspense, type ElementType } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, ArrowDown, Github, Linkedin, Facebook } from 'lucide-react'
import {
  SiReact, SiVuedotjs, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss, SiNodedotjs, SiLaravel, SiPhp,
  SiExpress, SiMysql, SiMongodb, SiPostgresql, SiSupabase,
  SiFirebase, SiGit, SiDocker, SiPostman, SiLinux,
} from 'react-icons/si'
import { Brain, Workflow, Bot } from 'lucide-react'
// ScrollTrigger is not imported by name: the `scrollTrigger:` configs below
// only need the plugin *registered*, which @/lib/gsap does at module load.
import { gsap, EASE_POWER4, DUR_SLOW, DUR_NORMAL } from '@/lib/gsap'
import { TextReveal }        from '@/components/motion/TextReveal'
import { MagneticButton }    from '@/components/motion/MagneticButton'
import { ClipReveal }        from '@/components/motion/ClipReveal'
import { Marquee }           from '@/components/motion/Marquee'
import { PageTransition }    from '@/components/layout/PageTransition'
import { CareerJourney }     from '@/components/home/CareerJourney'
import { ProjectBento }      from '@/components/projects/ProjectBento'
import { SocialLinks }       from '@/components/ui/SocialLinks'
import { projects }          from '@/data/projects'
import { socialLinks }       from '@/data/socials'

const WireGlobe = lazy(() => import('@/components/3d/WireGlobe').then(m => ({ default: m.WireGlobe })))

// ================================================================
// Home v10 — Paper & Ink editorial
// Ink on paper · Anton headings · DM Sans body · DM Mono labels
// No border-radius. No chromatic accent anywhere on the site.
//
// GROUND RHYTHM, reading down the page:
//   Hero        white panel  — the name
//   Journey 01  paper        — pinned horizontal milestone track
//   Work 02     INK BAND     — dark punctuation, holds the bento grid
//   Skills 03   paper        — hosts the wireframe globe
//   Contact 04  INK BAND     — dark punctuation, closes the page
//
// The two bands are Work and Contact specifically, and NOT the section
// carrying the 3D scene. The globe was re-cut to draw ink hairlines on
// paper; standing it on a black band would mean keeping two versions of
// the shader and asking the scene to know which ground it is on.
// Punctuating with the two flat sections instead costs nothing and still
// alternates.
//
// Section 01 was "About me" until 2026-09-01 and is now the Career
// Journey: same slot, same ground, but the panels travel sideways under a
// pinned stage instead of stacking. The bio paragraphs and the three stat
// counters were not deleted — they moved into its first panel, via
// src/data/journey.ts.
//
// The wireframe terrain moved with it and was then removed outright on
// 2026-09-02 at rober's request, so Journey 01 is plain paper and the
// globe in Skills 03 is the only 3D scene left on the page. That leaves
// components/3d/TerrainCanvas.tsx unreferenced — it is still on disk, not
// deleted, so remounting it is a one-line change.
// ================================================================

const CV_URL = '/assets/resume-placeholder.pdf'

/**
 * "Download CV" is the second-most prominent button on the site, and the file
 * it points at isn't in the repo yet — so a recruiter clicking it landed on a
 * 404. Rather than fabricate a CV or quietly drop the CTA, probe for the file
 * and offer a real alternative when it's absent. Drop the actual PDF at
 * CV_URL and this becomes a normal download with no code change.
 *
 * The content-type test matters as much as `res.ok`: an SPA host (Vercel,
 * Netlify) rewrites unknown paths to index.html and answers 200, so a status
 * check alone would report a missing PDF as present.
 *
 * `variant` exists because the light hero and the dark sections need opposite
 * treatments: `ghost` is the bordered button used on near-black, `ink` is a
 * quiet underlined link so the outlined "Explore work" stays the only actual
 * button in the hero composition.
 */
function CVButton({ variant = 'ghost' }: { variant?: 'ghost' | 'ink' }) {
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(CV_URL, { method: 'HEAD' })
      .then(res => {
        const type = res.headers.get('content-type') ?? ''
        if (alive) setMissing(!res.ok || !type.toLowerCase().includes('pdf'))
      })
      .catch(() => { if (alive) setMissing(true) })
    return () => { alive = false }
  }, [])

  if (variant === 'ink') {
    return missing
      ? <Link to="/contact" className="link-ink">Request CV</Link>
      : <a href={CV_URL} className="link-ink" download>Download CV</a>
  }

  if (missing) {
    return (
      <MagneticButton strength={0.3}>
        <Link to="/contact" className="btn-ghost">
          Request CV
        </Link>
      </MagneticButton>
    )
  }
  return (
    <MagneticButton strength={0.3}>
      <a href={CV_URL} className="btn-ghost" download>
        Download CV
      </a>
    </MagneticButton>
  )
}

// ── HERO ──────────────────────────────────────────────────────────
// One element per line so each can be sheared independently on scroll.
// "Jr." gets its own line rather than riding along with "Mediana": a
// ten-character third line would force the whole block a size down, and the
// short line is what the closing rule beneath it is there to resolve.
const NAME_LINES = ['Roberto', 'Mediana', 'Jr.'] as const

// Scattered behind the name at lg, a plain four-across strip below it on
// narrow screens. hero-04 is the God_dog emblem — a mark on a black ground,
// not a photograph, and already greyscale at source, so it carries the
// --mark treatment instead of pretending it can reveal a colour it doesn't
// have.
const COLLAGE = [
  { src: '/assets/img/hero/hero-01.jpg', cls: 'hero-figure--1', mark: false },
  { src: '/assets/img/hero/hero-02.jpg', cls: 'hero-figure--2', mark: false },
  { src: '/assets/img/hero/hero-03.jpg', cls: 'hero-figure--3', mark: false },
  { src: '/assets/img/hero/hero-04.jpg', cls: 'hero-figure--4', mark: true  },
]

// How far each line travels as the hero scrolls out, as a percentage of its
// own width — so the long lines throw further than the short one and the
// block shears rather than sliding.
const SHEAR = [-22, 22, -13]

// socials.ts still holds the template's placeholder URLs. Sending a recruiter
// to github.com/yourusername is worse than showing no icon at all, so only
// filled-in entries render; the block appears by itself once they are real.
const PLACEHOLDER_URL = /yourusername|yourprofile|your\.email|example\.com/i
const REAL_SOCIALS = socialLinks.filter(s => !PLACEHOLDER_URL.test(s.url))
const SOCIAL_ICONS: Record<string, ElementType> = { Github, Linkedin, Facebook }

function Hero() {
  const rootRef  = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const figRefs  = useRef<(HTMLDivElement | null)[]>([])
  const ledeRef  = useRef<HTMLDivElement>(null)
  const barRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Every reveal below is a gsap `from`, never a `fromTo` paired with an
      // opacity:0 in the markup. If this effect never runs — JS fails, the
      // bundle 404s, reduced motion returns early — `from` leaves the hero
      // fully visible, whereas the old CSS-hidden pattern would have left the
      // whole thing blank.
      gsap.timeline({ delay: 0.2 })
        .from(wordRefs.current.filter(Boolean), {
          yPercent: 108, duration: 1, ease: EASE_POWER4, stagger: 0.11,
        })
        .from(figRefs.current.filter(Boolean), {
          scale: 0.9, opacity: 0, duration: DUR_SLOW, ease: EASE_POWER4, stagger: 0.09,
        }, '-=0.72')
        .from(ledeRef.current, {
          y: 22, opacity: 0, duration: DUR_NORMAL, ease: EASE_POWER4,
        }, '-=0.6')
        .from(barRef.current, { opacity: 0, duration: 0.6 }, '-=0.35')

      // ── The shear ────────────────────────────────────────────────
      // Scrubbed, so the split tracks the scroll position rather than firing
      // once and finishing on its own. Each line owns `xPercent` and nothing
      // else touches it; the load reveal above animates the inner word span,
      // which is why the two can overlap without fighting over one transform.
      NAME_LINES.forEach((_, i) => {
        const line = lineRefs.current[i]
        if (!line) return
        gsap.to(line, {
          xPercent: SHEAR[i],
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })

      // Cards drift at their own rates so the collage comes apart rather than
      // sliding as one plane. Vertical only — pointer parallax below owns x,
      // and splitting the two axes keeps them from overwriting each other.
      const DRIFT = [-70, 96, -120, 64]
      figRefs.current.forEach((fig, i) => {
        if (!fig) return
        gsap.to(fig, {
          y: DRIFT[i] ?? 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  // Pointer parallax on the cards. Desktop only: it needs a real pointer, and
  // below lg the collage is a static strip in the flow where nudging the cards
  // sideways would just break the grid. Writes x, never y — see DRIFT above.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return

    const setters = figRefs.current.map(fig =>
      fig ? gsap.quickTo(fig, 'x', { duration: 0.9, ease: 'power3.out' }) : null
    )
    const DEPTH = [16, -22, 12, -14]

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      setters.forEach((set, i) => set?.(nx * (DEPTH[i] ?? 0)))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section ref={rootRef} className="hero-light" aria-label="Hero">
      <div className="rm-container flex flex-1 flex-col justify-center pt-32 pb-12 lg:pt-40">

        {/* The name. One <h1> holding all three lines, so it reads as the
            single string "Roberto Mediana Jr." to a screen reader and to
            search — the spans exist only so each line can shear on its own.
            Two nested spans per line, not one: the outer takes xPercent from
            the shear, the inner takes yPercent from the load reveal. A single
            span would mean two tweens writing one transform. */}
        <h1 className="hero-name hero-front">
          {NAME_LINES.map((line, i) => (
            <span key={line} className="hero-name-line"
              ref={el => { lineRefs.current[i] = el }}>
              <span className="hero-name-word"
                ref={el => { wordRefs.current[i] = el }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-namerule hero-front">
          <span className="hero-label">Full-Stack Developer · Iloilo, PH</span>
        </div>

        <div ref={ledeRef} className="hero-front mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-7">
            <p className="hero-lede">
              BSIT student at West Visayas State University – Janiuay Campus.
              I build practical web applications, and I test them the way
              someone trying to break in would.
            </p>
            <div className="flex flex-wrap items-center gap-7">
              <Link to="/projects" className="btn-ink">
                Explore work <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <CVButton variant="ink" />
            </div>
          </div>

          {/* Renders itself out of existence while socials.ts still holds the
              template's placeholder URLs — see REAL_SOCIALS. */}
          {REAL_SOCIALS.length > 0 && (
            <div className="flex flex-col gap-4 lg:items-end">
              <span className="hero-label">Socials</span>
              <div className="flex items-center gap-5">
                {REAL_SOCIALS.map(s => {
                  const Icon = SOCIAL_ICONS[s.icon] ?? ArrowUpRight
                  return (
                    <a key={s.platform} href={s.url} className="social-ink"
                      target="_blank" rel="noopener noreferrer"
                      aria-label={`${s.label} profile`}>
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Decorative, and marked as such — four descriptions of artwork tell a
            screen-reader user nothing about Roberto, and there is nothing
            focusable inside. Below lg a four-across strip in the flow; at lg
            the cards go absolute and scatter behind the name. It sits inside
            the container so the mobile strip keeps the container's padding;
            .hero-front on the type above is what keeps the name in front. */}
        <div className="hero-collage" aria-hidden="true">
          {COLLAGE.map((c, i) => (
            <div key={c.src}
              className={`hero-figure ${c.cls}${c.mark ? ' hero-figure--mark' : ''}`}
              ref={el => { figRefs.current[i] = el }}>
              {/* Colour source files, desaturated by CSS and restored on
                  hover. Serving files already baked to greyscale — which is
                  what /assets/img/hero-bg.jpg is — could never come back. */}
              <img src={c.src} alt="" loading="eager" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      {/* The hand-off into the dark page below: an ink bar the next section
          simply continues, rather than a white-to-black gradient. */}
      <div ref={barRef} className="hero-rule">
        <div className="rm-container flex items-center justify-between py-5">
          <div className="flex items-center gap-2.5">
            <div className="avail-dot" />
            <span className="hero-label">Available for freelance</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hero-label">Scroll</span>
            <div className="scroll-line-anim">
              <ArrowDown size={13} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── WORK / PROJECTS — 02 ──────────────────────────────────────────
function WorkSection() {
  // A compact slice of the bento grid used in full on /projects. Five tiles
  // is the smallest count where the cycling span pattern still reads as a
  // composition — the 2x2 anchor plus a 2x1 and two 1x1s fills the four
  // columns exactly, and the "view every project" tile closes the row.
  //
  // No GSAP here any more, and no framer-motion: ProjectBento owns the tile
  // transforms outright, and a second animator on the same nodes is how you
  // get tiles stuck mid-scatter.
  const preview = projects.slice(0, 5)

  return (
    <section className="rm-section ink-band">
      <div className="rm-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="eyebrow">/ Selected work</span>
          <div className="rule flex-1" />
          <span className="eyebrow">02</span>
        </div>

        <div className="flex items-end justify-between mb-14">
          <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.08}
            style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'clamp(2.5rem,6vw,5rem)', letterSpacing:'-0.015em', color:'var(--text-1)', lineHeight:1 }}>
            Things I've built.
          </TextReveal>
          <MagneticButton strength={0.3} className="hidden sm:inline-flex">
            <Link to="/projects" className="btn-ghost text-xs" style={{ fontFamily:"'DM Mono', monospace", letterSpacing:'0.08em', textTransform:'uppercase' }}>
              View All
            </Link>
          </MagneticButton>
        </div>

        <ProjectBento items={preview} moreHref="/projects" />
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
  { name:'React',      Icon:SiReact,      color:'var(--text-2)' },
  { name:'Vue.js',     Icon:SiVuedotjs,   color:'var(--text-2)' },
  { name:'Next.js',    Icon:SiNextdotjs,  color:'var(--text-1)' },
  { name:'TypeScript', Icon:SiTypescript, color:'var(--text-2)' },
  { name:'JavaScript', Icon:SiJavascript, color:'var(--text-2)' },
  { name:'Tailwind',   Icon:SiTailwindcss,color:'var(--text-2)' },
  { name:'HTML5',      Icon:SiHtml5,      color:'var(--text-2)' },
  { name:'CSS',        Icon:SiCss,        color:'var(--text-2)' },
  { name:'Node.js',    Icon:SiNodedotjs,  color:'var(--text-2)' },
  { name:'Laravel',    Icon:SiLaravel,    color:'var(--text-2)' },
  { name:'PHP',        Icon:SiPhp,        color:'var(--text-2)' },
  { name:'Express',    Icon:SiExpress,    color:'var(--text-1)' },
  { name:'MySQL',      Icon:SiMysql,      color:'var(--text-2)' },
  { name:'MongoDB',    Icon:SiMongodb,    color:'var(--text-2)' },
  { name:'PostgreSQL', Icon:SiPostgresql, color:'var(--text-2)' },
  { name:'Supabase',   Icon:SiSupabase,   color:'var(--text-2)' },
  { name:'Firebase',   Icon:SiFirebase,   color:'var(--text-2)' },
  { name:'Git',        Icon:SiGit,        color:'var(--text-2)' },
  { name:'Docker',     Icon:SiDocker,     color:'var(--text-2)' },
  { name:'Kali Linux', Icon:SiLinux,      color:'var(--text-2)' },
  { name:'Postman',    Icon:SiPostman,    color:'var(--text-2)' },
  { name:'OpenAI',     Icon:Bot,          color:'var(--text-2)' },
  { name:'AI/LLMs',   Icon:Brain,        color:'var(--accent)' },
  { name:'REST APIs',  Icon:Workflow,     color:'var(--accent)' },
]

function SkillsSection() {
  return (
    <section className="rm-section relative overflow-hidden" style={{ background:'var(--bg-base)' }}>
      {/* Scroll-driven wireframe globe. See WireGlobe. */}
      <Suspense fallback={null}><WireGlobe /></Suspense>

      <div className="rm-container relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">/ Expertise</span>
          <div className="rule flex-1" />
          <span className="eyebrow">03</span>
        </div>

        <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
          style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'clamp(2.5rem,6vw,5rem)', letterSpacing:'-0.015em', color:'var(--text-1)', lineHeight:1, marginBottom:'4rem' }}>
          Tools of the trade.
        </TextReveal>

        {/* Skill group list */}
        <div className="border-t mb-20" style={{ borderColor:'var(--border)' }}>
          {skillGroups.map((group, i) => (
            <ClipReveal key={group.cat} direction="right" delay={i * 0.07}>
              <div className="py-6 border-b grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 items-start" style={{ borderColor:'var(--border)' }}>
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)' }}>
                  {group.cat}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span key={item} style={{ fontFamily:"'DM Sans', sans-serif", fontWeight:500, fontSize:'0.9375rem', color:'var(--text-1)', letterSpacing:'-0.01em' }}>
                      {item}
                      <span style={{ color:'var(--text-subtle)', marginLeft:'0.5rem' }}>·</span>
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
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.75rem', letterSpacing:'0.06em', color:'var(--text-subtle)', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                  {name}
                </span>
              </div>
            ))}
          </Marquee>
          <Marquee speed="normal" reverse gap="2.5rem">
            {toolsGrid.slice(12).map(({ name, Icon, color }) => (
              <div key={name} className="flex items-center gap-2.5 px-1 flex-shrink-0">
                <Icon size={20} style={{ color, flexShrink:0 }} />
                <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.75rem', letterSpacing:'0.06em', color:'var(--text-subtle)', textTransform:'uppercase', whiteSpace:'nowrap' }}>
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
    <section className="rm-section ink-band">
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">/ Get in touch</span>
          <div className="rule flex-1" />
          <span className="eyebrow">04</span>
        </div>

        {/* Center-aligned contact */}
        <div className="max-w-2xl">
          <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.08}
            style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'clamp(2.5rem,6vw,5rem)', letterSpacing:'-0.015em', color:'var(--text-1)', lineHeight:1, marginBottom:'2rem' }}>
            Let's work together.
          </TextReveal>

          <ClipReveal direction="down" delay={0.2}>
            <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'1rem', color:'var(--text-muted)', lineHeight:1.7, marginBottom:'3rem', maxWidth:'480px' }}>
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
                <span style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'clamp(1.25rem,3vw,2rem)', letterSpacing:'-0.01em', color:'var(--text-2)', transition:'color 0.3s' }}
                  className="group-hover:text-[var(--accent)]">
                  your.email@example.com
                </span>
                <div className="email-line" style={{ position:'absolute', bottom:'-4px', left:0, right:0, height:'1px', background:'var(--accent)', transform:'scaleX(0)' }} />
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
      <CareerJourney />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
    </PageTransition>
  )
}
