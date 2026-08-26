import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Grid } from '@react-three/drei'
import {
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  type Group,
} from 'three'
import './HeroCube.css'

function createGlowTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  )
  gradient.addColorStop(0, 'rgba(255, 80, 80, 1)')
  gradient.addColorStop(0.12, 'rgba(255, 30, 30, 0.7)')
  gradient.addColorStop(0.35, 'rgba(220, 0, 0, 0.22)')
  gradient.addColorStop(0.65, 'rgba(160, 0, 0, 0.06)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function FloatingCube() {
  const groupRef = useRef<Group>(null)
  const currentRotation = useRef({ x: 0.35, y: 0.45 })
  const floatOffset = useRef(0)

  useFrame((state) => {
    if (!groupRef.current) return

    const { pointer, clock } = state
    const targetX = 0.35 + pointer.y * 0.25
    const targetY = 0.45 + pointer.x * 0.35
    const lerpFactor = 0.04

    currentRotation.current.x += (targetX - currentRotation.current.x) * lerpFactor
    currentRotation.current.y += (targetY - currentRotation.current.y) * lerpFactor

    floatOffset.current = Math.sin(clock.elapsedTime * 0.8) * 0.08

    groupRef.current.rotation.x = currentRotation.current.x
    groupRef.current.rotation.y =
      currentRotation.current.y + Math.sin(clock.elapsedTime * 0.3) * 0.03
    groupRef.current.position.y = floatOffset.current
  })

  return (
    <group ref={groupRef} rotation={[0.35, 0.45, 0]}>
      {/* Núcleo escuro interno */}
      <mesh>
        <boxGeometry args={[1.45, 1.45, 1.45]} />
        <meshPhysicalMaterial
          color="#030000"
          metalness={0.85}
          roughness={0.45}
          emissive="#0d0000"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Casca externa — vermelho escuro com bordas brilhantes */}
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshPhysicalMaterial
          color="#7a0000"
          metalness={0.5}
          roughness={0.08}
          emissive="#ff0000"
          emissiveIntensity={0.45}
          transparent
          opacity={0.82}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.02}
          side={DoubleSide}
        />
        <Edges threshold={15} color="#ff6666" linewidth={2} />
      </mesh>

      {/* Luz emitida pelo cubo */}
      <pointLight
        position={[0, -0.8, 0]}
        color="#ff1a1a"
        intensity={6}
        distance={4.5}
        decay={2}
      />
      <pointLight
        position={[0, 0, 0]}
        color="#ff3333"
        intensity={2.5}
        distance={3.5}
        decay={2}
      />
    </group>
  )
}

function EmittedLightGlow() {
  const glowTexture = useMemo(() => createGlowTexture(), [])

  return (
    <group position={[0, -1.78, 0]}>
      {/* Halo principal no chão — luz emitida pelo cubo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={1}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Halo secundário mais amplo e suave */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.45}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function FloorGrid() {
  return (
    <Grid
      position={[0, -1.8, 0]}
      args={[12, 12]}
      cellSize={0.5}
      cellThickness={0.4}
      cellColor="#1a1a1a"
      sectionSize={2}
      sectionThickness={0.8}
      sectionColor="#2a0a0a"
      fadeDistance={14}
      fadeStrength={1.5}
      infiniteGrid
    />
  )
}

function CubeScene() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 5, 5]} intensity={0.2} color="#ffffff" />
      <directionalLight position={[-2, 3, -1]} intensity={0.08} color="#ff2222" />

      <FloatingCube />
      <FloorGrid />
      <EmittedLightGlow />
    </>
  )
}

export function HeroCube() {
  return (
    <div className="hero-cube">
      <div className="hero-cube__glow" aria-hidden="true" />
      <Canvas
        className="hero-cube__canvas"
        camera={{ position: [0, 0.5, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CubeScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
