'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Aulas', href: '#aulas' },
  { label: 'Equipa', href: '#equipa' },
  // 'Planos' removido conforme solicitado
  { label: 'Contacto', href: '#footer' },
]

function O2Logo() {
  return (
    <a href="#" className="relative flex items-center gap-2 group" data-hover="true">
      <motion.img
        src="/images/trainers/logo_sem_fundo.png"
        alt="Oxygen logo"
        className="w-9 h-9 object-contain"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="font-space font-bold text-white text-sm tracking-widest hidden sm:block">
        OXYGEN
      </span>
    </a>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <O2Logo />

        {/* Center links — always visible on desktop, always pill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-5 px-7 py-3 rounded-full"
          style={{
            background: 'var(--nav-pill-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--nav-border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-[0.72rem] font-inter font-medium tracking-[0.12em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              data-hover="true"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-4">
          {/* CTA 'Experimenta' removido (apontava para #planos) */}

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-[60] relative"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-hover="true"
          >
            <motion.span className="block w-6 h-[1.5px] bg-white/80 origin-center" animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-[1.5px] bg-white/80 origin-center" animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-[1.5px] bg-white/80 origin-center" animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: 'var(--overlay-bg)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 flex items-center justify-center font-space font-black select-none pointer-events-none" style={{ fontSize: 'clamp(200px, 50vw, 300px)', color: 'transparent', WebkitTextStroke: '1px rgba(0,159,223,0.04)' }}>
              O₂
            </div>
            <nav className="flex flex-col items-center gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-space font-bold text-[2rem] tracking-tight text-white/80 hover:text-[#009FDF] transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  data-hover="true"
                >
                  {link.label}
                </motion.button>
              ))}
              {/* Botão mobile 'Experimenta' removido (apontava para #planos) */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
