'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'

interface ProjectSideNavProps {
  prev: { slug: string; title: string }
  next: { slug: string; title: string }
}

function shuffleString(str: string): string {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

function SideLink({
  href,
  label,
  side,
}: {
  href: string
  label: string
  side: 'left' | 'right'
}) {
  const [display, setDisplay] = useState(label)
  const [hovered, setHovered] = useState(false)
  const frameRef = useRef<NodeJS.Timeout>()

  const scramble = useCallback(() => {
    let count = 0
    const maxShuffles = 8

    function tick() {
      count++
      if (count < maxShuffles) {
        setDisplay(shuffleString(label))
        frameRef.current = setTimeout(tick, 50)
      } else {
        setDisplay(label)
      }
    }

    setDisplay(shuffleString(label))
    frameRef.current = setTimeout(tick, 50)
  }, [label])

  const onEnter = () => {
    setHovered(true)
    clearTimeout(frameRef.current)
    scramble()
  }

  const onLeave = () => {
    setHovered(false)
    clearTimeout(frameRef.current)
    setDisplay(label)
  }

  return (
    <Link
      href={href}
      className={`fixed top-1/2 z-40 hidden lg:flex items-center font-mono text-[11px] tracking-[0.1em] cursor-pointer ${
        side === 'left' ? 'left-4' : 'right-4'
      }`}
      style={{
        transform: `translateY(-50%) rotate(${side === 'left' ? '-90' : '90'}deg)`,
        transformOrigin: 'center center',
        backgroundColor: hovered ? '#000000' : 'transparent',
        color: hovered ? '#ffffff' : undefined,
        transition: 'background-color 0.08s, color 0.08s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="px-1.5 py-0.5 inline-block">[{display}]</span>
    </Link>
  )
}

export default function ProjectSideNav({ prev, next }: ProjectSideNavProps) {
  return (
    <>
      <SideLink href={`/work/${prev.slug}`} label={`◂ ${prev.title}`} side="left" />
      <SideLink href={`/work/${next.slug}`} label={`${next.title} ▸`} side="right" />
    </>
  )
}
