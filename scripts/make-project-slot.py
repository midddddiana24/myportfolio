#!/usr/bin/env python3
"""
Generate public/assets/projects/_slot.png — the fallback tile the project
bento grid shows when a project's own screenshot isn't on disk yet.

WHY THIS EXISTS AT ALL, rather than an empty tile or a broken <img>:

The bento grid is a composition. A tile with no image is not a neutral gap,
it is a hole that changes the weight of every tile around it, and the grid
reads as broken rather than unfinished. The browser's broken-image glyph is
worse — it looks like a bug in the site. So the "no screenshot yet" state
gets deliberate art that (a) sits inside the palette, (b) holds the tile's
mass so the layout is honest about its final shape, and (c) says out loud
what file to drop where, in the site's own type.

FILENAME MATTERS. It is `_slot.png`, NOT `_placeholder.png`, because three
pre-existing render paths guard on `image.includes('placeholder')` to mean
"this is a stub, don't render it". A fallback whose own name contains
"placeholder" would be silently skipped by exactly the code meant to show
it. Renaming this file re-arms that trap.

Regenerate:  python3 scripts/make-project-slot.py
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

# Palette literals, matching :root in src/index.css. Repeated rather than
# parsed because this is a build-time asset, not a stylesheet consumer.
PAPER = (248, 248, 248)   # --bg-base
HAIRLN = (200, 200, 200)  # --border   1.58:1 — rules only, never text
INK_SFT = (90, 90, 90)    # --text-muted  6.50:1 on paper
INK_MID = (74, 74, 74)    # --text-2      8.34:1 on paper

W, H = 1200, 750
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "projects", "_slot.png")

MONO_CANDIDATES = [
    "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
]


def mono(size):
    for path in MONO_CANDIDATES:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    print("warn: no mono face found, falling back to PIL default", file=sys.stderr)
    return ImageFont.load_default()


def spaced(draw, xy, text, font, fill, track):
    """
    Draw `text` with letter-spacing, centred on xy[0].

    PIL has no tracking, and these labels are set at 0.18em in the CSS they
    are standing in for, so drawing them tight would make the placeholder the
    one element on the page that doesn't match the type system. Tracking adds
    one gap PER GAP, so an n-glyph run grows by (n-1)*track — the centring
    below accounts for that instead of measuring the untracked string.
    """
    widths = [draw.textlength(ch, font=font) for ch in text]
    total = sum(widths) + track * (len(text) - 1)
    x = xy[0] - total / 2.0
    for ch, w in zip(text, widths):
        draw.text((x, xy[1]), ch, font=font, fill=fill)
        x += w + track


def main():
    im = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(im)

    # Inset hairline frame. Same 1px-equivalent weight as .rule, scaled to
    # the asset's own resolution so it survives object-cover downscaling.
    pad = 46
    d.rectangle([pad, pad, W - pad - 1, H - pad - 1], outline=HAIRLN, width=2)

    # Corner ticks — the editorial device used on the section rules. Drawn
    # ON the frame so they read as registration marks, not a second box.
    tick = 34
    for cx, cy, dx, dy in ((pad, pad, 1, 1), (W - pad - 1, pad, -1, 1),
                           (pad, H - pad - 1, 1, -1), (W - pad - 1, H - pad - 1, -1, -1)):
        d.line([cx, cy, cx + tick * dx, cy], fill=INK_MID, width=3)
        d.line([cx, cy, cx, cy + tick * dy], fill=INK_MID, width=3)

    # Centre mark: an empty square, i.e. the shape of the missing thing.
    box = 82
    cx, cy = W // 2, int(H * 0.40)
    d.rectangle([cx - box // 2, cy - box // 2, cx + box // 2, cy + box // 2],
                outline=INK_MID, width=3)
    # A diagonal through it — the universal "no image" convention, at hairline
    # weight so it recedes behind the caption rather than competing with it.
    d.line([cx - box // 2, cy + box // 2, cx + box // 2, cy - box // 2], fill=HAIRLN, width=2)

    spaced(d, (cx, cy + 78), "PROJECT IMAGE", mono(34), INK_MID, 7)
    spaced(d, (cx, cy + 132), "DROP A SCREENSHOT AT", mono(21), INK_SFT, 4)
    spaced(d, (cx, cy + 168), "PUBLIC/ASSETS/PROJECTS/", mono(21), INK_SFT, 4)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    im.save(OUT, optimize=True)
    print("wrote %s  (%d x %d, %d bytes)" % (
        os.path.normpath(OUT), im.width, im.height, os.path.getsize(OUT)))


if __name__ == "__main__":
    main()
