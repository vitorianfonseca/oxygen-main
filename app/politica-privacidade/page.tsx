import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade e Proteção de Dados do Oxygen Gym & Fitness.',
  robots: { index: false, follow: false },
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-space font-bold text-lg text-[#F8F8F8] mb-4 pb-3 border-b border-white/[0.06]">
      {title}
    </h2>
    <div className="font-inter text-sm text-white/55 leading-relaxed space-y-3">{children}</div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="w-full border-b border-white/[0.05] bg-[#0E0E0E]">
        <div className="max-w-3xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="font-space font-bold text-sm tracking-widest text-white/60 hover:text-[#009FDF] transition-colors duration-300"
          >
            ← OXYGEN GYM
          </Link>
          <span className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-white/20">
            Política de Privacidade
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Title */}
        <div className="mb-12">
          <p className="font-inter text-[0.7rem] tracking-[0.3em] uppercase text-[#009FDF]/60 mb-3">
            Documento Legal
          </p>
          <h1 className="font-space font-black text-[#F8F8F8] leading-tight mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Política de Privacidade
          </h1>
          <p className="font-inter text-sm text-white/35">
            Última atualização: Janeiro 2025 · Oxygen Gym & Fitness, Caldas da Rainha
          </p>
        </div>

        <Section title="1. Quem somos">
          <p>
            O <strong className="text-white/75">Oxygen Gym & Fitness</strong> é o responsável pelo tratamento dos dados pessoais recolhidos através deste website. Para qualquer questão relacionada com privacidade, contacte-nos através do email{' '}
            <a href="mailto:geral@oxygengym.pt" className="text-[#009FDF]/70 hover:text-[#009FDF]">
              geral@oxygengym.pt
            </a>.
          </p>
        </Section>

        <Section title="2. Dados que recolhemos">
          <p>Podemos recolher os seguintes dados pessoais:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-white/45">
            <li>Nome e dados de contacto (email, telefone) fornecidos voluntariamente</li>
            <li>Dados de navegação (endereço IP, browser, páginas visitadas)</li>
            <li>Cookies e tecnologias similares (com o seu consentimento)</li>
          </ul>
          <p>Não recolhemos dados sensíveis sem consentimento explícito.</p>
        </Section>

        <Section title="3. Como utilizamos os seus dados">
          <p>Os dados recolhidos são utilizados exclusivamente para:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-white/45">
            <li>Responder a pedidos de informação ou contacto</li>
            <li>Gestão de associações e planos de treino</li>
            <li>Melhoria da experiência no website (dados analíticos anónimos)</li>
            <li>Cumprimento de obrigações legais</li>
          </ul>
          <p>Não utilizamos os seus dados para marketing sem consentimento prévio.</p>
        </Section>

        <Section title="4. Base legal para o tratamento">
          <p>
            O tratamento de dados baseia-se no consentimento do titular (Art. 6.º, n.º 1, al. a) do RGPD),
            na execução de um contrato (al. b)), ou no cumprimento de obrigações legais (al. c)).
          </p>
        </Section>

        <Section title="5. Partilha de dados com terceiros">
          <p>
            Não vendemos nem cedemos os seus dados pessoais a terceiros para fins comerciais.
            Podemos partilhar dados com fornecedores de serviços que nos auxiliam na operação do website
            (ex: serviços de hosting e analytics), vinculados por acordos de confidencialidade.
          </p>
        </Section>

        <Section title="6. Conservação dos dados">
          <p>
            Os dados são conservados pelo período necessário para os fins para os quais foram recolhidos,
            ou pelo prazo legalmente exigido. Após este período, os dados são eliminados ou anonimizados.
          </p>
        </Section>

        <Section title="7. Os seus direitos (RGPD)">
          <p>Ao abrigo do RGPD, tem direito a:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-white/45">
            <li>Aceder aos seus dados pessoais</li>
            <li>Retificar dados incorretos ou incompletos</li>
            <li>Solicitar o apagamento dos seus dados (&ldquo;direito ao esquecimento&rdquo;)</li>
            <li>Opor-se ao tratamento ou solicitar a sua limitação</li>
            <li>Portabilidade dos dados</li>
            <li>Retirar o consentimento a qualquer momento, sem prejudicar a licitude do tratamento anterior</li>
          </ul>
          <p>
            Para exercer qualquer destes direitos, contacte-nos por email:{' '}
            <a href="mailto:geral@oxygengym.pt" className="text-[#009FDF]/70 hover:text-[#009FDF]">
              geral@oxygengym.pt
            </a>
          </p>
        </Section>

        <Section title="8. Cookies">
          <p>
            Este website utiliza cookies essenciais para o funcionamento correto e, com o seu
            consentimento, cookies analíticos para compreender como os visitantes interagem com o site.
            Pode gerir as suas preferências através do banner de cookies apresentado na primeira visita,
            ou nas definições do seu browser.
          </p>
          <p>
            <strong className="text-white/65">Cookies essenciais:</strong> necessários para o funcionamento
            básico. Não requerem consentimento.
          </p>
          <p>
            <strong className="text-white/65">Cookies analíticos:</strong> utilizados com o seu consentimento
            para melhorar a experiência. Podem ser recusados sem afetar a funcionalidade do site.
          </p>
        </Section>

        <Section title="9. Segurança dos dados">
          <p>
            Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados contra
            acesso não autorizado, perda ou divulgação indevida, em conformidade com o RGPD.
          </p>
        </Section>

        <Section title="10. Alterações a esta política">
          <p>
            Podemos atualizar esta política periodicamente. A data da última atualização é indicada no
            topo do documento. Recomendamos que a consulte regularmente.
          </p>
        </Section>

        <Section title="11. Contacto e reclamações">
          <p>
            Para questões sobre privacidade:{' '}
            <a href="mailto:geral@oxygengym.pt" className="text-[#009FDF]/70 hover:text-[#009FDF]">
              geral@oxygengym.pt
            </a>
          </p>
          <p>
            Tem também o direito de apresentar uma reclamação junto da{' '}
            <strong className="text-white/65">CNPD</strong> (Comissão Nacional de Proteção de Dados)
            em{' '}
            <a
              href="https://www.cnpd.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#009FDF]/70 hover:text-[#009FDF]"
            >
              www.cnpd.pt
            </a>.
          </p>
        </Section>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-white/[0.05]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-space font-semibold text-[0.75rem] tracking-[0.15em] uppercase text-[#009FDF]/60 hover:text-[#009FDF] transition-colors duration-300"
          >
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  )
}
