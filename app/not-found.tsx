import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative w-full h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Background O₂ */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-space font-black leading-none"
          style={{
            fontSize: 'clamp(180px, 35vw, 400px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,159,223,0.05)',
          }}
        >
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="font-inter text-[0.7rem] tracking-[0.4em] uppercase text-white/30 mb-6">
          Página não encontrada
        </p>

        <h1 className="font-space font-black text-[#F8F8F8] leading-none mb-3"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Perdeste o<br />
          <span className="text-[#009FDF]">caminho?</span>
        </h1>

        <p className="font-inter text-sm text-white/40 max-w-xs leading-relaxed mb-10 mt-4">
          Esta página não existe. Mas o teu treino de hoje, esse existe — volta ao início.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-[#009FDF] text-[#050505] font-space font-bold text-[0.78rem] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#80CFEF] transition-colors duration-300"
        >
          Voltar ao Início
        </Link>
      </div>
    </main>
  )
}
