import { siteConfig } from '@/content/siteConfig'
import BracketLink from '@/components/ui/BracketLink'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-24 right-12 text-[6px] text-th-text hidden md:block" style={{ opacity: 0.25 }}>■</div>
      <div className="absolute bottom-[30%] right-8 text-[6px] text-th-text hidden md:block" style={{ opacity: 0.2 }}>■</div>

      <div className="flex-1 flex items-center">
        <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center">
            {/* Left — copy */}
            <div>
              <p className="font-mono text-[11px] text-th-text3 tracking-[0.1em] mb-10 md:mb-12 hero-enter hero-enter-1">
                ▶▶▶ {siteConfig.title}
              </p>

              <h1
                className="font-display font-extralight text-[40px] sm:text-[52px] md:text-[68px] lg:text-[72px] leading-[1.05] text-th-text max-w-[600px] mb-6 md:mb-8 hero-enter hero-enter-2"
                style={{ letterSpacing: '0.02em' }}
              >
                {siteConfig.heroCopy.headline}
              </h1>

              <p className="font-display text-[14px] md:text-[16px] font-light text-th-text2 max-w-[420px] leading-[1.6] tracking-[0.04em] mb-10 md:mb-12 hero-enter hero-enter-3">
                {siteConfig.heroCopy.body}
              </p>

              <div className="hero-enter hero-enter-4 inline-flex items-center gap-1.5">
                <span className="font-mono text-[11px] tracking-[0.1em] text-th-text">▸</span>
                <BracketLink href="/#work">{siteConfig.heroCopy.cta}</BracketLink>
              </div>
            </div>

            {/* Right — ASCII portrait, bleeds beyond grid */}
            <div className="hidden lg:block hero-enter hero-enter-3">
              <div className="relative overflow-visible" style={{ height: '90vh', marginRight: '-10vw' }}>
                <iframe
                  src="/ascii/ascii-portrait.html"
                  className="absolute"
                  style={{
                    border: 'none',
                    top: '-20%',
                    right: '-15%',
                    width: '140%',
                    height: '140%',
                    background: 'transparent',
                  }}
                  title="ASCII Portrait"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 pb-8 flex items-center justify-between border-t border-th-border pt-5">
        <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em]">
          Portfolio · {new Date().getFullYear()}
        </span>
        <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em]">
          [↓] Scroll
        </span>
      </div>
    </section>
  )
}
