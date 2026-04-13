'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'

interface BracketLinkProps {
  href: string
  children: string
  className?: string
  external?: boolean
  /** Set true when inside a mix-blend-mode: exclusion parent (e.g., nav) */
  blended?: boolean
}

function shuffleString(str: string): string {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

export default function BracketLink({ href, children, className = '', external, blended }: BracketLinkProps) {
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

  // When inside blend-mode: exclusion, use white bg + black text (blend inverts it to look black bg + white text)
  // Otherwise use theme vars so it works in both light and dark sections
  const hoverBg = blended ? '#ffffff' : 'var(--text)'
  const hoverColor = blended ? '#000000' : 'var(--bg)'

  const style: React.CSSProperties = {
    backgroundColor: hovered ? hoverBg : 'transparent',
    color: hovered ? hoverColor : 'var(--text)',
    transition: 'background-color 0.08s, color 0.08s',
  }

  const inner = (
    <span className="px-1.5 py-0.5 inline-block">[{display}]</span>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-mono text-[14px] font-medium tracking-[0.08em] inline-block cursor-pointer ${className}`}
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
      className={`font-mono text-[14px] font-medium tracking-[0.08em] inline-block cursor-pointer ${className}`}
      style={style}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {inner}
    </Link>
  )
}
