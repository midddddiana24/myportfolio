import { Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PageTransition }  from '@/components/layout/PageTransition'
import { MagneticButton }  from '@/components/motion/MagneticButton'

// ================================================================
// 404 — 3D broken geometry, lime green + dark
// ================================================================

function BrokenGeo() {
  const g1 = useRef<THREE.Mesh>(null)
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
      <pointLight position={[4,4,4]} color="#c8f269" intensity={4} />
      <pointLight position={[-3,-2,3]} color="#d4f47a" intensity={2} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <group>
          <mesh ref={g1} position={[-0.4, 0.3, 0]}>
            <tetrahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial color="#c8f269" metalness={0.8} roughness={0.1} transparent opacity={0.9} />
          </mesh>
          <mesh ref={g1}>
            <tetrahedronGeometry args={[1.1, 0]} />
            <meshBasicMaterial wireframe color="#c8f269" transparent opacity={0.15} />
          </mesh>

          <mesh ref={g2} position={[0.6, -0.4, 0.2]}>
            <octahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial color="#d4f47a" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
          </mesh>

          <mesh ref={g3} position={[-0.2, -0.5, -0.3]}>
            <icosahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial color="#f0f0f0" metalness={0.6} roughness={0.2} transparent opacity={0.6} />
          </mesh>

          {/* Ghost wireframe of original */}
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial wireframe color="#c8f269" transparent opacity={0.04} />
          </mesh>
        </group>
      </Float>
    </>
  )
}

export default function NotFound() {
  return (
    <PageTransition className="pt-24">
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">

        {/* 3D Scene */}
        <div style={{ width:'280px', height:'280px' }} aria-hidden="true">
          <Canvas camera={{ position:[0,0,5], fov:45 }} dpr={[1,1.5]}
            gl={{ antialias:true, alpha:true }} style={{ background:'transparent' }}>
            <Suspense fallback={null}><BrokenGeo /></Suspense>
          </Canvas>
        </div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, delay:0.2, ease:[0.22,1,0.36,1] }}
          style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>

          <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'#c8f269' }}>
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
