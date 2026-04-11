import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProjectBySlug, projects, type CaseStudySection } from '@/content/projects'
import ImagePlaceholder, { MiniPhoneSketch } from '@/components/ui/ImagePlaceholder'
import SplineMockup from '@/components/ui/SplineMockup'
import FadeIn from '@/components/ui/FadeIn'
import ConceptGrid from '@/components/sections/ConceptGrid'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} — Kiat Yingda`, description: project.summary }
}

// ─── Shared primitives ────────────────────────────────────────────
function SLabel({ label }: { label?: string }) {
  if (!label) return null
  return <p className="font-sans text-[14px] font-medium text-th-text2 mb-6">{label}</p>
}

function SHeading({ heading, large }: { heading?: string; large?: boolean }) {
  if (!heading) return null
  const cls = large
    ? 'font-display font-bold text-[36px] md:text-[52px] text-th-text leading-[1.12] mb-8 max-w-[820px]'
    : 'font-display font-bold text-[28px] md:text-[36px] text-th-text leading-[1.22] mb-7 max-w-[720px]'
  return <h2 className={cls} style={{ letterSpacing: '-0.02em' }}>{heading}</h2>
}

function SBody({ body }: { body?: string | string[] }) {
  if (!body) return null
  const paras = Array.isArray(body) ? body : [body]
  return (
    <div className="max-w-[540px]">
      {paras.map((p, i) => (
        <p key={i} className="font-sans text-[16px] leading-[1.5] text-th-text2 mb-4 last:mb-0">{p}</p>
      ))}
    </div>
  )
}

function wrap(bg: 'dark' | 'light') {
  return bg === 'dark' ? 'bg-th-bg' : 'bg-th-bg2'
}

// ─── Act 1 & 3: Full-screen cinematic slide ──────────────────────
function CinematicSlide({ bg, children }: { bg: 'dark' | 'light'; children: React.ReactNode }) {
  return (
    <FadeIn>
      <div className={`${wrap(bg)} min-h-screen flex items-center border-t border-th-bsub`}>
        <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Act 2: Compact flowing section (NOT full-screen) ────────────
function FlowSection({ bg, children }: { bg: 'dark' | 'light'; children: React.ReactNode }) {
  return (
    <FadeIn>
      <div className={`${wrap(bg)} py-20 md:py-28 border-t border-th-bsub`}>
        <div className="max-w-[1136px] mx-auto px-8 md:px-12">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Section types (Act 2 — compact flow) ────────────────────────

function TextSection({ s }: { s: CaseStudySection & { type: 'text' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      <SBody body={s.body} />
    </FlowSection>
  )
}

function TwoColSection({ s }: { s: CaseStudySection & { type: 'twocol' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} large />
      {s.left && s.right && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-th-bsub mt-10">
          {[s.left, s.right].map((col, i) => (
            <div key={i} className={`pt-8 pb-4 ${i === 0 ? 'md:pr-12 md:border-r border-th-bsub' : 'md:pl-12'}`}>
              <p className="font-sans text-[14px] font-medium text-th-text2 mb-4">{col.heading}</p>
              <p className="font-sans text-[16px] leading-[1.5] text-th-text2">{col.body}</p>
            </div>
          ))}
        </div>
      )}
    </FlowSection>
  )
}

function StatsSection({ s }: { s: CaseStudySection & { type: 'stats' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      {s.stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-th-bsub mb-12">
          {s.stats.map((stat, i) => (
            <div key={i} className={`pt-8 pb-4 ${i === 0 ? 'md:pr-12 md:border-r border-th-bsub' : 'md:pl-12'}`}>
              <p className="font-display font-bold text-[64px] md:text-[80px] text-th-text leading-none mb-3"
                style={{ letterSpacing: '-0.03em' }}>{stat.value}</p>
              <p className="font-sans text-[14px] text-th-text2 max-w-[280px]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      {s.insight && (
        <p className="font-sans text-[20px] md:text-[24px] text-th-text2 leading-[1.4] max-w-[680px]">{s.insight}</p>
      )}
    </FlowSection>
  )
}

function ColumnsSection({ s }: { s: CaseStudySection & { type: 'columns' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      {s.columns && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-10 border-t border-th-bsub">
          {s.columns.map((col, i) => (
            <div key={i} className={`pt-8 pb-4 ${i < s.columns!.length - 1 ? 'md:pr-10 md:border-r border-th-bsub md:mr-10' : ''}`}>
              <p className="font-sans text-[14px] font-medium text-th-text2 mb-4">{col.heading}</p>
              <p className="font-sans text-[14px] leading-[1.5] text-th-text2">{col.body}</p>
            </div>
          ))}
        </div>
      )}
    </FlowSection>
  )
}

function GridSection({ s }: { s: CaseStudySection & { type: 'grid' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      {s.items && <ConceptGrid items={s.items} />}
    </FlowSection>
  )
}

function QuotesSection({ s }: { s: CaseStudySection & { type: 'quotes' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      {s.quotes && (
        <div className="mt-10">
          {s.quotes.map((q, i) => (
            <div key={i} className="py-8 border-t border-th-bsub last:border-b">
              <p className="font-display font-bold text-[24px] md:text-[32px] text-th-text leading-[1.25] mb-4 max-w-[720px]"
                style={{ letterSpacing: '-0.02em' }}>{q.text}</p>
              <p className="font-sans text-[14px] text-th-text2">{q.context}</p>
            </div>
          ))}
        </div>
      )}
    </FlowSection>
  )
}

function ImageSection({ s }: { s: CaseStudySection & { type: 'image' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      <ImagePlaceholder aspect="video" device="split" src={s.image} srcAfter={s.imageAfter} caption={s.caption} />
    </FlowSection>
  )
}

function PhaseSection({ s }: { s: CaseStudySection & { type: 'phase' } }) {
  return (
    <FadeIn>
      <div className={`${wrap(s.bg)} py-20 md:py-28 border-t border-th-bsub relative overflow-hidden`}>
        {s.number && (
          <span className="absolute -top-6 right-8 md:right-12 font-display font-bold text-[200px] md:text-[260px] leading-none text-th-text select-none pointer-events-none" style={{ opacity: 0.04, letterSpacing: '-0.04em' }}>{s.number}</span>
        )}
        <div className="max-w-[1136px] mx-auto px-8 md:px-12 relative z-10">
          <SLabel label={s.label} />
          <SHeading heading={s.heading} />
          <SBody body={s.body} />
          <div className="mt-10 mb-8">
            <ImagePlaceholder aspect="video" device="mobile" src={s.image} />
          </div>
          {s.result && (
            <div className="rounded-card p-6 mt-8 max-w-[640px] border border-th-bsub bg-th-bg3">
              <p className="font-sans text-[14px] font-medium text-th-text2 mb-3">Result</p>
              <p className="font-sans text-[16px] leading-[1.5] text-th-text2">{s.result}</p>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  )
}

function ComparisonSection({ s }: { s: CaseStudySection & { type: 'comparison' } }) {
  return (
    <FlowSection bg={s.bg}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      {s.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-10 border-t border-th-bsub">
          {s.options.map((opt, i) => (
            <div key={i} className={`pt-8 pb-6 ${i === 0 ? 'md:pr-12 md:border-r border-th-bsub' : 'md:pl-12'}`}>
              <div className="flex items-center gap-3 mb-4">
                <p className="font-sans text-[14px] font-medium text-th-text2">{opt.label}</p>
                {opt.outcome && <span className="font-sans text-[12px] font-medium text-th-text bg-th-chip px-3 py-1 rounded-pill">{opt.outcome}</span>}
              </div>
              <ImagePlaceholder aspect="4/3" src={opt.image} className="mb-5" />
              <p className="font-sans text-[14px] leading-[1.5] text-th-text2">{opt.description}</p>
            </div>
          ))}
        </div>
      )}
    </FlowSection>
  )
}

function OutcomeSection({ s }: { s: CaseStudySection & { type: 'outcome' } }) {
  // Act 3: This is the payoff — full-screen cinematic
  return (
    <CinematicSlide bg={s.bg}>
      <SLabel label={s.label} />
      {s.impact && (
        <div className={`grid grid-cols-1 ${({ 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' } as Record<number, string>)[Math.min(s.impact.length, 3)] ?? 'md:grid-cols-2'} gap-0 border-t border-th-bsub mb-16`}>
          {s.impact.map((item, i) => (
            <div key={i} className={`pt-8 pb-4 ${i < s.impact!.length - 1 ? 'md:pr-12 md:border-r border-th-bsub md:mr-12' : ''}`}>
              <p className="font-display font-bold text-[48px] md:text-[64px] text-th-text leading-none mb-2"
                style={{ letterSpacing: '-0.03em' }}>{item.value}</p>
              <p className="font-sans text-[14px] text-th-text2">{item.label}</p>
            </div>
          ))}
        </div>
      )}
      {s.reflections && (
        <div>
          <p className="font-sans text-[14px] font-medium text-th-text2 mb-8">Reflections</p>
          <div>
            {s.reflections.map((ref, i) => (
              <div key={i} className="py-7 border-t border-th-bsub last:border-b">
                <p className="font-sans text-[16px] font-medium text-th-text mb-2">{ref.title}</p>
                <p className="font-sans text-[16px] leading-[1.5] text-th-text2 max-w-[620px]">{ref.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </CinematicSlide>
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
  const nextIdx = projects.findIndex((p) => p.slug === slug) + 1
  const next = projects[nextIdx % projects.length]

  const accent = project.accent

  return (
    <div className="overflow-x-hidden" style={accent ? { '--project-accent': accent } as React.CSSProperties : undefined}>

      {/* ═══ ACT 1: THE HOOK ═══ */}

      {/* Hero — full-screen cinematic */}
      <section className="relative min-h-screen bg-th-bg">
        {(project.heroVideo || project.splineUrl) ? (
          <>
            <div className="absolute inset-0 md:left-[35%]">
              {project.heroVideo ? (
                <video
                  src={project.heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain object-right"
                />
              ) : (
                <SplineMockup url={project.splineUrl!} />
              )}
            </div>
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12">
                <p className="font-sans text-[14px] font-medium mb-8" style={accent ? { color: accent } : undefined}>{cs.label}</p>
                <h1 className="font-display font-bold text-[48px] sm:text-[64px] md:text-[80px] text-th-text leading-[1.08] mb-4 max-w-[550px]"
                  style={{ letterSpacing: '-0.03em' }}>{project.title}</h1>
                <p className="font-sans text-[18px] text-th-text2">{project.company}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-screen flex items-center">
            <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12">
              <p className="font-sans text-[14px] font-medium mb-10" style={accent ? { color: accent } : undefined}>{cs.label}</p>
              <h1 className="font-display font-bold text-[48px] sm:text-[64px] md:text-[80px] text-th-text leading-[1.08] mb-4"
                style={{ letterSpacing: '-0.03em' }}>{project.title}</h1>
              <p className="font-sans text-[18px] text-th-text2 mb-16">{project.company}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-th-bsub pt-10">
                {cs.impact.map((item) => (
                  <div key={item.label}>
                    <p className="font-display font-bold text-[36px] md:text-[48px] text-th-text leading-none mb-2"
                      style={{ letterSpacing: '-0.03em' }}>{item.value}</p>
                    <p className="font-sans text-[14px] text-th-text2 leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Overview — compact metadata bar with accent line */}
      <FadeIn>
        <div className="bg-th-bg2 border-t-2 border-th-bsub" style={accent ? { borderTopColor: accent } : undefined}>
          <div className="max-w-[1136px] mx-auto px-8 md:px-12 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Role', value: cs.role },
              { label: 'Team', value: cs.team },
              { label: 'Duration', value: cs.duration },
              { label: 'Impact', value: cs.impact.map(i => i.value).join(' · ') },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-sans text-[12px] font-medium text-th-text3 mb-1.5">{label}</p>
                <p className="font-sans text-[14px] text-th-text2 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ═══ ACT 2: THE WORK (compact, flowing, scrollable) ═══ */}

      {cs.sections.map((section, i) => (
        <RenderSection key={i} section={section} />
      ))}

      {/* ═══ ACT 3: THE PAYOFF ═══ */}
      {/* (OutcomeSection already renders as CinematicSlide) */}

      {/* Next project — full-screen cinematic */}
      <FadeIn>
        <div className="min-h-screen bg-th-bg border-t border-th-bsub flex items-center">
          <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
            <p className="font-sans text-[12px] text-th-text3 mb-6">Next project</p>
            <h2 className="font-display font-bold text-[40px] md:text-[64px] text-th-text leading-[1.08] mb-4"
              style={{ letterSpacing: '-0.03em' }}>{next.title}</h2>
            <p className="font-sans text-[16px] text-th-text2 mb-10">{next.company} · {next.year}</p>
            <div className="flex gap-4">
              <Link href={`/work/${next.slug}`}
                className="inline-flex items-center px-6 py-3 rounded-pill bg-th-text text-th-bg font-sans text-[14px] font-medium hover:opacity-80 transition-opacity duration-200">
                View case study
              </Link>
              <Link href="/"
                className="inline-flex items-center px-6 py-3 rounded-pill border border-th-border font-sans text-[14px] font-medium text-th-text2 hover:text-th-text hover:bg-th-chip transition-all duration-200">
                Back to work
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
