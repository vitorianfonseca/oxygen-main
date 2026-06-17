'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

function buildOptions(isMobile: boolean) {
  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      color: { value: ['#009FDF', '#007AB5', '#5BC4EC'] },
      links: { enable: true, color: '#009FDF', opacity: 0.12, width: 0.8, distance: isMobile ? 110 : 155 },
      move: {
        enable: true,
        direction: 'top' as const,
        random: true,
        straight: false,
        speed: isMobile ? 0.5 : { min: 0.3, max: 1.0 },
        outModes: { default: 'out' as const },
      },
      number: { value: isMobile ? 45 : 95, density: { enable: true } },
      opacity: {
        value: { min: 0.06, max: 0.55 },
        animation: { enable: true, speed: 0.5, sync: false },
      },
      size: {
        value: { min: 0.5, max: 2.8 },
        animation: { enable: true, speed: 1.5, sync: false },
      },
      shape: { type: 'circle' },
    },
    interactivity: {
      detectsOn: 'canvas' as const,
      events: { onHover: { enable: true, mode: 'repulse' }, resize: { enable: true } },
      modes: {
        repulse: isMobile
          ? { distance: 70, duration: 0.4, factor: 2, speed: 0.8 }
          : { distance: 125, duration: 0.5, factor: 3, speed: 1 },
      },
    },
    detectRetina: true,
  }
}

export default function ParticleField() {
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="oxygen-particles"
      className="absolute inset-0 w-full h-full"
      options={buildOptions(isMobile)}
    />
  )
}
