'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
import Link from 'next/link'
import { siteConfig } from '@/content/siteConfig'
import BracketLink from '@/components/ui/BracketLink'

/**
 * Detects the section currently dominant at the top of the viewport (where the
 * nav sits) and returns 'dark' or 'light'. Mirrors BackgroundCrossfade's logic
 * but biased to the top strip, so the nav flips as soon as a new bg reaches it.
 */
function useNavBg(): 'dark' | 'light' {
  const [bg, setBg] = useState<'dark' | 'light'>('light')

  useIsoLayoutEffect(() => {
    function update() {
      const sections = document.querySelectorAll<HTMLElement>('[data-bg]')
      // Sample at nav's midline (y=32 — nav height 64 / 2)
      const sampleY = 32
      let best: 'dark' | 'light' = 'light'
      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= sampleY && rect.bottom >= sampleY) {
          best = (el.dataset.bg as 'dark' | 'light') || 'light'
          break
        }
      }
      setBg(best)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return bg
}

export default function Nav() {
  const bg = useNavBg()
  const fg = bg === 'dark' ? '#ffffff' : '#000000'

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="px-4 md:px-8 lg:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[18px] md:text-[20px] hover:opacity-60 transition-opacity duration-200"
          style={{ fontWeight: 700, letterSpacing: '0.24em', color: fg, transition: 'color 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s' }}
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <BracketLink href="/#work" fg={fg}>Projects</BracketLink>
          <BracketLink href="/#experience" fg={fg}>Experience</BracketLink>
          <BracketLink href="/#about" fg={fg}>About</BracketLink>
          <BracketLink href={`mailto:${siteConfig.email}`} fg={fg}>Contact</BracketLink>
        </nav>
      </div>
    </header>
  )
}
