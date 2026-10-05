import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://amarfizar.my.id'),
  title: 'Muhammad Amar Fizaruddin | Personal Website Portofolio',
  description: 'Muhammad Amar Fizaruddin Portofolio - Introduction Personal Website.',
  keywords: ['Portofolio', 'Personal Portofolio', 'Muhammad Amar Fizaruddin', 'Web Developer', 'Software Engineer'],
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Muhammad Amar Fizaruddin | Personal Website Portofolio',
    description: 'Muhammad Amar Fizaruddin Portofolio - Introduction Personal Website.',
    url: 'https://amarfizar.my.id',
    siteName: 'Muhammad Amar Fizaruddin',
    images: [
      {
        url: 'https://amarfizar.my.id/professional-developer-portrait.webp',
        width: 630,
        height: 630,
        alt: 'Muhammad Amar Fizaruddin - Professional Developer Profile',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://amarfizar.my.id',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body suppressHydrationWarning={true}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}