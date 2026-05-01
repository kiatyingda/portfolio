'use client'

import { useRef, useState } from 'react'

export default function ClickToPlayVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [played, setPlayed] = useState(false)

  const handlePlay = () => {
    const v = videoRef.current
    if (!v) return
    v.play()
    setPlayed(true)
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <video
        ref={videoRef}
        src={src}
        playsInline
        controls={played}
        onEnded={() => setPlayed(false)}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {!played && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            transition: 'background 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.55)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
        >
          <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
            <circle cx="44" cy="44" r="43" stroke="white" strokeWidth="1.5" />
            <path d="M36 30 L60 44 L36 58 Z" fill="white" />
          </svg>
        </button>
      )}
    </div>
  )
}
