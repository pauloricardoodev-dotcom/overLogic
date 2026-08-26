import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import './HeroParticles.css'

function ParticleScene() {
  return (
    <>
      <Sparkles
        count={100}
        scale={[22, 12, 8]}
        size={2.5}
        speed={0.15}
        opacity={0.45}
        color="#ff3333"
      />
      <Sparkles
        count={60}
        scale={[18, 10, 6]}
        size={1.2}
        speed={0.08}
        opacity={0.25}
        color="#ff6666"
      />
      <Sparkles
        count={30}
        scale={[24, 14, 10]}
        size={4}
        speed={0.05}
        opacity={0.15}
        color="#ff0000"
      />
    </>
  )
}

export function HeroParticles() {
  return (
    <div className="hero-particles" aria-hidden="true">
      <Canvas
        className="hero-particles__canvas"
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <ParticleScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
