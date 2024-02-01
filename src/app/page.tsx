import Hero from '#/Hero'
import About from '@/components/index/About'
import Gallery from '@/components/index/Gallery'

const styles = 'h-screen bg-purple-500 mt-52'

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Gallery />

      <div id="prices" className={styles}>
        prices
      </div>
      <div id="contacts" className={styles}>
        contacts
      </div>

      <div id="booking" className={styles}>
        contacts
      </div>
    </div>
  )
}
