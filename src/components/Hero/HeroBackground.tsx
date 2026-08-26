import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import './HeroBackground.css'

const PARTICLE_COUNT = 55

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453
  return x - Math.floor(x)
}

export function HeroBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: seededRandom(i * 3 + 1) * 100,
        y: seededRandom(i * 3 + 2) * 100,
        size: 1.5 + seededRandom(i * 3 + 3) * 2.5,
        delay: seededRandom(i * 7) * 6,
        duration: 3 + seededRandom(i * 11) * 4,
        opacity: 0.15 + seededRandom(i * 13) * 0.35,
      })),
    [],
  )

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__glow hero-bg__glow--left" />
      <div className="hero-bg__glow hero-bg__glow--center" />
      <div className="hero-bg__glow hero-bg__glow--right" />
      <div className="hero-bg__glow hero-bg__glow--bottom" />

      <div className="hero-bg__grid" />

      <svg className="hero-bg__wireframe hero-bg__wireframe--1" viewBox="0 0 200 200" fill="none">
        <path
          d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z"
          stroke="rgba(232,0,0,0.15)"
          strokeWidth="0.5"
        />
        <path
          d="M100 20 L100 180 M20 60 L180 60 M180 140 L20 140 M20 60 L180 140 M180 60 L20 140"
          stroke="rgba(232,0,0,0.08)"
          strokeWidth="0.5"
        />
      </svg>

      <svg className="hero-bg__wireframe hero-bg__wireframe--2" viewBox="0 0 160 160" fill="none">
        <rect
          x="30"
          y="30"
          width="100"
          height="100"
          stroke="rgba(232,0,0,0.12)"
          strokeWidth="0.5"
          transform="rotate(15 80 80)"
        />
        <line x1="30" y1="30" x2="80" y2="10" stroke="rgba(232,0,0,0.1)" strokeWidth="0.5" />
        <line x1="130" y1="30" x2="80" y2="10" stroke="rgba(232,0,0,0.1)" strokeWidth="0.5" />
        <line x1="130" y1="130" x2="80" y2="150" stroke="rgba(232,0,0,0.1)" strokeWidth="0.5" />
        <line x1="30" y1="130" x2="80" y2="150" stroke="rgba(232,0,0,0.1)" strokeWidth="0.5" />
      </svg>

      <svg className="hero-bg__wireframe hero-bg__wireframe--3" viewBox="0 0 120 120" fill="none">
        <polygon
          points="60,10 110,35 110,85 60,110 10,85 10,35"
          stroke="rgba(232,0,0,0.1)"
          strokeWidth="0.5"
        />
      </svg>

      <svg className="hero-bg__wireframe hero-bg__wireframe--4" viewBox="0 0 140 140" fill="none">
        <rect
          x="25"
          y="25"
          width="90"
          height="90"
          stroke="rgba(232,0,0,0.08)"
          strokeWidth="0.5"
          transform="rotate(-12 70 70)"
        />
      </svg>

      <div className="hero-bg__particles">
        {particles.map((p, i) => (
          <span
            key={i}
            className="hero-bg__particle"
            style={{
              '--x': `${p.x}%`,
              '--y': `${p.y}%`,
              '--size': `${p.size}px`,
              '--delay': `${p.delay}s`,
              '--duration': `${p.duration}s`,
              '--opacity': p.opacity,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="hero-bg__lines">
        <div className="hero-bg__line hero-bg__line--1" />
        <div className="hero-bg__line hero-bg__line--2" />
        <div className="hero-bg__line hero-bg__line--3" />
        <div className="hero-bg__line hero-bg__line--4" />
      </div>
    </div>
  )
}
