'use client'

import {useState} from 'react'
import Image from 'next/image'

import Button from '../ui/Button'

import ImageCardFirst from '@/assets/index/about/1.jpg'
import ImageCardFirstHover from '@/assets/index/about/1_2.jpg'
import ImageCardSecond from '@/assets/index/about/2.jpg'
import ImageCardSecondHover from '@/assets/index/about/2_2.jpg'
import ImageCardThird from '@/assets/index/about/3.jpg'
import ImageCardThirdHover from '@/assets/index/about/3_2.jpg'

type StaticImageData = {
  src: string
  height: number
  width: number
  blurDataURL?: string
}

interface CardProps {
  title: string
  image: string | StaticImageData
  hoverImage: string | StaticImageData
  text: string
  points?: any
}

const cardsData = {
  1: {
    title: '<span class="TITLE_SPAN">4 новых</span> поля для футбола и&nbsp;мини-футбола',
    image: ImageCardFirst,
    hoverImage: ImageCardFirstHover,
    text: 'Отдыхайте и&nbsp;готовьтесь к&nbsp;игре в&nbsp;уютных раздевалках с&nbsp;отдельными душевыми и&nbsp;теплыми полами.',
    points: [],
  },
  2: {
    title: 'Искусственная <br> трава <span class="TITLE_SPAN">60&nbsp;мм</span>',
    image: ImageCardSecond,
    hoverImage: ImageCardSecondHover,
    text: 'Опыт настоящего футбольного поля с&nbsp;инновационной искусственной травой высотой 60&nbsp;мм.',
    points: [],
  },
  3: {
    title: '<span class="TITLE_SPAN">Комфортные</span> условия для посетителей',
    image: ImageCardThird,
    hoverImage: ImageCardThirdHover,
    text: 'Отдыхайте и&nbsp;готовьтесь к&nbsp;игре, мы&nbsp;позаботимся об&nbsp;условиях и&nbsp;вашем комфорте.',
    points: ['Просторные раздевалки с&nbsp;отдельными душевыми и&nbsp;системой теплых полов', 'Поддержание комфортной температуры внутри шатра в&nbsp;любое время года', 'Зона бесплатной парковки на&nbsp;300 мест', 'Комфортная зона ожидания с&nbsp;бесплатным Wi-Fi'],
  },
}

const Card: React.FC<CardProps> = ({title, image, hoverImage, text, points}) => {
  const isLastCard = points && points.length > 0
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full h-[58vh] px-12 pt-10 pb-8 rounded-small shadow-card overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`${isLastCard ? 'flex flex-col gap-2 h-full' : 'flex flex-col justify-between h-full'}`}>
        <h1 className={`text-[84px] leading-none tracking-tight text-custom-gray font-bebas`} dangerouslySetInnerHTML={{__html: title}} />

        <div className={`text-2xl text-custom-95 ${isLastCard ? 'flex flex-col justify-between h-full' : ''}`}>
          <p className="w-[60%]" dangerouslySetInnerHTML={{__html: text}} />

          {points && points.length > 0 && (
            <ul className="pl-6 mt-10 list-decimal">
              {Object.values(points).map((point, index) => (
                <li key={index} dangerouslySetInnerHTML={{__html: point}} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <Image className={`absolute inset-0 -z-10 h-full w-full transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} src={image} alt={title} width={isLastCard ? '2000' : '1000'} height={1000} />
      <Image className={`absolute inset-0 -z-10 h-full w-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} src={hoverImage} alt={title} width={isLastCard ? '2000' : '1000'} height={1000} />
    </div>
  )
}

export default function About() {
  return (
    <section id="about-us" className="pt-10 mt-10">
      <Button style="heading" classes="w-1/2 mx-auto">
        Почему нас выбирают?
      </Button>
      <div className="flex flex-col mx-3 mt-10 gap-14">
        <div className="grid justify-between grid-cols-2 gap-10">
          {Object.values(cardsData)
            .slice(0, 2)
            .map((card, index) => (
              <Card key={index} title={card.title} image={card.image} hoverImage={card.hoverImage} text={card.text} points={card.points} />
            ))}
        </div>
        <div className="flex justify-between w-full">
          {Object.values(cardsData)
            .slice(2, 3)
            .map((card, index) => (
              <Card key={index} title={card.title} image={card.image} hoverImage={card.hoverImage} text={card.text} points={card.points} />
            ))}
        </div>
      </div>
    </section>
  )
}