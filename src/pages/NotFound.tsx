import { Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/layout/PageTransition'

// ================================================================
// 404 Page — 3D broken/exploded geometry
// ================================================================

function BrokenGeometry() {
  const g1 = useRef<THREE.Mesh>(null)
  const g2 = useRef<THREE.Mesh>(null)
  const g3 = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (g1.current) { g1.current.rotation.x = t*0.4; g1.current.rotation.y = t*0.6; g1.current.position.x = Math.sin(t*0.5)*0.3 }
    if (g2.current) { g2.current.rotation.y = -t*0.5; g2.current.rotation.z = t*0.3; g2.current.position.y = Math.cos(t*0.4)*0.3 }
    if (g3.current) { g3.current.rotation.x = t*0.3; g3.current.rotation.z = -t*0.4; g3.current.position.z = Math.sin(t*0.6)*0.2 }
  })

  const mat = (color: string, opacity = 0.9) => (
    <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} transparent opacity={opacity} />
  )

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group>
        {/* Fragment 1 — large piece */}
        <mesh ref={g1} position={[-0.4, 0.3, 0]}>
          <tetrahedronGeometry args={[1.1, 0]} />
          {mat('#CF4500')}
        </mesh>
        {/* Fragment 2 — medium */}
        <mesh ref={g2} position={[0.6, -0.4, 0.2]}>
          <octahedronGeometry args={[0.65, 0]} />
          {mat('#E8702A', 0.8)}
        </mesh>
        {/* Fragment 3 — small */}
        <mesh ref={g3} position={[-0.2, -0.5, -0.3]}>
          <icosahedronGeometry args={[0.38, 0]} />
          {mat('#F5874A', 0.75)}
        </mesh>
        {/* Wireframe ghost of original */}
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial wireframe color="#CF4500" transparent opacity={0.06} />
        </mesh>
      </group>
    </Float>
  )
}

function Scene404() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} color="#CF4500" intensity={4} />
      <pointLight position={[-3, -2, 3]} color="#F5874A" intensity={2.5} />
      <BrokenGeometry />
    </>
  )
}

export default function NotFound() {
  return (
    <PageTransition className="pt-24">
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
        {/* 3D scene */}
        <div style={{ width: '280px', height: '280px' }} aria-hidden="true">
          <Canvas camera={{ position:[0,0,5], fov:45 }} dpr={[1,1.5]}
            gl={{ antialias:true, alpha:true }} style={{ background:'transparent' }}>
            <Suspense fallback={null}><Scene404 /></Suspense>
          </Canvas>
        </div>

        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.2 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <p style={{ fontFamily:"'Geist Mono', monospace", fontSize:'0.6875rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent-h)' }}>
            Error 404
          </p>
          <h1 style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'clamp(2.5rem,8vw,5rem)', letterSpacing:'-0.05em', color:'var(--text-1)', lineHeight:1 }}>
            Page Not Found
          </h1>
          <p style={{ fontFamily:"'Geist', sans-serif", fontSize:'1rem', color:'var(--text-2)', maxWidth:'380px', lineHeight:1.6 }}>
            Looks like something broke apart. The page you're looking for doesn't exist or was moved.
          </p>
          <div className="flex gap-3 mt-2">
            <Link to="/" className="btn-primary"><ArrowLeft size={14}/>Back to Home</Link>
            <Link to="/projects" className="btn-ghost">View Projects</Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
