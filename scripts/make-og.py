#!/usr/bin/env python3
"""Regenerate public/og-image.svg and public/og-image.png.

    python3 scripts/make-og.py
    python3 scripts/make-og.py --anton "C:/Windows/Fonts/Anton-Regular.ttf"

Why this file exists at all: the previous card was generated ad hoc and the
generator was thrown away, so re-cutting it after the palette inversion meant
either hand-editing 618 <line> elements or rebuilding the whole thing. The card
is derived from the same wireframe-terrain idea as the hero, which is code, not
artwork — so it belongs in a script that can be run again.

The card now matches the site: paper ground, ink hairlines, Anton wordmark.

ON FONTS — read this before wondering why the PNG looks slightly off.
The SVG names Anton and DM Mono, which is correct for anything that renders it
with those faces available. The PNG has to be rasterised here, and PIL can only
use a font file it is handed. Pass --anton with a path to Anton-Regular.ttf to
get the real thing; without it the script falls back to the most Anton-like
face it can find locally and says so on stderr. It is a stand-in: narrower and
lighter than Anton, close enough to read as the same design language, not
identical. Everything else about the card — palette, layout, terrain, spacing —
is exact either way.
"""
import argparse, math, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB  = os.path.join(ROOT, "public")
W, H = 1200, 630

# The palette, straight off :root in src/index.css. Kept as literals rather
# than parsed out of the stylesheet because an OG card is a build artefact, not
# a live document — but if these drift, invariant 22 in verify-invariants.py
# fails, which is what keeps them honest.
PAPER   = "#f8f8f8"
INK     = "#0a0a0a"
INK_MID = "#4a4a4a"   #  8.34:1 on paper
INK_SFT = "#5a5a5a"   #  6.50:1 on paper
HAIRLN  = "#c8c8c8"   #  rules only, 1.58:1

NAME    = "ROBERTO"
NAME2   = "MEDIANA JR."
ROLE    = "FULL-STACK DEVELOPER · WEB PENETRATION TESTER"
PLACE   = "WVSU JANIUAY CAMPUS · ILOILO, PHILIPPINES"
DOMAIN  = "RMJDEV.VERCEL.APP"
STATS   = [("8+", "PROJECTS"), ("15+", "TECHNOLOGIES"), ("2026", "EXPECTED BSIT")]


# ----------------------------------------------------------------- terrain
def terrain_lines():
    """The hero's wireframe ridge, flattened to 2D, as (p1, p2, alpha).

    Same construction as TerrainCanvas: a lattice displaced by summed sine
    waves, drawn as lat/long segments with NO triangulated diagonals, so it
    reads as a drawn grid rather than a mesh. Perspective is a plain divide by
    depth — enough to give the ridge a horizon without importing a matrix.

    Alpha is computed HERE, not in the two renderers, because it decides what
    the card looks like as much as the geometry does. The first cut had each
    renderer fade its own lines and they had already drifted apart by a wash
    rect; one function returning finished segments makes that impossible.

    Two things about the mapping are deliberate and were wrong the first time:

    NEAR IS DOWN. y = HORIZON + REACH/depth, so depth 1 (nearest) lands at the
    bottom and the far rows converge UP toward the horizon. Getting this
    backwards — near rows above far rows — costs you the ground plane entirely:
    the ridge stops reading as receding land and becomes a smudge floating in
    the middle of the card.

    THE LEFT COLUMN STAYS EMPTY. All the type sits left of x≈680, so the fade
    is horizontal, not a rectangle laid over the top. A rect can only be drawn
    at one y-boundary, and wherever that boundary falls it is simultaneously
    too low to protect the text below it and low enough to erase the drawing
    above it. A falloff in x has no boundary to get wrong.
    """
    rows, cols = 22, 34
    HORIZON = H * 0.30          # where the far rows converge
    REACH   = H * 0.78          # near edge overshoots H on purpose, so it bleeds
    CX      = W * 0.70          # ridge sits right of centre, off the type
    SPREAD  = W * 1.02          # near row runs off both edges

    pts = []
    for r in range(rows):
        row = []
        for c in range(cols):
            u = (c / (cols - 1) - 0.5) * 2.0     # across the ridge, centred
            v = r / (rows - 1)                   # 0 = nearest, 1 = horizon
            # One dominant crest plus two crossed waves, so the silhouette has
            # a subject instead of uniform corrugation.
            hgt = (math.sin(u * 3.1 + v * 2.2) * 0.30
                   + math.sin(u * 6.7 - v * 3.4) * 0.13
                   + math.exp(-((u * 1.5) ** 2)) * 0.34)
            depth = 1.0 + v * 2.9
            x = CX + (u * SPREAD) / depth
            y = HORIZON + (REACH - hgt * H * 0.34) / depth
            row.append((x, y, v))
        pts.append(row)

    def seg(a, b):
        # Depth fade, then the horizontal falloff. Ink at 0.42 over paper is
        # #94a — a hairline that survives Facebook's recompression; the 0.34 of
        # the first cut was already marginal before anything sat on top of it.
        mx = (a[0] + b[0]) * 0.5
        fall = min(max((mx - 470.0) / 330.0, 0.0), 1.0)
        return (a, b, round(0.42 * (1.0 - a[2] * 0.60) * fall, 3))

    segs = []
    for r in range(rows):
        for c in range(cols):
            if c + 1 < cols:
                segs.append(seg(pts[r][c], pts[r][c + 1]))
            if r + 1 < rows:
                segs.append(seg(pts[r][c], pts[r + 1][c]))
    # Anything under half a percent is a wasted element in the SVG and an
    # invisible one in the PNG.
    return [s for s in segs if s[2] >= 0.005]


def svg():
    out = [f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
           f'xmlns="http://www.w3.org/2000/svg">',
           f'  <rect width="{W}" height="{H}" fill="{PAPER}"/>']

    # Terrain first, so type always sits on top of it. Nothing is laid over the
    # drawing to protect the type — see terrain_lines() on why the fade is in x.
    #
    # Segments are bucketed by opacity and each bucket emitted as ONE <path> of
    # many subpaths, rather than 1200-odd <line> elements. That is not
    # micro-optimising: og-image.svg lives in public/, so Vite copies it into
    # every build whether or not anything references it, and the element-per-
    # segment version was 120KB of shipped bytes. Coordinates round to whole
    # pixels because PIL's line drawing is not antialiased and snaps to the
    # integer grid anyway — so this also stops the two outputs disagreeing by a
    # subpixel on every single line.
    buckets = {}
    for (x1, y1, _), (x2, y2, _), a in terrain_lines():
        key = round(a, 2)      # 0.01 of ink over paper is 2.4 grey levels: invisible
        buckets.setdefault(key, []).append(
            f"M{x1:.0f} {y1:.0f}L{x2:.0f} {y2:.0f}")
    out.append(f'  <g fill="none" stroke="{INK}" stroke-width="1">')
    for key in sorted(buckets, reverse=True):
        out.append(f'    <path stroke-opacity="{key:g}" d="{"".join(buckets[key])}"/>')
    out.append("  </g>")

    mono = "'DM Mono','Liberation Mono',ui-monospace,monospace"
    # Anton ships ONE weight. font-weight="700" on it smears the glyphs, which
    # is why every weight here is 400 and the hierarchy comes from size.
    disp = "'Anton','Liberation Sans Narrow',sans-serif"

    out += [
        f'  <text x="80" y="98" font-family="{mono}" font-size="21" '
        f'fill="{INK}" letter-spacing="3">RMJ</text>',
        f'  <text x="80" y="290" font-family="{disp}" font-size="132" '
        f'font-weight="400" fill="{INK}" letter-spacing="-2">{NAME}</text>',
        f'  <text x="80" y="404" font-family="{disp}" font-size="132" '
        f'font-weight="400" fill="{INK}" letter-spacing="-2">{NAME2}</text>',
        f'  <rect x="80" y="438" width="132" height="2" fill="{INK}"/>',
        f'  <text x="80" y="482" font-family="{mono}" font-size="16" '
        f'fill="{INK_SFT}" letter-spacing="2">{ROLE}</text>',
        f'  <text x="80" y="508" font-family="{mono}" font-size="13" '
        f'fill="{INK_SFT}" letter-spacing="2">{PLACE}</text>',
        f'  <line x1="80" y1="540" x2="{W-80}" y2="540" stroke="{HAIRLN}"/>',
    ]
    for i, (big, small) in enumerate(STATS):
        x = 80 + i * 150
        out += [f'  <text x="{x}" y="578" font-family="{disp}" font-size="30" '
                f'font-weight="400" fill="{INK}">{big}</text>',
                f'  <text x="{x}" y="600" font-family="{mono}" font-size="11" '
                f'fill="{INK_MID}" letter-spacing="2">{small}</text>']
    out.append(f'  <text x="{W-80}" y="600" font-family="{mono}" font-size="13" '
               f'fill="{INK}" letter-spacing="2" text-anchor="end">{DOMAIN}</text>')
    out.append("</svg>")
    return "\n".join(out) + "\n"


# --------------------------------------------------------------------- png
def pick(paths):
    for p in paths:
        if os.path.isfile(p):
            return p
    return None


def find_anton(explicit):
    if explicit:
        if not os.path.isfile(explicit):
            sys.exit(f"--anton: no such file: {explicit}")
        return explicit, True
    # fc-match happily returns a *substitute* rather than admitting defeat, so
    # its answer only counts if the file it names actually looks like Anton.
    try:
        got = subprocess.run(["fc-match", "-f", "%{file}", "Anton"],
                             capture_output=True, text=True, timeout=10).stdout.strip()
        if got and "anton" in os.path.basename(got).lower():
            return got, True
    except Exception:
        pass
    fallback = pick([
        "/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Bold.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSansNarrow-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ])
    return fallback, False


def png(anton_path, real):
    from PIL import Image, ImageDraw, ImageFont
    mono_path = pick([
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationMono-Regular.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
    ])
    if not anton_path or not mono_path:
        sys.exit("no usable TTFs found for rasterising; pass --anton")

    im = Image.new("RGB", (W, H), PAPER)
    d  = ImageDraw.Draw(im, "RGBA")

    for (x1, y1, _), (x2, y2, _), a in terrain_lines():
        d.line([(x1, y1), (x2, y2)], fill=(10, 10, 10, int(round(a * 255))), width=1)

    F = lambda p, s: ImageFont.truetype(p, s)

    def spaced(xy, text, font, fill, track=0.0, anchor="ls"):
        """Draw text with SVG-style letter-spacing.

        PIL has no tracking, so the first cut simply dropped it and the two
        outputs diverged: every mono label in the SVG is tracked 2-3px and the
        PNG rendered them tight. On labels this small that is not a subtlety,
        it is the difference between the site's type voice and generic mono.
        Tracking adds one gap PER GAP, so an n-glyph run grows by (n-1)*track —
        which is what the right-anchored width below has to account for.
        """
        x, y = xy
        if track <= 0:
            d.text((x, y), text, font=font, fill=fill, anchor=anchor)
            return
        widths = [d.textlength(ch, font=font) for ch in text]
        if anchor.startswith("r"):
            x -= sum(widths) + track * (len(text) - 1)
        for ch, w in zip(text, widths):
            d.text((x, y), ch, font=font, fill=fill, anchor="ls")
            x += w + track

    # Anton is far narrower than any stand-in, so the fallback is stepped down
    # to keep the wordmark inside the card instead of running off the edge.
    ns = 132 if real else 108
    spaced((80, 98),  "RMJ",  F(mono_path, 21), INK,     track=3)
    d.text((80, 290), NAME,  font=F(anton_path, ns), fill=INK, anchor="ls")
    d.text((80, 404), NAME2, font=F(anton_path, ns), fill=INK, anchor="ls")
    d.rectangle([80, 438, 212, 440], fill=INK)
    spaced((80, 482), ROLE,  F(mono_path, 15), INK_SFT, track=2)
    spaced((80, 508), PLACE, F(mono_path, 12), INK_SFT, track=2)
    d.line([(80, 540), (W - 80, 540)], fill=HAIRLN, width=1)
    for i, (big, small) in enumerate(STATS):
        x = 80 + i * 150
        d.text((x, 578), big, font=F(anton_path, 30), fill=INK, anchor="ls")
        spaced((x, 600), small, F(mono_path, 11), INK_MID, track=2)
    spaced((W - 80, 600), DOMAIN, F(mono_path, 13), INK, track=2, anchor="rs")

    im.save(os.path.join(PUB, "og-image.png"), optimize=True)
    return im


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--anton", help="path to Anton-Regular.ttf")
    args = ap.parse_args()

    open(os.path.join(PUB, "og-image.svg"), "w", encoding="utf-8").write(svg())
    path, real = find_anton(args.anton)
    png(path, real)

    print(f"wrote public/og-image.svg  ({W}x{H}, paper ground)")
    print(f"wrote public/og-image.png  display face: {os.path.basename(path)}")
    if not real:
        print("\n  NOTE: Anton was not available, so the PNG's wordmark is a\n"
              "  stand-in. The SVG names Anton correctly. To cut the real card:\n"
              "    python3 scripts/make-og.py --anton path/to/Anton-Regular.ttf\n"
              "  (Anton is free: fonts.google.com/specimen/Anton)", file=sys.stderr)
