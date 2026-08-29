import { Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PageTransition }  from '@/components/layout/PageTransition'
import { MagneticButton }  from '@/components/motion/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ================================================================
// 404 — 3D broken geometry. Monochrome since the black-and-white pass;
// the comment here used to claim lime green.
// ================================================================

function BrokenGeo() {
  const g1 = useRef<THREE.Group>(null)
  const g2 = useRef<THREE.Mesh>(null)
  const g3 = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (g1.current) { g1.current.rotation.x = t*0.35; g1.current.rotation.y = t*0.5; g1.current.position.x = Math.sin(t*0.4)*0.3 }
    if (g2.current) { g2.current.rotation.y = -t*0.4; g2.current.rotation.z = t*0.25; g2.current.position.y = Math.cos(t*0.35)*0.3 }
    if (g3.current) { g3.current.rotation.x = t*0.25; g3.current.rotation.z = -t*0.3; g3.current.position.z = Math.sin(t*0.5)*0.2 }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4,4,4]} color="#ffffff" intensity={4} />
      <pointLight position={[-3,-2,3]} color="#e4e4e4" intensity={2} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <group>
          {/* `ref={g1}` was on both the solid tetrahedron and its wireframe
              overlay. A ref can only hold one node, so the second render
              overwrote the first: the solid shape sat frozen at its offset
              while the wireframe — which has no position of its own — span
              around the origin, drifting away from the twin it's meant to
              outline. Grouping them puts both under one transform, which is
              what the overlay needs anyway. */}
          <group ref={g1} position={[-0.4, 0.3, 0]}>
            <mesh>
              <tetrahedronGeometry args={[1.1, 0]} />
              <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} transparent opacity={0.9} />
            </mesh>
            <mesh>
              <tetrahedronGeometry args={[1.1, 0]} />
              <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.15} />
            </mesh>
          </group>

          <mesh ref={g2} position={[0.6, -0.4, 0.2]}>
            <octahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial color="#e4e4e4" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
          </mesh>

          <mesh ref={g3} position={[-0.2, -0.5, -0.3]}>
            <icosahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial color="#f0f0f0" metalness={0.6} roughness={0.2} transparent opacity={0.6} />
          </mesh>

          {/* Ghost wireframe of original */}
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.04} />
          </mesh>
        </group>
      </Float>
    </>
  )
}

export default function NotFound() {
  const reduced = useReducedMotion()
  return (
    <PageTransition className="pt-24">
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">

        {/* 3D Scene */}
        <div style={{ width:'280px', height:'280px' }} aria-hidden="true">
          {/* frameloop="demand" renders exactly one frame and then stops, so
              under reduced motion the geometry becomes a still composition
              rather than spinning. This catches Float's drift as well as the
              useFrame rotations — both stop when the loop stops, which
              gating them individually would not have achieved. */}
          <Canvas camera={{ position:[0,0,5], fov:45 }} dpr={[1,1.5]}
            frameloop={reduced ? 'demand' : 'always'}
            gl={{ antialias:true, alpha:true }} style={{ background:'transparent' }}>
            <Suspense fallback={null}><BrokenGeo /></Suspense>
          </Canvas>
        </div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, delay:0.2, ease:[0.22,1,0.36,1] }}
          style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>

          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'#ffffff' }}>
            Error 404
          </p>

          <h1 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(3rem,10vw,7rem)', letterSpacing:'-0.05em', color:'#f0f0f0', lineHeight:1 }}>
            Not<br/>Found.
          </h1>

          <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', maxWidth:'320px', lineHeight:1.65 }}>
            The page you're looking for doesn't exist or was moved.
          </p>

          <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
            <MagneticButton strength={0.35}>
              <Link to="/" className="btn-primary">
                <ArrowLeft size={14} /> Back to Home
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.35}>
              <Link to="/projects" className="btn-ghost">View Projects</Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
