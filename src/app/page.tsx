import Hero from '#/Hero'
import About from '@/components/index/About'
import Gallery from '@/components/index/Gallery'
import Schema from '@/components/index/Schema'
import Prices from '@/components/index/Prices'
import Contacts from '@/components/index/Contacts'

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Gallery />
      {/* <Schema /> */}
      <Prices />
      <Contacts />

      {/* <div id="booking"></div> */}
    </div>
  )
}
