import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import FadeIn from '@/components/ui/FadeIn'
import BracketLink from '@/components/ui/BracketLink'
import { projects } from '@/content/projects'

export default function Work() {
  return (
    <section id="work">
      {projects.map((project, i) => {
        const isReversed = i % 2 !== 0

        return (
          <div
            key={project.slug}
            className="min-h-screen flex items-center bg-th-bg border-t border-th-border relative"
          >
            {/* Decorative dot */}
            <div className="absolute top-8 right-8 text-[6px] text-th-text hidden md:block" style={{ opacity: 0.2 }}>■</div>

            <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
              <FadeIn>
                <div className={`grid grid-cols-1 gap-8 md:gap-12 items-center ${
                  isReversed
                    ? 'md:grid-cols-[45%_55%]'
                    : 'md:grid-cols-[55%_45%]'
                }`}>
                  {/* Text */}
                  <div className={isReversed ? 'md:order-2' : ''}>
                    {/* Bold category label — weight contrast */}
                    <span className="font-display text-[11px] font-bold text-th-text tracking-[0.12em] mb-6 block">
                      ▶▶ {project.category}
                    </span>
                    <Link href={`/work/${project.slug}`}>
                      <h2
                        className="font-display font-extralight text-[34px] md:text-[48px] text-th-text leading-[1.1] mb-4"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        {project.title}
                      </h2>
                    </Link>
                    <p className="font-display text-[13px] font-light text-th-text3 tracking-[0.06em] mb-6">
                      {project.company} · {project.year}
                    </p>
                    <p className="font-display text-[14px] font-light text-th-text2 leading-[1.6] tracking-[0.03em] mb-8 max-w-[420px]">
                      {project.summary}
                    </p>
                    <div className="inline-flex items-center gap-1.5">
                      <span className="font-mono text-[11px] tracking-[0.1em] text-th-text">▸</span>
                      <BracketLink href={`/work/${project.slug}`}>View case study</BracketLink>
                    </div>
                  </div>

                  {/* Cover image */}
                  <Link href={`/work/${project.slug}`} className={`block ${isReversed ? 'md:order-1' : ''}`}>
                    <div className="overflow-hidden border border-th-border">
                      <ImagePlaceholder
                        aspect="4/3"
                        device="mobile"
                        src={project.coverImage}
                      />
                    </div>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        )
      })}
    </section>
  )
}
