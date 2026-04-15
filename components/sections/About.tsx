import FadeIn from '@/components/ui/FadeIn'
import BracketLink from '@/components/ui/BracketLink'
import { siteConfig } from '@/content/siteConfig'

export default function About() {
  const { about, linkedin, resumeUrl } = siteConfig

  return (
    <section id="about" data-bg="light" className="border-t border-th-border relative">
      <div className="w-full px-4 md:px-8 lg:px-10 pt-10 md:pt-14 pb-24 md:pb-36">

        {/* Bio + Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32">
          <FadeIn>
            <p className="mb-12"><span className="font-mono text-[14px] md:text-[16px] font-bold tracking-[0.14em] inline-block px-2 py-1" style={{ backgroundColor: '#000', color: '#fff' }}>[ ABOUT ]</span></p>

            <h2
              className="font-display font-normal text-[36px] md:text-[48px] text-th-text leading-[1.1] mb-10 whitespace-pre-line"
              style={{ letterSpacing: '0.02em' }}
            >
              {about.tagline}
            </h2>

            {about.bio.map((para, i) => (
              <p key={i} className="font-display text-[14px] font-normal text-th-text2 leading-[1.6] tracking-[0.02em] mb-5 last:mb-0">
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
                <BracketLink href={linkedin} external>LinkedIn</BracketLink>
                <BracketLink href={resumeUrl}>Resume</BracketLink>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
