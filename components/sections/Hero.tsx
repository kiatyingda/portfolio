'use client'

import { useEffect, useRef, useState } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const BIO_PARAS = [
  "I ship complex products at scale — 50M+ users.",
  "I've mentored senior designers at Grab and led Boost/Referral squad at OKX.",
  "At Grab, I was selected 1 of 6 from 120+ designers to elevate design craft by mentoring other designers.",
  "I created a cross-sell and advertising framework adopted across other business squads — still generating revenue.",
  "I drove a 40+ issue cross-vertical quality initiative, and spearheaded a visual overhaul that reduced cancellation by 4pp.",
  "At OKX, I led Boost end-to-end — ~$4B trading volume, ~75% of Web3 growth revenue.",
  "Currently I'm in a small squad, hand-picked to define how AI fits into the design process.",
]

const FONT_SIZE = 20
const LINE_HEIGHT = 32

// Widow balancer — pretext's greedy break can leave 1-2 word orphans on lines
// that look bad ("TO" / "4PP." stranded). Iteratively shrink maxWidth a few
// percent and re-layout, keeping the variant with the fewest orphans.
function balancedLayout(prepared: ReturnType<typeof prepareWithSegments>, maxWidth: number, lineHeight: number) {
  const initial = layoutWithLines(prepared, maxWidth, lineHeight)
  if (initial.lines.length <= 2) return initial

  const orphanRatio = 0.45
  const countOrphans = (lines: { width: number }[]) => {
    const max = Math.max(...lines.map((l) => l.width))
    return lines.filter((l) => l.width > 0 && l.width < max * orphanRatio).length
  }

  let best = initial
  let bestOrphans = countOrphans(initial.lines)
  if (bestOrphans === 0) return initial

  for (let i = 1; i <= 6; i++) {
    const tryWidth = maxWidth * (1 - 0.025 * i)
    const tryResult = layoutWithLines(prepared, tryWidth, lineHeight)
    const tryOrphans = countOrphans(tryResult.lines)
    if (tryOrphans < bestOrphans) {
      best = tryResult
      bestOrphans = tryOrphans
      if (bestOrphans === 0) break
    }
  }
  return best
}

function BodyColumn({ text, fontStr }: { text: string; fontStr: string | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[] | null>(null)

  useEffect(() => {
    if (!fontStr || !ref.current) return
    let cancelled = false
    const prepared = prepareWithSegments(text, fontStr)

    function compute() {
      const el = ref.current
      if (!el) return
      const w = el.offsetWidth
      if (w < 50) return
      // Pretext measures without letter-spacing, but rendering applies 0.02em.
      // Pre-shrink the layout width by ~3% so lines pretext thinks fit don't
      // overflow once tracking is added — prevents single-word orphans.
      const adjustedW = w * 0.97
      const result = balancedLayout(prepared, adjustedW, LINE_HEIGHT)
      if (cancelled) return
      setLines(result.lines.map((l) => l.text))
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(ref.current)
    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [text, fontStr])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-bio-para"
      style={{
        fontSize: `${FONT_SIZE}px`,
        lineHeight: `${LINE_HEIGHT}px`,
        letterSpacing: '0.02em',
        color: 'var(--text)',
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
      }}
    >
      {lines === null ? (
        <span>{text}</span>
      ) : (
        lines.map((t, i) => (
          <div key={i} className="hero-bio-line">
            {t || ' '}
          </div>
        ))
      )}
    </div>
  )
}

export default function Hero() {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [fontStr, setFontStr] = useState<string | null>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!measureRef.current) return
      const cs = getComputedStyle(measureRef.current)
      setFontStr(`${cs.fontSize} ${cs.fontFamily}`)
    })
  }, [])

  return (
    <section
      data-bg="light"
      className="relative min-h-[100svh] flex flex-col justify-center"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 lg:px-10 pt-24 md:pt-28 pb-20 md:pb-24">

        {/* Off-screen measurement element so canvas pulls the exact computed font */}
        <span
          ref={measureRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            fontSize: `${FONT_SIZE}px`,
            fontFamily: 'var(--font-mono), ui-monospace, monospace',
          }}
        >
          0
        </span>

        {/* Screen-reader full bio */}
        <p className="sr-only">{BIO_PARAS.join('\n\n')}</p>

        {/* Magazine 2-column layout — title block + body para 1 in left col,
            body paras 2+3 in right col. Body flows in reading order across columns. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 items-start">

          {/* Column 1 — name + caption + body para 1 + CTA */}
          <div className="space-y-8 md:space-y-10">
            <div>
              <h1
                className="font-bold uppercase leading-[0.95] tracking-[-0.02em]"
                style={{
                  color: 'var(--text)',
                  fontSize: 'clamp(72px, 10vw, 160px)',
                  fontFamily: 'var(--font-roboto), sans-serif',
                  fontWeight: 900,
                }}
              >
                KIAT
                <br />
                YINGDA
              </h1>
              <p
                className="font-mono font-bold tracking-[0.06em] uppercase mt-4 md:mt-5"
                style={{
                  color: 'var(--text)',
                  fontSize: 'clamp(20px, 2vw, 32px)',
                }}
              >
                Lead product designer and builder
              </p>
            </div>

            <BodyColumn text={BIO_PARAS[0]} fontStr={fontStr} />
            <BodyColumn text={BIO_PARAS[1]} fontStr={fontStr} />
          </div>

          {/* Column 2 — Grab details, OKX, closer */}
          <div className="space-y-6">
            <BodyColumn text={BIO_PARAS[2]} fontStr={fontStr} />
            <BodyColumn text={BIO_PARAS[3]} fontStr={fontStr} />
            <BodyColumn text={BIO_PARAS[4]} fontStr={fontStr} />
            <BodyColumn text={BIO_PARAS[5]} fontStr={fontStr} />
            <BodyColumn text={BIO_PARAS[6]} fontStr={fontStr} />
          </div>

        </div>

      </div>

      <a
        href="#experience"
        aria-label="Scroll down"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        className="hero-scroll-hint absolute bottom-8 left-1/2 font-mono"
        style={{
          color: 'var(--text)',
          fontSize: '30px',
          lineHeight: 1,
          padding: '8px 12px',
        }}
      >
        ↓
      </a>
    </section>
  )
}
