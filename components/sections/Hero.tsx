import { siteConfig } from '@/content/siteConfig'
import BracketLink from '@/components/ui/BracketLink'

export default function Hero() {
  return (
    <section className="section-dark grain relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>

      {/* ASCII portrait — absolute, fills right half of the entire section */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[55%]">
        <iframe
          src="/ascii/ascii-portrait.html"
          className="absolute inset-0 w-full h-full"
          style={{
            border: 'none',
            background: 'transparent',
          }}
          title="ASCII Portrait"
          loading="eager"
        />
      </div>

      {/* Copy — left side, pointer-events pass through to portrait */}
      <div className="relative z-10 max-w-[1136px] mx-auto w-full px-8 md:px-12 pt-28 pb-16 pointer-events-none">
        <div className="lg:max-w-[50%] pointer-events-auto">
          <h1
            className="font-display font-extralight text-[40px] sm:text-[52px] md:text-[68px] lg:text-[80px] leading-[1.05] mb-6 md:mb-8 hero-enter hero-enter-2"
            style={{ letterSpacing: '0.02em', color: 'var(--text)' }}
          >
            {siteConfig.heroCopy.headline}
          </h1>

          <p className="font-display text-[14px] md:text-[17px] font-normal max-w-[420px] leading-[1.6] tracking-[0.02em] mb-10 md:mb-12 hero-enter hero-enter-3"
            style={{ color: 'var(--text-2)' }}>
            {siteConfig.heroCopy.body}
          </p>

          <div className="hero-enter hero-enter-4 inline-flex items-center gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.1em] text-th-text">▸</span>
            <BracketLink href="/#work">{siteConfig.heroCopy.cta}</BracketLink>
          </div>
        </div>
      </div>

    </section>
  )
}
