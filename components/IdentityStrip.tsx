'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASING = [0.25, 0.1, 0.25, 1] as const

function getGymStatus() {
  const now = new Date()
  const day = now.getDay()
  const h = now.getHours()
  const m = now.getMinutes()
  const time = h * 60 + m

  if (day === 0) return { open: false, label: 'FECHADO HOJE' }
  if (day === 6) return { open: time >= 480 && time < 1200, label: time < 480 ? 'ABRE ÀS 8H' : time >= 1200 ? 'FECHADO' : 'ABERTO AGORA' }
  return { open: time >= 360 && time < 1320, label: time < 360 ? 'ABRE ÀS 6H' : time >= 1320 ? 'FECHADO' : 'ABERTO AGORA' }
}

const segments = [
  { text: 'A TUA MELHOR ESCOLHA', dir: -1 },
  { text: 'CALDAS DA RAINHA', dir: 1 },
  { text: 'OXYGEN GYM & FITNESS', dir: -1 },
]

export default function IdentityStrip() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    setStatus(getGymStatus())
    const interval = setInterval(() => setStatus(getGymStatus()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id="identity" className="relative w-full bg-surface-1 border-y border-white/[0.04] overflow-hidden scan-container">
      <div className="scan-line" />

      <div
        className="absolute inset-0 flex items-center pointer-events-none select-none"
        style={{ paddingLeft: '2%' }}
      >
        <span
          className="font-space font-black text-outline leading-none"
          style={{ fontSize: 'clamp(120px, 18vw, 200px)', opacity: 0.04, color: 'transparent', WebkitTextStroke: '1px rgba(0,159,223,0.3)' }}
        >
          O₂
        </span>
      </div>

      <div ref={ref} className="relative z-10 flex items-center justify-center gap-4 md:gap-8 py-5 px-6" style={{ perspective: 800 }}>
        <span className="hidden md:block w-1 h-1 rounded-full bg-[#009FDF]/40" />

        <p className="font-space font-semibold tracking-[0.25em] uppercase text-[0.72rem] md:text-[0.8rem] text-white/70 text-center flex items-center gap-2 flex-wrap justify-center">
          {segments.map((seg, i) => (
            <span key={seg.text} className="inline-flex items-center gap-2">
              <motion.span
                className="text-[#009FDF]/60"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.18, duration: 0.3 }}
              >
                ·
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateY: seg.dir * 90, x: seg.dir * 20 }}
                animate={isInView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
                transition={{ delay: i * 0.18 + 0.05, duration: 0.7, ease: EASING }}
                style={{ display: 'inline-block' }}
              >
                {seg.text}
              </motion.span>
            </span>
          ))}
          <motion.span
            className="text-[#009FDF]/60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: segments.length * 0.18, duration: 0.3 }}
          >
            ·
          </motion.span>
        </p>

        {status && (
          <motion.div
            className="hidden md:flex items-center gap-2 ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: status.open ? '#009FDF' : 'var(--white-muted)' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-inter text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: status.open ? '#009FDF' : 'var(--white-muted)' }}>
              {status.label}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
