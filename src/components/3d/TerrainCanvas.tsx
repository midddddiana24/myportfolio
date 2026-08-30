import { useMemo, useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ================================================================
// TerrainCanvas — the site's thesis, stated in one image.
//
// A topographic wireframe read as a network being mapped: hairline
// grid, and a scan band that travels toward the horizon lifting and
// igniting the vertices it crosses. The reference is traceroute /
// a subnet sweep discovering hosts, which is Roberto's actual
// subject matter (8 Cisco networking certs, web pentesting).
//
// Lives behind the About section, not the hero — the hero is now the
// light panel carrying the name. Everything here is measured against
// this component's own box (see the progress note in useFrame), so it
// is placeable in any near-black full-width section; the wrapper's
// vignette fades to #0a0a0a, which is the ground it expects.
//
// Monochrome only — see project design system. Colour never appears.
// ================================================================

/* ── Shared input state, written by DOM handlers, read in useFrame ── */
export interface TerrainInput {
  /** normalised pointer, -1..1 */
  px: number
  py: number
  /** accumulated drag rotation, radians */
  spinX: number
  spinY: number
  /** per-frame drag velocity */
  velX: number
  velY: number
  dragging: boolean
}

const freshInput = (): TerrainInput => ({
  px: 0, py: 0, spinX: 0, spinY: 0, velX: 0, velY: 0, dragging: false,
})

/* ── Grid geometry ─────────────────────────────────────────────────
   Built as explicit LineSegments rather than `wireframe: true` on a
   plane: wireframe would render the triangulation, so every cell
   would show a diagonal. A topographic map has no diagonals.       */
function buildGrid(size: number, seg: number): THREE.BufferGeometry {
  const step = size / seg
  const half = size / 2
  // segments along X for each row, plus along Z for each column
  const count = 2 * seg * (seg + 1)
  const pos = new Float32Array(count * 2 * 3)
  let o = 0

  const put = (x: number, z: number) => {
    pos[o++] = x; pos[o++] = 0; pos[o++] = z
  }

  for (let j = 0; j <= seg; j++) {
    const z = -half + j * step
    for (let i = 0; i < seg; i++) {
      const x = -half + i * step
      put(x, z); put(x + step, z)
    }
  }
  for (let i = 0; i <= seg; i++) {
    const x = -half + i * step
    for (let j = 0; j < seg; j++) {
      const z = -half + j * step
      put(x, z); put(x, z + step)
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return g
}

/* ── Shaders ───────────────────────────────────────────────────────
   Height is a sum of sines rather than imported noise: deterministic,
   no extra dependency, and cheap enough to run per-vertex on a
   ~30k vertex grid. Because it's a pure function of x/z, adjacent
   line segments that share a corner resolve to the same height and
   the mesh stays watertight.                                       */
const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uScanZ;
  uniform float uScanWidth;
  uniform float uScanLift;
  uniform float uFadeNear;
  uniform float uFadeFar;

  varying float vScan;
  varying float vFade;
  varying float vHeight;

  float ridge(vec2 p, float t) {
    float h = 0.0;
    h += sin(p.x * 0.30 + t * 0.22) * 1.00;
    h += sin(p.y * 0.24 - t * 0.18) * 0.90;
    h += sin((p.x + p.y) * 0.17 + t * 0.13) * 0.70;
    h += sin((p.x - p.y) * 0.41 - t * 0.26) * 0.32;
    h += sin(p.x * 0.83 + p.y * 0.61 + t * 0.31) * 0.16;
    return h * 0.42;
  }

  void main() {
    vec3 p = position;
    float h = ridge(p.xz, uTime);

    // Flatten toward the centre-left so the display type always sits
    // over calm ground — legibility outranks the effect.
    float calm = smoothstep(0.0, 26.0, abs(p.x) + abs(p.z) * 0.35);
    h *= mix(0.18, 1.0, calm);

    p.y += h * uAmp;

    float d = abs(p.z - uScanZ);
    float scan = 1.0 - smoothstep(0.0, uScanWidth, d);
    scan = pow(scan, 1.7);
    p.y += scan * uScanLift;

    vScan = scan;
    vHeight = h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = 1.0 - smoothstep(uFadeNear, uFadeFar, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  uniform vec3  uBase;
  uniform vec3  uHot;
  uniform float uOpacity;

  varying float vScan;
  varying float vFade;
  varying float vHeight;

  void main() {
    vec3 c = mix(uBase, uHot, vScan);
    // ridges read brighter than valleys, so elevation carries hierarchy
    float a = uOpacity * vFade * (0.30 + 0.70 * smoothstep(-0.9, 1.4, vHeight));
    a += vScan * 0.6 * vFade;
    if (a < 0.004) discard;
    gl_FragColor = vec4(c, clamp(a, 0.0, 1.0));
  }
`

/* ── Terrain ──────────────────────────────────────────────────── */
function Terrain({ input, host, reduced, seg, size }: {
  input: React.MutableRefObject<TerrainInput>
  host: React.RefObject<HTMLDivElement>
  reduced: boolean
  seg: number
  size: number
}) {
  const group = useRef<THREE.Group>(null)
  const geo   = useMemo(() => buildGrid(size, seg), [size, seg])
  useEffect(() => () => geo.dispose(), [geo])

  const uniforms = useMemo(() => ({
    uTime:      { value: 0 },
    uAmp:       { value: 1 },
    uScanZ:     { value: size / 2 },
    uScanWidth: { value: 5.5 },
    uScanLift:  { value: 1.15 },
    uFadeNear:  { value: 14 },
    uFadeFar:   { value: 74 },
    uBase:      { value: new THREE.Color('#6e6e6e') },
    uHot:       { value: new THREE.Color('#ffffff') },
    uOpacity:   { value: 0.5 },
  }), [size])

  // Progress is measured against this canvas's own box, not against the top
  // of the document: 0 while the section's top sits at or below the viewport
  // top, 1 one viewport-height after it has passed. For a section that starts
  // the page that is arithmetically identical to `scrollY / innerHeight` —
  // which is what this used to read — so the hero behaviour is unchanged and
  // the scene now also works somewhere down the page. It was `scrollY` alone
  // that made this hero-only: further down, progress pinned at 1 and the
  // terrain would have rendered permanently flattened and half-faded.
  //
  // Read straight off the element each frame rather than through a scroll
  // listener: Lenis owns the scroll loop, and one rect read at a fixed point
  // in the frame is what ScrollTrigger does too.
  const scroll = useRef(0)
  const half = size / 2

  useFrame((state, delta) => {
    const d = Math.min(delta, 1 / 30) // clamp so a stalled tab can't jump the scan
    const u = uniforms
    const g = group.current
    if (!g) return

    const el = host.current
    const top = el ? el.getBoundingClientRect().top : 0
    const sp = Math.min(1, Math.max(0, -top / Math.max(1, window.innerHeight)))
    scroll.current += (sp - scroll.current) * 0.08
    const s = scroll.current

    if (reduced) {
      // Hold a single legible frame: shape, no motion.
      u.uTime.value = 0
      u.uScanZ.value = half * 0.25
      u.uAmp.value = 1
      return
    }

    u.uTime.value = state.clock.elapsedTime

    // Scan runs near → far and dissolves into the horizon fade, so the
    // loop reset is never visible. Speeds up as you scroll away.
    const speed = 7.5 + s * 11
    u.uScanZ.value -= speed * d
    if (u.uScanZ.value < -half * 1.05) u.uScanZ.value = half * 1.05

    // Terrain flattens and the camera lifts as the hero exits — the
    // scene gets out of the way rather than competing with the page.
    u.uAmp.value = 1 - s * 0.55
    u.uOpacity.value = 0.5 * (1 - s * 0.5)

    const inp = input.current

    // While dragging, spin is written directly by the pointer handler so
    // the scene tracks the cursor 1:1. Only once released do we coast on
    // the last recorded velocity and drift back toward rest. Applying
    // velocity every frame *during* the drag would keep spinning the
    // terrain whenever the button is held without the mouse moving.
    if (!inp.dragging) {
      inp.spinY += inp.velY
      inp.spinX += inp.velX
      inp.velX *= 0.93
      inp.velY *= 0.93
      inp.spinX *= 0.985
      inp.spinY *= 0.985
    }
    inp.spinX = THREE.MathUtils.clamp(inp.spinX, -0.28, 0.28)

    // pointer parallax, eased
    const targetY = inp.px * 0.16 + inp.spinY
    const targetX = -inp.py * 0.07 + inp.spinX
    g.rotation.y += (targetY - g.rotation.y) * 0.055
    g.rotation.x += (targetX - g.rotation.x) * 0.055

    g.position.y = -2.6 + s * 2.2
  })

  return (
    <group ref={group} position={[0, -2.6, -22]}>
      <lineSegments geometry={geo} frustumCulled={false}>
        <shaderMaterial
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

/* ── WebGL probe ───────────────────────────────────────────────── */
function webglOK(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/* ── Public component ──────────────────────────────────────────── */
export function TerrainCanvas() {
  const input = useRef<TerrainInput>(freshInput())
  const wrap  = useRef<HTMLDivElement>(null)

  const [ok, setOk]           = useState(true)
  const [reduced, setReduced] = useState(false)
  const [seg, setSeg]         = useState(72)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setOk(webglOK())

    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqCoarse = window.matchMedia('(pointer: coarse)')
    const apply = () => {
      setReduced(mqMotion.matches)
      // Coarse pointer or a low core count means a phone: halve the grid.
      const weak = mqCoarse.matches || (navigator.hardwareConcurrency ?? 8) <= 4
      setSeg(weak ? 40 : 72)
    }
    apply()
    mqMotion.addEventListener('change', apply)
    mqCoarse.addEventListener('change', apply)
    return () => {
      mqMotion.removeEventListener('change', apply)
      mqCoarse.removeEventListener('change', apply)
    }
  }, [])

  // This canvas fills one section of a long page, so for most of a visit it is
  // off-screen. Rendering a 30k-vertex grid the whole time to draw something
  // nobody can see is pure waste — stop the loop instead.
  // Pausing is safe: three's clock only advances while frames are being
  // drawn, so uTime resumes exactly where it stopped rather than jumping,
  // and the delta clamp in useFrame absorbs the long first frame.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: '10% 0px 10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ok])

  // Drag is mouse-only: on touch the same gesture is a scroll, and
  // stealing it would break the page.
  //
  // pointerdown goes on the window, not the canvas wrapper. The wrapper is
  // pointer-events:none and sits behind a content container that spans the
  // whole section — so a listener on it would never fire. We instead accept a
  // drag that starts anywhere over the wrapper's box and bail on interactive
  // targets so links and buttons keep their own clicks.
  useEffect(() => {
    let last: { x: number; y: number } | null = null

    // Hit-tested against the wrapper rather than `scrollY < innerHeight`,
    // which only described a canvas in the first viewport — and which also
    // meant a drag in the top 90% of the page rotated the terrain whether or
    // not the cursor was anywhere near it.
    const overCanvas = (e: PointerEvent) => {
      const el = wrap.current
      if (!el) return false
      const r = el.getBoundingClientRect()
      return e.clientX >= r.left && e.clientX <= r.right
          && e.clientY >= r.top  && e.clientY <= r.bottom
    }

    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || !overCanvas(e)) return
      const t = e.target as HTMLElement | null
      if (t?.closest('a, button, input, textarea, select, [role="button"]')) return
      input.current.dragging = true
      last = { x: e.clientX, y: e.clientY }
    }

    const move = (e: PointerEvent) => {
      // Normalised against the viewport rather than the element: the hero
      // is full-viewport, so this is equivalent and avoids a forced layout
      // read on every mouse move while Lenis is animating the scroll.
      const inp = input.current
      inp.px = (e.clientX / window.innerWidth) * 2 - 1
      inp.py = (e.clientY / window.innerHeight) * 2 - 1
      if (inp.dragging && last) {
        const vy = (e.clientX - last.x) * 0.0042
        const vx = (e.clientY - last.y) * 0.0022
        inp.spinY += vy   // track the cursor directly
        inp.spinX += vx
        inp.velY = vy     // remembered so release can coast
        inp.velX = vx
        last = { x: e.clientX, y: e.clientY }
      }
    }

    const up = () => { input.current.dragging = false; last = null }

    window.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    window.addEventListener('blur', up)
    return () => {
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      window.removeEventListener('blur', up)
    }
  }, [ok])

  if (!ok) return <div className="terrain-fallback" aria-hidden="true" />

  return (
    <div ref={wrap} className="terrain-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 3.1, 15], fov: 48, near: 0.1, far: 140 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', () => setOk(false))
        }}
      >
        <Suspense fallback={null}>
          <Terrain input={input} host={wrap} reduced={reduced} seg={seg} size={78} />
        </Suspense>
      </Canvas>
    </div>
  )
}
