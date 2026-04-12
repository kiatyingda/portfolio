'use client'

import { useEffect, useRef, useState } from 'react'
import { prepare, layout } from '@chenglou/pretext'

interface FluidTypeProps {
  text: string
  font?: string
  fontWeight?: number
  minSize?: number
  maxSize?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Renders text that auto-sizes to fill the container width.
 * Uses pretext for pixel-perfect measurement without DOM reflow.
 */
export default function FluidType({
  text,
  font = 'Plus Jakarta Sans',
  fontWeight = 700,
  minSize = 32,
  maxSize = 200,
  className = '',
  style,
}: FluidTypeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(minSize)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function compute() {
      const containerWidth = el!.clientWidth
      if (containerWidth <= 0) return

      // Binary search for the largest font size that fits in one line
      let lo = minSize
      let hi = maxSize
      const weight = fontWeight >= 700 ? 'bold' : fontWeight >= 500 ? '500' : 'normal'

      while (hi - lo > 1) {
        const mid = Math.floor((lo + hi) / 2)
        const fontStr = `${weight} ${mid}px "${font}"`
        const prepared = prepare(text, fontStr)
        const result = layout(prepared, containerWidth, mid * 1.1)

        if (result.lineCount <= 1) {
          lo = mid // fits — try bigger
        } else {
          hi = mid // overflows — try smaller
        }
      }

      setFontSize(lo)
    }

    compute()

    const observer = new ResizeObserver(compute)
    observer.observe(el)
    return () => observer.disconnect()
  }, [text, font, fontWeight, minSize, maxSize])

  return (
    <div ref={containerRef} className={className}>
      <span
        className="font-display font-extralight text-th-text block leading-none"
        style={{
          fontSize: `${fontSize}px`,
          letterSpacing: '0.02em',
          ...style,
        }}
      >
        {text}
      </span>
    </div>
  )
}
