import { siteConfig } from '@/content/siteConfig'
import BracketLink from '@/components/ui/BracketLink'

export default function Footer() {
  const { name, email, linkedin, resumeUrl, footer } = siteConfig

  return (
    <footer className="section-dark grain relative border-t" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
      <div className="max-w-[1136px] mx-auto px-8 md:px-12 py-14">
        {/* Closing line */}
        <p className="font-display text-[14px] font-normal text-th-text2 leading-[1.6] tracking-[0.02em] max-w-[420px] mb-12">
          {footer.closing}
        </p>

        {/* Bracket links row */}
        <div className="flex flex-wrap gap-x-4 gap-y-3 mb-16">
          <BracketLink href={`mailto:${email}`}>Email</BracketLink>
          <BracketLink href={linkedin} external>LinkedIn</BracketLink>
          <BracketLink href={resumeUrl}>Resume</BracketLink>
        </div>

        {/* Bold wordmark — contrast against thin body */}
        <div className="border-t border-th-border pt-8 flex items-end justify-between">
          <p className="font-display font-black text-[48px] sm:text-[64px] md:text-[96px] lg:text-[120px] text-th-text leading-none"
            style={{ letterSpacing: '-0.03em' }}>
            {name}
          </p>
          <span className="font-mono text-[10px] text-th-text3 tracking-[0.1em] mb-2 hidden md:block">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
