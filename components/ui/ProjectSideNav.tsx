'use client'

import Link from 'next/link'

interface ProjectSideNavProps {
  prev: { slug: string; title: string }
  next: { slug: string; title: string }
}

function NavLink({
  href,
  label,
  direction,
}: {
  href: string
  label: string
  direction: 'prev' | 'next'
}) {
  // Arrows: ▴ (up) for prev, ▾ (down) for next
  const arrow = direction === 'prev' ? '\u25B4' : '\u25BE'
  const text = direction === 'prev' ? `[${arrow} ${label}]` : `[${label} ${arrow}]`

  return (
    <Link
      href={href}
      className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-th-text3 transition-colors duration-200 hover:text-th-text whitespace-nowrap"
    >
      <span className="relative px-2 py-1 inline-block overflow-hidden">
        <span className="absolute inset-0 bg-th-text origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
        <span className="relative group-hover:text-th-bg transition-colors duration-200">
          {text}
        </span>
      </span>
    </Link>
  )
}

export default function ProjectSideNav({ prev, next }: ProjectSideNavProps) {
  return (
    <div
      className="fixed left-5 top-1/2 z-40 hidden lg:flex flex-col items-start gap-3"
      style={{ transform: 'translateY(-50%)' }}
    >
      <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <NavLink href={`/work/${prev.slug}`} label={prev.title} direction="prev" />
      </div>
      <div className="w-px h-4 bg-th-border ml-3" />
      <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <NavLink href={`/work/${next.slug}`} label={next.title} direction="next" />
      </div>
    </div>
  )
}
