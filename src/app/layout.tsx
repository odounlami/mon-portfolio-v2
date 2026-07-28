import type { Metadata } from 'next'
import './globals.css'

// métadonnées
export const metadata: Metadata = {
  metadataBase: new URL('https://moyedeoscar.netlify.app'),

  // Ajout de la vérification Google Search Console
  verification: {
    google: 'g-iDloq6tq420u_K_ZJYItVJs1zMHcW1gbuMYeY9ouU',
  },

  title: {
    default: 'Odounlami Oscar | Développeur Web Next.js & React',
    template: '%s | Odounlami Oscar',
  },
  description:
    'Portfolio de Odounlami Oscar, développeur web freelance basé à Cotonou, spécialisé en Next.js, React et Tailwind CSS. Interfaces modernes, performantes et sur-mesure.',
  keywords: [
    'développeur web Cotonou',
    'développeur Next.js Bénin',
    'développeur React freelance',
    'Odounlami Oscar',
  ],
  authors: [{ name: 'Odounlami Oscar' }],
  creator: 'Odounlami Oscar',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://moyedeoscar.netlify.app',
    title: 'Odounlami Oscar | Développeur Web Next.js & React',
    description:
      'Portfolio de Odounlami Oscar, développeur web freelance spécialisé en Next.js et React.',
    siteName: 'Odounlami Oscar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Odounlami Oscar | Développeur Web Next.js & React',
    description: 'Portfolio de Odounlami Oscar, développeur web freelance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}