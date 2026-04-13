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
          className="font-display text-[16px] font-black text-white hover:opacity-60 transition-opacity duration-200"
          style={{ letterSpacing: '-0.02em' }}
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden sm:flex items-center gap-5">
          <BracketLink href="/#work" className="text-white" blended>Projects</BracketLink>
          <BracketLink href="/#experience" className="text-white" blended>Experience</BracketLink>
          <BracketLink href="/#about" className="text-white" blended>About</BracketLink>
          <BracketLink href={`mailto:${siteConfig.email}`} className="text-white" blended>Contact</BracketLink>
        </nav>
      </div>
    </header>
  )
}
