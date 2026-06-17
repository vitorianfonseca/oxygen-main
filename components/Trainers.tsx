'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SkewContainer from '@/components/SkewContainer'

const EASING = [0.25, 0.1, 0.25, 1] as const

const trainers = [
  {
    initials: 'C',
    name: 'Catarina',
    image: '/images/trainers/STAFF-12.jpg',
    role: 'Personal Trainer',
    specialty: 'GAP, Pilates, Cycling e Step',
    bio: 'Tenho 22 anos, estou no Oxygen desde julho, sou super animada e motivo toda a gente.',
  },
  {
    initials: 'D',
    name: 'Daniel',
    image: '/images/trainers/STAFF-19.jpg',
    role: 'Instrutora de Grupo',
    specialty: 'ABS e Cycling',
    bio: 'Tenho 22 anos, estou recentemente na equipa e ja considero as pessoas deste ginasio como uma familia.',
  },
  {
    initials: 'F',
    name: 'Filipa',
    image: '/images/trainers/STAFF-22.jpg',
    role: 'CrossFit Coach',
    specialty: 'Receção',
    bio: 'Tenho 27 anos, estou na equipa da Oxygen a cerca de 1 ano, recebo toda a gente da melhor maneira. Estou a vossa espera.',
  },
  {
    initials: 'M',
    name: 'Matilde',
    image: '/images/trainers/STAFF-9.jpg',
    role: 'Boxing Coach',
    specialty: 'Cycling e Pilates',
    bio: 'Ja estou na equipa desde 2021, sou instrutora e desde janeiro sou diretora. Para mim, a equipa ja e considerada toda familia.',
  },
]

export default function Trainers() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="equipa"
      ref={sectionRef}
      className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden"
    >
      <SkewContainer>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-[1px] bg-[#009FDF]" />
              <span className="font-inter text-label uppercase tracking-[0.3em] text-white/30">Equipa</span>
            </motion.div>
            <motion.h2
              className="font-space font-black text-white leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: EASING }}
            >
              Os nossos<br />
              <span className="text-[#009FDF]">Trainers</span>
            </motion.h2>
          </div>
          <motion.p
            className="font-inter text-sm text-white/35 leading-relaxed max-w-sm lg:text-right lg:pb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Profissionais certificados e apaixonados. Cada treino é desenhado à medida dos teus objetivos.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
          {trainers.map((trainer, i) => (
            <div
              key={trainer.name}
              className="group bg-black-deep hover:bg-surface-3 transition-colors duration-500 flex flex-col"
            >
              {/* Photo — scan reveal */}
              <motion.div
                className="relative w-full overflow-hidden bg-black"
                style={{
                  aspectRatio: '3/4',
                  background: 'radial-gradient(ellipse at 50% 20%, rgba(0,159,223,0.05) 0%, rgba(8,8,8,1) 70%)',
                }}
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
                transition={{ delay: i * 0.15, duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Subtle scan lines */}
                <div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)',
                  }}
                />
                {trainer.image ? (
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full border border-white/[0.08] flex items-center justify-center bg-white/[0.03]">
                      <span className="font-space font-black text-xl text-[#009FDF]/70">{trainer.initials}</span>
                    </div>
                    <span className="font-inter text-[0.52rem] tracking-[0.3em] uppercase text-white/15">
                      Foto em breve
                    </span>
                  </div>
                )}
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-[#009FDF]/25" />
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-[#009FDF]/25" />
                <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-[#009FDF]/25" />
                <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-[#009FDF]/25" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 border border-white/[0.06] font-inter text-[0.52rem] tracking-[0.18em] uppercase text-white/30">
                  {trainer.role}
                </div>
              </motion.div>

              {/* Info — fade up after photo */}
              <motion.div
                className="p-5 flex flex-col flex-1"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="font-inter text-xs text-[#009FDF]/70 mb-2">{trainer.specialty}</div>
                <div className="font-space font-bold text-white text-base mb-0.5">{trainer.name}</div>
                <p className="font-inter text-xs text-white/28 leading-relaxed mb-4 flex-1">{trainer.bio}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      </SkewContainer>
    </section>
  )
}
