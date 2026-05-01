'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'

interface BracketLinkProps {
  href: string
  children: string
  className?: string
  external?: boolean
  /** @deprecated legacy blend-mode path — retained for any callers still passing it */
  blended?: boolean
  /** Explicit foreground color (e.g. nav sets pure '#000' or '#fff' based on current section). */
  fg?: string
  /** Append a right-arrow icon after the text — for CTA links. */
  arrow?: boolean
}

function shuffleString(str: string): string {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

export default function BracketLink({ href, children, className = '', external, blended, fg, arrow }: BracketLinkProps) {
  const [display, setDisplay] = useState(children)
  const [hovered, setHovered] = useState(false)
  const frameRef = useRef<NodeJS.Timeout>()

  const scramble = useCallback(() => {
    const original = children
    let count = 0
    const maxShuffles = 8

    function tick() {
      count++
      if (count < maxShuffles) {
        setDisplay(shuffleString(original))
        frameRef.current = setTimeout(tick, 50) // ~50ms per frame = ~400ms total
      } else {
        setDisplay(original)
      }
    }

    setDisplay(shuffleString(original))
    frameRef.current = setTimeout(tick, 50)
  }, [children])

  const onEnter = () => {
    setHovered(true)
    clearTimeout(frameRef.current)
    scramble()
  }

  const onLeave = () => {
    setHovered(false)
    clearTimeout(frameRef.current)
    setDisplay(children)
  }

  // Priority: explicit fg prop (nav crisp-color mode) > blended legacy > theme vars.
  // When fg is set, invert on hover: fill with fg, text becomes the opposite.
  const restColor = fg ?? (blended ? 'rgba(255,255,255,0.7)' : 'var(--text)')
  const hoverBg = fg ?? (blended ? '#ffffff' : 'var(--text)')
  const hoverColor = fg
    ? (fg === '#ffffff' || fg.toLowerCase() === '#fff' ? '#000000' : '#ffffff')
    : (blended ? '#000000' : 'var(--bg)')

  const style: React.CSSProperties = {
    backgroundColor: hovered ? hoverBg : 'transparent',
    color: hovered ? hoverColor : restColor,
    transition: 'background-color 0.08s, color 0.3s cubic-bezier(0.4,0,0.2,1)',
  }

  const inner = (
    <span className="px-1.5 py-0.5 inline-block">
      {display}
      {arrow && <span className="ml-2">→</span>}
    </span>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-mono text-[13px] font-bold tracking-[0.08em] inline-block cursor-pointer ${className}`}
        style={style}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={`font-mono text-[13px] font-bold tracking-[0.08em] inline-block cursor-pointer ${className}`}
      style={style}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {inner}
    </Link>
  )
}
