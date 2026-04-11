import FadeIn from '@/components/ui/FadeIn'
import { siteConfig } from '@/content/siteConfig'

export default function About() {
  const { about, linkedin, resumeUrl } = siteConfig

  return (
    <section id="about" className="min-h-screen bg-th-bg2 border-t border-th-bsub flex items-center" style={{ scrollSnapAlign: 'start' }}>
      <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
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
      </div>
    </section>
  )
}
