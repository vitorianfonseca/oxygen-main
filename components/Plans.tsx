'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import SkewContainer from '@/components/SkewContainer'

const EASING = [0.25, 0.1, 0.25, 1] as const

const plans = [
  {
    id: 'mensal',
    name: 'Mensal',
    price: '—',
    period: '/mês',
    description: 'Começa sem compromisso',
    featured: false,
    features: [
      'Acesso à sala de musculação',
      'Cardio livre',
      'Balneários premium',
      'App de treino',
    ],
    cta: 'Começar',
  },
  {
    id: 'trimestral',
    name: 'Trimestral',
    price: '—',
    period: '/mês',
    description: 'O mais escolhido',
    featured: true,
    badge: 'MAIS POPULAR',
    features: [
      'Tudo do Mensal',
      '2 aulas de grupo por semana',
      'Avaliação física inicial',
      'Plano de treino personalizado',
      'Desconto em suplementação',
    ],
    cta: 'Escolher Trimestral',
  },
  {
    id: 'anual',
    name: 'Anual',
    price: '—',
    period: '/mês',
    description: 'O melhor investimento',
    featured: false,
    features: [
      'Tudo do Trimestral',
      'Aulas de grupo ilimitadas',
      'Sessão mensal com Personal',
      'Consulta de nutrição incluída',
    ],
    cta: 'Começar Anual',
  },
]

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  if (plan.featured) {
    return (
      <motion.div
        ref={ref}
        className="relative"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.15, duration: 0.75, ease: EASING }}
        style={{ zIndex: 2 }}
      >
        {/* Rotating border wrapper */}
        <div
          className="featured-border rounded-xl p-[1px]"
          style={{ transform: 'translateY(-16px)' }}
        >
          <div className="relative bg-[#141414] rounded-[11px] p-7 md:p-9 flex flex-col gap-6 h-full">
            {/* Glow pulse — fires once on entry */}
            {isInView && (
              <motion.div
                className="absolute inset-0 rounded-[11px] pointer-events-none"
                initial={{ boxShadow: '0 0 0px rgba(0,159,223,0)' }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(0,159,223,0)',
                    '0 0 80px rgba(0,159,223,0.4)',
                    '0 0 20px rgba(0,159,223,0.08)',
                  ],
                }}
                transition={{ delay: 0.6, duration: 1.4, ease: 'easeOut' }}
              />
            )}
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="font-space font-bold text-[0.6rem] tracking-[0.2em] uppercase bg-[#009FDF] text-[#050505] px-4 py-1.5 rounded-full">
                {plan.badge}
              </span>
            </div>

            {/* Plan header */}
            <div>
              <p className="font-inter text-label uppercase tracking-[0.25em] text-[#009FDF]/60 mb-2">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-space font-black text-[3rem] text-[#F8F8F8] leading-none">
                  {plan.price}€
                </span>
                <span className="font-inter text-sm text-white/40">{plan.period}</span>
              </div>
              <p className="font-inter text-xs text-white/35 mt-1">{plan.description}</p>
            </div>

            <div className="h-[1px] bg-white/[0.06]" />

            {/* Features */}
            <ul className="space-y-3 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full border border-[#009FDF]/50 flex items-center justify-center flex-none mt-0.5">
                    <Check size={9} className="text-[#009FDF]" />
                  </div>
                  <span className="font-inter text-sm text-white/65">{feat}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className="group w-full py-4 bg-[#009FDF] text-[#050505] font-space font-bold text-sm tracking-[0.12em] uppercase rounded-sm flex items-center justify-center gap-2 hover:bg-[#80CFEF] transition-colors duration-300"
              data-hover="true"
            >
              {plan.cta}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="relative bg-surface-1 border border-white/[0.05] rounded-xl p-7 flex flex-col gap-6 h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ borderColor: 'rgba(0,159,223,0.12)', transition: { duration: 0.3 } }}
    >
      {/* Plan header */}
      <div>
        <p className="font-inter text-label uppercase tracking-[0.25em] text-white/30 mb-2">
          {plan.name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="font-space font-black text-[2.5rem] text-white leading-none">
            {plan.price}€
          </span>
          <span className="font-inter text-sm text-white/40">{plan.period}</span>
        </div>
        <p className="font-inter text-xs text-white/30 mt-1">{plan.description}</p>
      </div>

      <div className="h-[1px] bg-white/[0.05]" />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full border border-white/15 flex items-center justify-center flex-none mt-0.5">
              <Check size={9} className="text-white/40" />
            </div>
            <span className="font-inter text-sm text-white/45">{feat}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className="group w-full py-4 border border-white/10 text-white/70 font-space font-semibold text-sm tracking-[0.12em] uppercase rounded-sm flex items-center justify-center gap-2 hover:border-[#009FDF]/30 hover:text-[#009FDF] transition-all duration-300"
        data-hover="true"
      >
        {plan.cta}
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </motion.div>
  )
}

export default function Plans() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })

  return (
    <section
      id="planos"
      ref={sectionRef}
      className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,159,223,0.04) 0%, transparent 55%)',
        }}
      />

      <SkewContainer>
      <div className="max-w-6xl mx-auto px-8 md:px-16">

        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-20 text-center">
          <motion.h2
            className="font-space font-black leading-[0.9] text-white"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASING }}
          >
            INVESTE
          </motion.h2>
          <motion.p
            className="font-space font-black text-display-sm text-[#009FDF] italic"
            initial={{ opacity: 0, y: 16 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: EASING }}
          >
            em ti.
          </motion.p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center font-inter text-label text-white/25 mt-10 tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Sem fidelização · Valores sob consulta · Condições especiais disponíveis
        </motion.p>
      </div>
      </SkewContainer>
    </section>
  )
}
