import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Lyrica (Beta) - AI Lyrics Generator',
  description: 'Generate and contribute synchronized lyrics to LRCLib with AI-powered transcription. Beta version - may contain errors.',
  generator: 'v0.app',
  openGraph: {
    title: 'Lyrica (Beta) - AI Lyrics Generator',
    description: 'Generate and contribute synchronized lyrics to LRCLib with AI-powered transcription',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#00f2fe" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
