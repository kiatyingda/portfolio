import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProjectBySlug, projects, type CaseStudySection } from '@/content/projects'
import ImagePlaceholder, { MiniPhoneSketch } from '@/components/ui/ImagePlaceholder'
import FadeIn from '@/components/ui/FadeIn'
import ConceptGrid from '@/components/sections/ConceptGrid'
import FluidType from '@/components/ui/FluidType'
import BeforeAfter from '@/components/ui/BeforeAfter'
import BracketLink from '@/components/ui/BracketLink'
import SlideKeyboardNav from '@/components/ui/SlideKeyboardNav'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} — Kiat Yingda`, description: project.summary }
}

// ─── Editorial primitives — Aino Gulled style ───────────────────
// Pure black text, minimal grey only for labels, warm off-white bg

function SLabel({ label }: { label?: string }) {
  if (!label) return null
  return <p className="mb-8"><span className="font-mono text-[12px] font-bold tracking-[0.12em] inline-block px-2 py-1" style={{ backgroundColor: '#000', color: '#fff' }}>[ {label} ]</span></p>
}

function SMega({ text }: { text: string }) {
  return (
    <p className="font-display font-normal text-[22px] md:text-[30px] lg:text-[36px] leading-[1.3] tracking-[0.01em] max-w-[780px]"
      style={{ color: 'var(--text)' }}>{text}</p>
  )
}

function SHeading({ heading }: { heading?: string }) {
  if (!heading) return null
  return <h2 className="font-mono text-[11px] tracking-[0.12em] mb-4" style={{ color: 'var(--text-3)' }}>{heading}</h2>
}

function SBody({ body }: { body?: string | string[] }) {
  if (!body) return null
  const paras = Array.isArray(body) ? body : [body]
  return (
    <div className="max-w-[520px]">
      {paras.map((p, i) => (
        <p key={i} className="font-display text-[14px] md:text-[15px] font-normal leading-[1.75] tracking-[0.015em] mb-5 last:mb-0" style={{ color: 'var(--text)' }}>{p}</p>
      ))}
    </div>
  )
}

// ── Placeholder image — stands in for real screenshots ──────────
function PlaceholderImg({ label, aspect = '16/10', span = 'full' }: { label?: string; aspect?: string; span?: 'full' | 'w4' | 'w2' }) {
  return (
    <div className="w-full relative" style={{ aspectRatio: aspect, backgroundColor: 'var(--bg-2)' }}>
      {label && (
        <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.12em]" style={{ color: 'var(--text-3)' }}>{label}</span>
      )}
    </div>
  )
}

// ── Media block — renders real image, video, or placeholder ─────
function MediaBlock({ image, video, label, aspect = '16/10', maxHeight, natural }: { image?: string; video?: string; label?: string; aspect?: string; maxHeight?: string; natural?: boolean }) {
  if (video) {
    return (
      <div className="flex justify-center">
        <video src={video} autoPlay loop muted playsInline className="w-full h-auto" style={{ backgroundColor: 'var(--bg-2)', maxHeight: maxHeight || '70vh' }} />
      </div>
    )
  }
  if (image) {
    // `natural` — render at intrinsic pixel dimensions, capped only by container width.
    const imgStyle: React.CSSProperties = natural
      ? { backgroundColor: 'var(--bg-2)', width: 'auto', height: 'auto', maxWidth: '100%' }
      : { backgroundColor: 'var(--bg-2)', maxHeight: maxHeight || '70vh', width: 'auto', maxWidth: '100%' }
    return (
      <div className="flex justify-center">
        <img src={image} alt={label || ''} className="h-auto" style={imgStyle} loading="lazy" />
      </div>
    )
  }
  return <PlaceholderImg label={label} aspect={aspect} />
}

// ── Mobile media — black border, rounded, native aspect ratio ───
function MobileMediaBlock({ image, video }: { image?: string; video?: string }) {
  return (
    <div className="flex justify-center">
      <div style={{
        maxWidth: '350px',
        border: '12px solid #000',
        borderRadius: '60px',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}>
        {video ? (
          <video src={video} autoPlay loop muted playsInline
            style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : image ? (
          <img src={image} alt="" loading="lazy"
            style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : null}
      </div>
    </div>
  )
}

const sp = (n: number) => `${n * 1.5}rem`

// Gap between sections — 'tight' cuddles to previous (same thought), 'wide' pauses (new thought).
// Sized for breathing room without creating empty voids on short sections.
const gapTop = (gap?: 'tight' | 'standard' | 'wide') => {
  if (gap === 'tight') return sp(2)
  if (gap === 'wide') return sp(18)
  return sp(10)
}

// ─── Section renderers — story flow with imagery ────────────────

function TextSection({ s, index }: { s: CaseStudySection & { type: 'text' }; index: number }) {
  // Alternate layout: even = heading left + body right, odd = full-width heading then body below
  const isEven = index % 2 === 0
  return (
    <>
      <section className="aino-section" style={{ marginTop: gapTop(s.gap) }}>
        {isEven ? (
          <div className="aino-inner">
            <div className="col-span-6 md:col-span-4">
              {s.heading && <SMega text={s.heading} />}
            </div>
            {s.body && (
              <div className="col-span-6 md:col-span-2 mt-6 md:mt-0">
                {s.label && <SHeading heading={s.label} />}
                <SBody body={s.body} />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="aino-inner">
              <div className="col-span-6">
                {s.heading && <SMega text={s.heading} />}
              </div>
            </div>
            {s.body && (
              <div className="aino-inner" style={{ marginTop: sp(2) }}>
                <div className="hidden md:block md:col-span-2" />
                <div className="col-span-6 md:col-span-3">
                  {s.label && <SHeading heading={s.label} />}
                  <SBody body={s.body} />
                </div>
              </div>
            )}
          </>
        )}
      </section>
      {/* Visual break — only render when there's media */}
      {(s.image || s.video || s.imageHint) && (
        <section className="aino-section" style={{ marginTop: sp(4) }}>
          <div className="aino-inner-wide">
            {s.device === 'mobile' ? (
              <MobileMediaBlock image={s.image} video={s.video} />
            ) : (
              <MediaBlock image={s.image} video={s.video} label={s.imageHint || s.heading || s.label} natural={s.imageNatural} />
            )}
          </div>
        </section>
      )}
    </>
  )
}

function TwoColSection({ s, index }: { s: CaseStudySection & { type: 'twocol' }; index: number }) {
  return (
    <>
      {/* Full-viewport slide: content sits at ~35% from top (flex + padding)
          so there isn't a vast empty band above the heading when centered. */}
      <section data-slide-align="top" className="aino-section flex flex-col justify-start items-stretch" style={{ marginTop: gapTop(s.gap), minHeight: '100vh', paddingTop: '28vh' }}>
        {s.heading && (
          <div className="mx-auto max-w-[1120px] px-8 w-full">
            <p className="font-display font-normal text-[22px] md:text-[30px] lg:text-[36px] leading-[1.3] tracking-[0.01em]"
              style={{ color: 'var(--text)', textWrap: 'balance' } as React.CSSProperties}>{s.heading}</p>
          </div>
        )}
        {s.left && s.right && (
          <div className="mx-auto max-w-[1120px] px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" style={{ marginTop: sp(2) }}>
            {[s.left, s.right].map((col, i) => (
              <div key={i}>
                <SHeading heading={col.heading} />
                <p className="font-display text-[14px] md:text-[15px] font-normal leading-[1.75] tracking-[0.015em]" style={{ color: 'var(--text)' }}>{col.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Image after two-col text — only render when there's media */}
      {(s.image || s.video || s.imageHint || s.imageHintLeft) && (
        <section className="aino-section" style={{ marginTop: sp(4) }}>
          {s.device === 'mobile' ? (
            <div className="aino-inner-wide">
              <MobileMediaBlock image={s.image} video={s.video} />
            </div>
          ) : (
            <div className="aino-inner-wide">
              <MediaBlock image={s.image} video={s.video} label={s.heading} />
            </div>
          )}
        </section>
      )}
    </>
  )
}

function StatsSection({ s }: { s: CaseStudySection & { type: 'stats' } }) {
  return (
    <section className="aino-section" style={{ marginTop: gapTop(s.gap), paddingTop: sp(4), paddingBottom: sp(4) }}>
      <div className="mx-auto max-w-[1120px] px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {s.stats && s.stats.map((stat, i) => (
            <div key={i}>
              <p className="font-display font-medium text-[48px] md:text-[64px] lg:text-[80px] leading-none mb-2"
                style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>{stat.value}</p>
              <p className="font-display text-[13px] font-normal tracking-[0.02em] max-w-[280px]" style={{ color: 'var(--text)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
        {s.insight && (
          <div style={{ marginTop: sp(2) }}>
            <SMega text={s.insight} />
          </div>
        )}
      </div>
    </section>
  )
}

function ColumnsSection({ s }: { s: CaseStudySection & { type: 'columns' } }) {
  return (
    <section className="aino-section" style={{ marginTop: gapTop(s.gap) }}>
      <div className="aino-inner">
        {s.heading && <div className="col-span-6 mb-6"><SHeading heading={s.heading} /></div>}
        {s.columns && s.columns.map((col, i) => (
          <div key={i} className="col-span-6 md:col-span-2">
            <SHeading heading={col.heading} />
            <p className="font-display text-[14px] md:text-[15px] font-normal leading-[1.75] tracking-[0.015em]" style={{ color: 'var(--text)' }}>{col.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function GridSection({ s }: { s: CaseStudySection & { type: 'grid' } }) {
  return (
    <section className="aino-section" style={{ marginTop: gapTop(s.gap) }}>
      <div className="aino-inner">
        {s.label && <div className="col-span-6"><SLabel label={s.label} /></div>}
        {s.heading && <div className="col-span-6 mb-4"><SMega text={s.heading} /></div>}
        <div className="col-span-6">
          {s.items && <ConceptGrid items={s.items} />}
        </div>
      </div>
    </section>
  )
}

function QuotesSection({ s }: { s: CaseStudySection & { type: 'quotes' } }) {
  if (!s.quotes) return null
  // Staggered editorial pull quotes — alternating indent, display-scale type, no dividers.
  // Pattern: quote 1 left-aligned, quote 2 indented right, quote 3 left-aligned again.
  // Each quote is its own <section> so keyboard-nav (SlideKeyboardNav) steps through them one at a time.
  return (
    <>
      {s.quotes.map((q, i) => {
        const isOffset = i % 2 === 1
        const mt = i === 0 ? gapTop(s.gap) : sp(6)
        return (
          <section key={i} className="aino-section" style={{ marginTop: mt }}>
            <div className="aino-inner">
              {isOffset && <div className="hidden md:block md:col-span-2" />}
              <div className={isOffset ? 'col-span-6 md:col-span-4' : 'col-span-6 md:col-span-5'}>
                <p className="font-mono text-[10px] tracking-[0.12em] mb-5" style={{ color: 'var(--text-3)' }}>{q.context}</p>
                <p className="font-display font-normal leading-[1.15]"
                  style={{ color: 'var(--text)', fontSize: 'clamp(24px, 3.6vw, 48px)', letterSpacing: '-0.01em' }}>
                  &ldquo;{q.text}&rdquo;
                </p>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

// Editorial caption strip — mono label on the left, readable sentence on the right.
// Aligns to the image width above and breathes instead of crushing.
function ImageCaption({ label, caption, center }: { label?: string; caption?: string; center?: boolean }) {
  if (!caption) return null
  return (
    <div className={`flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mt-5 ${center ? 'justify-center text-center md:text-left' : ''}`}>
      {label && (
        <p className="shrink-0 md:w-[140px]"><span className="font-mono text-[10px] font-bold tracking-[0.12em] inline-block px-2 py-1" style={{ backgroundColor: '#000', color: '#fff' }}>[ {label} ]</span></p>
      )}
      <p className="font-display text-[13px] md:text-[14px] font-normal leading-[1.6] tracking-[0.02em] max-w-[720px]" style={{ color: 'var(--text-3)' }}>
        {caption}
      </p>
    </div>
  )
}

function ImageSection({ s }: { s: CaseStudySection & { type: 'image' } }) {
  return (
    <section className="aino-section" style={{ marginTop: gapTop(s.gap) }}>
      <div className="aino-inner-wide">
        {s.video ? (
          <>
            <MediaBlock video={s.video} label={s.caption} />
            <ImageCaption label={s.label} caption={s.caption} />
          </>
        ) : s.imageAfter ? (
          <ImagePlaceholder aspect="video" device="split" src={s.image} srcAfter={s.imageAfter} caption={s.caption} />
        ) : s.device === 'mobile' ? (
          <>
            <MobileMediaBlock image={s.image} video={s.video} />
            <ImageCaption label={s.label} caption={s.caption} center />
          </>
        ) : s.image ? (
          <>
            <MediaBlock image={s.image} label={s.caption || ''} natural={s.imageNatural} />
            <ImageCaption label={s.label} caption={s.caption} />
          </>
        ) : (
          <ImagePlaceholder aspect="video" device="split" src={s.image} srcAfter={s.imageAfter} caption={s.caption} />
        )}
      </div>
    </section>
  )
}

function PhaseSection({ s }: { s: CaseStudySection & { type: 'phase' } }) {
  const hasTopMedia = !!(s.video || (s.fullBleed && s.image))
  const hasSideImage = !!s.image && !s.fullBleed
  return (
    <>
      {/* Full-width media first — show the result. Skip entirely if there's no media. */}
      {hasTopMedia && (
        <section className="aino-section" style={{ marginTop: gapTop(s.gap) }}>
          {s.fullBleed ? (
            <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', position: 'relative' }}>
              {s.video ? (
                <video src={s.video} autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block', backgroundColor: 'var(--bg-2)' }} />
              ) : s.image ? (
                <img src={s.image} alt={s.imageHint || s.heading || ''} style={{ width: '100%', height: 'auto', display: 'block', backgroundColor: 'var(--bg-2)' }} loading="lazy" />
              ) : null}
            </div>
          ) : (
            <div className="aino-inner-wide">
              <MediaBlock video={s.video} label={s.imageHint || s.heading} />
            </div>
          )}
        </section>
      )}
      {/* Then the narrative. Media-free phases get top gap here instead of on the media block. */}
      <section className="aino-section" style={{ marginTop: hasTopMedia ? sp(3) : gapTop(s.gap) }}>
        <div className="aino-inner items-start">
          <div className={hasSideImage ? 'col-span-6 md:col-span-3' : 'col-span-6 md:col-span-4'}>
            {s.label && <SLabel label={s.label} />}
            {s.heading && <h2 className="font-display font-normal text-[22px] md:text-[28px] leading-[1.2] mb-5 max-w-[440px]" style={{ color: 'var(--text)' }}>{s.heading}</h2>}
            <SBody body={s.body} />
            {s.result && (
              <div className="mt-8 pt-5 max-w-[440px]" style={{ borderTop: '1px solid var(--border)' }}>
                <SHeading heading="Result" />
                <p className="font-display text-[14px] font-normal leading-[1.75] tracking-[0.015em]" style={{ color: 'var(--text)' }}>{s.result}</p>
              </div>
            )}
          </div>
          {hasSideImage && (
            <div className={`col-span-6 md:col-span-3 ${s.imageLeft ? 'md:order-first' : ''}`}>
              <ImagePlaceholder aspect="video" device="mobile" src={s.image} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function ComparisonSection({ s }: { s: CaseStudySection & { type: 'comparison' } }) {
  return (
    <>
      <section className="aino-section" style={{ marginTop: gapTop(s.gap) }}>
        <div className="aino-inner">
          {s.heading && <div className="col-span-6 md:col-span-4 mb-4"><SMega text={s.heading} /></div>}
          {s.body && <div className="col-span-6 md:col-span-3"><SBody body={s.body} /></div>}
        </div>
      </section>
      {s.beforeAfter && (
        <section className="aino-section" style={{ marginTop: sp(3) }}>
          <div className="aino-inner-wide">
            <div className="mx-auto" style={{ maxWidth: 375 }}>
              <BeforeAfter
                before={s.beforeAfter.before}
                after={s.beforeAfter.after}
                beforeLabel={s.beforeAfter.beforeLabel}
                afterLabel={s.beforeAfter.afterLabel}
                device={s.beforeAfter.device}
              />
            </div>
          </div>
        </section>
      )}
      {s.options && (
        <section className="aino-section" style={{ marginTop: sp(3) }}>
          <div className="aino-inner-wide">
            <div className="mx-auto" style={{ maxWidth: 820 }}>
              {s.options.map((opt, i) => (
                <div key={i} style={{ marginTop: i === 0 ? 0 : sp(1) }}>
                  <ImagePlaceholder aspect="4/3" src={opt.image} />
                  <div className="flex items-baseline gap-3 mt-3 mb-2">
                    <SHeading heading={opt.label} />
                    {opt.outcome && <span className="font-mono text-[9px] tracking-[0.1em] px-2 py-0.5" style={{ color: 'var(--text)', border: '1px solid var(--border)' }}>{opt.outcome}</span>}
                  </div>
                  <p className="font-display text-[14px] font-normal leading-[1.75] tracking-[0.015em] max-w-[620px]" style={{ color: 'var(--text)' }}>{opt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function OutcomeSection({ s }: { s: CaseStudySection & { type: 'outcome' } }) {
  const dark = s.bg === 'dark'
  // When dark, override CSS vars so all inner text/borders invert without touching every element
  const darkStyle: React.CSSProperties & Record<string, string> = dark ? {
    backgroundColor: '#000',
    color: '#fff',
    '--text': '#ffffff',
    '--text-3': 'rgba(255,255,255,0.5)',
    '--border': 'rgba(255,255,255,0.15)',
    paddingTop: sp(8),
    paddingBottom: sp(8),
  } as React.CSSProperties & Record<string, string> : { paddingTop: sp(4) }
  return (
    <section className="aino-section" style={{ marginTop: gapTop(s.gap), ...darkStyle }}>
      <div className="aino-inner">
        {s.impact && s.impact.map((item, i) => (
          <div key={i} className={`col-span-6 ${i > 0 ? 'mt-6 pt-6 border-t' : ''}`} style={{ borderColor: 'var(--border)' }}>
            <FluidType text={item.value} minSize={48} maxSize={140} />
            <p className="font-display text-[13px] font-normal tracking-[0.02em] mt-4" style={{ color: 'var(--text)' }}>{item.label}</p>
          </div>
        ))}
        {s.reflections && (
          <div className="col-span-6" style={{ marginTop: sp(4) }}>
            <SHeading heading="Reflections" />
            {s.reflections.map((ref, i) => (
              <div key={i} className="py-5 border-t last:border-b" style={{ borderColor: 'var(--border)' }}>
                <p className="font-display text-[14px] font-medium tracking-[0.02em] mb-1" style={{ color: 'var(--text)' }}>{ref.title}</p>
                <p className="font-display text-[14px] font-normal leading-[1.75] tracking-[0.015em] max-w-[560px]" style={{ color: 'var(--text)' }}>{ref.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function RenderSection({ section, index }: { section: CaseStudySection; index: number }) {
  const content = (() => {
    switch (section.type) {
      case 'text':       return <TextSection s={section as CaseStudySection & { type: 'text' }} index={index} />
      case 'twocol':     return <TwoColSection s={section as CaseStudySection & { type: 'twocol' }} index={index} />
      case 'stats':      return <StatsSection s={section as CaseStudySection & { type: 'stats' }} />
      case 'columns':    return <ColumnsSection s={section as CaseStudySection & { type: 'columns' }} />
      case 'grid':       return <GridSection s={section as CaseStudySection & { type: 'grid' }} />
      case 'quotes':     return <QuotesSection s={section as CaseStudySection & { type: 'quotes' }} />
      case 'image':      return <ImageSection s={section as CaseStudySection & { type: 'image' }} />
      case 'phase':      return <PhaseSection s={section as CaseStudySection & { type: 'phase' }} />
      case 'comparison': return <ComparisonSection s={section as CaseStudySection & { type: 'comparison' }} />
      case 'outcome':    return <OutcomeSection s={section as CaseStudySection & { type: 'outcome' }} />
      default: return null
    }
  })()

  return content
}

// ─── Page ─────────────────────────────────────────────────────────
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const cs = project.caseStudy
  const currentIdx = projects.findIndex((p) => p.slug === slug)
  const positionNumber = String(currentIdx + 1).padStart(2, '0')

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <SlideKeyboardNav />

      {/* ── Hero video first — Aino Gulled style ─────────────── */}
      {/* Exactly one viewport tall. Fit modes:
         - 'actual' → fixed 1500px width (landscape videos sized heuristically)
         - 'fill'   → fills viewport height at native resolution, crisp, no CSS upscale
         - 'phone'  → wrapped in a phone device frame (matches MobileMediaBlock aesthetic)
         - default  → contained inside viewport (max height 100%, max width 70%) */}
      {project.heroVideo && (
        <section data-slide-align="top" data-bg="dark" style={{ backgroundColor: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '6vh 0' }}>
          {project.heroVideoFit === 'phone' ? (
            <div style={{
              height: '100%',
              aspectRatio: '9 / 19.5',
              maxWidth: '90%',
              border: '12px solid #0a0a0a',
              borderRadius: '48px',
              overflow: 'hidden',
              backgroundColor: '#000',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
            }}>
              <video
                src={project.heroVideo}
                autoPlay muted playsInline
                loop={project.heroVideoLoop !== false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ) : (
            <video
              src={project.heroVideo}
              autoPlay muted playsInline
              loop={project.heroVideoLoop !== false}
              style={
                project.heroVideoFit === 'actual'
                  ? { width: '1500px', height: 'auto', maxWidth: 'none', maxHeight: 'none', display: 'block', flexShrink: 0 }
                  : project.heroVideoFit === 'fill'
                  ? { maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto', display: 'block' }
                  : { maxHeight: '100%', maxWidth: '70%', width: 'auto', height: 'auto', display: 'block' }
              }
            />
          )}
        </section>
      )}

      {/* ── Title slide — title + metadata + summary as one opening ────────
         marginTop sized so the centered landing clears the hero's bottom
         and the slide sits visually centered in the viewport. */}
      <section className="aino-section" style={{ marginTop: sp(7) }}>
        <div className="aino-inner">
          <div className="col-span-6 md:col-span-4">
            <p className="mb-8"><span className="font-mono text-[16px] font-bold tracking-[0.14em] inline-block px-3 py-1.5" style={{ backgroundColor: '#000', color: '#fff' }}>{positionNumber}</span></p>
            <h1 className="font-display font-normal text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[0.95]"
              style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>{project.title}</h1>
          </div>
        </div>
        {/* Metadata row — year / role / team */}
        <div className="aino-inner" style={{ marginTop: sp(2) }}>
          <div className="col-span-6 grid grid-cols-2 gap-x-6 gap-y-5 py-5 md:grid-cols-[1fr_1.2fr_1.8fr] md:gap-x-12 md:gap-y-0" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {[
              { label: 'Year', value: project.year },
              { label: 'Role', value: cs.role },
              { label: 'Team', value: cs.team },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[10px] tracking-[0.12em] mb-1.5" style={{ color: 'var(--text-3)' }}>{item.label}</p>
                <p className="font-display text-[13px] font-normal leading-snug" style={{ color: 'var(--text)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Summary — the story hook. Part of the title slide so "down" advances once to the next beat. */}
        <div className="aino-inner" style={{ marginTop: sp(4) }}>
          <div className="col-span-6 md:col-span-5">
            <SMega text={project.summary} />
          </div>
        </div>
      </section>

      {/* ── Story sections — editorial flow with imagery ──────── */}
      {cs.sections.map((section, i) => (
        <RenderSection key={i} section={section} index={i} />
      ))}

      {/* ── Prev / Next navigation ──────────────────────────── */}
      {(() => {
        const prevProject = currentIdx > 0 ? projects[currentIdx - 1] : projects[projects.length - 1]
        const nextProject = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : projects[0]
        return (
          <section className="aino-section" style={{ marginTop: sp(8), paddingBottom: sp(6), borderTop: '1px solid var(--border)' }}>
            <div className="aino-inner" style={{ paddingTop: sp(3) }}>
              <div className="col-span-3">
                <Link href={`/work/${prevProject.slug}`} className="group block">
                  <p className="font-mono text-[10px] tracking-[0.12em] mb-3" style={{ color: 'var(--text-3)' }}>Previous</p>
                  <p className="font-display text-[20px] md:text-[28px] lg:text-[36px] font-normal leading-[1.1] transition-opacity duration-200 group-hover:opacity-60"
                    style={{ letterSpacing: '-0.01em', color: 'var(--text)' }}>{prevProject.title}</p>
                </Link>
              </div>
              <div className="col-span-3 text-right">
                <Link href={`/work/${nextProject.slug}`} className="group block">
                  <p className="font-mono text-[10px] tracking-[0.12em] mb-3" style={{ color: 'var(--text-3)' }}>Next</p>
                  <p className="font-display text-[20px] md:text-[28px] lg:text-[36px] font-normal leading-[1.1] transition-opacity duration-200 group-hover:opacity-60"
                    style={{ letterSpacing: '-0.01em', color: 'var(--text)' }}>{nextProject.title}</p>
                </Link>
              </div>
            </div>
          </section>
        )
      })()}

    </div>
  )
}
