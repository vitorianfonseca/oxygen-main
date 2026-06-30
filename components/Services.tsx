'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Dumbbell, Heart, Users, User, Apple, ShowerHead } from 'lucide-react'


const EASING = [0.25, 0.1, 0.25, 1] as const

const services = [
  {
    num: '01',
    icon: Dumbbell,
    title: 'Musculação',
    description: 'Equipamento de ponta para trabalhar cada grupo muscular com precisão. Evolui ao teu ritmo.',
    span: 'col-span-1 md:col-span-2 lg:col-span-6', // Ocupa 50% em desktop
  },
  {
    num: '02',
    icon: Heart,
    title: 'Cardio',
    description: 'Máquinas cardiovasculares de última geração. Corrida, bicicleta, elíptica — o teu coração agradece.',
    span: 'col-span-1 md:col-span-2 lg:col-span-6', // Ocupa 50% em desktop
  },
  {
    num: '03',
    icon: Users,
    title: 'Aulas de Grupo',
    description: 'Treina rodeado de energia e motivação. Cycling, Pilates, Zumba, GAP e muito mais.',
    span: 'col-span-1 md:col-span-2 lg:col-span-5', // Ocupa ~40% em desktop (cartão mais pequeno)
  },
  {
    num: '04',
    icon: User,
    title: 'Personal Trainer',
    description: 'Acompanhamento personalizado por profissionais certificados que conhecem o teu corpo e objetivos.',
    span: 'col-span-1 md:col-span-2 lg:col-span-7', // Ocupa ~60% em desktop (preenche o resto da linha)
  },
  /*   {
      num: '05',
      icon: Apple,
      title: 'Nutrição Desportiva',
      description: 'Planos nutricionais adaptados ao teu treino. Porque o resultado começa na mesa.',
      span: 'col-span-1',
    }, */
  /*   {
      num: '05',
      icon: ShowerHead,
      title: 'Vestiários Premium',
      description: 'Balneários amplos, modernos e equipados. A tua experiência não termina no treino.',
      span: 'col-span-1',
    }, */
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const Icon = service.icon

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  const isActive = hovered || isTouch

  return (
    <motion.div
      ref={ref}
      className={`service-card group relative bg-surface-2 p-5 flex flex-col gap-4 h-full min-h-[160px] border border-white/[0.04] ${service.span}`}
      initial={{ opacity: 0, y: 30, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: EASING,
      }}
      style={{ transformPerspective: 800 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Top row: category label + number */}
      <div className="flex items-center justify-between">
        <span className="font-inter text-label uppercase tracking-[0.2em] text-white/25">
          Serviço
        </span>
        <span className="font-space font-black text-[1.8rem] text-white/[0.06] leading-none select-none">
          {service.num}
        </span>
      </div>

      {/* Icon */}
      <Icon
        size={28}
        className="transition-colors duration-300"
        style={{ color: isActive ? '#009FDF' : 'var(--white-muted)' }}
      />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <h3 className="font-space font-semibold text-lg text-white tracking-tight">
          {service.title}
        </h3>
        <p className="font-inter text-sm text-white/40 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom animated line */}
      <motion.div
        className="h-[1px] bg-[#009FDF] mt-auto"
        animate={{ width: isActive ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASING }}
      />

      {/* Subtle hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isActive
            ? 'radial-gradient(ellipse at top left, rgba(0,159,223,0.04) 0%, rgba(0,0,0,0) 60%)'
            : 'radial-gradient(ellipse at top left, rgba(0,159,223,0) 0%, rgba(0,0,0,0) 60%)',
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current
    if (!el) return
    const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth ?? 0
    setActiveCard(Math.round(el.scrollLeft / (cardWidth + 12)))
  }

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Title */}
        <div ref={titleRef} className="mb-8">
          <motion.p
            className="font-inter text-label uppercase tracking-[0.3em] text-white/30 mb-2"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            O QUE
          </motion.p>
          <div
            className="font-space font-black leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
          >
            {'RESPIRAMOS'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.05 + 0.2,
                  duration: 0.5,
                  ease: EASING,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Cards grid — desktop: Bento Box adaptativo */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-8 pl-8 pr-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {services.map((service, i) => (
              <div key={service.num} className="flex-none w-[65vw] snap-start">
                <ServiceCard service={service} index={i} />
              </div>
            ))}
            <div className="flex-none w-4" />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {services.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full bg-[#009FDF]"
                animate={{ width: i === activeCard ? 18 : 5, opacity: i === activeCard ? 1 : 0.2 }}
                style={{ height: 4 }}
                transition={{ duration: 0.3, ease: EASING }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
