import Image from 'next/image'
import {BebasNeue} from '@/app/layout'

import Button from '../ui/Button'

import ImageCardFirst from '@/assets/index/about/1.png'
import ImageCardSecond from '@/assets/index/about/2.png'
import ImageCardThird from '@/assets/index/about/3.png'

type StaticImageData = {
  src: string
  height: number
  width: number
  blurDataURL?: string
}

interface CardProps {
  title: string
  image: string | StaticImageData
  imageClasses: string
  text: string
  points?: any
}

const cardsData = {
  1: {
    title: '<span class="TITLE_SPAN">4 новых</span> поля для футбола и&nbsp;мини-футбола',
    image: ImageCardFirst,
    imageClasses: 'bottom-0 right-0',
    text: 'Отдыхайте и&nbsp;готовьтесь к&nbsp;игре в&nbsp;уютных раздевалках с&nbsp;отдельными душевыми и&nbsp;теплыми полами.',
    points: [],
  },
  2: {
    title: 'Искусственная <br> трава <span class="TITLE_SPAN">60&nbsp;мм</span>',
    image: ImageCardSecond,
    imageClasses: 'bottom-0 right-0',
    text: 'Опыт настоящего футбольного поля с&nbsp;инновационной искусственной травой высотой 60&nbsp;мм.',
    points: [],
  },
  3: {
    title: '<span class="TITLE_SPAN">Комфортные</span> условия для посетителей',
    image: ImageCardThird,
    imageClasses: 'bottom-0 right-0',
    text: 'Отдыхайте и&nbsp;готовьтесь к&nbsp;игре, мы&nbsp;позаботимся об&nbsp;условиях и&nbsp;вашем комфорте.',
    points: ['Просторные раздевалки с&nbsp;отдельными душевыми и&nbsp;системой теплых полов', 'Поддержание комфортной температуры внутри шатра в&nbsp;любое время года', 'Зона бесплатной парковки на&nbsp;300 мест', 'Комфортная зона ожидания с&nbsp;бесплатным Wi-Fi'],
  },
}

const Card: React.FC<CardProps> = ({title, image, text, points, imageClasses}) => {
  return (
    <div className="relative w-full h-[58vh] px-12 pt-10 pb-8 rounded-small shadow-card">
      <div className={`${points && points.length > 0 ? 'flex flex-col gap-2 h-full' : 'flex flex-col justify-between h-full'}`}>
        <h1 className={`text-[84px] leading-none tracking-tight text-custom-gray ${BebasNeue.className}`} dangerouslySetInnerHTML={{__html: title}} />

        <div className={`text-3xl text-custom-95 ${points && points.length > 0 ? 'flex flex-col justify-between h-full' : ''}`}>
          <p className="w-[75%]" dangerouslySetInnerHTML={{__html: text}} />

          {points && points.length > 0 && (
            <ul className="pl-6 mt-10 list-decimal">
              {Object.values(points).map((point, index) => (
                <li key={index} dangerouslySetInnerHTML={{__html: point}} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <Image className={`absolute ${imageClasses}`} src={image} alt={title} width={375} height={375} />
    </div>
  )
}

export default function About() {
  return (
    <section id="about-us" className="pt-10 mt-10">
      <Button style="heading" classes="w-1/2 mx-auto">
        Почему нас выбирают?
      </Button>
      <div className="flex flex-col gap-16 mx-3 mt-10">
        <div className="grid justify-between grid-cols-2 gap-10">
          {Object.values(cardsData)
            .slice(0, 2)
            .map((card, index) => (
              <Card key={index} title={card.title} image={card.image} imageClasses={card.imageClasses} text={card.text} points={card.points} />
            ))}
        </div>
        <div className="flex justify-between w-full">
          {Object.values(cardsData)
            .slice(2, 3)
            .map((card, index) => (
              <Card key={index} title={card.title} image={card.image} imageClasses={card.imageClasses} text={card.text} points={card.points} />
            ))}
        </div>
      </div>
    </section>
  )
}
