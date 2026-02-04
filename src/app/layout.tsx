import Header from '../../components/layout/Header'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'ODOUNLAMI OSCAR',
  description:
    'Portfolio de ODOUNLAMI OSCAR, développeur web spécialisé en Next.js et Angular',
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

        <main className="min-h-screen ">
          {children}
        </main>

        <footer className="bg-gray-800 text-gray-300 p-4 sm:p-6 text-center">
          <div className="text-sm sm:text-base">
            © {new Date().getFullYear()} MonPortfolio — Tous droits réservés
          </div>
        </footer>
      </body>
    </html>
  )
}
