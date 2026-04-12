'use client'

import Link from 'next/link'
import { siteConfig } from '@/content/siteConfig'
import BracketLink from '@/components/ui/BracketLink'

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ mixBlendMode: 'exclusion' }}>
      <div className="max-w-[1136px] mx-auto px-8 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-[13px] font-bold text-white tracking-[0.1em] hover:opacity-60 transition-opacity duration-200"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden sm:flex items-center gap-4">
          <BracketLink href="/#work" className="text-white" blended>Projects</BracketLink>
          <BracketLink href="/#about" className="text-white" blended>About</BracketLink>
          <BracketLink href={`mailto:${siteConfig.email}`} className="text-white" blended>Contact</BracketLink>
        </nav>
      </div>
    </header>
  )
}
