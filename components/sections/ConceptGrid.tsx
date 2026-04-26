'use client'

import { useRef, useState } from 'react'
import { MiniPhoneSketch } from '@/components/ui/ImagePlaceholder'
import RideTypeMotion from '@/components/ui/RideTypeMotion'

interface ConceptItem {
  title: string
  body: string
  status?: 'winner' | 'tested' | ''
  image?: string
  video?: string
  animation?: 'ride-type-select'
}

interface ConceptGridProps {
  items: ConceptItem[]
  cols?: number
}

function ConceptCard({ item }: { item: ConceptItem }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnter = () => {
    setHovered(true)
    videoRef.current?.play()
  }
  const handleLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="p-6 border border-th-border relative text-left group hover:bg-th-bg2 transition-colors duration-200 flex flex-col h-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="flex-1 mb-4 flex justify-center items-center">
        {item.animation === 'ride-type-select' && !hovered ? (
          <RideTypeMotion />
        ) : item.video ? (
          // Phone frame — only for videos (device interactions)
          <div style={{
            maxWidth: '220px',
            border: '12px solid #000',
            borderRadius: '30px',
            overflow: 'hidden',
            backgroundColor: '#000',
          }}>
            <video
              ref={videoRef}
              src={item.video}
              loop
              muted
              playsInline
              className="transition-opacity duration-300"
              style={{ width: '100%', height: 'auto', display: 'block', opacity: hovered ? 1 : 0.35 }}
            />
          </div>
        ) : item.image ? (
          // No frame for images — show at natural size
          <img
            src={item.image}
            alt={item.title}
            className="transition-opacity duration-300 w-full"
            style={{ height: 'auto', display: 'block', opacity: hovered ? 1 : 0.7 }}
          />
        ) : (
          <MiniPhoneSketch />
        )}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--text)' }}>{item.title}</p>
        {item.status && (
          <span className={`font-mono text-[9px] tracking-[0.1em] px-2 py-0.5 ${
            item.status === 'winner' ? 'bg-th-text text-th-bg' : 'border border-th-border text-th-text'
          }`}>
            {item.status === 'winner' ? 'Shipped' : 'Tested'}
          </span>
        )}
      </div>
      <p className="font-display text-[13px] font-normal leading-[1.6] tracking-[0.02em]" style={{ color: 'var(--text-3)' }}>{item.body}</p>
    </div>
  )
}

export default function ConceptGrid({ items, cols }: ConceptGridProps) {
  const colClass = cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
  const isOddIn2Col = cols === 2 && items.length % 2 !== 0
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4 mt-10`}>
      {items.map((item, i) => (
        <div key={i} className={`h-full flex flex-col${isOddIn2Col && i === items.length - 1 ? ' md:col-span-2' : ''}`}>
          <ConceptCard item={item} />
        </div>
      ))}
    </div>
  )
}
