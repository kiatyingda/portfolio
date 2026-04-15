'use client'

import { useCallback, useRef, useState } from 'react'

interface ShuffleTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  /** Number of shuffle frames before resolving. Default 8 (~400ms at 50ms per frame). */
  frames?: number
  /** ms per frame. Default 50. */
  frameMs?: number
}

function shuffleString(str: string): string {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

/**
 * Character-shuffle hover effect — mirrors BracketLink's scramble but without
 * the bracketed pill. Shuffles actual characters of the text (no GLYPH pool),
 * resolves back to original after `frames * frameMs` ms.
 */
export default function ShuffleText({
  text,
  className = '',
  style,
  frames = 8,
  frameMs = 50,
}: ShuffleTextProps) {
  const [display, setDisplay] = useState(text)
  const timerRef = useRef<NodeJS.Timeout>()

  const scramble = useCallback(() => {
    let count = 0

    function tick() {
      count++
      if (count < frames) {
        setDisplay(shuffleString(text))
        timerRef.current = setTimeout(tick, frameMs)
      } else {
        setDisplay(text)
      }
    }

    setDisplay(shuffleString(text))
    timerRef.current = setTimeout(tick, frameMs)
  }, [text, frames, frameMs])

  const onEnter = () => {
    clearTimeout(timerRef.current)
    scramble()
  }

  const onLeave = () => {
    clearTimeout(timerRef.current)
    setDisplay(text)
  }

  return (
    <span
      className={className}
      style={style}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {display}
    </span>
  )
}
