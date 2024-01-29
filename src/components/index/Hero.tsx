import Image from 'next/image'

import Header from '../ui/Header/Header'
import Button from '../ui/Button'

import HeroBackground from '../../assets/index/hero-background.png'
import HeroText from '../../assets/index/hero-text.svg'
import HeroSocials from './HeroSocials'

const screenHeight = '!sm:h-[100svh] h-[100vh]'

export default function Hero() {
  return (
    <section id="hero" className={`relative pt-12 duration-500 ${screenHeight}`}>
      <Header />
      <div className="grid h-[75vh] place-items-center">
        <Image className="object-cover" src={HeroText} alt="" />
      </div>
      <div className="flex items-center justify-between mx-20">
        <Button style="hero" link="#booking">
          Забронировать
        </Button>
        <HeroSocials />
      </div>

      <div className="absolute inset-0 bg-black s-full -z-10">
        <Image className="object-cover opacity-65 -z-10" src={HeroBackground} fill alt="" />
      </div>
    </section>
  )
}
