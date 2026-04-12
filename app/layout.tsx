import type { Metadata } from 'next'
import { Inter_Tight, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

// Inter Tight — geometric sans for all text (thin weights for display, regular for body)
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['100', '200', '300', '400', '500'],
  display: 'swap',
})

// IBM Plex Mono — labels, metadata, structural elements
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kiat Yingda — Product Designer',
  description:
    'Senior Product Designer specializing in complex consumer products at scale — healthcare, ride-hailing, Web3.',
  openGraph: {
    title: 'Kiat Yingda — Product Designer',
    description:
      'Senior Product Designer specializing in complex consumer products at scale.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-th-bg text-th-text antialiased font-display">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
