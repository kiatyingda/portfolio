import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { siteConfig } from '@/content/siteConfig'

export default function About() {
  const { about, linkedin, resumeUrl } = siteConfig

  return (
    <section id="about" className="bg-th-bg2 border-t border-th-bsub" style={{ scrollSnapAlign: 'start' }}>
      <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-20 md:py-28">

        {/* Bio + Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32">
          <FadeIn>
            <p className="font-sans text-[14px] font-medium text-th-text2 mb-10">About</p>

            <h2
              className="font-display font-bold text-[32px] md:text-[40px] text-th-text leading-[1.22] mb-10 whitespace-pre-line"
              style={{ letterSpacing: '-0.02em' }}
            >
              {about.tagline}
            </h2>

            {about.bio.map((para, i) => (
              <p key={i} className="font-sans text-[16px] text-th-text2 leading-[1.5] mb-5 last:mb-0">
                {para}
              </p>
            ))}
          </FadeIn>

          <FadeIn delay={100} className="flex flex-col justify-end">
            <div>
              {about.details.map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-8 border-b border-th-bsub py-4 last:border-b-0">
                  <span className="font-sans text-[12px] font-medium text-th-text3 w-28 flex-shrink-0">{label}</span>
                  <span className="font-sans text-[16px] text-th-text2 leading-relaxed">{value}</span>
                </div>
              ))}
              <div className="pt-8 flex gap-4">
                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-pill bg-th-text text-th-bg font-sans text-[14px] font-medium hover:opacity-80 transition-opacity duration-200">
                  LinkedIn
                </a>
                <a href={resumeUrl}
                  className="inline-flex items-center px-5 py-2.5 rounded-pill border border-th-border font-sans text-[14px] font-medium text-th-text2 hover:text-th-text hover:bg-th-chip transition-all duration-200">
                  Resume
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Career Timeline */}
        {about.career && (
          <FadeIn>
            <div className="mt-20 md:mt-28 pt-16 border-t border-th-bsub">
              <p className="font-sans text-[14px] font-medium text-th-text2 mb-12">Career</p>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-th-bsub" />

                <div className="space-y-12">
                  {about.career.map((role, i) => (
                    <div key={i} className="relative pl-10">
                      {/* Dot */}
                      <div className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 ${
                        role.current
                          ? 'bg-th-accent border-th-accent'
                          : 'bg-th-bg2 border-th-bsub'
                      }`} />

                      {/* Period */}
                      <p className="font-mono text-[12px] text-th-text3 mb-3">{role.period}</p>

                      {/* Card */}
                      <div className="rounded-card border border-th-bsub bg-th-bg3 p-6 md:p-8">
                        <h3 className="font-display font-bold text-[24px] md:text-[28px] text-th-text leading-tight mb-1"
                          style={{ letterSpacing: '-0.02em' }}>
                          {role.company}
                        </h3>
                        <p className="font-sans text-[14px] font-medium text-th-accent mb-5">{role.role}</p>

                        <ul className="space-y-2.5">
                          {role.bullets.map((bullet, j) => (
                            <li key={j} className="font-sans text-[14px] text-th-text2 leading-[1.5] flex gap-3">
                              <span className="text-th-text3 mt-[7px] shrink-0">&#8226;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {role.link && (
                          <Link href={role.link}
                            className="inline-block mt-5 font-mono text-[13px] text-th-text3 hover:text-th-text transition-colors duration-200">
                            View work &rarr;
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
