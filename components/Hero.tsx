'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black-deep" />,
})

const EASING = [0.25, 0.1, 0.25, 1] as const

const heroWords = [
  { text: 'RESPIRA.', color: 'var(--white)', delay: 0.5 },
  { text: 'TRANSPIRA.', color: 'var(--white)', delay: 0.7 },
  { text: 'EVOLUI.', color: null, shimmer: true, delay: 0.9 },
]

export default function Hero() {
  const [scrollVisible, setScrollVisible] = useState(true)
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const particleY = useTransform(scrollY, [0, 600], [0, -80])
  const textY = useTransform(scrollY, [0, 600], [0, -160])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrollVisible(v < 100))
    return () => unsub()
  }, [scrollY])

  const scrollToNext = () => {
    document.getElementById('identity')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-black-deep overflow-hidden flex flex-col items-center justify-center">

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
        src="/images/trainers/full_horizontal.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Particles */}
      <motion.div className="absolute inset-0 z-0" style={{ y: particleY }}>
        <ParticleField />
      </motion.div>

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none hero-vignette" />

      {/* Hero Content */}
      <motion.div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto" style={{ y: textY }}>

        {/* Location label */}
        <motion.p
          className="font-inter text-label uppercase tracking-[0.3em] text-white/40 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: EASING }}
        >
          Caldas da Rainha
        </motion.p>

        {/* Hero headline */}
        <h1 className="font-space font-black leading-none mb-6" style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}>
          {heroWords.map((word) => (
            <motion.span
              key={word.text}
              className="block"
              initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: word.delay, duration: 0.8, ease: EASING }}
            >
              {word.shimmer ? (
                <span className="text-shimmer">{word.text}</span>
              ) : (
                <span style={{ color: word.color ?? undefined }}>{word.text}</span>
              )}
            </motion.span>
          ))}
        </h1>

        {/* Cyan divider line */}
        <motion.div
          className="h-[1px] bg-[#009FDF] mb-6"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASING }}
        />

        {/* Subtext */}
        <motion.p
          className="font-inter text-base text-white/40 max-w-sm mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          O ginásio que transforma. Não prometemos fácil — prometemos real.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7, ease: EASING }}
        >
          {/* Primary CTA */}
          <button
            className="btn-trace relative font-space font-semibold text-sm tracking-[0.15em] uppercase px-8 py-4 bg-[#009FDF] text-[#050505] rounded-sm overflow-hidden group"
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            data-hover="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
              <rect
                x="1" y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="2"
              />
            </svg>
            <span className="relative z-10">Começa agora</span>
          </button>

          {/* Ghost CTA */}
          <button
            className="group flex items-center gap-3 font-space font-medium text-sm tracking-[0.12em] uppercase text-white/60 hover:text-white/90 transition-colors duration-300 border border-white/10 hover:border-white/20 px-8 py-4 rounded-sm"
            onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
            data-hover="true"
          >
            Conhece-nos
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 group"
        animate={{ opacity: scrollVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        onClick={scrollToNext}
        data-hover="true"
      >
        <span
          className="font-inter text-[0.6rem] tracking-[0.3em] uppercase text-white/30 rotate-0"
          style={{ writingMode: 'horizontal-tb' }}
        >
          SCROLL
        </span>
        <motion.div
          className="w-[1px] bg-gradient-to-b from-white/30 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ delay: 1.8, duration: 0.8, ease: EASING }}
        />
        <motion.div
          className="w-[1px] h-2 bg-[#009FDF]/60"
          animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </section>
  )
}
