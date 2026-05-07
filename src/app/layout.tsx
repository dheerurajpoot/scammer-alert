import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Scammers.Pro - Crowdsourced Fraud Protection',
    template: '%s | Scammers.Pro'
  },
  description: 'The global database for reporting and searching digital scammers. Protect your community by identifying fraudulent phone numbers, social media IDs, and digital service scams.',
  keywords: ['scammer alert', 'report fraud', 'scam database', 'verify phone number', 'digital safety', 'online scams', 'blogging scams', 'phishing protection'],
  authors: [{ name: 'Scammer Alert Team' }],
  creator: 'Scammer Alert',
  publisher: 'Scammer Alert',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://scammers.pro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Scammers.Pro - Crowdsourced Fraud Protection',
    description: 'Stop scammers before they strike. Search our community-verified database of fraudulent actors.',
    url: 'https://scammers.pro',
    siteName: 'Scammers.Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scammer Alert Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scammer Alert - Stop Digital Fraud',
    description: 'Join the community-driven fight against online scammers. Report and search for fraudsters today.',
    creator: '@ScammerAlertHQ',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  category: 'Security',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
