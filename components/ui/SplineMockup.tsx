'use client'

import { useState, useEffect, useRef } from 'react'

interface SplineMockupProps {
  url: string
  className?: string
}

export default function SplineMockup({ url, className = '' }: SplineMockupProps) {
  const [visible, setVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // Listen for Spline's postMessage when scene is ready
    function onMessage(e: MessageEvent) {
      if (iframeRef.current && e.source === iframeRef.current.contentWindow) {
        // Spline sends messages when scene loads — reveal on any message from the iframe
        setVisible(true)
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleLoad = () => {
    // Fallback: if no postMessage received, reveal after delay
    // giving Spline time to load 3D assets past its blue loading screen
    timerRef.current = setTimeout(() => setVisible(true), 3000)
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        ref={iframeRef}
        src={url}
        frameBorder="0"
        className="absolute"
        style={{
          border: 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: 'opacity 0.8s ease',
        }}
        loading="eager"
        title="3D mockup"
        allow="autoplay"
        onLoad={handleLoad}
      />
    </div>
  )
}
