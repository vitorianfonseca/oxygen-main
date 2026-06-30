'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
// Importamos os ícones novos
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react'

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
        <div className="relative z-10 w-full max-w-5xl mx-auto">
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

          {/* ----- NOVA SECÇÃO DE INFO: Contactos e Horários ----- */}
          <motion.div
            className="mt-24 pt-12 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.8, ease: EASING }}
          >
            {/* Contactos & Localização */}
            <div className="space-y-6">
              <h3 className="font-space font-bold text-sm text-white tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <MapPin size={18} className="text-[#009FDF]" />
                Onde Estamos
              </h3>

              <div className="space-y-5">
                <a
                  href="https://maps.google.com/?q=R.+Henrique+da+Mota+10,+2500-074+Caldas+da+Rainha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 font-inter text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <MapPin size={18} className="text-white/20 group-hover:text-[#009FDF] shrink-0 mt-0.5 transition-colors duration-300" />
                  <span>R. Henrique da Mota 10,<br />2500-074 Caldas da Rainha</span>
                </a>

                <div className="flex items-start gap-4 font-inter text-sm text-white/50">
                  <Phone size={18} className="text-white/20 shrink-0 mt-0.5" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <a href="tel:+351262407497" className="hover:text-white transition-colors duration-300">262 407 497</a>
                    <span className="hidden sm:inline text-white/20">•</span>
                    <a href="tel:+351935197656" className="hover:text-white transition-colors duration-300">935 197 656</a>
                  </div>
                </div>

                <a
                  href="mailto:oxygen.gymfitness@gmail.com"
                  className="group flex items-center gap-4 font-inter text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Mail size={18} className="text-white/20 group-hover:text-[#009FDF] shrink-0 transition-colors duration-300" />
                  <span>oxygen.gymfitness@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Horário */}
            <div className="space-y-6">
              <h3 className="font-space font-bold text-sm text-white tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <Clock size={18} className="text-[#009FDF]" />
                Horário
              </h3>

              <ul className="space-y-3 w-full max-w-sm">
                <li className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                  <span className="font-inter text-sm text-white/50">Segunda – Sexta</span>
                  <span className="font-space font-medium text-sm text-white">07:00 – 22:30</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                  <span className="font-inter text-sm text-white/50">Sábado</span>
                  <div className="text-right">
                    <span className="font-space font-medium text-sm text-white block">09:30 – 13:00</span>
                    <span className="font-space font-medium text-sm text-white block">15:30 – 19:00</span>
                  </div>
                </li>
                <li className="flex justify-between items-center pt-1">
                  <span className="font-inter text-sm text-white/50">Domingo</span>
                  <span className="font-space font-bold text-sm text-[#009FDF] tracking-wide uppercase text-[0.75rem]">Encerrado</span>
                </li>
                <li className="flex justify-between items-center pt-1">
                  <span className="font-inter text-sm text-white/50">Feriados</span>
                  <span className="font-space font-medium text-sm text-white block">09:30 – 13:00</span>
                </li>
              </ul>
            </div>
          </motion.div>
          {/* ----- FIM DA SECÇÃO ----- */}

        </div>
      </div>

      <div className="w-full h-[1px] bg-[#009FDF]/20" />
    </section>
  )
}