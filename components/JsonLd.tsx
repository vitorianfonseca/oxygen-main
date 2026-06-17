const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oxygengym.pt'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'GymOrHealthClub', 'SportsActivityLocation'],
        '@id': `${SITE_URL}/#gym`,
        name: 'Oxygen Gym & Fitness',
        alternateName: 'Oxygen Gym',
        description:
          'O ginásio premium de Caldas da Rainha. Musculação, Cardio, Aulas de Grupo, Personal Trainer e Nutrição Desportiva.',
        url: SITE_URL,
        telephone: '+351 262 000 000',
        email: 'geral@oxygengym.pt',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rua Exemplo, 123',
          addressLocality: 'Caldas da Rainha',
          addressRegion: 'Leiria',
          postalCode: '2500-000',
          addressCountry: 'PT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.4015,
          longitude: -9.1351,
        },
        hasMap: 'https://maps.google.com/?q=Caldas+da+Rainha',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '06:00',
            closes: '22:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '08:00',
            closes: '20:00',
          },
        ],
        image: [`${SITE_URL}/opengraph-image.png`],
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/trainers/logo_sem_fundo.png`,
        },
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card, Debit Card, MBWay',
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Musculação', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Cardio', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Aulas de Grupo', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Personal Trainer', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Nutrição Desportiva', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Vestiários Premium', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Estacionamento', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Planos de Subscrição Oxygen Gym',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Plano Mensal',
              description: 'Acesso completo ao ginásio, 1 aula de grupo por semana, app de treino',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#gym` },
            },
            {
              '@type': 'Offer',
              name: 'Plano Trimestral',
              description: 'Acesso completo, aulas ilimitadas, 2 sessões de Personal Trainer',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#gym` },
            },
            {
              '@type': 'Offer',
              name: 'Plano Anual',
              description: 'Tudo incluído, Personal Trainer ilimitado, Nutrição Desportiva',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#gym` },
            },
          ],
        },
        sameAs: [
          'https://www.instagram.com/oxygengymfitness/',
          'https://www.facebook.com/oxygengym',
        ],
        areaServed: {
          '@type': 'City',
          name: 'Caldas da Rainha',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Oxygen Gym & Fitness',
        description: 'O ginásio premium de Caldas da Rainha',
        inLanguage: 'pt-PT',
        publisher: { '@id': `${SITE_URL}/#gym` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/?s={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'Oxygen Gym & Fitness — Caldas da Rainha',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#gym` },
        description:
          'Descobre os serviços, planos e instalações do Oxygen Gym & Fitness em Caldas da Rainha.',
        inLanguage: 'pt-PT',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [SITE_URL],
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: SITE_URL,
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
