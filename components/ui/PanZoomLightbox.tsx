'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Hand, Maximize2 } from 'lucide-react'
import PanZoomFrame from './PanZoomFrame'

interface PanZoomLightboxProps {
  /** Path to the video shown as the thumbnail (auto-plays, looped, muted). */
  thumbnailVideo?: string
  /** Path to the image shown as the thumbnail (used if no video). */
  thumbnailImage?: string
  /** Path to the expanded source — opens in a fullscreen pannable lightbox on click. */
  expandedSrc: string
  alt?: string
  /** Thumbnail container height. Defaults to '60vh'. */
  thumbnailHeight?: string
  /** When 'mobile', wrap a thumbnailImage in a phone device frame. */
  thumbnailDevice?: 'mobile'
}

const TUTORIAL_STORAGE_KEY = 'panzoom-tutorial-dismissed'

// Lucide icons sized to optically match the label (24px icon ↔ 13px text).
// Icons inherit currentColor; opacity comes from the parent.
function PanIcon() {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        animation: 'panzoom-drag 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }}
    >
      <Hand size={24} strokeWidth={1.5} />
    </span>
  )
}

function ZoomIcon() {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        animation: 'panzoom-zoom 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }}
    >
      <Maximize2 size={24} strokeWidth={1.5} />
    </span>
  )
}

export default function PanZoomLightbox({
  thumbnailVideo,
  thumbnailImage,
  expandedSrc,
  alt = '',
  thumbnailHeight = '60vh',
  thumbnailDevice,
}: PanZoomLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isPdf = /\.pdf($|\?)/i.test(expandedSrc)

  // Tutorial: show on first open per browser session; dismissal resets when the tab closes.
  // Skip for PDFs — the browser's native viewer has its own controls.
  useEffect(() => {
    if (!isOpen || isPdf) return
    let dismissed = false
    try { dismissed = sessionStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true' } catch {}
    setShowTutorial(!dismissed)
  }, [isOpen, isPdf])

  const dismissTutorial = () => {
    setShowTutorial(false)
    try { sessionStorage.setItem(TUTORIAL_STORAGE_KEY, 'true') } catch {}
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showTutorial) dismissTutorial()
        else setIsOpen(false)
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, showTutorial])

  return (
    <>
      {/* ─── Thumbnail ───────────────────────────────────────
          Layout container is unstyled — no bg band, no border, no fixed height.
          Only the phone/video itself is the click target.
          Phone sizing matches MobileMediaBlock (maxWidth 350px, 60px radius). */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {thumbnailVideo ? (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Inspect framework — open in pan/zoom view"
            style={{
              width: '100%',
              maxWidth: '350px',
              aspectRatio: '9 / 19.5',
              border: '12px solid #000',
              borderRadius: '60px',
              overflow: 'hidden',
              backgroundColor: '#000',
              padding: 0,
              cursor: 'zoom-in',
              display: 'block',
            }}
          >
            <video
              src={thumbnailVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </button>
        ) : thumbnailImage ? (
          thumbnailDevice === 'mobile' ? (
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open document"
              style={{
                width: '100%',
                maxWidth: '350px',
                border: '12px solid #000',
                borderRadius: '60px',
                overflow: 'hidden',
                backgroundColor: '#000',
                padding: 0,
                cursor: 'zoom-in',
                display: 'block',
              }}
            >
              <img
                src={thumbnailImage}
                alt={alt}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open document"
              style={{
                border: 'none',
                padding: 0,
                cursor: 'zoom-in',
                backgroundColor: 'transparent',
                display: 'block',
                width: '100%',
              }}
            >
              <img
                src={thumbnailImage}
                alt={alt}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </button>
          )
        ) : null}
      </div>

      {/* ─── Lightbox modal ────────────────────────────────── */}
      {/* Portal to document.body to escape any parent stacking contexts
          (e.g., the nav's mix-blend-mode would otherwise bleed through). */}
      {mounted && isOpen && createPortal(
        <div
          onClick={() => {
            if (showTutorial) dismissTutorial()
            else setIsOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Framework detail view"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
            isolation: 'isolate',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg)' }}
          >
            {isPdf ? (
              <iframe
                src={expandedSrc}
                title={alt || 'Document'}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block', backgroundColor: '#fff' }}
              />
            ) : (
              <PanZoomFrame src={expandedSrc} alt={alt} height="100%" />
            )}
          </div>

          {/* ─── Tutorial overlay — first open only ────────────
              Translucent dimmer over the framework with floating text.
              No box, no border — just instructions hovering over the work. */}
          {showTutorial && (
            <div
              onClick={(e) => { e.stopPropagation(); dismissTutorial() }}
              role="dialog"
              aria-label="How to inspect the framework"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.55)',
                zIndex: 10001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                cursor: 'pointer',
              }}
            >
              <style>{`
                @keyframes panzoom-drag {
                  0%, 100% { transform: translate(0, -2px); }
                  25% { transform: translate(2px, 0); }
                  50% { transform: translate(0, 2px); }
                  75% { transform: translate(-2px, 0); }
                }
                @keyframes panzoom-zoom {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.18); }
                }
              `}</style>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(255,255,255,0.92)' }}>
                <div
                  style={{
                    display: 'inline-grid',
                    gridTemplateColumns: 'auto auto',
                    columnGap: 22,
                    rowGap: 26,
                    alignItems: 'center',
                    justifyItems: 'start',
                  }}
                >
                  <PanIcon />
                  <span className="font-mono text-[13px] tracking-[0.14em] uppercase">PAN</span>
                  <ZoomIcon />
                  <span className="font-mono text-[13px] tracking-[0.14em] uppercase">ZOOM</span>
                </div>
                <p
                  className="font-mono text-[10px] tracking-[0.16em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.5)', marginTop: 40 }}
                >
                  [ CLICK ANYWHERE TO BEGIN ]
                </p>
              </div>
            </div>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
            aria-label="Close framework view"
            className="font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-2"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            [ CLOSE · ESC ]
          </button>
        </div>,
        document.body
      )}
    </>
  )
}
