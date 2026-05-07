import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Scammer Alert - Report & Search Scammers',
  description: 'Community-driven platform to report and search scammers. Protect yourself by checking phone numbers, social media IDs, and scam details.',
  generator: 'v0.app',
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
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
