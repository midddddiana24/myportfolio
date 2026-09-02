import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, DUR_SLOW } from '@/lib/gsap'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { TextReveal } from '@/components/motion/TextReveal'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { StatCounter } from '@/components/ui/StatCounter'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { journeyIntro, milestones } from '@/data/journey'

// ================================================================
// CareerJourney — 01
//
// Replaces the old home-page About section. Reading down the page it holds
// the same slot: first section after the hero, on the paper ground. What
// changed is the axis. Entering it pins the stage and converts vertical
// scroll into horizontal travel along the milestone track; when the track
// runs out, the pin releases and the page scrolls on down.
//
// ── NO BACKGROUND LAYER, ON REQUEST ──
//
// This section carried the WebGL wireframe terrain until 2026-09-02, when
// rober asked for it gone. The section is plain paper now and there is
// nothing absolutely positioned behind the stage, so if you add a canvas or
// any other background layer back, two things come with it: the stage needs
// its z-index restored (an absolute canvas otherwise paints over the in-flow
// type), and the layer must mount on the OUTER section rather than inside
// the stage — the stage is position: fixed for the length of the pin, so its
// rect stops moving, and a scroll-driven scene reading its wrapper's rect
// would freeze for the whole horizontal run.
//
// ── TWO MODES, AND THE BREAKPOINT IS A REAL DECISION ──
//
// >= 1024px  pinned, GSAP drives the track's x from scroll position.
// <  1024px  NOT pinned. The viewport becomes a native scroll-snap strip the
//            reader flicks through with a thumb.
//
// A pinned section on a phone captures the page scroll: the reader swipes up,
// the page appears frozen, and the only way out is to keep swiping through
// content they may not want. On a 44px-wide thumb target with no scrollbar
// for feedback, that reads as a broken page rather than an effect. Native
// scroll-snap gets the same left-to-right reading order, keeps momentum and
// rubber-banding, never touches vertical scroll, and costs no JS. The dots
// exist because a horizontal scroller with no visible scrollbar (iOS) gives
// no signal that there is anything to the right.
//
// ── THREE THINGS THAT WERE WRONG IN THE OLD HorizontalScroll ──
//
// 1. `if (window.innerWidth < 768) return` inside a mount-only effect. It
//    never re-evaluates, so a desktop visitor who narrows the window keeps
//    the pin, and a phone rotated to landscape never gains it. This uses a
//    matchMedia listener, so the mode is live.
// 2. It queried prefers-reduced-motion directly. The canonical answer is the
//    useReducedMotion hook, which re-renders when the OS setting changes.
// 3. A `speed` multiplier scaled the tween but only loosely the `end`
//    distance, so the track finished before or after the pin released.
//    Here one pixel of scroll is one pixel of travel — `end` and the tween
//    read the same `distance()`, and both recompute on refresh.
//
// ── WHY THE TRACK HOLDS NO LINKS ──
//
// The stage is pinned with position: fixed and the track is moved with a
// transform, so panels off to the right are laid out but not scrolled into
// place. If a link lived in panel five, tabbing to it would ask the browser
// to reveal an element it cannot reach by scrolling — focus lands somewhere
// invisible with no way back. So every focusable node (the CTA, the About
// link) sits in the stage footer, outside the track. Keep it that way: a
// link inside a panel is a keyboard trap, not a styling choice.
// ================================================================

const DESKTOP = '(min-width: 1024px)'

export function CareerJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  const reduced = useReducedMotion()
  const [pinned, setPinned] = useState(false)
  const [activePanel, setActivePanel] = useState(0)

  // ── Mode ──────────────────────────────────────────────────────
  // Live, not read-once. `pinned` gates the GSAP effect below and also picks
  // the aria-label, so both follow a resize.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(DESKTOP)
    const apply = () => setPinned(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // ── Desktop: pin the stage, translate the track ───────────────
  useEffect(() => {
    const stage = stageRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!stage || !viewport || !track) return
    if (!pinned || reduced) return

    // Leaving the snap strip mid-scroll and crossing into desktop would
    // otherwise add native scrollLeft to the GSAP transform, double-counting
    // the travel and cutting off the last panel.
    viewport.scrollLeft = 0

    // Recomputed rather than captured: invalidateOnRefresh re-runs both of
    // these, so a resize or a font swap that changes the track's width
    // re-maps the scroll distance instead of stranding the last panel.
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: stage,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: self => {
            if (fillRef.current) gsap.set(fillRef.current, { scaleX: self.progress })
          },
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      gsap.set(track, { clearProps: 'transform' })
      // The pin injected a spacer into the document, and every trigger below
      // this section measured its start against that extra height. Reverting
      // without a refresh leaves all of them offset by the spacer's size —
      // the Work and Skills reveals would fire a screenful early. This runs
      // on every mode flip, so a reader dragging a desktop window narrow is
      // the case that needs it.
      ScrollTrigger.refresh()
    }
  }, [pinned, reduced])

  // ── Mobile/tablet: which panel is centred ─────────────────────
  // Observed against the scroller itself, not the window, so it reports the
  // panel under the thumb rather than the panel in the viewport.
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || pinned) return
    if (typeof IntersectionObserver !== 'function') return

    const panels = Array.from(viewport.querySelectorAll<HTMLElement>('[data-panel]'))
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.panel)
            if (!Number.isNaN(i)) setActivePanel(i)
          }
        }
      },
      { root: viewport, threshold: 0.6 },
    )
    panels.forEach(p => io.observe(p))
    return () => io.disconnect()
  }, [pinned])

  const goTo = (i: number) => {
    const viewport = viewportRef.current
    const panel = viewport?.querySelector<HTMLElement>(`[data-panel="${i}"]`)
    if (!viewport || !panel) return
    viewport.scrollTo({
      left: panel.offsetLeft - viewport.offsetLeft,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const panelCount = milestones.length + 1

  return (
    <section ref={sectionRef} className="journey-section" style={{ background: 'var(--bg-base)' }}>
      {/* There is deliberately NO overflow: hidden on this section. Clipping
          is .journey-viewport's job, and an overflow or transform ancestor is
          the classic way to break a fixed-position pin — the stage would
          simply stop sticking. That reason is about the pin and holds whether
          or not anything is ever layered behind it. */}
      <div ref={stageRef} className="journey-stage">
        {/* Header — outside the track, so it holds still while panels pass */}
        <div className="rm-container">
          <div className="flex items-center gap-4">
            <span className="eyebrow">{journeyIntro.eyebrow}</span>
            <div className="rule flex-1" />
            <span className="eyebrow">{journeyIntro.index}</span>
          </div>
        </div>

        {/* Track */}
        <div
          ref={viewportRef}
          className="journey-viewport"
          // Focusable so a keyboard user can reach the snap strip and pan it
          // with the arrow keys; without tabIndex an overflow container is
          // scrollable by mouse only. On desktop it is not scrollable at all
          // (overflow hidden, GSAP owns x), so the affordance is dropped
          // rather than advertising a region that cannot move.
          tabIndex={pinned ? -1 : 0}
          role="region"
          aria-label={
            pinned
              ? 'Career journey, scrolls sideways as you scroll down'
              : 'Career journey, swipe sideways'
          }
        >
          <div ref={trackRef} className="journey-track">
            {/* Panel 0 — the intro that used to be the About section */}
            <article data-panel={0} className="journey-panel journey-panel-intro">
              <span className="journey-period">Who I am</span>
              <TextReveal
                as="h2"
                trigger="scroll"
                splitBy="words"
                duration={DUR_SLOW}
                stagger={0.06}
                className="journey-heading"
              >
                {journeyIntro.heading}
              </TextReveal>

              <ClipReveal direction="down">
                {journeyIntro.paragraphs.map(p => (
                  <p key={p.slice(0, 24)} className="journey-body">{p}</p>
                ))}
              </ClipReveal>

              <ClipReveal direction="down" delay={0.15}>
                <div className="journey-stats">
                  {journeyIntro.stats.map(s => (
                    <div key={s.label} className="journey-stat">
                      <StatCounter target={s.target} suffix={s.suffix} label={s.label} duration={1800} />
                    </div>
                  ))}
                </div>
              </ClipReveal>
            </article>

            {/* Panels 1..n — the milestones */}
            {milestones.map((m, i) => (
              <article key={m.period + m.kicker} data-panel={i + 1} className="journey-panel">
                <div className="journey-panel-head">
                  <span className="journey-period">{m.period}</span>
                  <span className={`journey-dot ${m.pending ? 'is-pending' : ''}`} aria-hidden="true" />
                  <span className="journey-state">{m.pending ? 'Pending' : 'Done'}</span>
                </div>

                <h3 className="journey-kicker">{m.kicker}</h3>
                <p className="journey-body">{m.body}</p>

                {m.points && (
                  <ul className="journey-points">
                    {m.points.map(pt => <li key={pt}>{pt}</li>)}
                  </ul>
                )}

                <span className="journey-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* Footer — progress on desktop, snap dots on touch, plus every
            focusable node in the section (see the keyboard note up top) */}
        <div className="rm-container">
          <div className="journey-footer">
            <div className="journey-progress" aria-hidden="true">
              <span ref={fillRef} className="journey-progress-fill" />
            </div>

            {/* role="group", NOT tablist. A tablist promises a whole
                interaction contract: aria-controls pointing at real
                tabpanels, arrow keys moving between tabs, and one tab stop
                for the entire set. None of that is true here — the panels
                are plain articles and each dot is its own tab stop — so
                announcing "tab, 1 of 6" would describe controls that do not
                behave that way. These are scroll shortcuts, so they are
                buttons in a labelled group, and the current one is marked
                with aria-current. Every role below is individually valid,
                which is exactly why no linter catches the mismatch. */}
            <div className="journey-dots" role="group" aria-label="Jump to career journey panel">
              {Array.from({ length: panelCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-current={activePanel === i ? 'true' : undefined}
                  aria-label={i === 0 ? 'Who I am' : milestones[i - 1].period}
                  className={`journey-dot-btn ${activePanel === i ? 'is-active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <div className="journey-actions">
              <span className="journey-hint">
                {pinned ? 'Scroll to travel right' : 'Swipe to travel right'}
                <ArrowRight size={12} aria-hidden="true" />
              </span>
              <MagneticButton strength={0.3}>
                <Link to="/about" className="btn-ghost text-sm">
                  More About Me <ArrowUpRight size={14} />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
