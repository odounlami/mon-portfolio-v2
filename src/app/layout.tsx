import type { Metadata } from 'next'
import Header from '../../components/layout/Header'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://moyedeoscar.netlify.app'),

  // Vérification Google Search Console
  verification: {
    google: 'g-iDloq6tq420u_K_ZJYItVJs1zMHcW1gbuMYeY9ouU',
  },

  // Référencement & Titres
  title: {
    default: 'Odounlami Oscar | Développeur Web Next.js & React',
    template: '%s | Odounlami Oscar',
  },
  description:
    'Portfolio de Odounlami Oscar, développeur web freelance basé à Cotonou, spécialisé en Next.js, React, Angular et Tailwind CSS. Interfaces modernes, performantes et sur-mesure.',
  keywords: [
    'développeur web Cotonou',
    'développeur Next.js Bénin',
    'développeur React freelance',
    'développeur Angular',
    'Odounlami Oscar',
  ],
  authors: [{ name: 'Odounlami Oscar' }],
  creator: 'Odounlami Oscar',

  // Partage Réseaux Sociaux (OpenGraph / Facebook / LinkedIn / WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://moyedeoscar.netlify.app',
    title: 'Odounlami Oscar | Développeur Web Next.js & React',
    description:
      'Portfolio de Odounlami Oscar, développeur web freelance spécialisé en Next.js, React et Angular.',
    siteName: 'Odounlami Oscar',
  },

  // Carte Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Odounlami Oscar | Développeur Web Next.js & React',
    description: 'Portfolio de Odounlami Oscar, développeur web freelance.',
  },

  // Directives Indexation Moteurs de recherche
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  // Favicon
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
      <body className="font-inter">
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-800 text-gray-300 p-4 sm:p-6 text-center">
          <div className="text-sm sm:text-base">
            © {new Date().getFullYear()} Odounlami Oscar - Tous droits réservés
          </div>
        </footer>
      </body>
    </html>
  )
}