import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProjectBySlug, projects, type CaseStudySection } from '@/content/projects'
import ImagePlaceholder, { MiniPhoneSketch } from '@/components/ui/ImagePlaceholder'
import FadeIn from '@/components/ui/FadeIn'
import ConceptGrid from '@/components/sections/ConceptGrid'
import FluidType from '@/components/ui/FluidType'
import BeforeAfter from '@/components/ui/BeforeAfter'
import ProjectSideNav from '@/components/ui/ProjectSideNav'
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

// ─── Shared primitives — Apple keynote style ────────────────────
function SLabel({ label }: { label?: string }) {
  if (!label) return null
  return <p className="font-mono text-[11px] font-medium tracking-[0.14em] mb-8" style={{ color: 'var(--text-3)' }}>[ {label} ]</p>
}

function SHeading({ heading, large }: { heading?: string; large?: boolean }) {
  if (!heading) return null
  const cls = large
    ? 'font-display font-medium text-[36px] md:text-[56px] lg:text-[64px] leading-[1.06] mb-10 max-w-[900px]'
    : 'font-display font-medium text-[30px] md:text-[44px] lg:text-[52px] leading-[1.08] mb-8 max-w-[820px]'
  return <h2 className={cls} style={{ letterSpacing: '0.005em', color: 'var(--text)' }}>{heading}</h2>
}

function SBody({ body }: { body?: string | string[] }) {
  if (!body) return null
  const paras = Array.isArray(body) ? body : [body]
  return (
    <div className="max-w-[580px]">
      {paras.map((p, i) => (
        <p key={i} className="font-display text-[15px] md:text-[16px] font-normal leading-[1.7] tracking-[0.02em] mb-5 last:mb-0" style={{ color: 'var(--text-2)' }}>{p}</p>
      ))}
    </div>
  )
}

// ─── Slide wrapper — every section is a full-viewport slide ─────
function Slide({ dark, children, className = '' }: { dark?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <FadeIn>
      <div className={`min-h-screen flex items-center ${dark ? 'section-dark grain relative' : ''} ${className}`}
        style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-[1136px] mx-auto w-full px-8 md:px-16 py-24 md:py-32 relative z-10">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Section types ───────────────────────────────────────────────

function TextSection({ s }: { s: CaseStudySection & { type: 'text' } }) {
  return (
    <Slide dark={s.bg === 'dark'}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 md:gap-24">
        <div>
          <SLabel label={s.label} />
          <SHeading heading={s.heading} large />
        </div>
        <div className="flex flex-col justify-end">
          <SBody body={s.body} />
        </div>
      </div>
    </Slide>
  )
}

function TwoColSection({ s }: { s: CaseStudySection & { type: 'twocol' } }) {
  return (
    <Slide dark={s.bg === 'dark'}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} large />
      {s.left && s.right && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          {[s.left, s.right].map((col, i) => (
            <div key={i}>
              <p className="font-mono text-[10px] tracking-[0.14em] mb-5" style={{ color: 'var(--text-3)' }}>{col.heading}</p>
              <p className="font-display text-[16px] font-normal leading-[1.7] tracking-[0.02em] max-w-[460px]" style={{ color: 'var(--text-2)' }}>{col.body}</p>
            </div>
          ))}
        </div>
      )}
    </Slide>
  )
}

function StatsSection({ s }: { s: CaseStudySection & { type: 'stats' } }) {
  return (
    <Slide dark>
      <SLabel label={s.label} />
      {s.stats && (
        <div className="mb-16">
          {s.stats.map((stat, i) => (
            <div key={i} className={i > 0 ? 'mt-12' : ''}>
              <p className="font-display font-medium text-[72px] md:text-[100px] lg:text-[120px] leading-none mb-4"
                style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}>{stat.value}</p>
              <p className="font-display text-[15px] font-normal tracking-[0.04em] max-w-[320px]" style={{ color: 'var(--text-2)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      {s.insight && (
        <p className="font-display text-[20px] md:text-[24px] font-light leading-[1.4] tracking-[0.01em] max-w-[680px]" style={{ color: 'var(--text-2)' }}>{s.insight}</p>
      )}
    </Slide>
  )
}

function ColumnsSection({ s }: { s: CaseStudySection & { type: 'columns' } }) {
  return (
    <Slide dark={s.bg === 'dark'}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      {s.columns && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-16">
          {s.columns.map((col, i) => (
            <div key={i}>
              <p className="font-mono text-[10px] tracking-[0.14em] mb-5" style={{ color: 'var(--text-3)' }}>{col.heading}</p>
              <p className="font-display text-[15px] font-normal leading-[1.7] tracking-[0.02em]" style={{ color: 'var(--text-2)' }}>{col.body}</p>
            </div>
          ))}
        </div>
      )}
    </Slide>
  )
}

function GridSection({ s }: { s: CaseStudySection & { type: 'grid' } }) {
  return (
    <Slide dark={s.bg === 'dark'}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      {s.items && <ConceptGrid items={s.items} />}
    </Slide>
  )
}

function QuotesSection({ s }: { s: CaseStudySection & { type: 'quotes' } }) {
  return (
    <Slide dark={s.bg === 'dark'}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      {s.quotes && (
        <div className="mt-12 space-y-0">
          {s.quotes.map((q, i) => (
            <div key={i} className={`py-10 ${i > 0 ? 'border-t' : ''}`} style={{ borderColor: 'var(--border)' }}>
              <p className="font-display text-[20px] md:text-[26px] font-light leading-[1.35] max-w-[720px] mb-5"
                style={{ letterSpacing: '0.005em', color: 'var(--text)' }}>&ldquo;{q.text}&rdquo;</p>
              <p className="font-mono text-[10px] tracking-[0.14em]" style={{ color: 'var(--text-3)' }}>{q.context}</p>
            </div>
          ))}
        </div>
      )}
    </Slide>
  )
}

function ImageSection({ s }: { s: CaseStudySection & { type: 'image' } }) {
  return (
    <FadeIn>
      <div className={`py-16 md:py-24 ${s.bg === 'dark' ? 'section-dark grain relative' : ''}`} style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          {s.label && (
            <div className="max-w-[1136px] mx-auto px-4 md:px-8 mb-8">
              <SLabel label={s.label} />
            </div>
          )}
          <ImagePlaceholder aspect="video" device="split" src={s.image} srcAfter={s.imageAfter} caption={s.caption} />
        </div>
      </div>
    </FadeIn>
  )
}

function PhaseSection({ s }: { s: CaseStudySection & { type: 'phase' } }) {
  return (
    <FadeIn>
      <div className={`min-h-screen flex items-center relative overflow-hidden ${s.bg === 'dark' ? 'section-dark grain' : ''}`}
        style={{ backgroundColor: 'var(--bg)' }}>
        {s.number && (
          <span className="absolute top-[10%] right-[5%] font-display font-extralight text-[240px] md:text-[320px] leading-none select-none pointer-events-none"
            style={{ color: 'var(--text)', opacity: 0.04, letterSpacing: '-0.02em' }}>{s.number}</span>
        )}
        <div className="max-w-[1136px] mx-auto px-8 md:px-16 py-24 md:py-32 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">
            <div>
              <SLabel label={s.label} />
              <SHeading heading={s.heading} />
              <SBody body={s.body} />
              {s.result && (
                <div className="mt-12 pt-8 max-w-[500px]" style={{ borderTop: '1px solid var(--border)' }}>
                  <p className="font-mono text-[10px] tracking-[0.14em] mb-4" style={{ color: 'var(--text-3)' }}>[ Result ]</p>
                  <p className="font-display text-[15px] font-normal leading-[1.7] tracking-[0.02em]" style={{ color: 'var(--text-2)' }}>{s.result}</p>
                </div>
              )}
            </div>
            <div>
              <ImagePlaceholder aspect="video" device="mobile" src={s.image} />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function ComparisonSection({ s }: { s: CaseStudySection & { type: 'comparison' } }) {
  return (
    <Slide dark={s.bg === 'dark'}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      <SBody body={s.body} />
      {s.beforeAfter && (
        <div className="mt-12">
          <BeforeAfter
            before={s.beforeAfter.before}
            after={s.beforeAfter.after}
            beforeLabel={s.beforeAfter.beforeLabel}
            afterLabel={s.beforeAfter.afterLabel}
            device={s.beforeAfter.device}
          />
        </div>
      )}
      {s.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          {s.options.map((opt, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-6">
                <p className="font-mono text-[10px] tracking-[0.14em]" style={{ color: 'var(--text-3)' }}>{opt.label}</p>
                {opt.outcome && <span className="font-mono text-[9px] tracking-[0.12em] px-3 py-1" style={{ color: 'var(--text)', border: '1px solid var(--border)' }}>{opt.outcome}</span>}
              </div>
              <ImagePlaceholder aspect="4/3" src={opt.image} className="mb-6" />
              <p className="font-display text-[15px] font-normal leading-[1.7] tracking-[0.02em]" style={{ color: 'var(--text-2)' }}>{opt.description}</p>
            </div>
          ))}
        </div>
      )}
    </Slide>
  )
}

function OutcomeSection({ s }: { s: CaseStudySection & { type: 'outcome' } }) {
  return (
    <FadeIn>
      <div className="section-dark grain relative min-h-screen flex items-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-[1136px] mx-auto w-full px-8 md:px-16 py-24 md:py-32 relative z-10">
          <SLabel label={s.label} />
          {s.impact && (
            <div className="mb-20">
              {s.impact.map((item, i) => (
                <div key={i} className={i > 0 ? 'mt-10 pt-10 border-t' : ''} style={{ borderColor: 'var(--border)' }}>
                  <FluidType
                    text={item.value}
                    minSize={48}
                    maxSize={180}
                  />
                  <p className="font-display text-[15px] font-normal tracking-[0.04em] mt-6" style={{ color: 'var(--text-2)' }}>{item.label}</p>
                </div>
              ))}
            </div>
          )}
          {s.reflections && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] mb-10" style={{ color: 'var(--text-3)' }}>[ Reflections ]</p>
              <div className="space-y-0">
                {s.reflections.map((ref, i) => (
                  <div key={i} className="py-8 border-t last:border-b" style={{ borderColor: 'var(--border)' }}>
                    <p className="font-display text-[15px] font-medium tracking-[0.03em] mb-2" style={{ color: 'var(--text)' }}>{ref.title}</p>
                    <p className="font-display text-[15px] font-normal leading-[1.7] tracking-[0.02em] max-w-[620px]" style={{ color: 'var(--text-2)' }}>{ref.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  )
}

function RenderSection({ section }: { section: CaseStudySection }) {
  switch (section.type) {
    case 'text':       return <TextSection s={section as CaseStudySection & { type: 'text' }} />
    case 'twocol':     return <TwoColSection s={section as CaseStudySection & { type: 'twocol' }} />
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
}

// ─── Page ─────────────────────────────────────────────────────────
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const cs = project.caseStudy
  const currentIdx = projects.findIndex((p) => p.slug === slug)
  const prev = projects[(currentIdx - 1 + projects.length) % projects.length]
  const next = projects[(currentIdx + 1) % projects.length]

  return (
    <div className="overflow-x-hidden">

      <SlideKeyboardNav />
      <ProjectSideNav prev={{ slug: prev.slug, title: prev.title }} next={{ slug: next.slug, title: next.title }} />

      {/* Hero — full-screen dark title slide */}
      <section className="section-dark grain relative" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="relative z-10">
          {project.heroVideo ? (
            <div className="relative min-h-screen">
              <div className="hidden md:block absolute inset-0 left-[35%] overflow-hidden">
                <video src={project.heroVideo} autoPlay loop muted playsInline className="w-full h-full object-contain object-right" />
              </div>
              <div className="relative z-10 h-full min-h-screen flex flex-col md:justify-center">
                <div className="max-w-[1136px] mx-auto w-full px-8 md:px-16 pt-24 md:pt-0">
                  <p className="font-mono text-[10px] tracking-[0.14em] mb-10" style={{ color: 'var(--text-3)' }}>[ {cs.label} ]</p>
                  <h1 className="font-display font-extralight text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.02] mb-6 md:max-w-[600px]"
                    style={{ letterSpacing: '0.005em', color: 'var(--text)' }}>{project.title}</h1>
                  <p className="font-display text-[16px] font-normal tracking-[0.04em]" style={{ color: 'var(--text-2)' }}>{project.company}</p>
                </div>
                <div className="md:hidden w-full h-[50vh] mt-8">
                  <video src={project.heroVideo} autoPlay loop muted playsInline className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen flex items-center">
              <div className="max-w-[1136px] mx-auto w-full px-8 md:px-16">
                <p className="font-mono text-[10px] tracking-[0.14em] mb-12" style={{ color: 'var(--text-3)' }}>[ {cs.label} ]</p>
                <h1 className="font-display font-extralight text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.02] mb-6"
                  style={{ letterSpacing: '0.005em', color: 'var(--text)' }}>{project.title}</h1>
                <p className="font-display text-[16px] font-normal tracking-[0.04em] mb-20" style={{ color: 'var(--text-2)' }}>{project.company}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12" style={{ borderTop: '1px solid var(--border)' }}>
                  {cs.impact.map((item) => (
                    <div key={item.label}>
                      <p className="font-display font-medium text-[36px] md:text-[48px] leading-none mb-3"
                        style={{ letterSpacing: '-0.01em', color: 'var(--text)' }}>{item.value}</p>
                      <p className="font-display text-[13px] font-normal tracking-[0.04em] leading-snug" style={{ color: 'var(--text-2)' }}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Metadata bar */}
          <div style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-2)' }}>
            <div className="max-w-[1136px] mx-auto px-8 md:px-16 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: 'Role', value: cs.role },
                { label: 'Team', value: cs.team },
                { label: 'Duration', value: cs.duration },
                { label: 'Impact', value: cs.impact.map(i => i.value).join(' · ') },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[9px] tracking-[0.14em] mb-2" style={{ color: 'var(--text-3)' }}>{label}</p>
                  <p className="font-display text-[13px] font-normal tracking-[0.03em] leading-relaxed" style={{ color: 'var(--text-2)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sections — each renders as a full-viewport slide */}
      {cs.sections.map((section, i) => (
        <RenderSection key={i} section={section} />
      ))}

      {/* Prev / Next — clean dark ending */}
      <FadeIn>
        <div className="section-dark grain relative" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="max-w-[1136px] mx-auto w-full px-8 md:px-16 py-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <Link href={`/work/${prev.slug}`}
                className="group flex items-center gap-5 py-12 md:pr-16 md:border-r transition-opacity duration-200 hover:opacity-70"
                style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-[11px] tracking-[0.1em] shrink-0" style={{ color: 'var(--text)' }}>[◂]</span>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.14em] mb-2" style={{ color: 'var(--text-3)' }}>Previous</p>
                  <p className="font-display font-medium text-[20px] md:text-[24px] leading-tight"
                    style={{ letterSpacing: '0.005em', color: 'var(--text)' }}>{prev.title}</p>
                </div>
              </Link>

              <Link href={`/work/${next.slug}`}
                className="group flex items-center gap-5 py-12 md:pl-16 flex-row-reverse md:text-right transition-opacity duration-200 hover:opacity-70 border-t md:border-t-0"
                style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-[11px] tracking-[0.1em] shrink-0" style={{ color: 'var(--text)' }}>[▸]</span>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.14em] mb-2" style={{ color: 'var(--text-3)' }}>Next</p>
                  <p className="font-display font-medium text-[20px] md:text-[24px] leading-tight"
                    style={{ letterSpacing: '0.005em', color: 'var(--text)' }}>{next.title}</p>
                </div>
              </Link>
            </div>

            <div className="pt-10 mt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="inline-flex items-center gap-1.5">
                <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: 'var(--text-3)' }}>◂</span>
                <BracketLink href="/">All projects</BracketLink>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
