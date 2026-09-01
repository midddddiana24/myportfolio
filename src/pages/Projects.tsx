import { useState } from 'react'
import { PageTransition } from '@/components/layout/PageTransition'
import { ClipReveal }     from '@/components/motion/ClipReveal'
import { TextReveal }     from '@/components/motion/TextReveal'
import { ProjectBento }   from '@/components/projects/ProjectBento'
import { projects, projectCategories, realProjectCount } from '@/data/projects'
import type { CategoryKey } from '@/data/projects'
import { DUR_SLOW } from '@/lib/gsap'

// ================================================================
// Projects — the full bento grid
//
// This replaced a list of rows. Two consequences worth knowing before
// editing:
//
// 1. AnimatePresence and framer-motion's `layout` are GONE, deliberately.
//    ProjectBento animates each tile's transform from GSAP, and layout
//    animation writes transform on the same nodes — both run per frame and
//    whichever writes last wins, so tiles judder or freeze mid-scatter. The
//    filter now remounts the grid via `key={active}` instead. That is not a
//    downgrade: a remount below the scroll trigger resolves straight to the
//    locked state, and replaying a scroll-linked entrance every time someone
//    clicks a chip would be wrong anyway.
//
// 2. The counts next to each filter chip include sample tiles, because the
//    chip is a promise about what the grid will show. The honest number of
//    real projects is realProjectCount and it is stated once, in the header,
//    where it cannot be mistaken for a total.
// ================================================================

export default function Projects() {
  const [active, setActive] = useState<CategoryKey>('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)
  const sampleCount = filtered.filter(p => p.sample).length

  return (
    <PageTransition className="pt-28">
      <section className="rm-section">
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-4">
            <span className="eyebrow">/ Portfolio</span>
            <div className="rule flex-1" />
            <span className="eyebrow">Work</span>
          </div>

          <TextReveal as="h1" trigger="load" splitBy="words" delay={0.1} duration={DUR_SLOW} stagger={0.07} skewY={3}
            style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'clamp(2.5rem,7vw,6rem)', letterSpacing:'-0.015em', color:'var(--text-1)', lineHeight:1, marginBottom:'1.5rem' }}>
            My Projects.
          </TextReveal>

          {/* Says the quiet part out loud rather than letting five tiles imply
              five shipped projects. */}
          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'3rem' }}>
            {realProjectCount} live {realProjectCount === 1 ? 'project' : 'projects'}
            {sampleCount > 0 && ` · ${sampleCount} sample ${sampleCount === 1 ? 'tile' : 'tiles'} marked below`}
          </p>

          {/* Filter */}
          <ClipReveal direction="down">
            <div className="flex flex-wrap items-center gap-1 p-1 border mb-10 w-fit" style={{ borderColor:'var(--border)', background:'var(--bg-surface)' }}>
              {projectCategories.map(cat => {
                const count = cat.key === 'all' ? projects.length : projects.filter(p => p.category === cat.key).length
                return (
                  <button key={cat.key} onClick={() => setActive(cat.key)} className={`filter-tab ${active === cat.key ? 'active' : ''}`}
                    aria-pressed={active === cat.key}>
                    {cat.label}
                    <span style={{ marginLeft:'0.4rem', fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', opacity:0.6 }}>({count})</span>
                  </button>
                )
              })}
            </div>
          </ClipReveal>

          {/* Grid. `key` forces the remount described up top. */}
          {filtered.length > 0 ? (
            <ProjectBento key={active} items={filtered} />
          ) : (
            <div className="py-20 text-center">
              <p style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', letterSpacing:'0.02em', fontWeight:400, color:'var(--text-1)', marginBottom:'0.5rem' }}>Nothing here yet</p>
              <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.1em', color:'var(--text-subtle)' }}>Continuously evolving…</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
