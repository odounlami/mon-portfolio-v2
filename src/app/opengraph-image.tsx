// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Odounlami Oscar - Développeur Web Next.js & React'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1e293b 2px, transparent 0)',
          backgroundSize: '50px 50px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Badge / Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 20px',
            borderRadius: '20px',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: 20,
            marginBottom: 24,
            fontWeight: '600',
          }}
        >
          Développeur Web, Designer UI/UX Freelance
        </div>

        {/* Nom principal */}
        <h1
          style={{
            fontSize: 70,
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            padding: '0 40px',
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Odounlami Oscar
        </h1>

        {/* Sous-titre */}
        <p
          style={{
            fontSize: 32,
            color: '#94a3b8',
            marginTop: 16,
            marginBottom: 0,
            textAlign: 'center',
          }}
        >
          Next.js • React • Tailwind CSS
        </p>

        {/* Localisation */}
        <p
          style={{
            fontSize: 22,
            color: '#64748b',
            marginTop: 32,
          }}
        >
          📍 Cotonou, Bénin
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}