import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// ===================================================
// HeroScene — Animated 3D sphere with distortion
// Lightweight, GPU-friendly, respects reduced-motion
// ===================================================

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.06
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.09
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.4}
      floatIntensity={0.8}
    >
      <Sphere
        ref={meshRef}
        args={[1.6, 128, 128]}
      >
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={0.2}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  )
}

function InnerRing() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.15
      ref.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.015, 16, 120]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
    </mesh>
  )
}

function OuterRing() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = -state.clock.elapsedTime * 0.08
      ref.current.rotation.x = -Math.PI / 5 + Math.cos(state.clock.elapsedTime * 0.15) * 0.08
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.2, 0.008, 16, 120]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} />
    </mesh>
  )
}

export function HeroScene() {
  // Respect reduced motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0.05) 70%)',
          }}
        />
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]} // Cap DPR for performance
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        {/* Subtle ambient + directional lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#a78bfa"
        />
        <directionalLight
          position={[-5, -3, 2]}
          intensity={0.5}
          color="#6366f1"
        />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#7c3aed" />

        {/* 3D elements */}
        <AnimatedSphere />
        <InnerRing />
        <OuterRing />

        {/* Subtle star field */}
        <Stars
          radius={30}
          depth={50}
          count={300}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}
