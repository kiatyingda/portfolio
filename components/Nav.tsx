'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/content/siteConfig'

export default function Nav() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
    setTheme(saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent border-b border-white/[0.06]">
      <div className="max-w-[1136px] mx-auto px-8 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-[16px] text-th-text hover:opacity-70 transition-opacity duration-200"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden sm:flex items-center gap-2">
            {[
              { href: '/#work', label: 'Work' },
              { href: '/#about', label: 'About' },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="font-sans text-[14px] font-medium text-th-text2 hover:text-th-text px-4 py-2 rounded-pill hover:bg-th-chip transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative w-[52px] h-[28px] rounded-pill bg-th-chip transition-colors duration-300 flex-shrink-0"
          >
            {/* Sun icon (left) */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="absolute left-[6px] top-1/2 -translate-y-1/2 text-th-text3 transition-opacity duration-300"
              style={{ opacity: theme === 'dark' ? 1 : 0 }}
            >
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            {/* Moon icon (right) */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="absolute right-[6px] top-1/2 -translate-y-1/2 text-th-text3 transition-opacity duration-300"
              style={{ opacity: theme === 'light' ? 1 : 0 }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            {/* Sliding knob */}
            <div
              className="absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full bg-th-text transition-transform duration-300 ease-out flex items-center justify-center"
              style={{ transform: theme === 'dark' ? 'translateX(24px)' : 'translateX(0)' }}
            >
              {theme === 'dark' ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-th-bg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-th-bg">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
