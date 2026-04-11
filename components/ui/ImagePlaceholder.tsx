'use client'

import { useState, useEffect } from 'react'

interface ImagePlaceholderProps {
  label?: string
  caption?: string
  aspect?: 'video' | 'square' | 'portrait' | '4/3'
  device?: 'mobile' | 'desktop' | 'split' | 'none'
  src?: string           // image path, e.g. "/images/grab-cover.png"
  srcAfter?: string      // second image for split (before/after)
  className?: string
}

const aspectMap = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[9/16]',
  '4/3': 'aspect-[4/3]',
}

function useImageLoaded(src?: string) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!src) { setLoaded(false); return }
    setLoaded(false)
    const img = document.createElement('img')
    img.onload = () => setLoaded(true)
    img.onerror = () => setLoaded(false)
    img.src = src
  }, [src])
  return loaded
}

function baseName(path?: string) {
  if (!path) return null
  return path.split('/').pop() ?? null
}

// ─── Phone with real screenshot ──────────────────────────────────
function PhoneImage({ src, dim = false }: { src: string; dim?: boolean }) {
  const clipId = `scr-${src.replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="4" y="4" width="192" height="392" rx="27" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="198" height="398" rx="30"
        fill="var(--bg-3)" stroke="var(--border)" strokeWidth="1.5" />
      <image
        href={src} x="4" y="4" width="192" height="392"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
        opacity={dim ? 0.5 : 1}
      />
      <rect x="72" y="13" width="56" height="18" rx="9" fill="rgba(0,0,0,0.85)" />
      <rect x="80" y="384" width="40" height="4" rx="2" fill="var(--bg-4)" opacity="0.5" />
    </svg>
  )
}

// ─── Desktop with real screenshot ────────────────────────────────
function DesktopImage({ src }: { src: string }) {
  const clipId = `desk-${src.replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg
      viewBox="0 0 720 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="1" y="42" width="718" height="406" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="718" height="448" rx="12"
        fill="var(--bg-3)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="1" y="1" width="718" height="40" rx="12" fill="var(--bg-4)" opacity="0.65" />
      <rect x="1" y="30" width="718" height="12" fill="var(--bg-4)" opacity="0.65" />
      <circle cx="22" cy="20" r="6" fill="var(--bg-4)" opacity="0.7" />
      <circle cx="42" cy="20" r="6" fill="var(--bg-4)" opacity="0.7" />
      <circle cx="62" cy="20" r="6" fill="var(--bg-4)" opacity="0.7" />
      <rect x="88" y="11" width="544" height="18" rx="9" fill="var(--bg-2)" opacity="0.7" />
      <image
        href={src} x="1" y="42" width="718" height="406"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  )
}

// ─── Phone skeleton placeholder ──────────────────────────────────
function PhoneSketch({ dim = false }: { dim?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <rect x="1" y="1" width="198" height="398" rx="30"
        fill="var(--bg-3)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="72" y="13" width="56" height="18" rx="9" fill="var(--bg-2)" />
      <rect x="16" y="17" width="28" height="8" rx="4" fill="var(--bg-4)" opacity="0.55" />
      <rect x="158" y="17" width="8" height="8" rx="2" fill="var(--bg-4)" opacity="0.5" />
      <rect x="170" y="17" width="14" height="8" rx="4" fill="var(--bg-4)" opacity="0.5" />
      <rect x="2" y="38" width="196" height="44" fill="var(--bg-4)" opacity="0.35" />
      <rect x="15" y="52" width="16" height="8" rx="4" fill="var(--bg-4)" opacity="0.45" />
      <rect x="76" y="53" width="48" height="9" rx="4.5" fill="var(--bg-4)" />
      <rect x="170" y="53" width="14" height="8" rx="4" fill="var(--bg-4)" opacity="0.4" />
      <rect x="10" y="90" width="180" height="112" rx="8" fill="var(--bg-4)" opacity="0.28" />
      <path d="M10 122 h180 M10 154 h180 M70 90 v112 M130 90 v112"
        stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
      <circle cx="100" cy="134" r="9" fill="var(--accent)" opacity={dim ? 0.3 : 0.45} />
      <circle cx="100" cy="134" r="4.5" fill="var(--accent)" opacity={dim ? 0.5 : 0.75} />
      <rect x="14" y="216" width="58" height="8" rx="4" fill="var(--bg-4)" opacity="0.65" />
      <rect x="10" y="232" width="180" height="34" rx="7" fill="var(--bg-4)" opacity="0.3" />
      <rect x="18" y="241" width="20" height="14" rx="4" fill="var(--bg-4)" opacity="0.55" />
      <rect x="46" y="244" width="72" height="7" rx="3.5" fill="var(--bg-4)" opacity="0.5" />
      <rect x="152" y="242" width="28" height="10" rx="5" fill="var(--accent)" opacity={dim ? 0.3 : 0.6} />
      <rect x="10" y="272" width="180" height="34" rx="7" fill="var(--bg-4)" opacity="0.2" />
      <rect x="18" y="281" width="20" height="14" rx="4" fill="var(--bg-4)" opacity="0.45" />
      <rect x="46" y="284" width="88" height="7" rx="3.5" fill="var(--bg-4)" opacity="0.38" />
      <rect x="152" y="282" width="28" height="10" rx="5" fill="var(--bg-4)" opacity="0.38" />
      <rect x="10" y="312" width="180" height="34" rx="7" fill="var(--bg-4)" opacity="0.14" />
      <rect x="18" y="321" width="20" height="14" rx="4" fill="var(--bg-4)" opacity="0.38" />
      <rect x="46" y="324" width="76" height="7" rx="3.5" fill="var(--bg-4)" opacity="0.3" />
      <rect x="152" y="322" width="28" height="10" rx="5" fill="var(--bg-4)" opacity="0.3" />
      <rect x="14" y="352" width="172" height="38" rx="10" fill="var(--accent)" opacity={dim ? 0.3 : 0.65} />
      <rect x="76" y="364" width="48" height="10" rx="5" fill="white" opacity="0.2" />
      <rect x="80" y="384" width="40" height="4" rx="2" fill="var(--bg-4)" opacity="0.45" />
    </svg>
  )
}

// ─── Desktop skeleton placeholder ────────────────────────────────
function DesktopSketch() {
  return (
    <svg
      viewBox="0 0 720 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <rect x="1" y="1" width="718" height="448" rx="12"
        fill="var(--bg-3)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="1" y="1" width="718" height="40" rx="12" fill="var(--bg-4)" opacity="0.65" />
      <rect x="1" y="30" width="718" height="12" fill="var(--bg-4)" opacity="0.65" />
      <circle cx="22" cy="20" r="6" fill="var(--bg-4)" opacity="0.7" />
      <circle cx="42" cy="20" r="6" fill="var(--bg-4)" opacity="0.7" />
      <circle cx="62" cy="20" r="6" fill="var(--bg-4)" opacity="0.7" />
      <rect x="88" y="11" width="544" height="18" rx="9" fill="var(--bg-2)" opacity="0.7" />
      <rect x="102" y="16" width="160" height="8" rx="4" fill="var(--bg-4)" opacity="0.5" />
      <rect x="1" y="42" width="190" height="406" fill="var(--bg-4)" opacity="0.1" />
      <rect x="16" y="58" width="96" height="9" rx="4.5" fill="var(--bg-4)" opacity="0.55" />
      <rect x="16" y="78" width="120" height="9" rx="4.5" fill="var(--bg-4)" opacity="0.4" />
      <rect x="16" y="98" width="104" height="9" rx="4.5" fill="var(--bg-4)" opacity="0.32" />
      <rect x="16" y="118" width="112" height="9" rx="4.5" fill="var(--bg-4)" opacity="0.28" />
      <rect x="16" y="150" width="80" height="8" rx="4" fill="var(--bg-4)" opacity="0.2" />
      <rect x="16" y="168" width="116" height="8" rx="4" fill="var(--bg-4)" opacity="0.2" />
      <rect x="210" y="58" width="220" height="20" rx="10" fill="var(--bg-4)" opacity="0.6" />
      <rect x="210" y="88" width="460" height="10" rx="5" fill="var(--bg-4)" opacity="0.35" />
      <rect x="210" y="106" width="360" height="10" rx="5" fill="var(--bg-4)" opacity="0.25" />
      <rect x="210" y="134" width="144" height="88" rx="10" fill="var(--bg-4)" opacity="0.28" />
      <rect x="222" y="150" width="40" height="18" rx="6" fill="var(--accent)" opacity="0.45" />
      <rect x="222" y="176" width="84" height="8" rx="4" fill="var(--bg-4)" opacity="0.35" />
      <rect x="366" y="134" width="144" height="88" rx="10" fill="var(--bg-4)" opacity="0.28" />
      <rect x="378" y="150" width="40" height="18" rx="6" fill="var(--accent)" opacity="0.35" />
      <rect x="378" y="176" width="84" height="8" rx="4" fill="var(--bg-4)" opacity="0.3" />
      <rect x="522" y="134" width="186" height="88" rx="10" fill="var(--bg-4)" opacity="0.28" />
      <rect x="534" y="150" width="40" height="18" rx="6" fill="var(--accent)" opacity="0.3" />
      <rect x="534" y="176" width="84" height="8" rx="4" fill="var(--bg-4)" opacity="0.25" />
      <rect x="210" y="238" width="498" height="186" rx="10" fill="var(--bg-4)" opacity="0.15" />
      <polyline
        points="230,394 278,366 326,344 374,312 422,274 470,284 518,254 566,234 614,218 662,200"
        stroke="var(--accent)" strokeWidth="2.5" fill="none" opacity="0.55"
        strokeLinejoin="round" strokeLinecap="round" />
      <path
        d="M230,394 278,366 326,344 374,312 422,274 470,284 518,254 566,234 614,218 662,200 L662,404 L230,404 Z"
        fill="var(--accent)" opacity="0.07" />
      {[230, 310, 390, 470, 550, 630].map((x) => (
        <rect key={x} x={x} y={408} width={28} height={6} rx={3} fill="var(--bg-4)" opacity="0.25" />
      ))}
    </svg>
  )
}

// ─── Mini phone for grid cards ───────────────────────────────────
export function MiniPhoneSketch() {
  return (
    <svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 48, height: 96 }}>
      <rect x="0.75" y="0.75" width="78.5" height="158.5" rx="12" fill="var(--bg-3)" stroke="var(--border)" strokeWidth="1" />
      <rect x="28" y="5" width="24" height="8" rx="4" fill="var(--bg-2)" />
      <rect x="2" y="16" width="76" height="18" fill="var(--bg-4)" opacity="0.35" />
      <rect x="26" y="20" width="28" height="6" rx="3" fill="var(--bg-4)" />
      <rect x="4" y="38" width="72" height="48" rx="5" fill="var(--bg-4)" opacity="0.28" />
      <rect x="6" y="96" width="36" height="5" rx="2.5" fill="var(--bg-4)" opacity="0.6" />
      <rect x="6" y="108" width="68" height="5" rx="2.5" fill="var(--bg-4)" opacity="0.38" />
      <rect x="6" y="120" width="56" height="5" rx="2.5" fill="var(--bg-4)" opacity="0.28" />
      <rect x="6" y="136" width="68" height="16" rx="6" fill="var(--accent)" opacity="0.5" />
      <rect x="30" y="150" width="20" height="4" rx="2" fill="var(--bg-4)" opacity="0.4" />
    </svg>
  )
}

// ─── Main component ──────────────────────────────────────────────
export default function ImagePlaceholder({
  label,
  caption,
  aspect = 'video',
  device = 'mobile',
  src,
  srcAfter,
  className = '',
}: ImagePlaceholderProps) {
  const srcOk = useImageLoaded(src)
  const afterOk = useImageLoaded(srcAfter)

  const pending: string[] = []
  if (src && !srcOk) { const n = baseName(src); if (n) pending.push(n) }
  if (srcAfter && !afterOk) { const n = baseName(srcAfter); if (n) pending.push(n) }

  return (
    <div className={className}>
      <div
        className={`${aspectMap[aspect]} w-full relative overflow-hidden rounded-[4px]`}
        style={{ background: 'var(--bg-2)' }}
      >
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(0,0,0,0.18) 100%)' }} />

        {device === 'none' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {srcOk ? (
              <img src={src} alt={label ?? ''} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
                  <defs>
                    <pattern id="grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--text)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
                {label && <span className="label relative z-10" style={{ color: 'var(--text-3)' }}>{label}</span>}
              </>
            )}
          </div>
        )}

        {device === 'mobile' && (
          <div className="absolute inset-0 flex items-center justify-center py-5">
            <div style={{ height: '100%', aspectRatio: '200/400', filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.45))' }}>
              {srcOk ? <PhoneImage src={src!} /> : <PhoneSketch />}
            </div>
          </div>
        )}

        {device === 'split' && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 px-10 py-5">
            <div style={{ height: '94%', aspectRatio: '200/400', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}>
              {srcOk ? <PhoneImage src={src!} dim /> : <PhoneSketch dim />}
            </div>
            <div style={{ height: '94%', aspectRatio: '200/400', filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.45))' }}>
              {afterOk ? <PhoneImage src={srcAfter!} /> : (srcOk && !srcAfter ? <PhoneImage src={src!} /> : <PhoneSketch />)}
            </div>
          </div>
        )}

        {device === 'desktop' && (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div style={{ width: '88%', aspectRatio: '720/450', filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.4))' }}>
              {srcOk ? <DesktopImage src={src!} /> : <DesktopSketch />}
            </div>
          </div>
        )}

        {pending.length > 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {pending.map(name => (
              <span key={name} className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded bg-black/50 text-white/30 backdrop-blur-sm whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {caption && (
        <p className="mt-3 text-[13px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
          {caption}
        </p>
      )}
    </div>
  )
}
