import { siteConfig } from '@/content/siteConfig'

export default function Footer() {
  const { name, email, linkedin, resumeUrl, footer } = siteConfig

  return (
    <footer className="bg-th-bg border-t border-th-bsub">
      <div className="max-w-[1136px] mx-auto px-8 md:px-12 py-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <p className="font-sans text-[16px] text-th-text2 leading-[1.5] max-w-[420px] mb-5">
            {footer.closing}
          </p>
          <p className="font-sans text-[12px] text-th-text3">{name} · {new Date().getFullYear()}</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <a href={`mailto:${email}`}
            className="font-sans text-[14px] text-th-text2 hover:text-th-text transition-colors duration-200">
            {email}
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer"
            className="font-sans text-[14px] text-th-text2 hover:text-th-text transition-colors duration-200">
            LinkedIn
          </a>
          <a href={resumeUrl}
            className="font-sans text-[14px] text-th-text2 hover:text-th-text transition-colors duration-200">
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}
