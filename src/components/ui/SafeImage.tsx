import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from 'react'

// ================================================================
// SafeImage — an <img> that degrades instead of breaking.
//
// A missing file renders the browser's broken-image glyph, which looks like
// a bug rather than a gap. Every project image is referenced from
// src/data/projects.ts, so a slug typo or an asset rober hasn't supplied yet
// (currently /assets/projects/mis-service-request.png) shows up as breakage
// on the Projects list, the Home featured card and the case-study page at
// once. Those pages already have a fallback branch for "no image"; this just
// makes a *failed* image take the same path as an absent one.
//
// `alt` is required rather than optional: it is the one prop that must never
// be forgotten, and `alt=""` is still a valid, deliberate answer for a
// decorative thumbnail sitting next to the project title.
// ================================================================

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  /** Rendered in place of the image if it fails to load. Defaults to nothing. */
  fallback?: ReactNode
}

export function SafeImage({ fallback = null, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  // Reset when pointed at a different file, otherwise one broken image makes
  // every later src in the same mounted element render as the fallback too —
  // which is exactly what happens on the Projects page as the filter swaps
  // cards in and out.
  useEffect(() => { setFailed(false) }, [props.src])

  if (failed) return <>{fallback}</>
  return <img {...props} onError={() => setFailed(true)} />
}
