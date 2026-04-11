import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import FadeIn from '@/components/ui/FadeIn'
import { projects } from '@/content/projects'

export default function Work() {
  return (
    <section id="work">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          className="min-h-screen flex items-center bg-th-bg border-t border-th-bsub"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 md:gap-12 items-center">
                {/* Text */}
                <div>
                  <span className="font-mono text-[12px] text-th-text3 mb-6 block">
                    {String(i + 1).padStart(2, '0')} — {project.category}
                  </span>
                  <Link href={`/work/${project.slug}`}>
                    <h2
                      className="font-display font-bold text-[36px] md:text-[52px] text-th-text leading-[1.12] mb-4 hover:opacity-70 transition-opacity duration-200"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {project.title}
                    </h2>
                  </Link>
                  <p className="font-sans text-[14px] text-th-text3 mb-6">
                    {project.company} · {project.year}
                  </p>
                  <p className="font-sans text-[16px] text-th-text2 leading-[1.5] mb-8 max-w-[420px]">
                    {project.summary}
                  </p>
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center px-5 py-2.5 rounded-pill bg-th-text text-th-bg font-sans text-[14px] font-medium hover:opacity-80 transition-opacity duration-200"
                  >
                    View case study
                  </Link>
                </div>

                {/* Cover image */}
                <Link href={`/work/${project.slug}`} className="block group">
                  <div className="overflow-hidden rounded-card-lg shadow-card">
                    <ImagePlaceholder
                      aspect="4/3"
                      device="mobile"
                      src={project.coverImage}
                      className="group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </div>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      ))}
    </section>
  )
}
