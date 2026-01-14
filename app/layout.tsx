import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CONECTA - Trabajadores de Manos Medias',
  description: 'Conecta a trabajadores de manos medias de Paraguay con personas que necesitan sus servicios',
  manifest: '/manifest.json',
  themeColor: '#2563EB',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CONECTA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

