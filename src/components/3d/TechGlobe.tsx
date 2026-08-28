import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

// ================================================================
// TechGlobe — 3D sphere with tech names orbiting in 3D space
// ================================================================

const TECH_ITEMS = [
  'React', 'Laravel', 'Node.js', 'TypeScript', 'Vue.js',
  'PostgreSQL', 'Docker', 'MongoDB', 'Next.js', 'PHP',
  'Supabase', 'Tailwind', 'Git', 'Kali Linux', 'MySQL',
  'Express', 'Firebase', 'Postman', 'OpenAI', 'Figma',
]

function PointOnSphere(i: number, total: number): [number, number, number] {
  const phi   = Math.acos(1 - (2 * (i + 0.5)) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * i
  const r = 2.8
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

function TechLabel({ text, position }: { text: string; position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ camera }) => {
    if (ref.current) ref.current.quaternion.copy(camera.quaternion)
  })
  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.18}
        color="#F5F3EE"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {text}
      </Text>
    </group>
  )
}

function Wireframe() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (mesh.current) {
      mesh.current.rotation.y = s.clock.elapsedTime * 0.08
      mesh.current.rotation.x = s.clock.elapsedTime * 0.04
    }
  })
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2.75, 18, 14]} />
      <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.08} />
    </mesh>
  )
}

function GlobeScene() {
  const group = useRef<THREE.Group>(null)
  const positions = useMemo(() =>
    TECH_ITEMS.map((_, i) => PointOnSphere(i, TECH_ITEMS.length)), [])

  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.12
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#ffffff" intensity={3} />
      <pointLight position={[-4, -3, 4]} color="#e4e4e4" intensity={2} />

      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={group}>
          <Wireframe />
          {TECH_ITEMS.map((tech, i) => (
            <TechLabel key={tech} text={tech} position={positions[i]} />
          ))}
          {/* Dot markers */}
          {positions.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
            </mesh>
          ))}
        </group>
      </Float>
    </>
  )
}

export function TechGlobe({ size = 500 }: { size?: number }) {
  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  if (prefersReduced) return null

  return (
    <div style={{ width: '100%', height: isMobile ? 300 : size }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
