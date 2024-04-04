'use client'

import {useState} from 'react'
import {isMobile} from '@bozzhik/is-mobile'

import Image from 'next/image'
import Button from '../ui/Button'

interface CardData {
  image: string | StaticImageData
  hoverImage: string | StaticImageData
  mobileImage: string | StaticImageData
}

const cardsData: CardData[] = Array.from({length: 3}, (_, index) => ({
  image: require(`@/assets/index/about/${index + 1}.webp`).default,
  hoverImage: require(`@/assets/index/about/${index + 1}_hover.webp`).default,
  mobileImage: require(`@/assets/index/about/${index + 1}_mobile.webp`).default,
}))

interface StaticImageData {
  src: string
  height: number
  width: number
  blurDataURL?: string
}

interface CardProps {
  image: string | StaticImageData
  hoverImage: string | StaticImageData
  mobileImage: string | StaticImageData
  isLastCard?: boolean
}

const Card: React.FC<CardProps> = ({image, hoverImage, mobileImage, isLastCard = false}) => {
  const [isHovered, setIsHovered] = useState(false)

  const altText = 'Преимущество'

  return (
    <div className="relative w-full h-full overflow-hidden rounded-small shadow-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {!isMobile && <Image quality={100} className={`object-cover w-full transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} src={image} alt={altText} width={isLastCard ? '2000' : '1000'} height={1000} />}
      {!isMobile && <Image quality={100} className={`absolute inset-0 object-cover -z-10 w-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} src={hoverImage} alt={altText} width={isLastCard ? '2000' : '1000'} height={1000} />}

      {isMobile && <Image quality={100} className={`object-cover w-full`} src={mobileImage} alt={altText} width={isLastCard ? '2000' : '1000'} height={1000} />}
    </div>
  )
}

export default function About() {
  return (
    <section id="about-us" className="pt-10 mt-10 sm:pt-0 sm:sm:mt-14">
      <Button style="heading" classes="w-1/2 mx-auto sm:w-[96%]">
        Почему нас выбирают?
      </Button>
      <div className="flex flex-col mx-3 mt-10 sm:mt-5 gap-14 sm:gap-5">
        <div className="grid justify-between grid-cols-2 gap-10 sm:gap-5 sm:grid-cols-1">
          {cardsData.slice(0, 2).map((card, index) => (
            <Card key={index} image={card.image} hoverImage={card.hoverImage} mobileImage={card.mobileImage} />
          ))}
        </div>
        <div className="flex justify-between w-full h-full">
          {cardsData.slice(2, 3).map((card, index) => (
            <Card key={index} image={card.image} hoverImage={card.hoverImage} mobileImage={card.mobileImage} isLastCard />
          ))}
        </div>
      </div>
    </section>
  )
}
