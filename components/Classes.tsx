'use client'

import { useRef, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'
import SkewContainer from '@/components/SkewContainer'

const EASING = [0.25, 0.1, 0.25, 1] as const

const classTypes = [
  { num: '01', name: 'Cycling', duration: '50 min', desc: 'Cardio intenso em ritmo com música ao vivo.' },
  { num: '02', name: 'Pilates', duration: '55 min', desc: 'Core, flexibilidade e alinhamento postural.' },
  { num: '03', name: 'Zumba', duration: '60 min', desc: 'Treino divertido ao ritmo de música latina.' },
  { num: '04', name: 'GAP', duration: '45 min', desc: 'Glúteos, abdominais e pernas definidos.' },
  { num: '05', name: 'Step', duration: '50 min', desc: 'Coordenação e resistência cardiovascular.' },
  { num: '06', name: 'Local Pump', duration: '50 min', desc: 'Musculação localizada com barra e pesos.' },
]

const DAYS = ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA']
const TIMES = ['9h30', '10h30', '17h30', '18h30', '19h30', '20h30']

type ClassEntry =
  | { type: 'class'; name: string; asterisk?: boolean }
  | { type: 'split'; top: string; topAsterisk?: boolean; bottom: string }
  | { type: 'open' }

const SCHEDULE: ClassEntry[][] = [
  [
    { type: 'class', name: 'Cycling', asterisk: true },
    { type: 'open' },
    { type: 'class', name: 'Cycling', asterisk: true },
    { type: 'class', name: 'Local Pump' },
    { type: 'class', name: 'Pilates' },
  ],
  [
    { type: 'class', name: 'Pilates' },
    { type: 'open' },
    { type: 'class', name: 'Pilates' },
    { type: 'class', name: 'ABS 15 min', asterisk: true },
    { type: 'open' },
  ],
  [
    { type: 'class', name: 'ABS 15 min', asterisk: true },
    { type: 'class', name: 'ABS 15 min', asterisk: true },
    { type: 'class', name: 'ABS 15 min', asterisk: true },
    { type: 'class', name: 'Pilates' },
    { type: 'class', name: 'ABS 15 min', asterisk: true },
  ],
  [
    { type: 'split', top: 'Cycling', topAsterisk: true, bottom: 'Pilates' },
    { type: 'class', name: 'Zumba' },
    { type: 'class', name: 'GAP' },
    { type: 'split', top: 'Cycling', topAsterisk: true, bottom: 'Zumba' },
    { type: 'class', name: 'Local Pump' },
  ],
  [
    { type: 'split', top: 'Cycling', topAsterisk: true, bottom: 'GAP' },
    { type: 'class', name: 'Pilates' },
    { type: 'split', top: 'Cycling', topAsterisk: true, bottom: 'Step' },
    { type: 'class', name: 'Pilates' },
    { type: 'split', top: 'Cycling', topAsterisk: true, bottom: 'GAP' },
  ],
  [
    { type: 'class', name: 'Pilates' },
    { type: 'open' },
    { type: 'open' },
    { type: 'open' },
    { type: 'open' },
  ],
]

function O2Mark() {
  return (
    <img
      src="/images/trainers/logo_sem_fundo.png"
      alt="Oxygen"
      className="object-contain"
      style={{ width: '1.45rem', height: '1.45rem' }}
    />
  )
}

function Cell({ entry, delay }: { entry: ClassEntry; delay: number }) {
  const isOpen = entry.type === 'open'
  const isSplit = entry.type === 'split'

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden group cursor-default"
      style={{
        minHeight: '76px',
        background: isOpen
          ? 'linear-gradient(135deg, rgba(0,159,223,0.06) 0%, rgba(0,159,223,0.02) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: isOpen
          ? '1px solid rgba(0,159,223,0.14)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.38, ease: EASING }}
      whileHover={{
        borderColor: 'rgba(0,159,223,0.35)',
        boxShadow: '0 0 18px rgba(0,159,223,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: { duration: 0.18 },
      }}
    >
      {isOpen && (
        <div className="flex items-center justify-center h-full py-4">
          <O2Mark />
        </div>
      )}

      {isSplit && (
        <div className="relative h-full w-full py-2">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, transparent 48.5%, rgba(0,159,223,0.22) 49%, rgba(0,159,223,0.22) 51%, transparent 51.5%)',
            }}
          />
          <div className="absolute top-[13px] left-0 right-[28%] flex justify-center">
            <span className="font-space font-semibold text-[0.67rem] text-white/60 tracking-wide">
              {entry.top}
              {entry.topAsterisk && <sup className="text-[#009FDF] ml-px text-[0.48rem]">*</sup>}
            </span>
          </div>
          <div className="absolute bottom-[13px] left-[28%] right-0 flex justify-center">
            <span className="font-space font-semibold text-[0.67rem] text-white/60 tracking-wide">
              {entry.bottom}
            </span>
          </div>
        </div>
      )}

      {entry.type === 'class' && (
        <div className="flex items-center justify-center h-full px-3 py-4">
          <span className="font-space font-semibold text-[0.8rem] text-white/80 text-center tracking-wide leading-tight">
            {entry.name}
            {entry.asterisk && (
              <sup className="text-[#009FDF] ml-[1px] text-[0.52rem]">*</sup>
            )}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function Classes() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })

  return (
    <section
      id="aulas"
      ref={sectionRef}
      className="relative w-full bg-black-deep py-12 md:py-16 overflow-hidden"
    >
      <SkewContainer>
        <div className="max-w-7xl mx-auto px-8 md:px-16">

          {/* Header */}
          <div className="mb-8">
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-[1px] bg-[#009FDF]" />
              <span className="font-inter text-label uppercase tracking-[0.3em] text-white/30">Programa</span>
            </motion.div>
            <motion.h2
              className="font-space font-black text-white leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: EASING }}
            >
              Aulas &<br />
              <span className="text-[#009FDF]">Horários</span>
            </motion.h2>
          </div>

          {/* Class type cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.04] mb-12">
            {classTypes.map((cls, i) => (
              <motion.div
                key={cls.name}
                className="bg-black-deep p-5 flex flex-col gap-3 hover:bg-surface-3 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.85, rotateZ: (i - 2.5) * 1.8 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span className="font-space font-black text-[0.65rem] text-[#009FDF]/50 tracking-[0.2em]">{cls.num}</span>
                <div>
                  <div className="font-space font-bold text-sm text-white mb-0.5">{cls.name}</div>
                  <div className="font-inter text-[0.62rem] tracking-[0.1em] uppercase text-white/20">{cls.duration}</div>
                </div>
                {/* Removido o 'hidden lg:block' daqui 👇 */}
                <p className="font-inter text-[0.67rem] text-white/25 leading-relaxed">{cls.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.8, ease: EASING }}
            className="overflow-x-auto pb-2"
          >
            <div
              className="min-w-[700px] rounded-2xl p-3"
              style={{
                background: 'rgba(0,8,20,0.7)',
                border: '1px solid rgba(0,159,223,0.1)',
                boxShadow: '0 0 80px rgba(0,159,223,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* grid: time col + 5 days */}
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: '82px repeat(5, 1fr)' }}
              >
                {/* ── Header row ── */}
                <div
                  className="rounded-lg flex items-center justify-center px-2 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #009FDF 0%, #0077a8 100%)',
                    boxShadow: '0 2px 12px rgba(0,159,223,0.35)',
                  }}
                >
                  <span className="font-space font-black text-[0.52rem] tracking-[0.22em] text-white uppercase">Horários</span>
                </div>
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="rounded-lg flex items-center justify-center px-2 py-3"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <span className="font-space font-black text-[0.58rem] tracking-[0.2em] text-white/65 uppercase">{day}</span>
                  </div>
                ))}

                {/* ── Data rows ── */}
                {TIMES.map((time, rowIdx) => (
                  <Fragment key={time}>
                    {/* Time cell */}
                    <motion.div
                      key={`t-${time}`}
                      className="rounded-lg flex items-center justify-center px-2 py-2"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,159,223,0.15) 0%, rgba(0,159,223,0.06) 100%)',
                        border: '1px solid rgba(0,159,223,0.2)',
                      }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.48 + rowIdx * 0.06, duration: 0.4, ease: EASING }}
                    >
                      <span className="font-space font-black text-[0.82rem] text-[#009FDF]">{time}</span>
                    </motion.div>

                    {SCHEDULE[rowIdx].map((entry, colIdx) => (
                      <Cell
                        key={`${time}-${colIdx}`}
                        entry={entry}
                        delay={isInView ? 0.5 + rowIdx * 0.06 + colIdx * 0.025 : 0}
                      />
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 px-1">
              <span className="font-inter text-[0.58rem] text-white/20 tracking-wide">
                <sup className="text-[#009FDF] text-[0.58rem]">*</sup> Sala dedicada
              </span>
              <span className="font-inter text-[0.58rem] text-white/20 tracking-wide flex items-center gap-1">
                <img src="/images/trainers/logo_sem_fundo.png" alt="Oxygen" className="object-contain" style={{ width: '0.75rem', height: '0.75rem' }} />
                Sala aberta · musculação livre
              </span>
            </div>
          </motion.div>

        </div>
      </SkewContainer>
    </section>
  )
}
