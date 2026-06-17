'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASING = [0.25, 0.1, 0.25, 1] as const

const faqs = [
  {
    q: 'Posso experimentar antes de me inscrever?',
    a: 'Sim. Oferecemos uma sessão de experiência gratuita para novos membros. Basta contactar-nos via WhatsApp ou passar pela receção para marcar o teu dia de treino.',
  },
  {
    q: 'As aulas de grupo estão incluídas em todos os planos?',
    a: 'As aulas fazem parte dos planos Trimestral (2 por semana) e Anual (ilimitadas). No plano Mensal podem ser adquiridas individualmente ou em pack.',
  },
  {
    q: 'Preciso de trazer toalha e cadeado?',
    a: 'A toalha de treino é obrigatória na sala de máquinas. Nos balneários disponibilizamos cacifos com cadeado incluído nos planos Trimestral e Anual. No Mensal, o cadeado é trazido pelo membro.',
  },
  {
    q: 'Têm personal trainer disponível todos os dias?',
    a: 'Sim. A equipa de personal trainers está disponível todos os dias da semana em horários definidos. Sessões individuais podem ser agendadas diretamente com cada trainer.',
  },
  {
    q: 'Aceitem MBWay e cartão de crédito?',
    a: 'Aceitamos todos os métodos de pagamento: numerário, multibanco, cartão de débito e crédito, e MBWay. As mensalidades podem ser configuradas por débito direto.',
  },
  {
    q: 'Como posso cancelar a subscrição?',
    a: 'Sem fidelização, sem letras pequenas. Podes cancelar com 30 dias de antecedência através do nosso WhatsApp, por email, ou presencialmente na receção.',
  },
  {
    q: 'Têm estacionamento gratuito?',
    a: 'Sim. Temos parque de estacionamento gratuito exclusivo para membros do Oxygen Gym.',
  },
]

function FAQItem({ item, index }: { item: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="border-b border-white/[0.06]"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: EASING }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left group"
        data-hover="true"
        aria-expanded={open}
      >
        <span className="font-space font-semibold text-[0.9rem] text-white/80 group-hover:text-white transition-colors duration-300 pr-8">
          {item.q}
        </span>
        <motion.div
          className="flex-none w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#009FDF]/40 transition-colors duration-300"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASING }}
        >
          <Plus size={13} className={open ? 'text-[#009FDF]' : 'text-white/40'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASING }}
            className="overflow-hidden"
          >
            <p className="font-inter text-sm text-white/45 leading-relaxed pb-5 pr-10">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })

  return (
    <section
      id="faq"
      className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-24">

          {/* Left */}
          <div ref={titleRef} className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isTitleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-[1px] bg-[#009FDF]" />
              <span className="font-inter text-label uppercase tracking-[0.3em] text-white/30">
                FAQ
              </span>
            </motion.div>

            <motion.h2
              className="font-space font-black leading-[0.95] text-white"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: EASING }}
            >
              TENS
              <br />
              <span className="text-[#009FDF]">DÚVIDAS?</span>
            </motion.h2>

            <motion.p
              className="font-inter text-sm text-white/40 leading-relaxed mt-5 max-w-xs"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Se não encontrares o que procuras, fala connosco diretamente.
            </motion.p>
          </div>

          {/* Right: accordion */}
          <div>
            {faqs.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
