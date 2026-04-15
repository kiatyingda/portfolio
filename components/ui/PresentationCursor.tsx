'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Toggle with Shift+P. When on, hides the default cursor and renders a
 * `+` crosshair plus a trail of smaller/fainter `+` glyphs that follow
 * with progressive lag — makes pointing legible on a shared screen.
 * mix-blend-mode: difference auto-inverts over dark and light sections.
 */

// Trail tiers — bigger, slower, all solid black with thin mono weight.
const TRAIL = [
  { size: 28, opacity: 1, weight: 400, ease: 0.10 },
  { size: 22, opacity: 0.75, weight: 400, ease: 0.07 },
  { size: 16, opacity: 0.5, weight: 400, ease: 0.045 },
]

export default function PresentationCursor() {
  const [active, setActive] = useState(false)
  const crosshairRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  const target = useRef({ x: -100, y: -100 })
  const trailPos = useRef(TRAIL.map(() => ({ x: -100, y: -100 })))
  const rafId = useRef<number>()

  // Shake detection — macOS-style "find my cursor" boost
  const history = useRef<{ t: number; x: number; y: number }[]>([])
  const boost = useRef(1) // current scale multiplier (1 = rest, up to ~3 on shake)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault()
        setActive((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!active) {
      document.body.style.cursor = ''
      return
    }
    document.body.style.cursor = 'none'

    function onMove(e: MouseEvent) {
      target.current.x = e.clientX
      target.current.y = e.clientY

      // Record move for shake detection; keep only the last 400ms
      const now = performance.now()
      history.current.push({ t: now, x: e.clientX, y: e.clientY })
      while (history.current.length > 0 && now - history.current[0].t > 400) {
        history.current.shift()
      }

      // Count direction flips on dx across the window + total distance travelled
      let flips = 0
      let lastSign = 0
      let dist = 0
      for (let i = 1; i < history.current.length; i++) {
        const dx = history.current[i].x - history.current[i - 1].x
        const dy = history.current[i].y - history.current[i - 1].y
        dist += Math.hypot(dx, dy)
        const s = Math.sign(dx)
        if (s !== 0 && lastSign !== 0 && s !== lastSign) flips++
        if (s !== 0) lastSign = s
      }
      // Trigger shake: ≥3 direction reversals AND ≥200px of motion inside the window
      if (flips >= 3 && dist >= 200) {
        boost.current = Math.min(3, boost.current + 1.2)
      }
    }

    function tick() {
      // Decay boost toward 1 each frame
      boost.current += (1 - boost.current) * 0.12

      if (crosshairRef.current) {
        const t = target.current
        const s = boost.current
        crosshairRef.current.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%) scale(${s})`
      }

      // Each trail glyph chases the PREVIOUS one (head chases pointer),
      // so the tail naturally lags further back the deeper it sits.
      for (let i = 0; i < trailPos.current.length; i++) {
        const prev = i === 0 ? target.current : trailPos.current[i - 1]
        const p = trailPos.current[i]
        const ease = TRAIL[i].ease
        p.x += (prev.x - p.x) * ease
        p.y += (prev.y - p.y) * ease
        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      document.body.style.cursor = ''
    }
  }, [active])

  if (!active) return null

  // Thin SVG `+` — two 1.25px strokes, scales with size prop.
  const SvgPlus = ({ size, opacity = 1 }: { size: number; opacity?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', opacity }}>
      <line x1="12" y1="3" x2="12" y2="21" stroke="#000" strokeWidth="1.25" strokeLinecap="butt" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="#000" strokeWidth="1.25" strokeLinecap="butt" />
    </svg>
  )

  return (
    <>
      {/* Head — thin-stroke `+` at exact pointer position */}
      <div
        ref={crosshairRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          userSelect: 'none',
          willChange: 'transform',
        }}
      >
        <SvgPlus size={32} />
      </div>

      {/* Trail — thin-stroke black `+`, behind the head, slow follow */}
      {TRAIL.map((tier, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          aria-hidden
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 9998 - i,
            userSelect: 'none',
            willChange: 'transform',
          }}
        >
          <SvgPlus size={tier.size} opacity={tier.opacity} />
        </div>
      ))}

      {/* State confirmation tag — bottom-left corner */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          padding: '4px 8px',
          backgroundColor: '#000',
          color: '#fff',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      >
        [ POINTING · SHIFT+P ]
      </div>
    </>
  )
}
