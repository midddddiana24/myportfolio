import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// ================================================================
// FloatingShape — Lightweight accent 3D shape used between sections
// ================================================================

type ShapeType = 'octahedron' | 'icosahedron' | 'tetrahedron' | 'torus'

function Shape({ type, color }: { type: ShapeType; color: string }) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!mesh.current) return
    mesh.current.rotation.x = s.clock.elapsedTime * 0.4
    mesh.current.rotation.y = s.clock.elapsedTime * 0.6
  })

  const geom = () => {
    switch (type) {
      case 'octahedron':  return <octahedronGeometry args={[1, 0]} />
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />
      case 'tetrahedron': return <tetrahedronGeometry args={[1, 0]} />
      case 'torus':       return <torusGeometry args={[0.7, 0.28, 16, 50]} />
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={mesh}>
        {geom()}
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.1}
          transparent opacity={0.85} />
      </mesh>
      <mesh>
        {geom()}
        <meshBasicMaterial wireframe color={color} transparent opacity={0.18} />
      </mesh>
    </Float>
  )
}

interface FloatingShapeProps {
  type?: ShapeType
  color?: string
  size?: number   // canvas size in px
  className?: string
}

export function FloatingShape({
  type = 'octahedron',
  color = '#ffffff',
  size = 120,
  className,
}: FloatingShapeProps) {
  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return null

  return (
    <div
      className={className}
      style={{ width: size, height: size, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} color={color} intensity={3} />
          <pointLight position={[-2, -2, 2]} color="#ffffff" intensity={1} />
          <Shape type={type} color={color} />
        </Suspense>
      </Canvas>
    </div>
  )
}
