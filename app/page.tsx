import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Timeline from '@/components/sections/Timeline'
import Footer from '@/components/sections/Footer'
import SlideKeyboardNav from '@/components/ui/SlideKeyboardNav'

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <SlideKeyboardNav />
      <Hero />
      <Timeline />
      <Work />
      <About />
      <Footer />

      {/* Ornamental marks — hairline rules + curated glyphs, carlesfaus style */}
      <div className="hidden md:block pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Thin vertical hairline — right margin, between hero and timeline */}
        <div className="absolute" style={{ top: '105vh', right: '6%', width: '1px', height: '80px', backgroundColor: 'var(--text)', opacity: 0.06 }} />

        {/* Single cross mark — left margin, near timeline */}
        <span className="absolute font-mono text-[7px]" style={{ top: '155vh', left: '4%', opacity: 0.08, color: 'var(--text)' }}>+</span>

        {/* Thin horizontal hairline — partial width, between timeline and work */}
        <div className="absolute" style={{ top: '250vh', left: '8%', width: '60px', height: '1px', backgroundColor: 'var(--text)', opacity: 0.06 }} />

        {/* Dot — right margin, near work section */}
        <span className="absolute font-mono text-[4px]" style={{ top: '310vh', right: '5%', opacity: 0.10, color: 'var(--text)' }}>·</span>

        {/* Thin vertical hairline — left margin, between work rows */}
        <div className="absolute" style={{ top: '380vh', left: '3%', width: '1px', height: '50px', backgroundColor: 'var(--text)', opacity: 0.05 }} />

        {/* Cross — near about section */}
        <span className="absolute font-mono text-[6px]" style={{ top: '480vh', right: '9%', opacity: 0.07, color: 'var(--text)' }}>×</span>
      </div>
    </div>
  )
}
