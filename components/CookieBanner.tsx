'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'oxygen_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = (all: boolean) => {
    localStorage.setItem(STORAGE_KEY, all ? 'all' : 'essential')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[9997] md:bottom-6 md:left-6 md:right-auto md:max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="bg-surface-1 border border-white/[0.07] p-5 shadow-2xl"
            style={{ borderBottom: '1px solid rgba(0,159,223,0.12)' }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#009FDF]/40 via-[#009FDF]/20 to-transparent" />

            <p className="font-space font-semibold text-[0.78rem] tracking-wide text-white mb-2">
              Cookies & Privacidade
            </p>
            <p className="font-inter text-[0.7rem] text-white/45 leading-relaxed mb-4">
              Usamos cookies essenciais para o funcionamento do site e, com o teu consentimento,
              cookies analíticos para melhorar a experiência.{' '}
              <Link
                href="/politica-privacidade"
                className="text-[#009FDF]/70 hover:text-[#009FDF] transition-colors underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => accept(true)}
                className="flex-1 py-2.5 bg-[#009FDF] text-[#050505] font-space font-bold text-[0.65rem] tracking-[0.15em] uppercase hover:bg-[#80CFEF] transition-colors duration-300"
                data-hover="true"
              >
                Aceitar Tudo
              </button>
              <button
                onClick={() => accept(false)}
                className="flex-1 py-2.5 border border-white/10 text-white/50 font-space font-semibold text-[0.65rem] tracking-[0.15em] uppercase hover:border-white/20 hover:text-white/70 transition-all duration-300"
                data-hover="true"
              >
                Só Essenciais
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
