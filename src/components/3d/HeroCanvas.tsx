import { useRef, Suspense, useMemo, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// ================================================================
// HeroCanvas v2 — Click-interactive + Scroll-synced Three.js hero
// ================================================================

/* ── Mouse-reactive camera ────────────────────────────────────── */
function CameraRig({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04
    camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Click burst particles ────────────────────────────────────── */
interface Burst { id: number; particles: { pos: THREE.Vector3; vel: THREE.Vector3; life: number }[] }

function ClickBursts({ bursts, onExpired }: { bursts: Burst[]; onExpired: (id: number) => void }) {
  useFrame((_, delta) => {
    for (const burst of bursts) {
      let allDead = true
      for (const p of burst.particles) {
        p.pos.addScaledVector(p.vel, delta * 60)
        p.vel.y -= delta * 2
        p.life -= delta * 0.8
        if (p.life > 0) allDead = false
      }
      if (allDead) onExpired(burst.id)
    }
  })

  return (
    <>
      {bursts.map(burst =>
        burst.particles.filter(p => p.life > 0).map((p, i) => (
          <mesh key={`${burst.id}-${i}`} position={p.pos}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#E8702A" transparent opacity={Math.max(0, p.life)} />
          </mesh>
        ))
      )}
    </>
  )
}

/* ── Central TorusKnot ────────────────────────────────────────── */
function MainKnot({ scrollProgress, onClickBurst }: {
  scrollProgress: number
  onClickBurst: (pos: THREE.Vector3) => void
}) {
  const mesh = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)
  const baseSpeed = 0.15
  const clicked = useRef(false)
  const clickPulse = useRef(0)

  useFrame((s) => {
    if (!mesh.current || !wire.current) return
    // Speed increases with scroll + click pulse
    const speed = baseSpeed + scrollProgress * 0.35 + clickPulse.current * 0.6
    mesh.current.rotation.x = s.clock.elapsedTime * speed * 0.8
    mesh.current.rotation.y = s.clock.elapsedTime * speed
    wire.current.rotation.x = s.clock.elapsedTime * speed * 0.8
    wire.current.rotation.y = s.clock.elapsedTime * speed
    // Decay click pulse
    if (clickPulse.current > 0) clickPulse.current = Math.max(0, clickPulse.current - 0.02)
  })

  const handleClick = useCallback(() => {
    if (!mesh.current) return
    clicked.current = true
    clickPulse.current = 1
    onClickBurst(mesh.current.position.clone())
  }, [onClickBurst])

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
      <group onClick={handleClick}>
        <mesh ref={mesh}>
          <torusKnotGeometry args={[1.4, 0.42, 220, 36, 2, 3]} />
          <MeshDistortMaterial color="#CF4500" distort={0.25} speed={2.5}
            metalness={0.7} roughness={0.15} transparent opacity={0.92} />
        </mesh>
        <mesh ref={wire}>
          <torusKnotGeometry args={[1.4, 0.42, 220, 36, 2, 3]} />
          <meshBasicMaterial wireframe color="#FF8A50" transparent opacity={0.12} />
        </mesh>
        {/* Invisible click hitbox — larger area */}
        <mesh visible={false}>
          <sphereGeometry args={[2.2, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Orbiting shapes ──────────────────────────────────────────── */
function OrbitingShape({ radius, speed, offset, color, size, scrollProgress }: {
  radius: number; speed: number; offset: number; color: string; size: number; scrollProgress: number
}) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!mesh.current) return
    const sp = speed + scrollProgress * 0.2
    const t = s.clock.elapsedTime * sp + offset
    mesh.current.position.x = Math.cos(t) * radius
    mesh.current.position.y = Math.sin(t * 0.7) * radius * 0.5
    mesh.current.position.z = Math.sin(t) * radius
    mesh.current.rotation.x = t * 0.8
    mesh.current.rotation.y = t * 0.6
  })
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} transparent opacity={0.85} />
    </mesh>
  )
}

/* ── Particle field ───────────────────────────────────────────── */
function ParticleField({ count = 2500, scrollProgress }: { count?: number; scrollProgress: number }) {
  const points = useRef<THREE.Points>(null)
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const c1 = new THREE.Color('#CF4500')
    const c2 = new THREE.Color('#F5874A')
    const c3 = new THREE.Color('#ffffff')
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = r * Math.cos(phi)
      const mix = Math.random()
      const c = mix < 0.5 ? c1 : mix < 0.8 ? c2 : c3
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((s) => {
    if (!points.current) return
    const speed = 0.02 + scrollProgress * 0.04
    points.current.rotation.y = s.clock.elapsedTime * speed
    points.current.rotation.x = s.clock.elapsedTime * speed * 0.5
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors sizeAttenuation depthWrite={false} transparent opacity={0.7} />
    </points>
  )
}

/* ── Energy rings ─────────────────────────────────────────────── */
function EnergyRing({ radius, speed, tilt, scrollProgress }: {
  radius: number; speed: number; tilt: number; scrollProgress: number
}) {
  const ring = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ring.current) return
    const sp = speed + (speed > 0 ? scrollProgress : -scrollProgress) * 0.15
    ring.current.rotation.z = s.clock.elapsedTime * sp
    ring.current.rotation.x = tilt + Math.sin(s.clock.elapsedTime * 0.3) * 0.05
  })
  return (
    <mesh ref={ring}>
      <torusGeometry args={[radius, 0.012, 16, 200]} />
      <meshBasicMaterial color="#E8702A" transparent opacity={0.3} />
    </mesh>
  )
}

/* ── Glowing core ─────────────────────────────────────────────── */
function CoreGlow() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!mesh.current) return
    mesh.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 2) * 0.05)
  })
  return (
    <Sphere ref={mesh} args={[0.5, 32, 32]}>
      <meshStandardMaterial color="#FF6020" emissive="#CF4500" emissiveIntensity={2}
        transparent opacity={0.4} />
    </Sphere>
  )
}

/* ── Animated lights ──────────────────────────────────────────── */
function SceneLights() {
  const l1 = useRef<THREE.PointLight>(null)
  const l2 = useRef<THREE.PointLight>(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (l1.current) { l1.current.position.x = Math.sin(t*0.5)*6; l1.current.position.z = Math.cos(t*0.5)*6 }
    if (l2.current) { l2.current.position.x = Math.cos(t*0.3)*5; l2.current.position.y = Math.sin(t*0.4)*4 }
  })
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight ref={l1} color="#CF4500" intensity={4} position={[5, 3, 5]}  distance={15} />
      <pointLight ref={l2} color="#F5874A" intensity={3} position={[-4,-2, 3]} distance={12} />
      <pointLight        color="#ffffff"  intensity={1} position={[0,  6, 2]}  distance={10} />
    </>
  )
}

/* ── Full canvas ──────────────────────────────────────────────── */
export function HeroCanvas() {
  const [mouse, setMouse]         = useState({ x: 0, y: 0 })
  const [scrollProgress, setScroll] = useState(0)
  const [bursts, setBursts]       = useState<{ id: number; particles: { pos: THREE.Vector3; vel: THREE.Vector3; life: number }[] }[]>([])
  const burstId = useRef(0)

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Scroll tracking for speed-sync
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({
      x:  (e.clientX / window.innerWidth  - 0.5) * 2,
      y:  (e.clientY / window.innerHeight - 0.5) * 2,
    })
  }, [])

  const handleClickBurst = useCallback((origin: THREE.Vector3) => {
    const count = 40
    const particles = Array.from({ length: count }, () => ({
      pos:  origin.clone(),
      vel:  new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25 + 0.08,
        (Math.random() - 0.5) * 0.25
      ),
      life: 0.8 + Math.random() * 0.6,
    }))
    setBursts(prev => [...prev, { id: ++burstId.current, particles }])
  }, [])

  const expireBurst = useCallback((id: number) => {
    setBursts(prev => prev.filter(b => b.id !== id))
  }, [])

  if (prefersReduced) {
    return (
      <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
        <div className="w-64 h-64 rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
      </div>
    )
  }

  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CameraRig mouse={mouse} />
          <SceneLights />
          <MainKnot scrollProgress={scrollProgress} onClickBurst={handleClickBurst} />
          <CoreGlow />
          <ClickBursts bursts={bursts} onExpired={expireBurst} />

          <OrbitingShape radius={3.2} speed={0.4}  offset={0}           color="#F5874A" size={0.18} scrollProgress={scrollProgress} />
          <OrbitingShape radius={3.8} speed={0.3}  offset={Math.PI}     color="#CF4500" size={0.14} scrollProgress={scrollProgress} />
          <OrbitingShape radius={2.9} speed={0.55} offset={Math.PI/2}   color="#ffffff" size={0.10} scrollProgress={scrollProgress} />
          <OrbitingShape radius={4.2} speed={0.25} offset={Math.PI*1.5} color="#FF8A50" size={0.12} scrollProgress={scrollProgress} />

          <EnergyRing radius={2.6} speed={0.5}  tilt={Math.PI/3} scrollProgress={scrollProgress} />
          <EnergyRing radius={3.4} speed={-0.3} tilt={Math.PI/5} scrollProgress={scrollProgress} />
          <EnergyRing radius={4.0} speed={0.2}  tilt={Math.PI/7} scrollProgress={scrollProgress} />

          <ParticleField count={isMobile ? 800 : 2500} scrollProgress={scrollProgress} />
          <Stars radius={25} depth={50} count={isMobile ? 200 : 600} factor={3} saturation={0.1} fade speed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
