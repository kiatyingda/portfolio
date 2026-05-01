'use client'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface PanZoomFrameProps {
  src: string
  alt?: string
  /** Container height. Use viewport units (e.g. '78vh') for cinematic framing. */
  height?: string
  /** Min/max zoom levels. */
  minScale?: number
  maxScale?: number
}

export default function PanZoomFrame({
  src,
  alt = '',
  height = '78vh',
  minScale = 1,
  maxScale = 5,
}: PanZoomFrameProps) {
  return (
    <div
      className="relative w-full"
      style={{
        height,
        backgroundColor: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <TransformWrapper
        minScale={minScale}
        maxScale={maxScale}
        initialScale={1}
        centerOnInit
        doubleClick={{ mode: 'zoomIn', step: 0.7 }}
        wheel={{ step: 0.15 }}
        pinch={{ step: 5 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <img
                src={src}
                alt={alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
                draggable={false}
              />
            </TransformComponent>

            {/* Editorial controls — bracket-notation, mono, no rounded corners */}
            <div
              className="absolute bottom-4 right-4 flex gap-2 z-10"
              style={{ pointerEvents: 'auto' }}
            >
              <button
                onClick={() => zoomOut()}
                aria-label="Zoom out"
                className="font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-2"
                style={{
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                [ − ]
              </button>
              <button
                onClick={() => zoomIn()}
                aria-label="Zoom in"
                className="font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-2"
                style={{
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                [ + ]
              </button>
              <button
                onClick={() => resetTransform()}
                aria-label="Reset zoom"
                className="font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-2"
                style={{
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                [ RESET ]
              </button>
            </div>

            {/* Hint label — top-left, low contrast */}
            <p
              className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.14em] uppercase z-10 pointer-events-none"
              style={{ color: 'var(--text-3)' }}
            >
              [ DRAG · SCROLL · DOUBLE-CLICK TO ZOOM ]
            </p>
          </>
        )}
      </TransformWrapper>
    </div>
  )
}
