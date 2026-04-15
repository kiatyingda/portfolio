'use client'

import Link from 'next/link'
import { useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import AsciiImageReveal from '@/components/ui/AsciiImageReveal'
import ShuffleText from '@/components/ui/ShuffleText'
import BracketLink from '@/components/ui/BracketLink'
import { projects } from '@/content/projects'

function projectCode(slug: string, year: string): string {
  // Extract last 4-digit year from range like "2021–2024" or "2024"
  const match = year.match(/\d{4}(?!.*\d{4})/)
  const yr = match ? match[0].slice(-3) : '000'
  return `${slug.toUpperCase()}_KY_${yr}`
}

function ProjectCell({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <FadeIn delay={index * 40} className="flex flex-col h-full">
      {/* Top label: ► TITLE */}
      <div className="mb-3">
        <ShuffleText
          text={`▶ ${project.title.toUpperCase()}`}
          className="font-mono text-[14px] font-bold tracking-[0.12em] inline-block"
          style={{ color: 'var(--text)' }}
        />
      </div>

      {/* Portrait thumbnail */}
      <Link href={`/work/${project.slug}`} className="group block flex-1">
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          {project.coverImage ? (
            <AsciiImageReveal
              src={project.coverImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-2)' }}>
              <span className="font-mono text-[9px] tracking-[0.12em]" style={{ color: 'var(--text-3)' }}>
                [ {project.title} ]
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Bottom codename */}
      <div className="mt-3">
        <ShuffleText
          text={projectCode(project.slug, project.year)}
          className="font-mono text-[9px] tracking-[0.1em] inline-block"
          style={{ color: 'var(--text-3)' }}
        />
      </div>
    </FadeIn>
  )
}

export default function Work() {
  const [activeIndex] = useState(0)
  const pad2 = (n: number) => String(n).padStart(2, '0')
  const total = projects.length

  return (
    <section id="work" data-bg="light" className="relative">

      {/* Top label */}
      <div className="px-4 md:px-8 lg:px-10 pt-16 md:pt-24 pb-8">
        <p><span className="font-mono text-[14px] md:text-[16px] font-bold tracking-[0.14em] inline-block px-2 py-1" style={{ backgroundColor: '#000', color: '#fff' }}>[ SELECTED WORK ]</span></p>
      </div>

      {/* Filmstrip: horizontal row of projects */}
      <div className="px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-3 md:gap-x-4 gap-y-10">
          {projects.map((project, i) => (
            <ProjectCell key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom status bar — carlesfaus pattern */}
      <div className="px-4 md:px-8 lg:px-10 pt-10 md:pt-14 pb-10 md:pb-14 border-t mt-14 md:mt-20" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-baseline justify-between gap-y-4 gap-x-8 font-mono text-[10px] tracking-[0.12em]" style={{ color: 'var(--text-3)' }}>
          <div className="flex items-center gap-2">
            <span>YOU ARE VIEWING SELECTED WORK</span>
            <span className="tracking-[0.3em]">▶ ▶ ▶</span>
          </div>

          <div className="flex items-center gap-3">
            <span style={{ color: 'var(--text)' }}>{pad2(activeIndex + 1)}</span>
            <span>/</span>
            <span>{pad2(total)}</span>
          </div>

          <div className="flex items-center gap-4">
            <BracketLink href="https://linkedin.com/in/kiatyingda" external>LinkedIn</BracketLink>
            <BracketLink href="mailto:kiat.yingda@gmail.com">Contact</BracketLink>
          </div>
        </div>
      </div>

    </section>
  )
}
