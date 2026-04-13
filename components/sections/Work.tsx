'use client'

import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { projects } from '@/content/projects'

export default function Work() {
  return (
    <section id="work" className="relative">
      {/* Section label — floats freely, not boxed */}
      <div className="max-w-[1136px] mx-auto px-8 md:px-16 pt-20 pb-4">
        <p className="font-mono text-[10px] text-th-text3 tracking-[0.14em]">
          [ Selected Work ]
        </p>
      </div>

      {/* Vertical editorial stack */}
      {projects.map((project, i) => {
        const num = String(i + 1).padStart(2, '0')
        const isEven = i % 2 === 1

        return (
          <FadeIn key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="group block"
            >
              {/* Thin partial-width rule — ornamental separator */}
              <div className="max-w-[1136px] mx-auto px-8 md:px-16">
                <div className={`h-px bg-th-border ${isEven ? 'ml-auto w-[70%]' : 'mr-auto w-[60%]'}`} />
              </div>

              <div className="relative py-24 md:py-36 lg:py-44">
                {/* Watermark index number — giant, ghosted */}
                <span
                  className="absolute font-display font-extralight leading-none select-none pointer-events-none hidden md:block"
                  style={{
                    fontSize: 'clamp(180px, 22vw, 320px)',
                    color: 'var(--text)',
                    opacity: 0.03,
                    letterSpacing: '-0.04em',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    ...(isEven ? { left: '3%' } : { right: '3%' }),
                  }}
                >
                  {num}
                </span>

                <div className="max-w-[1136px] mx-auto px-8 md:px-16">
                  {/* Asymmetric grid — image dominates at ~65%, text at ~30% */}
                  <div className={`grid grid-cols-1 lg:grid-cols-[1fr] gap-10 lg:gap-0 ${isEven ? '' : ''}`}>

                    {/* Desktop: absolute-positioned text creates grid-breaking overlap */}
                    <div className="relative">
                      {/* Image — bleeds wider than text column */}
                      <div className={`lg:w-[62%] ${isEven ? 'lg:ml-auto' : ''}`}>
                        <div className="aspect-[3/2] w-full relative overflow-hidden">
                          {project.coverImage ? (
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-2)' }}>
                              <span className="font-mono text-[10px] text-th-text3 tracking-[0.14em]">
                                [ {project.title} ]
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Text block — bottom-aligned, overlaps image area on desktop */}
                      <div className={`lg:absolute lg:bottom-0 ${isEven ? 'lg:left-0' : 'lg:right-0'} lg:w-[42%] mt-8 lg:mt-0`}>
                        <div className={`lg:pb-4 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                          {/* Category */}
                          <div className="flex items-baseline gap-4 mb-5">
                            <span className="font-mono text-[10px] text-th-text3 tracking-[0.14em]">{num}</span>
                            <span className="font-display text-[10px] font-bold text-th-text tracking-[0.14em]">
                              {project.category}
                            </span>
                          </div>

                          {/* Title — thin, large */}
                          <h2
                            className="font-display font-extralight text-[32px] md:text-[40px] lg:text-[48px] text-th-text leading-[1.05] mb-3"
                            style={{ letterSpacing: '0.02em' }}
                          >
                            {project.title}
                          </h2>

                          {/* Company + Year */}
                          <p className="font-mono text-[10px] text-th-text3 tracking-[0.14em] mb-5">
                            {project.company} · {project.year}
                          </p>

                          {/* Summary */}
                          <p className="font-display text-[14px] font-normal text-th-text2 leading-[1.65] tracking-[0.02em] mb-7 max-w-[380px]">
                            {project.summary}
                          </p>

                          {/* CTA */}
                          <span className="font-mono text-[11px] tracking-[0.1em] text-th-text group-hover:bg-th-text group-hover:text-th-bg transition-colors duration-100 px-1 py-0.5 inline-block">[VIEW CASE STUDY]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        )
      })}

      {/* Closing ornamental rule */}
      <div className="max-w-[1136px] mx-auto px-8 md:px-16">
        <div className="h-px bg-th-border w-[40%] mx-auto" />
      </div>
    </section>
  )
}
