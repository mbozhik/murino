import Image from 'next/image'

import Header from '../common/Header/Header'
import HeroBackground from '../../assets/index/hero-background.png'

const screenHeight = '!h-[100svh] h-100vh'

export default function Hero() {
  return (
    <section id="hero" className={`relative pt-12 duration-500 bg-black ${screenHeight}`}>
      <Header />
      <Image className="object-cover opacity-70" src={HeroBackground} fill alt="" />
    </section>
  )
}
