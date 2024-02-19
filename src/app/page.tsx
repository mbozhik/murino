import Hero from '#/Hero'
import About from '@/components/index/About'
import Gallery from '@/components/index/Gallery'
import Schema from '@/components/index/Schema'
import Prices from '@/components/index/Prices'
import Contacts from '@/components/index/Contacts'
import Footer from '@/components/ui/Footer'

export default function Index() {
  return (
    <div>
      <Hero />
      <About />
      <Gallery />
      <Schema />
      <Prices />
      <Contacts />
      <Footer />
    </div>
  )
}
