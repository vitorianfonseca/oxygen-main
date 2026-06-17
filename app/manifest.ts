import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oxygen Gym & Fitness',
    short_name: 'Oxygen Gym',
    description: 'O ginásio premium de Caldas da Rainha. Respira. Transpira. Evolui.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    orientation: 'portrait',
    categories: ['fitness', 'health', 'sports'],
    lang: 'pt-PT',
    icons: [
      {
        src: '/images/trainers/logo_sem_fundo.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
