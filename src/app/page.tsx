import type {Metadata} from 'next'
import {cn} from '@/lib/utils'

import Hero from '##/index/Hero'
import About from '##/index/About'
import Gallery from '##/index/Gallery'
import Schema from '##/index/Schema'
import Prices from '##/index/Prices'
import Contacts from '##/index/Contacts'
import Footer from '##/index/Footer'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Index() {
  return (
    <>
      <Hero />
      <main className={cn('mx-3', 'mt-20 xl:mt-14 sm:mt-10', 'space-y-20 xl:space-y-14 sm:space-y-10')}>
        <About />
        <Gallery />
        <Schema />
        <Prices />
        <Contacts />
        <Footer />
      </main>
    </>
  )
}
