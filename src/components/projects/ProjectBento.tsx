import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { SafeImage } from '@/components/ui/SafeImage'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { PROJECT_SLOT } from '@/data/projects'
import type { Project } from '@/types'

// ================================================================
// ProjectBento — mixed-span project grid with a scatter/lock scroll effect
//
// ── THE ANIMATION ──
// Scrolling the grid into view finds the tiles pulled in toward the centre,
// tilted a few degrees and slightly undersized. Continuing to scroll pushes
// them out into their grid cells and levels them off — pieces assembling into
// a whole, scrubbed to scroll position so the reader controls it frame by
// frame rather than watching a canned transition.
//
// The scatter pulls INWARD, never outward. An outward scatter puts the
// right-hand column past the container edge, which on a phone is a horizontal
// scrollbar appearing and disappearing as you scroll past — the page looks
// like it is glitching. Direction is derived per tile from which side of the
// grid's centre line it sits on, so the displacement is always into empty
// interior space and the document width never changes.
//
// ── FAILURE MODE, ON PURPOSE ──
// The scattered state lives in GSAP's `from`, not in CSS or JSX. If the bundle
// fails, JS is off, or reduced motion is set, no inline transform is ever
// written and the tiles render as a plain locked grid. This is the ClipReveal
// lesson: a reveal whose hidden state lives in the stylesheet leaves a blank
// page whenever the effect does not run.
//
// ── WHY THERE IS NO FRAMER-MOTION HERE ──
// The /projects page filters this grid. The obvious move is AnimatePresence
// with `layout`, but framer-motion's layout animation and this GSAP tween
// both write `transform` on the same node, and the last writer each frame
// wins — tiles jitter or stick mid-scatter. GSAP owns transform outright
// instead, and a filter change simply remounts the grid. A remount below the
// trigger point resolves straight to the locked state, which is the right
// behaviour anyway: clicking a filter should not replay a scroll animation.
// ================================================================

/**
 * Tile shapes, cycled by index. Tuned for the 4-column desktop grid so the
 * spans tile without gaps: a 2x2 anchor, a 2x1 beside it, two 1x1 beneath it,
 * then the rhythm repeats. `grid-auto-flow: dense` backfills whatever the
 * filtered count leaves ragged.
 */
const SHAPES = ['big', 'wide', 'small', 'small', 'wide', 'small', 'small'] as const

/**
 * Stable pseudo-random in [-1, 1] from an index. The classic GLSL sin-fract
 * hash. Math.random would give a different scatter on every render and make
 * the effect impossible to reproduce or eyeball; this is deterministic, so
 * tile 3 always tilts the same way.
 */
function jitter(i: number, salt: number): number {
  const v = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return (v - Math.floor(v)) * 2 - 1
}

interface ProjectBentoProps {
  items: Project[]
  /** Appended as a final tile linking onward. Omit for the full grid. */
  moreHref?: string
  className?: string
}

export function ProjectBento({ items, moreHref, className }: ProjectBentoProps) {
  const gridRef = useRef<HTMLUListElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reduced) return

    const tiles = Array.from(grid.querySelectorAll<HTMLElement>('.bento-tile'))
    if (tiles.length === 0) return

    const ctx = gsap.context(() => {
      const gridBox = grid.getBoundingClientRect()
      const midX = gridBox.left + gridBox.width / 2
      // One column means every tile straddles the centre line, so an inward
      // pull has nowhere to go and would only squash the stack. Below the
      // 2-column breakpoint the effect drops to tilt + scale + lift, which
      // reads the same and stays inside the viewport.
      const narrow = gridBox.width < 560

      tiles.forEach((tile, i) => {
        const box = tile.getBoundingClientRect()
        const tileMid = box.left + box.width / 2
        // Inward: negative when the tile is right of centre.
        const inward = tileMid > midX ? -1 : 1
        const spread = narrow ? 0 : 6 + Math.abs(jitter(i, 1)) * 8

        gsap.fromTo(
          tile,
          {
            xPercent: inward * spread,
            yPercent: jitter(i, 2) * (narrow ? 6 : 12),
            rotate: jitter(i, 3) * 4.5,
            scale: 0.9,
            opacity: 0.32,
          },
          {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            // Scrubbed across the grid's approach: scattered when its top
            // hits 88% of the viewport, fully locked by the time that top
            // reaches 32%. Staggering `start` per tile makes them settle in
            // sequence rather than as one block.
            scrollTrigger: {
              trigger: grid,
              start: () => `top ${88 - (i % 4) * 3}%`,
              end: 'top 32%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }, gridRef)

    return () => ctx.revert()
  }, [reduced, items])

  return (
    <ul ref={gridRef} className={`bento-grid ${className ?? ''}`}>
      {items.map((p, i) => {
        const shape = SHAPES[i % SHAPES.length]
        return (
          <li key={p.id} className={`bento-tile is-${shape}`}>
            <Link to={`/projects/${p.slug}`} className="bento-link" data-cursor="view">
              <div className="bento-media" aria-hidden="true">
                {/* Colour source displayed through grayscale(1) — a file baked
                    to grey can never un-grey, so .img-mono's hover reveal only
                    works on colour originals. The slot fallback is achromatic
                    by design, so it simply stays neutral. */}
                <SafeImage
                  src={p.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="bento-img img-mono"
                  fallback={
                    <img src={PROJECT_SLOT} alt="" className="bento-img" loading="lazy" decoding="async" />
                  }
                />
                <span className="bento-wash" />
              </div>

              <div className="bento-body">
                <div className="bento-top">
                  <span className="bento-cat">{p.category}</span>
                  {p.sample && (
                    /* Filler is labelled on the page, not just in the data
                       file. A portfolio that pads itself out is worse than a
                       short one — see the note in src/data/projects.ts. */
                    <span className="bento-sample">Sample</span>
                  )}
                  <span className="bento-date">{p.date}</span>
                </div>

                <div>
                  <h3 className="bento-title">{p.title}</h3>
                  <p className="bento-desc">{p.shortDescription}</p>
                  <div className="bento-tags">
                    {p.technologies.slice(0, shape === 'big' ? 5 : 3).map(t => (
                      <span key={t} className="rm-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <span className="bento-arrow" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </li>
        )
      })}

      {moreHref && (
        <li className="bento-tile is-small bento-tile-more">
          <Link to={moreHref} className="bento-link bento-link-more">
            <span className="bento-more-num">{String(items.length).padStart(2, '0')}</span>
            <span className="bento-more-label">
              View every project <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </li>
      )}
    </ul>
  )
}
