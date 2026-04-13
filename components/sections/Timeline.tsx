import FadeIn from '@/components/ui/FadeIn'
import BracketLink from '@/components/ui/BracketLink'
import { siteConfig } from '@/content/siteConfig'

export default function Timeline() {
  const { about } = siteConfig
  if (!about.career) return null

  return (
    <section id="experience" className="relative border-t border-th-border bg-th-bg">
      <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-24 md:py-36">
        <FadeIn>
          <p className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-20 md:mb-28">[ Experience ]</p>

          <div className="space-y-0">
            {about.career.map((role, i) => {
              const num = String(i + 1).padStart(2, '0')

              return (
                <div key={i} className="border-t border-th-border py-16 md:py-20 first:border-t-0 first:pt-0">
                  {/* Two-column: metadata left, content right */}
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-6 md:gap-12">

                    {/* Left column — index, period, role */}
                    <div>
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em]">{num}</span>
                        <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em]">{role.period}</span>
                      </div>
                      <p className="font-display text-[11px] font-bold text-th-text tracking-[0.12em]">
                        {role.role}
                      </p>
                    </div>

                    {/* Right column — company name + bullets */}
                    <div>
                      <h3
                        className="font-display font-extralight text-[36px] md:text-[48px] lg:text-[56px] text-th-text leading-[1.08] mb-8"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        {role.company}
                      </h3>

                      <ul className="space-y-3 mb-6">
                        {role.bullets.map((bullet, j) => (
                          <li key={j} className="font-display text-[13px] font-normal text-th-text2 leading-[1.6] tracking-[0.02em] flex gap-3 max-w-[520px]">
                            <span className="text-th-text3 mt-[5px] shrink-0 text-[8px]">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {role.link && (
                        <div className="inline-flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em]">▸</span>
                          <BracketLink href={role.link}>View work</BracketLink>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
