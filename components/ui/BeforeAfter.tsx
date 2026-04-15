'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
// Note: divider tracks the pointer on hover — no click/drag required.

interface BeforeAfterProps {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  device?: 'ipad' | 'phone' | 'none'
  className?: string
  /** Force a fixed aspect ratio on the frame (e.g. '16/10', '1/1'). */
  aspectRatio?: string
  /** How images fit inside the frame when aspectRatio is set. 'cover' crops; 'contain' letterboxes. Default: 'cover'. */
  fit?: 'cover' | 'contain'
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
  aspectRatio,
  fit = 'cover',
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    updatePos(e.clientX)
  }, [updatePos])

  // Preload images
  useEffect(() => {
    const img1 = new Image(); img1.onload = () => setBeforeLoaded(true); img1.src = before
    const img2 = new Image(); img2.onload = () => setAfterLoaded(true); img2.src = after
  }, [before, after])

  // Slanted clip-path: a parallelogram leaning right by SKEW degrees
  // tan(8°) ≈ 0.1405 — the horizontal offset as fraction of height
  const skewOffset = Math.tan((SKEW * Math.PI) / 180) * 100 // in % of height
  const beforeClip = `polygon(0 0, calc(${pos}% + ${skewOffset / 2}vh) 0, calc(${pos}% - ${skewOffset / 2}vh) 100%, 0 100%)`
  const afterClip = `polygon(calc(${pos}% + ${skewOffset / 2}vh) 0, 100% 0, 100% 100%, calc(${pos}% - ${skewOffset / 2}vh) 100%)`

  const content = (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden ${device === 'none' ? 'rounded-[4px]' : ''}`}
      style={{ cursor: 'ew-resize' }}
      onPointerMove={onPointerMove}
    >
      {/* After image (full, background) */}
      <div className="relative w-full" style={aspectRatio ? { aspectRatio } : undefined}>
        {afterLoaded ? (
          <img
            src={after}
            alt={afterLabel}
            className={aspectRatio ? `absolute inset-0 w-full h-full block ${fit === 'contain' ? 'object-contain' : 'object-cover'}` : 'w-full block'}
            draggable={false}
          />
        ) : (
          <div className="w-full aspect-[4/3] bg-th-bg3" />
        )}
      </div>

      {/* Before image (slanted clip) — includes before label so it masks with the divider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: beforeClip }}
      >
        {beforeLoaded ? (
          <img
            src={before}
            alt={beforeLabel}
            className={`absolute inset-0 w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-th-bg2" />
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 bg-black/50 text-white">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* After-side label (inverse clip) — masks when divider sweeps over it */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ clipPath: afterClip }}
      >
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 bg-black text-white">
            {afterLabel}
          </span>
        </div>
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
          className="h-full bg-black"
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
        <div className="w-10 h-10 bg-white flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4L2 9L6 14" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4L16 9L12 14" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

    </div>
  )

  if (device === 'phone') {
    return (
      <div className={className}>
        <div
          className="mx-auto"
          style={{
            border: '12px solid #000',
            borderRadius: '60px',
            overflow: 'hidden',
            backgroundColor: '#000',
          }}
        >
          {content}
        </div>
      </div>
    )
  }

  if (device === 'ipad') {
    return (
      <div className={`${className}`}>
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <div className="border border-th-border overflow-hidden" style={{ background: 'var(--bg-3)' }}>
            <div className="h-5 md:h-7 flex items-center justify-center">
              <div className="w-2 h-2" style={{ background: 'var(--bg-4)', opacity: 0.5 }} />
            </div>
            {content}
            <div className="h-5 md:h-7 flex items-center justify-center">
              <div className="w-8 h-8 border border-th-border" style={{ opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div className={className}>{content}</div>
}
