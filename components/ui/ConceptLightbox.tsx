'use client'

import { useEffect, useCallback } from 'react'

interface ConceptItem {
  title: string
  body: string
  status?: 'winner' | 'tested' | ''
  image?: string
}

interface ConceptLightboxProps {
  items: ConceptItem[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ConceptLightbox({ items, activeIndex, onClose, onNavigate }: ConceptLightboxProps) {
  const item = items[activeIndex]
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < items.length - 1

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrev) onNavigate(activeIndex - 1)
    if (e.key === 'ArrowRight' && hasNext) onNavigate(activeIndex + 1)
  }, [onClose, onNavigate, activeIndex, hasPrev, hasNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[960px] mx-auto px-8 flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute -top-2 right-8 md:right-0 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="w-full max-h-[60vh] flex items-center justify-center mb-8 mt-4">
          {item.image ? (
            <img src={item.image} alt={item.title} className="max-w-full max-h-[60vh] object-contain" />
          ) : (
            <div className="w-full h-[400px] bg-white/5 flex items-center justify-center">
              <span className="text-white/30 font-mono text-[10px] tracking-[0.1em]">Image placeholder</span>
            </div>
          )}
        </div>

        <div className="text-center max-w-[600px]">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h3 className="font-display font-extralight text-[22px] md:text-[28px] text-white leading-[1.15]"
              style={{ letterSpacing: '0.02em' }}>
              {item.title}
            </h3>
            {item.status && (
              <span className={`font-mono text-[9px] tracking-[0.1em] px-3 py-1 ${
                item.status === 'winner' ? 'bg-white text-black' : 'border border-white/30 text-white/70'
              }`}>
                {item.status === 'winner' ? 'Shipped' : 'Tested'}
              </span>
            )}
          </div>
          <p className="font-display text-[14px] font-light text-white/60 leading-[1.6] tracking-[0.03em]">{item.body}</p>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => hasPrev && onNavigate(activeIndex - 1)}
            disabled={!hasPrev}
            className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 ${
              hasPrev ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Previous concept"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`h-px transition-all duration-200 ${
                  i === activeIndex ? 'bg-white w-6' : 'bg-white/30 w-3 hover:bg-white/50'
                }`}
                aria-label={`Go to concept ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => hasNext && onNavigate(activeIndex + 1)}
            disabled={!hasNext}
            className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 ${
              hasNext ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Next concept"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
