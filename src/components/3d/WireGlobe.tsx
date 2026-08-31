import { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ================================================================
// WireGlobe — the Expertise section's quiet counterpart to the hero.
//
// Deliberately different in kind from the hero terrain: that scene
// runs on its own clock, this one is driven entirely by scroll. The
// globe draws itself in from the equator as you move through the
// section, so the motion reports your position on the page rather
// than just decorating it.
//
// Same rules as the terrain: lat/long lines only (no triangulated
// diagonals), additive white hairlines, no colour.
// ================================================================

function buildGlobe(radius: number, lats: number, longs: number, seg: number) {
  const pts: number[] = []
  const push = (a: THREE.Vector3, b: THREE.Vector3) => {
    pts.push(a.x, a.y, a.z, b.x, b.y, b.z)
  }
  const at = (phi: number, theta: number) =>
    new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    )

  // latitude rings — skip the poles, they collapse to a point
  for (let i = 1; i < lats; i++) {
    const phi = (i / lats) * Math.PI
    for (let j = 0; j < seg; j++) {
      push(at(phi, (j / seg) * Math.PI * 2), at(phi, ((j + 1) / seg) * Math.PI * 2))
    }
  }
  // meridians
  for (let j = 0; j < longs; j++) {
    const theta = (j / longs) * Math.PI * 2
    for (let i = 0; i < seg; i++) {
      push(at((i / seg) * Math.PI, theta), at(((i + 1) / seg) * Math.PI, theta))
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  return g
}

const VERT = /* glsl */ `
  uniform float uRadius;
  varying float vLat;   // 0 at equator, 1 at either pole
  varying float vFront; // 1 facing camera, 0 facing away
  void main() {
    vLat = abs(position.y) / uRadius;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n  = normalize(mat3(modelViewMatrix) * normalize(position));
    vFront  = smoothstep(-0.55, 0.65, n.z);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  uniform float uReveal;   // 0..1, driven by scroll
  uniform float uOpacity;
  uniform vec3  uInk;
  varying float vLat;
  varying float vFront;
  void main() {
    // Lines arrive from the equator outward as uReveal climbs.
    float draw = 1.0 - smoothstep(uReveal * 1.15, uReveal * 1.15 + 0.16, vLat);
    if (draw <= 0.001) discard;
    // The far side of the sphere stays fainter — with no shading to work
    // with on a wireframe, that contrast is the only thing reading as volume.
    // The floor is 0.30 rather than 0.22 because paper has less room below
    // it than ink had above it: at 0.22 the back of the sphere composited to
    // roughly #efefef and simply stopped existing, taking the volume cue
    // with it.
    float a = uOpacity * draw * mix(0.30, 1.0, vFront);
    gl_FragColor = vec4(uInk, a);
  }
`

function Globe({ host, reduced }: {
  host: React.RefObject<HTMLDivElement>
  reduced: boolean
}) {
  const mesh = useRef<THREE.LineSegments>(null)
  const radius = 2.5
  const geo = useMemo(() => buildGlobe(radius, 12, 18, 64), [])
  useEffect(() => () => geo.dispose(), [geo])

  const uniforms = useMemo(() => ({
    uRadius:  { value: radius },
    uReveal:  { value: reduced ? 1 : 0 },
    uOpacity: { value: 0.36 },
    uInk:     { value: new THREE.Color('#3a3a3a') },
  }), [reduced])

  const p = useRef(reduced ? 1 : 0)

  useFrame(() => {
    const el = host.current
    const m = mesh.current
    if (!el || !m) return

    if (reduced) {
      uniforms.uReveal.value = 1
      m.rotation.set(0.32, 0.6, 0)
      return
    }

    const r = el.getBoundingClientRect()
    const raw = 1 - r.top / Math.max(1, window.innerHeight)
    const target = THREE.MathUtils.clamp(raw, 0, 1)
    p.current += (target - p.current) * 0.09

    uniforms.uReveal.value = p.current
    m.rotation.y = p.current * Math.PI * 1.15
    m.rotation.x = 0.3 + p.current * 0.16
  })

  return (
    <lineSegments ref={mesh} geometry={geo} frustumCulled={false}>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        // See the note in TerrainCanvas: additive blending brightens toward
        // white, which on a paper ground means it brightens toward nothing.
        blending={THREE.NormalBlending}
      />
    </lineSegments>
  )
}

export function WireGlobe() {
  const host = useRef<HTMLDivElement>(null)
  const [near, setNear]       = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Only hold a GPU context while the section is anywhere near screen —
  // there's no reason to keep a second canvas rendering at the top of
  // the page while the hero terrain is the thing being looked at.
  useEffect(() => {
    const el = host.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setNear(e.isIntersecting),
      { rootMargin: '25% 0px 25% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={host} className="globe-wrap" aria-hidden="true">
      {near && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          camera={{ position: [0, 0, 7.4], fov: 45 }}
        >
          <Globe host={host} reduced={reduced} />
        </Canvas>
      )}
    </div>
  )
}
