#!/usr/bin/env python3
"""Invariant sweep for this portfolio's design system and accessibility rules.

Run from anywhere:  python3 scripts/verify-invariants.py
Exits non-zero on any violation, so it works as a pre-commit or CI step.

Two hard-won lessons are baked in:
  1. Strip comments before grepping for code patterns. Comment prose produced
     false positives three separate times (shader identifiers, a hex that was
     only mentioned in the sentence explaining why it was removed).
  2. Only assert on LIVE files. 17 of 59 files under src/ are unreachable from
     main.tsx; violations there are real but invisible, and mixing them in
     makes the live count untrustworthy.
"""
import json, os, re, subprocess, sys

# Repo root, derived from this file's location so the script is portable.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "src")
fails, notes = [], []

def fail(m): fails.append(m)
def note(m): notes.append(m)

# ---------------------------------------------------------------- comments
def strip(text, css=False):
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    if not css:                      # (?<!:) so https:// survives
        text = re.sub(r"(?<!:)//[^\n]*", "", text)
    return text

# ------------------------------------------------- live import graph walk
EXTS = [".tsx", ".ts", ".jsx", ".js"]
def resolve(spec, importer):
    if spec.startswith("@/"):
        base = os.path.join(SRC, spec[2:])
    elif spec.startswith("."):
        base = os.path.normpath(os.path.join(os.path.dirname(importer), spec))
    else:
        return None                                  # bare package
    for cand in [base] + [base + e for e in EXTS] + \
                [os.path.join(base, "index" + e) for e in EXTS]:
        if os.path.isfile(cand):
            return cand
    return None

# `^[ \t]*` under MULTILINE, never `(?:^|\n)\s*`: the latter lets a run of
# blank lines be split many ways, and on a non-matching tail that backtracks
# hard enough to hang. Anchoring to line start with horizontal-space-only
# makes each position unambiguous.
IMPORT_RE = re.compile(
    r"""^[ \t]*(?:import|export)[^;\n]*?from[ \t]*['"]([^'"]+)['"]"""
    r"""|import[ \t]*\([ \t]*['"]([^'"]+)['"]"""
    r"""|^[ \t]*import[ \t]*['"]([^'"]+)['"]""", re.M)

entry = os.path.join(SRC, "main.tsx")
live, stack = set(), [entry]
while stack:
    f = stack.pop()
    if f in live or not os.path.isfile(f):
        continue
    live.add(f)
    body = strip(open(f, encoding="utf-8").read())
    for m in IMPORT_RE.finditer(body):
        spec = m.group(1) or m.group(2) or m.group(3)
        r = resolve(spec, f)
        if r:
            stack.append(r)

all_src = [os.path.join(dp, fn) for dp, _, fns in os.walk(SRC) for fn in fns
           if os.path.splitext(fn)[1] in EXTS]
dead = sorted(set(all_src) - live)
note(f"live={len(live)}  dead={len(dead)}  total={len(all_src)}")

def rel(p): return os.path.relpath(p, ROOT)

# ------------------------------------------------ 1. chromatic hex / rgb
# A hex is chromatic when its R, G, B channels are not all equal.
HEX = re.compile(r"#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b")
def chromatic_hex(h):
    if len(h) == 3: h = "".join(c * 2 for c in h)
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return not (r == g == b)

RGB = re.compile(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)")

targets = sorted(live) + [os.path.join(ROOT, "src", "index.css"),
                          os.path.join(ROOT, "tailwind.config.ts"),
                          os.path.join(ROOT, "index.html")]
for p in dict.fromkeys(targets):
    if not os.path.isfile(p): continue
    body = strip(open(p, encoding="utf-8").read(), css=p.endswith(".css"))
    for m in HEX.finditer(body):
        if chromatic_hex(m.group(1)):
            fail(f"chromatic hex #{m.group(1)} in {rel(p)}")
    for m in RGB.finditer(body):
        r, g, b = map(int, m.groups())
        if not (r == g == b):
            fail(f"chromatic rgb({r},{g},{b}) in {rel(p)}")

# ------------------------------------------- 2. chromatic Tailwind classes
HUES = ("slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|"
        "emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose")
TW = re.compile(rf"\b(?:bg|text|border|ring|from|via|to|fill|stroke|shadow|"
                rf"decoration|outline|divide|accent|caret|placeholder)-"
                rf"(?:{HUES})-\d{{2,3}}\b")
for p in sorted(live):
    body = strip(open(p, encoding="utf-8").read())
    for m in set(TW.findall(body)):
        fail(f"chromatic tailwind class {m} in {rel(p)}")

# --------------------------------------------------- 3. border-radius rule
RAD = re.compile(r"\brounded(?:-(?:sm|md|lg|xl|2xl|3xl))?\b")
for p in sorted(live):
    body = strip(open(p, encoding="utf-8").read())
    for m in set(RAD.findall(body)):
        fail(f"border-radius util '{m}' in {rel(p)} (only pills/circles allowed)")

# ------------------------------------------------ 4. custom props resolve
css_files = [os.path.join(ROOT, "src", "index.css")]
declared = set()
for p in css_files:
    for m in re.finditer(r"(--[a-zA-Z0-9-]+)\s*:", open(p, encoding="utf-8").read()):
        declared.add(m.group(1))
used = {}
for p in sorted(live) + css_files:
    body = strip(open(p, encoding="utf-8").read(), css=p.endswith(".css"))
    for m in re.finditer(r"var\(\s*(--[a-zA-Z0-9-]+)\s*(?:,|\))", body):
        used.setdefault(m.group(1), set()).add(rel(p))
for name, where in sorted(used.items()):
    if name not in declared:
        fail(f"undefined custom property {name} used in {', '.join(sorted(where))}")
note(f"custom props: {len(declared)} declared, {len(used)} used, all resolve")

# ------------------------------------------------- 5. token cross-agreement
css = open(os.path.join(ROOT, "src", "index.css"), encoding="utf-8").read()
tw  = open(os.path.join(ROOT, "tailwind.config.ts"), encoding="utf-8").read()
m = re.search(r"--text-subtle\s*:\s*(#[0-9a-fA-F]+)", css)
n = re.search(r"'text-subtle'\s*:\s*'(#[0-9a-fA-F]+)'", tw)
if not m or not n:
    fail("could not locate --text-subtle in both files")
elif m.group(1).lower() != n.group(1).lower():
    fail(f"--text-subtle disagrees: css {m.group(1)} vs config {n.group(1)}")
else:
    note(f"--text-subtle agrees across both files ({m.group(1)})")

if not re.search(r"borderColor\s*:\s*\{\s*DEFAULT\s*:\s*'#1f1f1f'", tw):
    fail("borderColor.DEFAULT is not pinned to #1f1f1f in tailwind.config.ts")
else:
    note("borderColor.DEFAULT pinned to #1f1f1f")

# ------------------------------------------------------- 6. public/ assets
PUB = os.path.join(ROOT, "public")
for dp, _, fns in os.walk(PUB):
    for fn in fns:
        if os.path.splitext(fn)[1].lower() not in (".svg", ".json", ".webmanifest", ".xml"):
            continue
        p = os.path.join(dp, fn)
        body = strip(open(p, encoding="utf-8", errors="replace").read(),
                     css=fn.endswith(".svg"))
        for mm in HEX.finditer(body):
            if chromatic_hex(mm.group(1)):
                fail(f"chromatic hex #{mm.group(1)} in {rel(p)}")

# ------------------------------------- 7. reduced-motion coverage
# Derived, not hardcoded. A hardcoded path list quietly passed while
# pointing at a file that didn't exist — proving nothing.
#
# A file is covered three possible ways, matching how the app is actually
# built: it consults the media query directly, it uses the shared
# useReducedMotion hook, or it animates ONLY through framer-motion and is
# therefore covered by the root <MotionConfig reducedMotion="user">.
# That last case is why a plain string grep reported 15 false failures.
app = open(os.path.join(ROOT, "src", "App.tsx"), encoding="utf-8").read()
HAS_MOTIONCONFIG = re.search(r'<MotionConfig[^>]*reducedMotion=["\']user["\']', app)
if not HAS_MOTIONCONFIG:
    fail("App.tsx is missing <MotionConfig reducedMotion=\"user\"> — "
         "framer-motion-only components would have no reduced-motion path")

FRAMER = re.compile(r"from ['\"]framer-motion['\"]")
JS_ANIM = re.compile(r"requestAnimationFrame|useFrame|new Lenis|"
                     r"gsap\.(?:to|from|fromTo|timeline|quickTo|set)")
by_route = {"direct": 0, "hook": 0, "motionconfig": 0}
motion_files = []
for p in sorted(live):
    body = strip(open(p, encoding="utf-8").read())
    animates = bool(JS_ANIM.search(body) or FRAMER.search(body))
    if not animates:
        continue
    motion_files.append(rel(p))
    if "prefers-reduced-motion" in body:
        by_route["direct"] += 1
    elif "useReducedMotion" in body:
        by_route["hook"] += 1
    elif not JS_ANIM.search(body) and HAS_MOTIONCONFIG:
        by_route["motionconfig"] += 1          # framer-only, covered at root
    else:
        fail(f"{rel(p)} drives animation in JS but has no reduced-motion path")
if not motion_files:
    fail("reduced-motion check found no animating files — pattern is wrong")
note(f"reduced-motion: {len(motion_files)} animating live files — "
     f"{by_route['direct']} query directly, {by_route['hook']} via hook, "
     f"{by_route['motionconfig']} via root MotionConfig")

# ------------------------------------------- 8. broken local asset refs
refs = set()
for p in sorted(live) + [os.path.join(ROOT, "index.html")]:
    body = strip(open(p, encoding="utf-8").read(),
                 css=p.endswith(".css"))
    for m in re.finditer(r"['\"](/assets/[^'\"]+|/[\w.-]+\.(?:png|jpe?g|svg|webp|pdf|json))['\"]", body):
        refs.add(m.group(1))
missing = [r for r in sorted(refs) if not os.path.isfile(os.path.join(PUB, r.lstrip("/")))]
for r in missing:
    note(f"MISSING asset (user must supply): {r}")

# --------------------------- 9. content hidden by JS-only reveals
# ClipReveal rendered `clipPath: inset(100% 0 0 0)` unconditionally in its
# JSX and cleared it from an effect that early-returned under reduced
# motion — so most of the site's content was clipped to nothing for those
# users. The rule: if a hiding style is written in JSX, its visibility must
# not depend on an effect that can be skipped.
HIDING = re.compile(
    r"(clipPath\s*:\s*[^,\n}]*inset\([^)]*100%[^)]*\)"
    r"|visibility\s*:\s*['\"]hidden['\"])")
for p in sorted(live):
    body = strip(open(p, encoding="utf-8").read())
    aware = ("prefers-reduced-motion" in body) or ("useReducedMotion" in body)
    if not aware:
        continue
    for mm in HIDING.finditer(body):
        ls = body.rfind("\n", 0, mm.start()) + 1
        le = body.find("\n", mm.end())
        line = body[ls:le if le != -1 else len(body)]
        if "reduced" in line:
            continue                      # gated — fine
        fail(f"{rel(p)} hides content with an ungated style "
             f"({mm.group(1)[:40]}…) while also having a reduced-motion path "
             f"— the reveal can be skipped, leaving it hidden forever")
note("no JS-only reveal leaves content permanently hidden")

# ------------------------------------------- 10. heading hierarchy
# Headings arrive two ways: a literal <hN> or <TextReveal as="hN">. A grep for
# only the former reported "most pages have no h1", which was wrong.
#
# Source order is NOT DOM order across a file: TechStack defines
# TechCategorySection (an h2) above its default export (the h1), so a
# whole-file scan "found" an h2 before the h1 and flagged a page that is
# actually correct. So compare levels only WITHIN one function body, where a
# linear JSX return does put them in DOM order.
HEADING = re.compile(r'<h([1-6])\b|as=["\']h([1-6])["\']')
FUNC    = re.compile(r"^(?:export\s+default\s+)?function\s+(\w+)", re.M)
pages   = sorted(p for p in live if os.sep + "pages" + os.sep in p)
if not pages:
    fail("heading check found no page files — path assumption is wrong")

for p in pages:
    body = strip(open(p, encoding="utf-8").read())
    heads = [(m.start(), int(m.group(1) or m.group(2)))
             for m in HEADING.finditer(body)]
    if not heads:
        fail(f"{rel(p)} renders no heading at all")
        continue

    funcs = [(m.start(), m.group(1)) for m in FUNC.finditer(body)]
    def owner(pos):
        cur = "<module>"
        for s, n in funcs:
            if s < pos: cur = n
            else: break
        return cur

    groups = {}
    for pos, lvl in heads:
        groups.setdefault(owner(pos), []).append(lvl)
    for fname, lvls in groups.items():
        for a, b in zip(lvls, lvls[1:]):
            if b > a + 1:
                fail(f"{rel(p)}: heading jumps h{a} → h{b} inside {fname}() "
                     f"— skipped level(s), screen-reader outline breaks")

    # One h1 per rendered page. ProjectDetail legitimately has two, in two
    # mutually exclusive branches (a "not found" early return and the real
    # article) — and each branch renders its own <PageTransition>. So the
    # ceiling is the number of PageTransition instances, not a flat 1. That
    # is what catches the opposite bug: Home's headline was once three
    # separate <h1> elements, one per word, inside a single render.
    n_h1  = sum(1 for _, lvl in heads if lvl == 1)
    n_pt  = len(re.findall(r"<PageTransition\b", body)) or 1
    if n_h1 < 1:
        fail(f"{rel(p)} has no h1")
    elif n_h1 > n_pt:
        fail(f"{rel(p)} renders {n_h1} h1s but only {n_pt} PageTransition "
             f"branch(es) — a single page must have exactly one h1")
note(f"heading hierarchy: {len(pages)} pages, one h1 each, no skipped levels")

# ------------------------------- 11. cursor:none must stay scoped
# `cursor: none` is only correct while CustomCursor is mounted to draw a
# replacement. CustomCursor signals that by putting .custom-cursor on <html>,
# so every such declaration must sit behind that class. Three inline
# `cursor:'none'` styles in JSX bypassed the CSS entirely and hid the pointer
# on touchscreen laptops, where App.tsx's isTouch gate skips CustomCursor but
# the trackpad still reports `pointer: fine`. Inline styles are the sneaky
# case: scoping the stylesheet does nothing about them.
for p in sorted(live):
    body = strip(open(p, encoding="utf-8").read())
    for mm in re.finditer(r"cursor\s*:\s*['\"]none['\"]", body):
        ln = body.count("\n", 0, mm.start()) + 1
        fail(f"{rel(p)}:{ln} sets cursor:'none' inline — unscoped from "
             f".custom-cursor, so it hides the pointer even when no custom "
             f"cursor is drawn. Let the stylesheet handle it.")

css_raw = open(os.path.join(ROOT, "src", "index.css"), encoding="utf-8").read()
css_nc  = strip(css_raw, css=True)
n_scoped = 0
for mm in re.finditer(r"cursor\s*:\s*none", css_nc):
    open_brace = css_nc.rfind("{", 0, mm.start())
    prev_bound = max(css_nc.rfind("}", 0, open_brace),
                     css_nc.rfind("{", 0, open_brace))
    selector = css_nc[prev_bound + 1:open_brace].strip()
    if "custom-cursor" not in selector:
        fail(f"index.css: `cursor: none` under selector '{selector[:60]}' is "
             f"not scoped to .custom-cursor")
    else:
        n_scoped += 1
if not n_scoped:
    fail("index.css has no scoped `cursor: none` — CustomCursor needs it to "
         "hide the system pointer; the check may be looking in the wrong place")
note(f"cursor:none — 0 inline, {n_scoped} scoped to .custom-cursor")

# ------------------------------------------ 12. skip link is reachable
# A skip link hidden with display:none or visibility:hidden is dropped from
# the tab order, which makes the one control that exists solely for keyboard
# users unreachable by keyboard — worse than not having it, because an audit
# sees the markup and assumes it works.
if ".skip-link" not in css_nc:
    fail("no .skip-link rule in index.css")
else:
    block = css_nc[css_nc.index(".skip-link"):]
    block = block[:block.index("}") + 1]
    for bad in ("display:none", "display: none",
                "visibility:hidden", "visibility: hidden"):
        if bad in block:
            fail(f"`.skip-link` uses {bad} — removes it from the tab order, "
                 f"so keyboard users cannot reach it. Clip it instead.")
    if "clip-path" not in block and "clip" not in block:
        fail(".skip-link is not clipped — it will be visible on the page")

app_src = strip(open(os.path.join(ROOT, "src", "App.tsx"), encoding="utf-8").read())
if 'className="skip-link"' not in app_src:
    fail("App.tsx has no skip-link markup")
# Look only at App()'s own body, not the whole file. Grepping the file for
# className="skip-link" passed even with <SkipLink /> deleted from the tree,
# because the string still sat in the SkipLink function definition above —
# the check was asserting the code EXISTS, not that it RENDERS. Slicing from
# App's declaration means a deleted render call actually fails.
_i = app_src.find("export default function App")
app_body = app_src[_i:] if _i != -1 else app_src
if not (re.search(r"<SkipLink\b", app_body) or
        'className="skip-link"' in app_body):
    fail("App.tsx defines a skip link but never renders it inside App()")
pt = strip(open(os.path.join(ROOT, "src", "components", "layout",
                             "PageTransition.tsx"), encoding="utf-8").read())
if 'id="main"' not in pt:
    fail("PageTransition.tsx lost id=\"main\" — the skip link's target")
if "tabIndex={-1}" not in pt:
    fail("PageTransition.tsx's <main> is missing tabIndex={-1}, so focus "
         "cannot be moved to it and the skip link jumps without moving focus")
note("skip link present, clipped (not display:none), target #main focusable")

# ------------------------------- 13. icon-only controls need a name
# A <button>/<a> whose only child is an icon component has no accessible name
# at all — lucide renders a bare <svg>, so it is announced as just "button".
# The mobile drawer's close button and the featured project's GitHub link were
# both in this state. Line numbers come from the ORIGINAL text: computing them
# from the comment-stripped copy reported a location ~17 lines off, which sent
# me to the wrong element entirely.
CTRL = re.compile(r"<(button|a)\b([^>]*?)>(.*?)</\1>", re.S)
n_named = 0
for p in sorted(live):
    raw  = open(p, encoding="utf-8").read()
    body = strip(raw)
    for mm in CTRL.finditer(body):
        tag, attrs, inner = mm.group(1), mm.group(2), mm.group(3)
        if re.search(r"aria-label|aria-labelledby|\btitle=", attrs):
            n_named += 1
            continue
        # Anything left after removing nested tags is rendered text, including
        # {expr} — which is how most labels arrive ({item.label}, {faq.question}).
        if re.sub(r"<[^>]*>", "", inner).strip():
            continue
        snippet = " ".join(inner.split())[:48]
        anchor  = body[mm.start():mm.start() + 60].split("\n")[0]
        idx     = raw.find(anchor.strip()[:40])
        ln      = raw.count("\n", 0, idx) + 1 if idx != -1 else 0
        fail(f"{rel(p)}:{ln} <{tag}> contains only an icon ({snippet}) and has "
             f"no aria-label — screen readers announce it with no name")
note(f"icon-only controls: all labelled ({n_named} explicit aria-labels in live files)")

# ------------------------- 14. the hero h1 names the site's actual owner
# The light hero was built from a screenshot of someone else's portfolio, and
# the instruction was "put my name" — so the name in the reference (Roj
# Justiniani Villacampa) came within one keystroke of being typed into the one
# element search engines weight most heavily. Tie the h1 to the same string the
# JSON-LD and the author meta already assert, so the three can never drift and
# a name from a reference can never survive here.
home_p = os.path.join(SRC, "pages", "Home.tsx")
home   = strip(open(home_p, encoding="utf-8").read())
html   = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()

m = re.search(r"const NAME_LINES\s*=\s*\[([^\]]*)\]", home)
jm = re.search(r'"@type"\s*:\s*"Person"\s*,\s*"name"\s*:\s*"([^"]+)"', html)
am = re.search(r'<meta\s+name="author"\s+content="([^"]+)"', html)
if not m:
    fail("Home.tsx: NAME_LINES not found — the hero h1 is no longer checkable "
         "against the site owner's name")
elif not (jm and am):
    fail("index.html: could not read the Person name from JSON-LD and/or the "
         "author meta, so the hero h1 cannot be cross-checked")
else:
    parts = [a or b for a, b in re.findall(r"'([^']*)'|\"([^\"]*)\"", m.group(1))]
    hero_name = " ".join(p for p in parts if p)
    def norm(s): return re.sub(r"\s+", " ", s).strip().lower()
    if norm(hero_name) != norm(jm.group(1)) or norm(hero_name) != norm(am.group(1)):
        fail(f"hero h1 reads {hero_name!r} but JSON-LD says {jm.group(1)!r} and "
             f"author meta says {am.group(1)!r} — the h1 must name the owner")
    else:
        note(f"hero h1 == JSON-LD == author meta ({hero_name})")

# --------------- 15. the collage is decorative, and marked as such
# Four <img> with empty alt are correct here — they are artwork, not
# information about Roberto — but empty alt is only correct if the container is
# also hidden from the accessibility tree. Half of that pairing is silent: an
# alt="" with no aria-hidden reads as an authoring slip either way.
cm = re.search(r'<div[^>]*className="hero-collage"[^>]*>', home)
if not cm:
    fail("Home.tsx: no .hero-collage container — the hero collage check is "
         "pointing at markup that no longer exists")
elif "aria-hidden" not in cm.group(0):
    fail("Home.tsx: .hero-collage holds alt=\"\" images but is not "
         "aria-hidden — decorative images need both halves of that pairing")

# ------------- 16. hover-to-colour needs source files that HAVE colour
# The whole interaction is `filter: grayscale(1)` lifted on hover, which can
# only reveal colour a file actually contains. One of the four originals was
# already greyscale, so its hover was a silent no-op — indistinguishable, from
# the outside, from the feature being broken. That card now declares
# `mark: true`; every other entry must be able to keep the promise.
try:
    from PIL import Image
    COLLAGE_RE = re.compile(
        r"\{\s*src:\s*'([^']+)'[^}]*?mark:\s*(true|false)", re.S)
    entries = COLLAGE_RE.findall(home)
    if not entries:
        fail("Home.tsx: COLLAGE entries not parseable — the hover-to-colour "
             "source check cannot run")
    for src, mark in entries:
        p = os.path.join(PUB, src.lstrip("/"))
        if not os.path.isfile(p):
            continue                       # covered by the asset check above
        with Image.open(p) as im:
            # .tobytes() rather than .getdata(): getdata is deprecated in
            # Pillow 11 and its replacement does not exist in older versions,
            # so this is the form that runs on whatever Pillow is installed.
            raw = im.convert("RGB").resize((64, 64)).tobytes()
        px = [raw[i:i+3] for i in range(0, len(raw), 3)]
        spread = sum(max(q) - min(q) for q in px) / len(px)
        if mark == "false" and spread < 8:
            fail(f"{src} is effectively greyscale (channel spread {spread:.1f}) "
                 f"but is not marked `mark: true` — its hover-to-colour reveal "
                 f"does nothing, which reads as a broken interaction")
        if mark == "true" and spread >= 8:
            fail(f"{src} carries real colour (channel spread {spread:.1f}) but "
                 f"is flagged `mark: true`, which suppresses the reveal")
    note(f"collage: {len(entries)} entries, colour sources match their mark flags")
except ImportError:
    note("collage colour check SKIPPED — Pillow not installed")

# --------------------- 17. the light theme stays inside the hero
# One light panel on an otherwise near-black site. A `background: var(--paper)`
# that escapes its scope does not degrade gracefully — it whites out a section
# whose text is all #f0f0f0 on the assumption of a dark ground.
LIGHT_SCOPES = ("hero-", "navbar-light", "btn-ink", "link-ink", "social-ink")
BLOCK = re.compile(r"([^{}]+)\{([^{}]*)\}")
for mm in BLOCK.finditer(css_nc):
    sel, body_ = mm.group(1).strip(), mm.group(2)
    if sel.startswith("@") or sel.startswith(":root"):
        continue
    if re.search(r"background(?:-color)?\s*:[^;]*var\(--paper", body_) \
       and not any(s in sel for s in LIGHT_SCOPES):
        fail(f"index.css: '{sel[:60]}' paints var(--paper) but is not scoped to "
             f"the light hero — light ground leaking onto a dark page")

n_light = len(re.findall(r'className="hero-light"', home))
if n_light != 1:
    fail(f"expected exactly one .hero-light panel in Home.tsx, found {n_light}")

# ------------- 18. every colour in the light scope clears AA on its ground
# These ratios were computed by hand once (#5a5a5a on #f8f8f8 = 6.50:1 pass;
# #c8c8c8 = 1.58:1, rules and borders only) and hand arithmetic does not
# survive the next edit. The reference design's own inactive nav labels are
# roughly #c8c8c8 on white — copying them faithfully would have shipped 1.58:1,
# so this is exactly the check that has to be mechanical.
def _hex_rgb(h):
    h = h.lstrip("#")
    if len(h) == 3: h = "".join(c * 2 for c in h)
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def _lum(rgb):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def _ratio(a, b):
    la, lb = _lum(a), _lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

# :root tokens, so `color: var(--ink-soft)` can be resolved to a real value.
root_m = re.search(r":root\s*\{([^}]*)\}", css_nc)
TOKENS = {}
if root_m:
    for k, v in re.findall(r"(--[a-zA-Z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\s*;",
                           root_m.group(1)):
        TOKENS[k] = _hex_rgb(v)

def _resolve(decl):
    """A single declaration value → rgb, or None if not a flat colour."""
    v = re.search(r"var\(\s*(--[a-zA-Z0-9-]+)", decl)
    if v:
        return TOKENS.get(v.group(1))
    h = re.search(r"#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b", decl)
    return _hex_rgb(h.group(1)) if h else None

if not TOKENS.get("--paper") or not TOKENS.get("--ink"):
    fail("index.css: --paper/--ink not readable from :root, so the light-hero "
         "contrast check cannot run")
else:
    n_checked = 0
    for mm in BLOCK.finditer(css_nc):
        sel, body_ = mm.group(1).strip(), mm.group(2)
        if sel.startswith("@") or not any(s in sel for s in LIGHT_SCOPES):
            continue
        cm2 = re.search(r"(?:^|;)\s*color\s*:([^;]+)", body_)
        if not cm2:
            continue
        fg = _resolve(cm2.group(1))
        if not fg:
            continue
        # Ground: the block's own background when it declares a flat one —
        # which is how .btn-ink:hover (paper on ink) reads correctly — else the
        # ink bar for anything inside .hero-rule, else the paper panel.
        bm = re.search(r"background(?:-color)?\s*:([^;]+)", body_)
        bg = _resolve(bm.group(1)) if bm else None
        if bg is None:
            bg = TOKENS["--ink"] if "hero-rule" in sel else TOKENS["--paper"]
        r = _ratio(fg, bg)
        n_checked += 1
        if r < 4.5:
            fail(f"index.css: '{sel[:52]}' renders rgb{fg} on rgb{bg} = "
                 f"{r:.2f}:1 — below AA 4.5:1 for text")
    if not n_checked:
        fail("light-hero contrast check inspected no declarations — the scope "
             "list is out of date with the stylesheet")
    note(f"light hero: {n_checked} text colours checked, all ≥ 4.5:1 on their ground")

print("=" * 68)
for n in notes: print("  ·", n)
print("=" * 68)
if fails:
    print(f"FAIL — {len(fails)} problem(s):")
    for f_ in fails: print("   ✗", f_)
    sys.exit(1)
print("PASS — all invariants hold")
if dead:
    print(f"\n(informational) {len(dead)} unreachable file(s):")
    for d in dead: print("   -", rel(d))
