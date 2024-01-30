import Image from 'next/image'

import Header from '../ui/Header/Header'
import Button from '../ui/Button'

import HeroBackground from '../../assets/index/hero-background.png'
import HeroText from '../../assets/index/hero-text.svg'
import HeroSocials from './HeroSocials'

const screenHeight = 'h-[100vh]'

export default function Hero() {
  return (
    <section id="hero" className={`relative pt-10 xs:pb-10 sm:pt-5 duration-500 ${screenHeight}`}>
      <Header />
      <div className="grid h-[75vh] xl:h-[74vh] sm:h-[70vh] xs:h-[62.5vh] place-items-center">
        <Image className="xl:w-[30%] sm:w-[70%] object-cover" src={HeroText} alt="" />
      </div>
      <div className="flex items-center justify-between mx-20 sm:flex-col sm:gap-5 sm:mx-5">
        <Button style="hero" link="#booking" classes="sm:text-lg sm:w-full">
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
