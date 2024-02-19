import Image from 'next/image'
import Link from 'next/link'

import Header from '../ui/Header/Header'
import Button from '../ui/Button'

import HeroBackground from '../../assets/index/hero-background.webp'
import HeroText from '../../assets/index/hero-text.svg'

import TelImage from '../../assets/index/socials/tel.svg'
import VkImage from '../../assets/index/socials/vk.svg'
import TgImage from '../../assets/index/socials/tg.svg'

import {linksData} from '@/lib/data'

const iconsData = [
  {link: linksData.tel.href, target: '', image: TelImage},
  {link: linksData.vk.href, target: '_blank', image: VkImage},
  {link: linksData.tg.href, target: '_blank', image: TgImage},
]

function HeroSocials() {
  return (
    <div className="flex gap-4">
      {iconsData.map((icon, index) => (
        <Link href={icon.link} target={icon.target} title="icon" key={index} className="duration-200 s-14 xl:s-10 hover:scale-110">
          <Image className="object-cover s-full" src={icon.image} alt={`${icon.link} icon`} width={48} height={48} />
        </Link>
      ))}
    </div>
  )
}

const screenHeight = 'h-[100vh]'

export default function Hero() {
  return (
    <section id="hero" className={`relative flex flex-col flex-1 justify-between py-12 sm:py-7 duration-500 ${screenHeight}`}>
      <Header />
      <div className="grid place-items-center">
        <Image className="xl:w-[30%] sm:w-[70%] object-cover" src={HeroText} alt="" />
      </div>
      <div className="flex items-center justify-between mx-20 sm:flex-col sm:gap-5 sm:mx-5">
        <Button style="hero" link="#contacts" classes="sm:text-lg sm:w-full">
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
