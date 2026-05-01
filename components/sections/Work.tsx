'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { visibleProjects, projects as allProjects } from '@/content/projects'

// Display metric per project. Editorial stack puts this at receipt-scale, not caption-scale.
function projectMetric(slug: string): string {
  switch (slug) {
    case 'grab-multiple-ride-types':
      return '+$1M / YR · +0.4PP FULFILMENT'
    case 'grab-influence':
      return '1 OF 6 OF 120+ · −4PP CANCELLATION'
    case 'okx-boost':
      return '~$4B VOLUME · ~75% WEB3 REVENUE'
    case 'singhealth':
      return 'PUBLIC HEALTHCARE · BEDSIDE APP'
    case 'ion-orchard':
      return 'RETAIL · IN-MALL DELIGHT'
    case 'roda-chatbot':
      return 'WHATSAPP CHATBOT · GRAB DRIVERS'
    default:
      return ''
  }
}

function ProjectRow({ project, index, isFirst }: { project: typeof visibleProjects[0]; index: number; isFirst: boolean }) {
  const metric = projectMetric(project.slug)
  // Stagger: even index = image left, odd index = image right
  const imageLeft = index % 2 === 0

  return (
    <FadeIn delay={index * 60}>
      <Link
        href={`/work/${project.slug}`}
        className={
          isFirst
            ? "group block pt-12 md:pt-16 lg:pt-20 pb-20 md:pb-28 lg:pb-32"
            : "group block py-20 md:py-28 lg:py-32"
        }
        style={{ borderTop: isFirst ? 'none' : '1px solid var(--border)' }}
      >
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 lg:gap-x-12 items-center">
          {/* Image — always first in source order (mobile reads image then text).
              Sized at col-span-5 (~38% of the 1280px container). Text takes
              col-span-6, with a 1-col gutter between them (cols 6 or 7 depending
              on stagger). Total: 5 + 1 + 6 = 12 cols, both flush to container
              edges. Grayscale + 50% opacity at rest; full color + opacity on
              hover — image is a quiet anchor that wakes up on engagement. */}
          <div
            className={
              imageLeft
                ? 'col-span-12 md:col-span-5 mb-10 md:mb-0'
                : 'col-span-12 md:col-span-5 md:col-start-8 md:order-last mb-10 md:mb-0'
            }
            style={{ pointerEvents: 'none' }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : metric ? (
                <div
                  className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-10 lg:px-12"
                  style={{
                    borderTop: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {metric.split(' · ').map((part, i) => (
                    <p
                      key={i}
                      className="font-mono font-bold uppercase"
                      style={{
                        color: 'var(--text)',
                        fontSize: 'clamp(28px, 3.6vw, 52px)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {part}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Text */}
          <div
            className={
              imageLeft
                ? 'col-span-12 md:col-span-6 md:col-start-7'
                : 'col-span-12 md:col-span-6 md:col-start-1'
            }
          >
            {/* Category + year — small mono label in brackets */}
            <p
              className="font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase mb-7 md:mb-9"
              style={{ color: 'var(--text-3)' }}
            >
              [ {project.category.toUpperCase()} · {project.year} ]
            </p>

            {/* Headline — display-scale, capped to editorial column.
                font-normal because Space Mono is loaded at 400/700 only;
                weight 200 silently fell back to 400. Display impact comes
                from scale + uppercase + mono, not weight. */}
            <h3
              className="font-display font-normal uppercase mb-7 max-w-[640px]"
              style={{
                color: 'var(--text)',
                fontSize: 'clamp(36px, 4.4vw, 60px)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
              }}
            >
              {project.title}
            </h3>

            {/* Metric — receipts at display scale. Hidden when there's no
                cover image, since the image slot promotes the metric to
                hero scale already. */}
            {metric && project.coverImage && (
              <p
                className="font-mono font-bold mb-8"
                style={{
                  color: 'var(--text)',
                  fontSize: 'clamp(15px, 1.4vw, 19px)',
                  letterSpacing: '0.08em',
                  lineHeight: 1.35,
                }}
              >
                {metric}
              </p>
            )}

            {/* Summary */}
            <p
              className="font-display text-[15px] md:text-[16px] font-normal mb-9 max-w-[480px]"
              style={{
                color: 'var(--text)',
                lineHeight: 1.65,
                letterSpacing: '0.005em',
              }}
            >
              {project.summary}
            </p>

            {/* CTA — arrow slides right on row hover */}
            <span
              className="cta-view font-mono text-[14px] md:text-[15px] font-bold tracking-[0.14em] uppercase inline-flex items-baseline gap-[0.5em]"
              style={{ color: 'var(--text)' }}
            >
              VIEW CASE STUDY
              <span className="cta-view-arrow inline-block">→</span>
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  )
}

export default function Work() {
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setShowAll(localStorage.getItem('showAllProjects') === '1')
  }, [])

  const projects = showAll ? allProjects : visibleProjects

  const toggleAll = () => {
    const next = !showAll
    setShowAll(next)
    localStorage.setItem('showAllProjects', next ? '1' : '0')
  }

  return (
    <section id="work" data-bg="light" className="relative">

      {/* Top label */}
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 lg:px-10 pt-16 md:pt-24 pb-4 md:pb-8">
        <p>
          <span
            className="font-mono text-[14px] md:text-[16px] font-bold tracking-[0.14em]"
            style={{ color: 'var(--text)' }}
          >
            [WORKS]
          </span>
        </p>
      </div>

      {/* Editorial stack — one project per row, staggered */}
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 lg:px-10">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} isFirst={i === 0} />
        ))}
      </div>

      {/* Quiet section close — [+] toggle reveals hidden projects */}
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 lg:px-10 pt-6 md:pt-8 pb-8 md:pb-10 mt-10 md:mt-14 flex justify-end">
        <button
          onClick={toggleAll}
          aria-label={showAll ? 'Hide archived projects' : 'Show archived projects'}
          className="font-mono text-[12px] tracking-[0.12em] opacity-20 hover:opacity-70 transition-opacity px-3 py-2"
          style={{ color: 'var(--text)' }}
        >
          {showAll ? '[ − ]' : '[ + ]'}
        </button>
      </div>

    </section>
  )
}
