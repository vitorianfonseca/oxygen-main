'use client'

import { motion } from 'framer-motion'
import { Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { INSTAGRAM_URL, WHATSAPP_MSG } from '@/lib/constants'

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Aulas', href: '#aulas' },
  { label: 'Equipa', href: '#equipa' },
  { label: 'Planos', href: '#planos' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="w-full bg-[#050505]">
      {/* Top cyan line */}
      <div className="w-full h-[1px] bg-[#009FDF]/20" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-8">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/images/trainers/logo_sem_fundo.png" alt="Oxygen logo" className="w-8 h-8 object-contain" />
            <span className="font-space font-bold text-sm tracking-widest text-white/70">OXYGEN</span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5 flex-wrap justify-center">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="font-inter text-[0.72rem] tracking-[0.1em] uppercase text-white/35 hover:text-white/70 transition-colors duration-300"
                data-hover="true"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-[#009FDF] hover:border-[#009FDF]/30 transition-all duration-300"
              data-hover="true"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href={WHATSAPP_MSG()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-[#009FDF] hover:border-[#009FDF]/30 transition-all duration-300"
              data-hover="true"
              aria-label="WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/[0.04] my-6" />

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-inter text-[0.65rem] tracking-[0.08em] text-white/20">
            © 2026 Oxygen Gym &amp; Fitness · Caldas da Rainha
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/politica-privacidade"
              className="font-inter text-[0.65rem] tracking-[0.08em] text-white/20 hover:text-white/40 transition-colors duration-300"
            >
              Política de Privacidade
            </Link>
            <span className="text-white/10">·</span>
            <p className="font-inter text-[0.65rem] tracking-[0.08em] text-white/15">
              Website by{' '}
              <a
                href="https://bynexa.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 hover:text-[#009FDF]/60 transition-colors duration-300"
              >
                Bynexa
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
