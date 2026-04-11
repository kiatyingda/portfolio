import Link from 'next/link'
import { siteConfig } from '@/content/siteConfig'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      <div className="flex-1 flex items-center">
        <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 pt-28 pb-16">
          <p className="font-sans text-[14px] font-medium text-th-text2 mb-8 md:mb-10 hero-enter hero-enter-1">
            {siteConfig.title}
          </p>

          <h1
            className="font-display font-bold text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px] leading-[1.08] text-th-text max-w-[800px] mb-6 md:mb-8 hero-enter hero-enter-2"
            style={{ letterSpacing: '-0.03em' }}
          >
            {siteConfig.heroCopy.headline}
          </h1>

          <p className="font-sans text-[16px] md:text-[18px] text-th-text2 max-w-[480px] leading-[1.5] mb-8 md:mb-10 hero-enter hero-enter-3">
            {siteConfig.heroCopy.body}
          </p>

          <div className="hero-enter hero-enter-4">
            <Link
              href="/#work"
              className="inline-flex items-center px-5 py-2.5 rounded-pill text-[14px] font-sans font-medium bg-th-text text-th-bg transition-opacity duration-200 hover:opacity-80"
            >
              {siteConfig.heroCopy.cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 pb-8 flex items-center justify-between border-t border-th-bsub pt-5">
        <span className="font-sans text-[12px] text-th-text3">
          Portfolio · {new Date().getFullYear()}
        </span>
        <span className="font-sans text-[12px] text-th-text3">
          Scroll ↓
        </span>
      </div>
    </section>
  )
}
