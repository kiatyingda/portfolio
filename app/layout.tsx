import type { Metadata } from 'next'
import { Space_Mono, Inter, Roboto } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import PresentationCursor from '@/components/ui/PresentationCursor'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['900'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kiat Yingda — Lead Product Designer',
  description:
    'Lead product designer and builder. Led Boost at OKX (~$4B trading volume, ~75% of Web3 growth revenue). Selected 1 of 6 from 120+ designers at Grab to shape company-wide direction.',
  openGraph: {
    title: 'Kiat Yingda — Lead Product Designer',
    description:
      'Lead product designer and builder. Frameworks adopted across teams. Business outcomes that compound.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${inter.variable} ${roboto.variable}`}>
      <body className="bg-th-bg text-th-text antialiased font-mono">
        <Nav />
        <main>{children}</main>
        <PresentationCursor />
      </body>
    </html>
  )
}
