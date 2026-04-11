'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface BeforeAfterProps {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  device?: 'ipad' | 'none'
  className?: string
}

// Skew angle in degrees — how much the divider leans
const SKEW = 8

export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  device = 'none',
  className = '',
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(4, Math.min(clientX - rect.left, rect.width - 4))
    setPos((x / rect.width) * 100)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true)
    updatePos(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [updatePos])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    updatePos(e.clientX)
  }, [dragging, updatePos])

  const onPointerUp = useCallback(() => {
    setDragging(false)
  }, [])

  // Preload images
  useEffect(() => {
    const img1 = new Image(); img1.onload = () => setBeforeLoaded(true); img1.src = before
    const img2 = new Image(); img2.onload = () => setAfterLoaded(true); img2.src = after
  }, [before, after])

  // Slanted clip-path: a parallelogram leaning right by SKEW degrees
  // tan(8°) ≈ 0.1405 — the horizontal offset as fraction of height
  const skewOffset = Math.tan((SKEW * Math.PI) / 180) * 100 // in % of height
  const beforeClip = `polygon(0 0, calc(${pos}% + ${skewOffset / 2}vh) 0, calc(${pos}% - ${skewOffset / 2}vh) 100%, 0 100%)`

  const content = (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden ${device === 'none' ? 'rounded-[4px]' : ''}`}
      style={{ cursor: dragging ? 'grabbing' : 'ew-resize' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* After image (full, background) */}
      <div className="relative w-full">
        {afterLoaded ? (
          <img src={after} alt={afterLabel} className="w-full block" draggable={false} />
        ) : (
          <div className="w-full aspect-[4/3] bg-th-bg3" />
        )}
      </div>

      {/* Before image (slanted clip) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: beforeClip }}
      >
        {beforeLoaded ? (
          <img
            src={before}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-th-bg2" />
        )}
      </div>

      {/* Slanted divider line */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{
          left: `${pos}%`,
          transform: 'translateX(-50%)',
          width: '3px',
        }}
      >
        <div
          className="h-full bg-white/80"
          style={{
            transform: `skewX(-${SKEW}deg)`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Handle circle on the divider */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          left: `${pos}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4L2 9L6 14" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4L16 9L12 14" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <span className="font-sans text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/50 text-white/70 backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="font-sans text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/50 text-white/70 backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>
    </div>
  )

  if (device === 'ipad') {
    return (
      <div className={`${className}`}>
        <div className="mx-auto" style={{ maxWidth: 720, filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.4))' }}>
          <div className="rounded-[20px] md:rounded-[28px] border border-th-border overflow-hidden" style={{ background: 'var(--bg-3)' }}>
            <div className="h-5 md:h-7 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--bg-4)', opacity: 0.5 }} />
            </div>
            {content}
            <div className="h-5 md:h-7 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-th-border" style={{ opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div className={className}>{content}</div>
}
