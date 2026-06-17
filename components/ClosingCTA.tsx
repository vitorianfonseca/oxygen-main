'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASING = [0.25, 0.1, 0.25, 1] as const

const headlineWords = [
  { text: 'A', color: '#F8F8F8', x: -80, y: 30 },
  { text: 'tua', color: '#F8F8F8', x: 50, y: -60 },
  { text: 'transformação', color: '#F8F8F8', x: -40, y: 70 },
  { text: 'começa', color: '#009FDF', x: 70, y: -30 },
  { text: 'hoje.', color: '#009FDF', x: -60, y: -80 },
]

export default function ClosingCTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="relative w-full bg-black-deep overflow-hidden py-0"
    >
      <div className="w-full h-[1px] bg-[#009FDF]/20" />

      <div className="relative min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 text-center overflow-hidden">
        {/* Giant rotating O₂ background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <motion.span
            className="font-space font-black leading-none"
            style={{
              fontSize: 'clamp(200px, 40vw, 480px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,159,223,0.06)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            O₂
          </motion.span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Label */}
          <motion.p
            className="font-inter text-label uppercase tracking-[0.4em] text-white/30 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASING }}
          >
            PRONTO?
          </motion.p>

          {/* Headline — word convergence */}
          <h2
            className="font-space font-extrabold leading-[1.1] mb-8 flex flex-wrap justify-center gap-x-[0.3em] gap-y-1"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={word.text + i}
                style={{ color: word.color, display: 'inline-block' }}
                initial={{ opacity: 0, x: word.x, y: word.y, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </h2>

          {/* Subtext */}
          <motion.p
            className="font-inter text-base text-white/40 max-w-sm mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            Caldas da Rainha tem um ginásio que finalmente está à altura das tuas ambições.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.7, ease: EASING }}
          >
            <button
              className="group inline-flex items-center gap-3 bg-[#009FDF] text-[#050505] font-space font-bold text-sm tracking-[0.2em] uppercase px-12 py-5 rounded-sm hover:bg-[#80CFEF] transition-colors duration-300"
              data-hover="true"
            >
              Vem treinar connosco
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </button>

            <p className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-white/25">
              Sem fidelização · Sem compromisso · Só resultados
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#009FDF]/20" />
    </section>
  )
}
