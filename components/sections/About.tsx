import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { siteConfig } from '@/content/siteConfig'

export default function About() {
  const { about, linkedin, resumeUrl } = siteConfig

  return (
    <section id="about" className="bg-th-bg border-t border-th-border">
      <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-20 md:py-28">

        {/* Bio + Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32">
          <FadeIn>
            <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-10">[ About ]</p>

            <h2
              className="font-display font-extralight text-[30px] md:text-[38px] text-th-text leading-[1.15] mb-10 whitespace-pre-line"
              style={{ letterSpacing: '0.02em' }}
            >
              {about.tagline}
            </h2>

            {about.bio.map((para, i) => (
              <p key={i} className="font-display text-[14px] font-light text-th-text2 leading-[1.6] tracking-[0.03em] mb-5 last:mb-0">
                {para}
              </p>
            ))}
          </FadeIn>

          <FadeIn delay={100} className="flex flex-col justify-end">
            <div>
              {about.details.map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-8 border-b border-th-border py-4 last:border-b-0">
                  <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em] w-28 flex-shrink-0">{label}</span>
                  <span className="font-display text-[14px] font-light text-th-text2 leading-relaxed tracking-[0.03em]">{value}</span>
                </div>
              ))}
              <div className="pt-8 flex gap-4">
                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-[11px] font-display font-light tracking-[0.12em] border border-th-text text-th-text transition-all duration-200 hover:bg-th-text hover:text-th-bg">
                  LinkedIn
                </a>
                <a href={resumeUrl}
                  className="inline-flex items-center px-6 py-3 text-[11px] font-display font-light tracking-[0.12em] border border-th-border text-th-text2 transition-all duration-200 hover:border-th-text hover:text-th-text">
                  Resume
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Career Timeline */}
        {about.career && (
          <FadeIn>
            <div className="mt-20 md:mt-28 pt-16 border-t border-th-border">
              <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-12">[ Career ]</p>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-th-border" />

                <div className="space-y-12">
                  {about.career.map((role, i) => (
                    <div key={i} className="relative pl-10">
                      {/* Marker — sharp square, not circle */}
                      <div className={`absolute left-0 top-1.5 w-[11px] h-[11px] border ${
                        role.current
                          ? 'bg-th-text border-th-text'
                          : 'bg-th-bg border-th-border'
                      }`} />

                      {/* Period */}
                      <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-3">{role.period}</p>

                      {/* Card */}
                      <div className="border border-th-border bg-th-bg p-6 md:p-8">
                        <h3 className="font-display font-extralight text-[24px] md:text-[28px] text-th-text leading-tight mb-1"
                          style={{ letterSpacing: '0.02em' }}>
                          {role.company}
                        </h3>
                        <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-5">{role.role}</p>

                        <ul className="space-y-2.5">
                          {role.bullets.map((bullet, j) => (
                            <li key={j} className="font-display text-[13px] font-light text-th-text2 leading-[1.6] tracking-[0.03em] flex gap-3">
                              <span className="text-th-text3 mt-[5px] shrink-0 text-[8px]">—</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {role.link && (
                          <Link href={role.link}
                            className="inline-block mt-5 font-mono text-[10px] text-th-text3 tracking-[0.1em] hover:text-th-text transition-colors duration-200">
                            View work →
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
