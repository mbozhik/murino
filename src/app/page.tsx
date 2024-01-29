import Hero from '#/Hero'
const styles = 'h-screen bg-purple-500 my-5'

export default function Home() {
  return (
    <div>
      <Hero />

      <div id="about-us" className={styles}>
        about-us
      </div>
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
