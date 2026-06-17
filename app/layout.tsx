import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'
import JsonLd from '@/components/JsonLd'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oxygengym.pt'

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Oxygen Gym & Fitness — Ginásio em Caldas da Rainha',
    template: '%s | Oxygen Gym & Fitness',
  },
  description:
    'O ginásio que transforma. Musculação, Cardio, Aulas de Grupo, Personal Trainer e Nutrição Desportiva em Caldas da Rainha. Começa hoje.',
  keywords: [
    'ginásio Caldas da Rainha',
    'fitness Caldas da Rainha',
    'musculação Caldas da Rainha',
    'personal trainer Caldas da Rainha',
    'aulas de grupo Caldas da Rainha',
    'oxygen gym',
    'ginásio perto de mim',
    'ginásio Leiria',
    'nutrição desportiva',
    'treino funcional',
    'body pump',
    'HIIT',
    'yoga Caldas da Rainha',
  ],
  authors: [{ name: 'Oxygen Gym & Fitness', url: SITE_URL }],
  creator: 'Oxygen Gym & Fitness',
  publisher: 'Oxygen Gym & Fitness',
  category: 'fitness',
  classification: 'Fitness & Health',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: SITE_URL,
    siteName: 'Oxygen Gym & Fitness',
    title: 'Oxygen Gym & Fitness — Ginásio em Caldas da Rainha',
    description:
      'Respira. Transpira. Evolui. Musculação, Cardio, Aulas de Grupo e Personal Trainer em Caldas da Rainha.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Oxygen Gym & Fitness — Caldas da Rainha',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oxygengym',
    creator: '@oxygengym',
    title: 'Oxygen Gym & Fitness — Ginásio em Caldas da Rainha',
    description: 'Respira. Transpira. Evolui.',
    images: [
      {
        url: '/opengraph-image.png',
        alt: 'Oxygen Gym & Fitness — Caldas da Rainha',
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'pt-PT': SITE_URL,
    },
  },
  icons: {
    icon: [{ url: '/images/trainers/logo_sem_fundo.png', type: 'image/png', sizes: '32x32' }],
    shortcut: '/images/trainers/logo_sem_fundo.png',
    apple: [{ url: '/images/trainers/logo_sem_fundo.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  other: {
    'geo.region': 'PT-10',
    'geo.placename': 'Caldas da Rainha',
    'geo.position': '39.4015;-9.1351',
    ICBM: '39.4015, -9.1351',
    rating: 'general',
    'revisit-after': '7 days',
    language: 'Portuguese',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/images/trainers/logo_sem_fundo.png" />
        <link rel="shortcut icon" href="/images/trainers/logo_sem_fundo.png" />
        <link rel="apple-touch-icon" href="/images/trainers/logo_sem_fundo.png" />
        <JsonLd />
      </head>
      <body className="bg-black-deep font-inter antialiased">
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
