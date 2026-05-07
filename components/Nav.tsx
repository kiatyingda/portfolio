'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
import { siteConfig } from '@/content/siteConfig'
import BracketLink from '@/components/ui/BracketLink'

function useNavBg(): 'dark' | 'light' {
  const [bg, setBg] = useState<'dark' | 'light'>('light')

  useIsoLayoutEffect(() => {
    function update() {
      const sections = document.querySelectorAll<HTMLElement>('[data-bg]')
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
  const overlayBg = bg === 'dark' ? '#000000' : 'rgb(245, 245, 240)'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="px-4 md:px-8 lg:px-10 h-16 flex items-center justify-between sm:justify-center">
        <nav className="hidden sm:flex items-center gap-6">
          <BracketLink href="/#experience" fg={fg}>Experience</BracketLink>
          <BracketLink href="/#work" fg={fg}>Works</BracketLink>
          <BracketLink href="/work/grab-influence" fg={fg}>Influence</BracketLink>
          <BracketLink href="/#about" fg={fg}>About</BracketLink>
          <BracketLink href={`mailto:${siteConfig.email}`} fg={fg}>Contact</BracketLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="sm:hidden font-mono text-[12px] font-bold tracking-[0.14em] uppercase px-3 py-2"
          style={{ color: fg }}
        >
          [ MENU ]
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="sm:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: overlayBg }}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 font-mono text-[12px] font-bold tracking-[0.14em] uppercase px-3 py-2"
            style={{ color: fg }}
          >
            [ CLOSE ]
          </button>
          <div className="flex flex-col items-center gap-7" onClick={(e) => e.stopPropagation()}>
            <BracketLink href="/#experience" fg={fg}>Experience</BracketLink>
            <BracketLink href="/#work" fg={fg}>Works</BracketLink>
            <BracketLink href="/work/grab-influence" fg={fg}>Influence</BracketLink>
            <BracketLink href="/#about" fg={fg}>About</BracketLink>
            <BracketLink href={`mailto:${siteConfig.email}`} fg={fg}>Contact</BracketLink>
          </div>
        </div>
      )}
    </header>
  )
}
