'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface TextScrambleProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number   // ms before starting
  speed?: number   // ms per character resolve
  hover?: boolean  // re-scramble on hover
}

const GLYPHS = '■□▪▫▬▮▯░▒▓█▀▄▌▐─│┌┐└┘├┤┬┴┼'

export default function TextScramble({
  text,
  className = '',
  style,
  delay = 0,
  speed = 30,
  hover = false,
}: TextScrambleProps) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)
  const [triggerCount, setTriggerCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  const runScramble = useCallback(() => {
    const chars = text.split('')
    const resolved = new Array(chars.length).fill(false)
    let resolvedCount = 0
    const startTime = performance.now()

    function tick() {
      const elapsed = performance.now() - startTime
      const shouldResolve = Math.floor(elapsed / speed)

      while (resolvedCount < shouldResolve && resolvedCount < chars.length) {
        resolved[resolvedCount] = true
        resolvedCount++
      }

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

    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(tick)
  }, [text, speed])

  // Run on mount
  useEffect(() => {
    if (!started) return
    runScramble()
    return () => cancelAnimationFrame(frameRef.current)
  }, [started, runScramble])

  // Re-run on hover trigger
  useEffect(() => {
    if (triggerCount === 0) return
    runScramble()
    return () => cancelAnimationFrame(frameRef.current)
  }, [triggerCount, runScramble])

  const handleMouseEnter = hover ? () => setTriggerCount((c) => c + 1) : undefined

  if (!started) return <span className={className} style={{ ...style, opacity: 0 }}>{text}</span>

  return <span className={className} style={style} onMouseEnter={handleMouseEnter}>{display}</span>
}
