'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·+×-><=!?/#%&*'

interface AsciiImageRevealProps {
  src: string
  alt: string
  className?: string
}

export default function AsciiImageReveal({ src, alt, className = '' }: AsciiImageRevealProps) {
  const [revealed, setRevealed] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const rafRef = useRef<number>()

  // Observe intersection
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Draw ASCII grid on canvas — fills container edge-to-edge
  useEffect(() => {
    if (!inView) return
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const fontSize = 9
    const lineHeight = fontSize + 1
    const charWidth = fontSize * 0.6
    const cols = Math.ceil(w / charWidth) + 1
    const rows = Math.ceil(h / lineHeight) + 1

    function draw() {
      if (!ctx) return
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `bold ${fontSize}px "Courier New", monospace`
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'rgba(255,255,255,0.35)'

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ch = CHARS[(Math.random() * CHARS.length) | 0]
          ctx.fillText(ch, col * charWidth, row * lineHeight)
        }
      }
    }

    draw()
    // Scramble at ~15fps for living texture
    intervalRef.current = setInterval(draw, 70)

    // Reveal after delay
    const revealTimer = setTimeout(() => {
      clearInterval(intervalRef.current)
      setRevealed(true)
    }, 800)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(revealTimer)
    }
  }, [inView])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* ASCII canvas — fills entire container */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        style={{
          opacity: revealed ? 0 : 1,
          transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: 'none',
        }}
      />

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03]"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'scale(1)' : 'scale(1.02)',
          transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s, transform 1.6s cubic-bezier(0.25,0.1,0.25,1)',
        }}
      />
    </div>
  )
}
