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
