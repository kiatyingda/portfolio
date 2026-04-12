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

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} — Kiat Yingda`, description: project.summary }
}

// ─── Shared primitives (ASCII style) ─────────────────────────────
function SLabel({ label }: { label?: string }) {
  if (!label) return null
  return <p className="font-display text-[11px] font-bold text-th-text tracking-[0.12em] mb-6">▶ {label}</p>
}

function SHeading({ heading, large }: { heading?: string; large?: boolean }) {
  if (!heading) return null
  const cls = large
    ? 'font-display font-extralight text-[34px] md:text-[48px] text-th-text leading-[1.1] mb-8 max-w-[820px]'
    : 'font-display font-extralight text-[26px] md:text-[34px] text-th-text leading-[1.15] mb-7 max-w-[720px]'
  return <h2 className={cls} style={{ letterSpacing: '0.02em' }}>{heading}</h2>
}

function SBody({ body }: { body?: string | string[] }) {
  if (!body) return null
  const paras = Array.isArray(body) ? body : [body]
  return (
    <div className="max-w-[540px]">
      {paras.map((p, i) => (
        <p key={i} className="font-display text-[14px] font-light leading-[1.6] text-th-text2 tracking-[0.03em] mb-4 last:mb-0">{p}</p>
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
      <div className={`${wrap(bg)} min-h-screen flex items-center border-t border-th-border`}>
        <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Act 2: Compact flowing section ──────────────────────────────
function FlowSection({ bg, children }: { bg: 'dark' | 'light'; children: React.ReactNode }) {
  return (
    <FadeIn>
      <div className={`${wrap(bg)} py-20 md:py-28 border-t border-th-border`}>
        <div className="max-w-[1136px] mx-auto px-8 md:px-12">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Section types ───────────────────────────────────────────────

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-th-border mt-10">
          {[s.left, s.right].map((col, i) => (
            <div key={i} className={`pt-8 pb-4 ${i === 0 ? 'md:pr-12 md:border-r border-th-border' : 'md:pl-12'}`}>
              <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-4">{col.heading}</p>
              <p className="font-display text-[14px] font-light leading-[1.6] text-th-text2 tracking-[0.03em]">{col.body}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-th-border mb-12">
          {s.stats.map((stat, i) => (
            <div key={i} className={`pt-8 pb-4 ${i === 0 ? 'md:pr-12 md:border-r border-th-border' : 'md:pl-12'}`}>
              <p className="font-display font-extralight text-[56px] md:text-[72px] text-th-text leading-none mb-3"
                style={{ letterSpacing: '0.01em' }}>{stat.value}</p>
              <p className="font-display text-[13px] font-light text-th-text2 tracking-[0.04em] max-w-[280px]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      {s.insight && (
        <p className="font-display text-[18px] md:text-[22px] font-extralight text-th-text2 leading-[1.4] tracking-[0.02em] max-w-[680px]">{s.insight}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-10 border-t border-th-border">
          {s.columns.map((col, i) => (
            <div key={i} className={`pt-8 pb-4 ${i < s.columns!.length - 1 ? 'md:pr-10 md:border-r border-th-border md:mr-10' : ''}`}>
              <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-4">{col.heading}</p>
              <p className="font-display text-[13px] font-light leading-[1.6] text-th-text2 tracking-[0.03em]">{col.body}</p>
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
    <FadeIn>
      <div className={`${wrap(s.bg)} py-20 md:py-28 border-t border-th-border`}>
        <div className="max-w-[1136px] mx-auto px-8 md:px-12">
          <SLabel label={s.label} />
          <SHeading heading={s.heading} />
        </div>
        {s.quotes && (
          <div className="mt-12 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 md:gap-5 pb-4" style={{ paddingLeft: 'max(2rem, calc((100vw - 1136px) / 2 + 3rem))', paddingRight: 'max(2rem, calc((100vw - 1136px) / 2 + 3rem))' }}>
              {s.quotes.map((q, i) => (
                <div key={i} className="relative shrink-0 w-[340px] md:w-[440px] flex flex-col border border-th-border"
                  style={{ background: '#ffffff' }}>
                  <div className="px-8 md:px-10 pt-8 md:pt-10 pb-7 flex-1 flex flex-col">
                    <span className="font-mono text-[10px] tracking-[0.1em] mb-4 block" style={{ color: '#999999' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-display text-[18px] md:text-[22px] font-light leading-[1.35] flex-1"
                      style={{ letterSpacing: '0.01em', color: '#0A0A0A' }}>&ldquo;{q.text}&rdquo;</p>
                  </div>
                  <div className="px-8 md:px-10 pb-6 md:pb-7">
                    <div className="pt-4" style={{ borderTop: '1px solid #d4d4d4' }}>
                      <p className="font-mono text-[9px] tracking-[0.12em] uppercase" style={{ color: '#999999' }}>{q.context}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-4 md:w-8" />
            </div>
          </div>
        )}
      </div>
    </FadeIn>
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
      <div className={`${wrap(s.bg)} py-20 md:py-28 border-t border-th-border relative overflow-hidden`}>
        {s.number && (
          <span className="absolute -top-6 right-8 md:right-12 font-display font-extralight text-[200px] md:text-[260px] leading-none text-th-text select-none pointer-events-none" style={{ opacity: 0.04, letterSpacing: '0.02em' }}>{s.number}</span>
        )}
        <div className="max-w-[1136px] mx-auto px-8 md:px-12 relative z-10">
          <SLabel label={s.label} />
          <SHeading heading={s.heading} />
          <SBody body={s.body} />
          <div className="mt-10 mb-8">
            <ImagePlaceholder aspect="video" device="mobile" src={s.image} />
          </div>
          {s.result && (
            <div className="p-6 mt-8 max-w-[640px] border border-th-border">
              <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-3">[ Result ]</p>
              <p className="font-display text-[14px] font-light leading-[1.6] text-th-text2 tracking-[0.03em]">{s.result}</p>
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
      <SBody body={s.body} />
      {s.beforeAfter && (
        <div className="mt-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-10 border-t border-th-border">
          {s.options.map((opt, i) => (
            <div key={i} className={`pt-8 pb-6 ${i === 0 ? 'md:pr-12 md:border-r border-th-border' : 'md:pl-12'}`}>
              <div className="flex items-center gap-3 mb-4">
                <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em]">{opt.label}</p>
                {opt.outcome && <span className="font-mono text-[9px] tracking-[0.1em] text-th-text border border-th-border px-3 py-1">{opt.outcome}</span>}
              </div>
              <ImagePlaceholder aspect="4/3" src={opt.image} className="mb-5" />
              <p className="font-display text-[13px] font-light leading-[1.6] text-th-text2 tracking-[0.03em]">{opt.description}</p>
            </div>
          ))}
        </div>
      )}
    </FlowSection>
  )
}

function OutcomeSection({ s }: { s: CaseStudySection & { type: 'outcome' } }) {
  return (
    <CinematicSlide bg={s.bg}>
      <SLabel label={s.label} />
      {s.impact && (
        <div className="mb-16">
          {s.impact.map((item, i) => (
            <div key={i} className={`${i > 0 ? 'mt-8 pt-8 border-t border-th-border' : ''}`}>
              <FluidType
                text={item.value}
                minSize={48}
                maxSize={180}
              />
              <p className="font-display text-[14px] font-light text-th-text2 tracking-[0.04em] mt-6">{item.label}</p>
            </div>
          ))}
        </div>
      )}
      {s.reflections && (
        <div>
          <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-8">[ Reflections ]</p>
          <div>
            {s.reflections.map((ref, i) => (
              <div key={i} className="py-7 border-t border-th-border last:border-b">
                <p className="font-display text-[14px] font-light text-th-text tracking-[0.04em] mb-2">{ref.title}</p>
                <p className="font-display text-[14px] font-light leading-[1.6] text-th-text2 tracking-[0.03em] max-w-[620px]">{ref.body}</p>
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
  const currentIdx = projects.findIndex((p) => p.slug === slug)
  const prev = projects[(currentIdx - 1 + projects.length) % projects.length]
  const next = projects[(currentIdx + 1) % projects.length]

  return (
    <div className="overflow-x-hidden">

      <ProjectSideNav prev={{ slug: prev.slug, title: prev.title }} next={{ slug: next.slug, title: next.title }} />

      {/* Hero */}
      <section className="relative min-h-screen bg-th-bg">
        {project.heroVideo ? (
          <>
            <div className="hidden md:block absolute inset-0 left-[35%]">
              <video src={project.heroVideo} autoPlay loop muted playsInline className="w-full h-full object-contain object-right" />
            </div>
            <div className="relative z-10 min-h-screen flex flex-col md:justify-center">
              <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 pt-24 md:pt-0">
                <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-8">[ {cs.label} ]</p>
                <h1 className="font-display font-extralight text-[44px] sm:text-[60px] md:text-[76px] text-th-text leading-[1.05] mb-4 md:max-w-[550px]"
                  style={{ letterSpacing: '0.02em' }}>{project.title}</h1>
                <p className="font-display text-[16px] font-light text-th-text2 tracking-[0.04em]">{project.company}</p>
              </div>
              <div className="md:hidden w-full h-[50vh] mt-8">
                <video src={project.heroVideo} autoPlay loop muted playsInline className="w-full h-full object-contain" />
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-screen flex items-center">
            <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12">
              <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-10">[ {cs.label} ]</p>
              <h1 className="font-display font-extralight text-[44px] sm:text-[60px] md:text-[76px] text-th-text leading-[1.05] mb-4"
                style={{ letterSpacing: '0.02em' }}>{project.title}</h1>
              <p className="font-display text-[16px] font-light text-th-text2 tracking-[0.04em] mb-16">{project.company}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-th-border pt-10">
                {cs.impact.map((item) => (
                  <div key={item.label}>
                    <p className="font-display font-extralight text-[32px] md:text-[44px] text-th-text leading-none mb-2"
                      style={{ letterSpacing: '0.01em' }}>{item.value}</p>
                    <p className="font-display text-[13px] font-light text-th-text2 tracking-[0.04em] leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Overview metadata bar */}
      <FadeIn>
        <div className="bg-th-bg2 border-t border-th-border">
          <div className="max-w-[1136px] mx-auto px-8 md:px-12 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Role', value: cs.role },
              { label: 'Team', value: cs.team },
              { label: 'Duration', value: cs.duration },
              { label: 'Impact', value: cs.impact.map(i => i.value).join(' · ') },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-mono text-[9px] text-th-text3 tracking-[0.1em] mb-1.5">{label}</p>
                <p className="font-display text-[13px] font-light text-th-text2 tracking-[0.03em] leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Sections */}
      {cs.sections.map((section, i) => (
        <RenderSection key={i} section={section} />
      ))}

      {/* Prev / Next navigation */}
      <FadeIn>
        <div className="bg-th-bg border-t border-th-border">
          <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <Link href={`/work/${prev.slug}`}
                className="group flex items-center gap-5 py-12 md:pr-12 md:border-r border-th-border border-b md:border-b-0 hover:bg-black hover:text-white transition-[background-color,color] duration-100">
                <span className="font-mono text-[11px] text-th-text group-hover:text-white tracking-[0.1em] shrink-0">[◂]</span>
                <div>
                  <p className="font-mono text-[9px] text-th-text3 group-hover:text-white/60 tracking-[0.1em] mb-1.5">Previous</p>
                  <p className="font-display font-extralight text-[18px] md:text-[22px] text-th-text group-hover:text-white leading-tight"
                    style={{ letterSpacing: '0.02em' }}>{prev.title}</p>
                </div>
              </Link>

              <Link href={`/work/${next.slug}`}
                className="group flex items-center gap-5 py-12 md:pl-12 flex-row-reverse md:text-right hover:bg-black hover:text-white transition-[background-color,color] duration-100">
                <span className="font-mono text-[11px] text-th-text group-hover:text-white tracking-[0.1em] shrink-0">[▸]</span>
                <div>
                  <p className="font-mono text-[9px] text-th-text3 group-hover:text-white/60 tracking-[0.1em] mb-1.5">Next</p>
                  <p className="font-display font-extralight text-[18px] md:text-[22px] text-th-text group-hover:text-white leading-tight"
                    style={{ letterSpacing: '0.02em' }}>{next.title}</p>
                </div>
              </Link>
            </div>

            <div className="pt-8 border-t border-th-border mt-4">
              <div className="inline-flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em]">◂</span>
                <BracketLink href="/">All projects</BracketLink>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
