'use client'

import { useEffect, useRef, useState } from 'react'

interface TextScrambleProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number   // ms before starting
  speed?: number   // ms per character resolve
}

const GLYPHS = '■□▪▫▬▮▯░▒▓█▀▄▌▐─│┌┐└┘├┤┬┴┼'

export default function TextScramble({
  text,
  className = '',
  style,
  delay = 0,
  speed = 30,
}: TextScrambleProps) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    const chars = text.split('')
    const resolved = new Array(chars.length).fill(false)
    let resolvedCount = 0
    const startTime = performance.now()

    function tick() {
      const elapsed = performance.now() - startTime
      const shouldResolve = Math.floor(elapsed / speed)

      // Resolve characters left to right
      while (resolvedCount < shouldResolve && resolvedCount < chars.length) {
        resolved[resolvedCount] = true
        resolvedCount++
      }

      // Build display string
      const output = chars.map((char, i) => {
        if (resolved[i]) return char
        if (char === ' ') return ' '
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }).join('')

      setDisplay(output)

      if (resolvedCount < chars.length) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [started, text, speed])

  if (!started) return <span className={className} style={{ ...style, opacity: 0 }}>{text}</span>

  return <span className={className} style={style}>{display}</span>
}
