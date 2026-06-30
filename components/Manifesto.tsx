'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const manifestoLines = [
  'Não vieste aqui para ser mediano.',
  'Vieste para descobrir o que és capaz.',
  'O Oxygen não é só um ginásio —',
  'é onde te tornas na melhor versão de ti.',
]

const stats = [
  { value: 988, suffix: '+', label: 'publicações', prefix: '' },
  { value: 8000, suffix: '+', label: 'seguidores', prefix: '' },
  { value: 100, suffix: '%', label: 'comprometidos', prefix: '' },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, stat.value, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (v) => setCount(Math.floor(v)),
      })
      return () => controls.stop()
    }
  }, [isInView, stat.value])

  return (
    <motion.div
      ref={ref}
      className="relative border-l-2 border-[#009FDF] bg-surface-1 pl-5 pr-6 py-5"
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="font-space font-black text-[2.2rem] leading-none text-white mb-1">
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </div>
      <div className="font-inter text-[0.72rem] tracking-[0.18em] uppercase text-white/40">
        {stat.label}
      </div>
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-6 h-[1px] bg-white/5" />
      <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-white/5" />
    </motion.div>
  )
}

function ManifestoLine({ line, lineIndex }: { line: string; lineIndex: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const words = line.split(' ')

  return (
    <div ref={ref} className="flex flex-wrap gap-x-[0.35em] gap-y-1">
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${lineIndex}-${wordIndex}`}
          className="font-space text-manifesto font-medium text-white/85 leading-[1.35] inline-block"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            delay: lineIndex * 0.15 + wordIndex * 0.07,
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      {/* Section label */}
      <motion.div
        className="flex items-center gap-4 mb-16 px-8 md:px-16 lg:px-24"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="w-8 h-[1px] bg-[#009FDF]" />
        <span className="font-inter text-label uppercase tracking-[0.3em] text-white/30">
          Manifesto
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-16 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto items-center">

        {/* Left: manifesto text */}
        <div className="relative">
          {/* Decorative quote mark */}
          <motion.div
            className="absolute -top-8 -left-4 font-space font-black text-[120px] text-[#009FDF] leading-none pointer-events-none select-none"
            style={{ opacity: 0.12 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.12, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            &ldquo;
          </motion.div>

          <div className="space-y-2 relative z-10">
            {manifestoLines.map((line, i) => (
              <ManifestoLine key={line} line={line} lineIndex={i} />
            ))}
          </div>
        </div>

        {/* Right: stats */}
        <div className="flex flex-col gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
