import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Timeline from '@/components/sections/Timeline'
import Footer from '@/components/sections/Footer'
import SlideKeyboardNav from '@/components/ui/SlideKeyboardNav'
import BackgroundCrossfade from '@/components/ui/BackgroundCrossfade'

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <BackgroundCrossfade />
      <SlideKeyboardNav />
      <Hero />
      <Timeline />
      <Work />
      <About />
      <Footer />

      {/* Ornamental marks — hairline rules + curated glyphs, carlesfaus style.
          Three placed marks at major transitions: hero→timeline, timeline→work,
          near about. Removed pattern-fill marks that didn't earn their place. */}
      <div className="hidden md:block pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Vertical hairline — between hero and timeline */}
        <div className="absolute" style={{ top: '105vh', right: '6%', width: '1px', height: '80px', backgroundColor: 'var(--text)', opacity: 0.06 }} />

        {/* Horizontal hairline — between timeline and work */}
        <div className="absolute" style={{ top: '250vh', left: '8%', width: '60px', height: '1px', backgroundColor: 'var(--text)', opacity: 0.06 }} />

        {/* Cross — near about, page closure */}
        <span className="absolute font-mono text-[6px]" style={{ top: '480vh', right: '9%', opacity: 0.07, color: 'var(--text)' }}>×</span>
      </div>
    </div>
  )
}
