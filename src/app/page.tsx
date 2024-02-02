import Hero from '#/Hero'
import About from '@/components/index/About'
import Gallery from '@/components/index/Gallery'
import Prices from '@/components/index/Prices'
import Schema from '@/components/index/Schema'

const styles = 'h-screen bg-purple-500 mt-52'

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Gallery />
      {/* <Schema /> */}
      <Prices />

      <div id="contacts" className={styles}>
        contacts
      </div>

      <div id="booking" className={styles}>
        contacts
      </div>
    </div>
  )
}
