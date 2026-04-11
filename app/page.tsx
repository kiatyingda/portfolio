import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import About from '@/components/sections/About'
import Footer from '@/components/sections/Footer'
import DotMatrix from '@/components/ui/DotMatrix'

export default function Home() {
  return (
    <div className="relative">
      <DotMatrix />
      <Hero />
      <Work />
      <About />
      <Footer />
    </div>
  )
}
