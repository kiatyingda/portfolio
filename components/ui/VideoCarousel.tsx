'use client'

import { useRef, useState } from 'react'

// iPhone 8: device 67.1 × 138.4mm → ratio 1:2.062
// Top bezel 9%, Screen flex:1, Bottom bezel 13%

const SIDE = 8

function VideoCell({ src, isHovered, isAnyHovered, onEnter, onLeave }: {
  src: string
  isHovered: boolean
  isAnyHovered: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        flexShrink: 0,
        height: '70vh',
        width: 'calc(70vh / 2.062)',
        cursor: 'pointer',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        opacity: isAnyHovered && !isHovered ? 0.5 : 1,
        zIndex: isHovered ? 10 : 1,
        transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
        borderRadius: '32px',
        backgroundColor: '#111',
        boxShadow: isHovered
          ? '0 40px 80px rgba(0,0,0,0.3)'
          : '0 28px 56px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top bezel */}
      <div style={{
        flexShrink: 0,
        height: 'calc(70vh * 0.09)',
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#2c2c2c', flexShrink: 0 }} />
        <div style={{ width: 42, height: 4, borderRadius: 2, backgroundColor: '#1e1e1e', flexShrink: 0 }} />
      </div>

      {/* Screen */}
      <div style={{ flex: 1, minHeight: 0, padding: `0 ${SIDE}px`, display: 'flex' }}>
        <div style={{ flex: 1, overflow: 'hidden', borderRadius: '6px', backgroundColor: '#000' }}>
          <video
            src={src}
            autoPlay
            muted
            playsInline
            loop
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
        </div>
      </div>

      {/* Bottom bezel */}
      <div style={{
        flexShrink: 0,
        height: 'calc(70vh * 0.13)',
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '2px solid #333',
          backgroundColor: '#181818',
        }} />
      </div>
    </div>
  )
}

export default function VideoCarousel({ videos }: { videos: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return
    const amount = trackRef.current.clientWidth * 0.7
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={trackRef}
        className="scrollbar-hide"
        style={{
          display: 'flex',
          gap: '80px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '120px',
          paddingLeft: '120px',
          paddingRight: '120px',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        {videos.map((src, i) => (
          <div key={i} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <VideoCell
              src={src}
              isHovered={hoveredIndex === i}
              isAnyHovered={hoveredIndex !== null}
              onEnter={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          </div>
        ))}
      </div>

      {(['left', 'right'] as const).map((dir) => (
        <button
          key={dir}
          onClick={() => scroll(dir)}
          aria-label={dir === 'left' ? 'Previous' : 'Next'}
          style={{
            position: 'absolute',
            [dir]: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(0,0,0,0.12)',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#000',
            zIndex: 10,
          }}
        >
          {dir === 'left' ? '←' : '→'}
        </button>
      ))}
    </div>
  )
}
