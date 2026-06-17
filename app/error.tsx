'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="relative w-full h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-space font-black leading-none"
          style={{
            fontSize: 'clamp(180px, 35vw, 400px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,159,223,0.04)',
          }}
        >
          O₂
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="font-inter text-[0.7rem] tracking-[0.4em] uppercase text-white/30 mb-6">
          Erro inesperado
        </p>

        <h1
          className="font-space font-black text-[#F8F8F8] leading-none mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Algo correu<br />
          <span className="text-[#009FDF]">mal.</span>
        </h1>

        <p className="font-inter text-sm text-white/40 max-w-xs leading-relaxed mb-10">
          Não foste tu — fomos nós. Tenta novamente ou contacta-nos se o problema persistir.
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center gap-3 bg-[#009FDF] text-[#050505] font-space font-bold text-[0.78rem] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#80CFEF] transition-colors duration-300"
        >
          Tentar Novamente
        </button>
      </div>
    </main>
  )
}
