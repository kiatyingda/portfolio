'use client'

import { useEffect, useRef, useCallback } from 'react'

// Brightness → character mapping (light to dark)
const CHARS = ' .·:;+*#%@'

export default function AsciiCover({ src, className }: { src: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const render = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)

      // Character grid sizing
      const fontSize = 8
      const font = `${fontSize}px "SF Mono", "Fira Mono", "Cascadia Mono", monospace`
      ctx.font = font
      const charWidth = ctx.measureText('M').width
      const lineHeight = fontSize * 1.35

      const cols = Math.floor(rect.width / charWidth)
      const rows = Math.floor(rect.height / lineHeight)

      // Sample source image at grid resolution — composite onto black
      // to handle RGBA images with transparency
      const sample = document.createElement('canvas')
      sample.width = cols
      sample.height = rows
      const sCtx = sample.getContext('2d')!
      sCtx.fillStyle = '#000000'
      sCtx.fillRect(0, 0, cols, rows)
      sCtx.drawImage(img, 0, 0, cols, rows)
      const data = sCtx.getImageData(0, 0, cols, rows).data

      // Clear canvas — black bg
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.font = font
      ctx.textBaseline = 'top'

      // Build lines for pretext-style layout
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          // Perceived luminance
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255
          const ci = Math.floor(lum * (CHARS.length - 1))
          const ch = CHARS[ci]

          if (ch !== ' ') {
            // Brighter pixels → higher opacity + denser char
            const alpha = 0.25 + lum * 0.75
            ctx.fillStyle = `rgba(240, 240, 240, ${alpha})`
            ctx.fillText(ch, x * charWidth, y * lineHeight)
          }
        }
      }
    }
    img.src = src
  }, [src])

  useEffect(() => {
    render()
    const ro = new ResizeObserver(render)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [render])

  return (
    <div ref={containerRef} className={`w-full h-full ${className || ''}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
