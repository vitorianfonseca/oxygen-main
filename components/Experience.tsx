'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import SkewContainer from '@/components/SkewContainer'

const EASING = [0.25, 0.1, 0.25, 1] as const

const videos = [
  { label: 'O ESPAÇO', id: 1 },
  { label: 'O TREINO', id: 2 },
  { label: 'A COMUNIDADE', id: 3 },
]

const features = [
  { num: '01', title: 'Ambiente Premium', description: 'Espaço amplo, iluminação cuidada, temperatura controlada.' },
  { num: '02', title: 'Equipamento de Ponta', description: 'Máquinas das melhores marcas, revisadas e atualizadas.' },
  { num: '03', title: 'Comunidade Real', description: 'Pessoas que se motivam mutuamente. Sem julgamentos.' },
  { num: '04', title: 'Resultados Comprovados', description: 'Metodologias testadas que entregam transformações reais.' },
]

/* Premium: subtle blur + fade + small slide */
const cardVariants = {
  enter: (d: number) => ({
    x: d > 0 ? 32 : -32,
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (d: number) => ({
    x: d > 0 ? -32 : 32,
    opacity: 0,
    filter: 'blur(6px)',
  }),
}

const cardTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as number[],
}

function SonarRing({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border border-[#009FDF]/20"
      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
      transition={{ delay, duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const isRightInView = useInView(rightRef, { once: true, amount: 0.3 })

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir: 1 | -1) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + videos.length) % videos.length)
  }

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,159,223,0.03) 0%, transparent 65%)' }}
      />

      <SkewContainer>
      <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left: carousel */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
          animate={isSectionInView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: EASING }}
        >
          <div className="relative h-[420px] w-full max-w-[340px] mx-auto overflow-hidden">
            {/* Ghost stack cards */}
            <div
              className="absolute inset-0 bg-[#111] border border-white/[0.04]"
              style={{ transform: 'translate(10px, 10px) scale(0.97)', opacity: 0.45, zIndex: 0 }}
            />
            <div
              className="absolute inset-0 bg-[#111] border border-white/[0.03]"
              style={{ transform: 'translate(20px, 20px) scale(0.94)', opacity: 0.25, zIndex: 0 }}
            />

            {/* Active card */}
            <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={cardTransition}
                  className="absolute inset-0 bg-surface-1 border border-white/[0.06] flex flex-col items-center justify-center"
                >
                  {/* Ambient breathing gradients */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 30% 35%, rgba(0,159,223,0.09) 0%, transparent 60%)' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 72% 68%, rgba(0,159,223,0.06) 0%, transparent 50%)' }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-10 h-[1px] bg-[#009FDF]/50" />
                  <div className="absolute top-0 left-0 w-[1px] h-10 bg-[#009FDF]/50" />
                  <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-[#009FDF]/50" />
                  <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-[#009FDF]/50" />

                  {/* Slide counter */}
                  <div className="absolute top-5 right-5 font-space font-black text-[0.6rem] tracking-[0.2em] text-white/15 select-none">
                    {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(videos.length).padStart(2, '0')}
                  </div>

                  {/* Sonar play */}
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <SonarRing delay={0} />
                    <SonarRing delay={0.4} />
                    <SonarRing delay={0.8} />
                    <motion.button
                      className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-full border border-[#009FDF]/60 flex items-center justify-center bg-[#009FDF]/10 hover:bg-[#009FDF]/20 transition-colors duration-300"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      data-hover="true"
                    >
                      <Play size={22} className="text-[#009FDF] ml-1" />
                    </motion.button>
                  </div>

                  {/* Label */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`label-${current}`}
                      className="absolute bottom-5 font-inter text-label uppercase tracking-[0.3em] text-white/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {videos[current].label}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 max-w-[340px] mx-auto w-full">
            <button
              onClick={() => go(-1)}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#009FDF] hover:border-[#009FDF]/30 transition-all duration-300"
              data-hover="true"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  data-hover="true"
                >
                  <motion.div
                    className="rounded-full bg-[#009FDF]"
                    animate={{ width: i === current ? 22 : 6, opacity: i === current ? 1 : 0.2 }}
                    style={{ height: 5 }}
                    transition={{ duration: 0.35, ease: EASING }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#009FDF] hover:border-[#009FDF]/30 transition-all duration-300"
              data-hover="true"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Right: content */}
        <motion.div
          ref={rightRef}
          className="flex flex-col justify-center space-y-10"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          animate={isRightInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: EASING }}
        >
          <div>
            <motion.p
              className="font-inter text-label uppercase tracking-[0.3em] text-white/30 mb-3"
              initial={{ opacity: 0 }}
              animate={isRightInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Sobre nós
            </motion.p>
            <motion.h2
              className="font-space font-black text-white leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={isRightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: EASING }}
            >
              A experiência<br />
              <span className="text-[#009FDF]">Oxygen</span>
            </motion.h2>
          </div>

          <motion.p
            className="font-inter text-base text-white/45 leading-relaxed max-w-md"
            initial={{ opacity: 0 }}
            animate={isRightInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            Mais do que um ginásio, o Oxygen é um ecossistema de transformação.
            Cada detalhe foi pensado para que o único limite que encontres seja o da tua própria ambição.
          </motion.p>

          <div>
            {features.map((feat, i) => (
              <motion.div
                key={feat.num}
                className="group flex items-start gap-5 py-5 border-b border-white/[0.05] last:border-b-0"
                initial={{ opacity: 0, x: 20 }}
                animate={isRightInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASING }}
              >
                <span className="font-space font-black text-sm text-[#009FDF]/60 pt-0.5 min-w-[2rem]">
                  {feat.num}
                </span>
                <div>
                  <h4 className="font-space font-semibold text-sm text-white mb-1 group-hover:text-[#009FDF] transition-colors duration-300">
                    {feat.title}
                  </h4>
                  <p className="font-inter text-sm text-white/40 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      </SkewContainer>
    </section>
  )
}
