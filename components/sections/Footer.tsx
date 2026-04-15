import { siteConfig } from '@/content/siteConfig'

export default function Footer() {
  const { name } = siteConfig

  return (
    <footer data-bg="light" className="relative">

      {/* Giant wordmark — edge-to-edge, Aino style */}
      <div className="w-full overflow-hidden px-4 md:px-6 -mt-8 md:-mt-12">
        <p
          className="leading-[1.1] select-none whitespace-nowrap w-full"
          style={{
            fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            fontSize: 'min(18vw, 320px)',
            letterSpacing: '-0.04em',
            color: 'var(--text)',
            textTransform: 'lowercase',
          }}
        >
          kiat yingda
        </p>
      </div>

    </footer>
  )
}
