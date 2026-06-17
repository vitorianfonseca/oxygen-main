'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const marqueeText = [
  'MUSCULAÇÃO',
  'NO PAIN NO GAIN',
  'CARDIO',
  'SEM DESCULPAS',
  'PERSONAL TRAINER',
  'A TUA MELHOR ESCOLHA',
  'AULAS DE GRUPO',
  'CALDAS DA RAINHA',
  'OXYGEN GYM',
  'EVOLUI',
]

const testimonials = [
  { name: 'Maria S.', quote: '"Transformação real em 3 meses. Recomendo sem hesitar."', rotation: '-1deg' },
  { name: 'João F.', quote: '"Os melhores equipamentos que já usei. Staff incrível."', rotation: '0.5deg' },
  { name: 'Ana C.', quote: '"O personal trainer mudou completamente a minha relação com o treino."', rotation: '-0.8deg' },
  { name: 'Rui M.', quote: '"Ambiente motivador. Nunca perco uma sessão."', rotation: '1.2deg' },
  { name: 'Sofia L.', quote: '"As aulas de grupo são viciantes. Resultado garantido."', rotation: '-0.3deg' },
]

function Dot() {
  return <span className="inline-block mx-6 text-[#009FDF]/25 text-xs">·</span>
}

function TextItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap">
      <span className="font-space font-bold tracking-[0.2em] text-[0.73rem] uppercase text-white/45">
        {text}
      </span>
      <Dot />
    </span>
  )
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="inline-flex flex-col flex-none mx-4 bg-surface-1 border border-white/[0.05] px-5 py-4 w-[220px] md:w-[250px] align-top"
      style={{ transform: `rotate(${t.rotation})` }}
    >
      <p className="font-inter text-[0.72rem] text-white/45 leading-relaxed mb-3 line-clamp-3">
        {t.quote}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-[#009FDF]/15 flex items-center justify-center flex-none">
          <span className="font-space font-bold text-[8px] text-[#009FDF]">{t.name[0]}</span>
        </div>
        <span className="font-space font-semibold text-[0.6rem] tracking-wide text-white/35 uppercase">
          {t.name}
        </span>
      </div>
    </div>
  )
}

export default function SocialMarquee() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const doubled = [...marqueeText, ...marqueeText]
  const doubledT = [...testimonials, ...testimonials]

  return (
    <section
      ref={ref}
      className="w-full bg-surface-1 border-y border-white/[0.04] py-12 overflow-hidden"
    >
      {/* Row 1: text items, scrolls left */}
      <motion.div
        className="marquee-row overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="marquee-track animate-marquee-left flex w-max">
          {doubled.map((text, i) => (
            <TextItem key={`${text}-${i}`} text={text} />
          ))}
        </div>
      </motion.div>

      {/* Thin cyan separator */}
      <div className="w-full h-[1px] bg-[#009FDF]/15 my-8" />

      {/* Row 2: testimonial cards, scrolls right */}
      <motion.div
        className="marquee-row overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="marquee-track animate-marquee-right flex w-max items-center">
          {doubledT.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
