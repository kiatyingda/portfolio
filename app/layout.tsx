import type { Metadata } from 'next'
import { Space_Mono, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import PresentationCursor from '@/components/ui/PresentationCursor'

// Space Mono — monospace for EVERYTHING (carlesfaus.com uses PP Supply Mono)
// The entire site is monospace — that's what creates the architectural feel
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
})

// Heavy sans for the footer wordmark — Aino uses a massive tight-tracked sans
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['900'],
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
    <html lang="en" className={`${spaceMono.variable} ${inter.variable}`}>
      <body className="bg-th-bg text-th-text antialiased font-mono">
        <Nav />
        <main>{children}</main>
        <PresentationCursor />
      </body>
    </html>
  )
}
