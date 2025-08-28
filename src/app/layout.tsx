/* eslint-disable @next/next/no-page-custom-font */
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Mon Portfolio',
  description: 'Portfolio professionnel créé avec Next.js 15.4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen font-inter">
        <header className="bg-gray-900 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <Link href="/">MonPortfolio</Link>
            </h1>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:underline">Accueil</Link></li>
              <li><Link href="/about" className="hover:underline">À propos</Link></li>
              <li><Link href="/projects" className="hover:underline">Projets</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        <footer className="bg-gray-800 text-gray-300 p-4 text-center">
          © {new Date().getFullYear()} MonPortfolio - Tous droits réservés
        </footer>
      </body>
    </html>
  )
}
