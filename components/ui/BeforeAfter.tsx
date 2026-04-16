'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface BeforeAfterProps {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  device?: 'ipad' | 'phone' | 'none'
  className?: string
  aspectRatio?: string
  fit?: 'cover' | 'contain'
}

// Skew angle in degrees — how much the divider leans
const SKEW = 8
// Extra % to extend tracking beyond each container edge so the divider fully exits before you hit the wall
const EXTEND = 12
const LERP_SPEED = 0.15

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
  const [isHovering, setIsHovering] = useState(false)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)

  // LERP animation refs — avoid triggering re-renders per frame
  const targetPos = useRef(50)
  const currentPos = useRef(50)
  const animRef = useRef<number | null>(null)

  const animateLerp = useCallback(() => {
    const diff = targetPos.current - currentPos.current
    if (Math.abs(diff) < 0.05) {
      currentPos.current = targetPos.current
      setPos(targetPos.current)
      animRef.current = null
      return
    }
    currentPos.current += diff * LERP_SPEED
    setPos(currentPos.current)
    animRef.current = requestAnimationFrame(animateLerp)
  }, [])

  // Position formula mirrors impeccable.style:
  // mapping container width → [-EXTEND%, 100+EXTEND%] so the cursor reaching
  // either edge already drives the divider fully off-screen
  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * (100 + 2 * EXTEND) - EXTEND
    targetPos.current = pct
    if (!animRef.current) {
      animRef.current = requestAnimationFrame(animateLerp)
    }
  }, [animateLerp])

  // Global pointermove while hovering — cursor can travel outside the component
  useEffect(() => {
    if (!isHovering) return
    const handler = (e: PointerEvent) => updatePos(e.clientX)
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [isHovering, updatePos])

  // Cancel RAF on unmount
  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  // Preload images
  useEffect(() => {
    const img1 = new Image(); img1.onload = () => setBeforeLoaded(true); img1.src = before
    const img2 = new Image(); img2.onload = () => setAfterLoaded(true); img2.src = after
  }, [before, after])

  // Slanted clip-path: a parallelogram leaning right by SKEW degrees
  const skewOffset = Math.tan((SKEW * Math.PI) / 180) * 100 // in % of height
  const beforeClip = `polygon(0 0, calc(${pos}% + ${skewOffset / 2}vh) 0, calc(${pos}% - ${skewOffset / 2}vh) 100%, 0 100%)`
  const afterClip = `polygon(calc(${pos}% + ${skewOffset / 2}vh) 0, 100% 0, 100% 100%, calc(${pos}% - ${skewOffset / 2}vh) 100%)`

  const content = (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden ${device === 'none' ? 'rounded-[4px]' : ''}`}
      style={{ cursor: 'ew-resize' }}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
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

      {/* Handle on the divider */}
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
