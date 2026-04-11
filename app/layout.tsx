import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

// Plus Jakarta Sans — geometric sans for display headlines (GT Walsheim substitute)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Inter Variable — body and UI with Framer's OpenType features applied in CSS
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// IBM Plex Mono — labels, numbers, structural elements
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kiat Yingda — Product Designer',
  description:
    'Senior Product Designer. I design consumer products at scale — most recently at Grab, where I led product design for ride-hailing across Southeast Asia.',
  openGraph: {
    title: 'Kiat Yingda — Product Designer',
    description:
      'Senior Product Designer. I design consumer products at scale — most recently at Grab.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${plusJakartaSans.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      {/* Zero-flash theme persistence — runs before React hydrates */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-th-bg text-th-text antialiased font-sans">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
