'use client'

import {isMobile} from '@/lib/utils'

import {useState, useEffect} from 'react'

import {motion} from 'framer-motion'

import Image from 'next/image'
import Button from '../ui/Button'

import fieldsImage from '../../assets/index/schema/fields.webp'
import parkingImage from '../../assets/index/schema/parking.webp'
import cloakroomImage from '../../assets/index/schema/cloakroom.webp'
import gymnastImage from '../../assets/index/schema/gymnast.webp'
import toiletsImage from '../../assets/index/schema/toilets.webp'
import showersImage from '../../assets/index/schema/showers.webp'

import SchemaSVG from './SchemaSVG'

function DesktopSchema() {
  const [hoveredElement, setHoveredElement] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  let hoverTimeout

  const handleMouseEnter = (elementId) => {
    clearTimeout(hoverTimeout)

    hoverTimeout = setTimeout(() => {
      setHoveredElement(elementId)
      setIsHovering(true)
    }, 250)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout)
    setIsHovering(false)
  }

  const generateContent = (imageSrc, altText, classes = '') => {
    const imageStyles = 'w-full h-full object-cover rounded-smallest'

    return (
      <motion.div className={`flex flex-col h-full gap-5 ${classes}`} initial={{opacity: 0}} animate={{opacity: isHovering ? 1 : 0}} transition={{duration: 0.25}}>
        <Image loading={'eager'} quality={100} className={imageStyles} src={imageSrc} alt={altText} />
        <Button style="simple">{altText}</Button>
      </motion.div>
    )
  }

  const renderContent = () => {
    if (isHovering) {
      switch (hoveredElement) {
        case 'fields':
          return generateContent(fieldsImage, '3 футбольных поля')
        case 'parking':
          return generateContent(parkingImage, '300 парковочных мест')
        case 'cloakroom':
          return generateContent(cloakroomImage, 'Какая-то раздевалка')
        case 'gymnast':
          return generateContent(gymnastImage, 'Штука для танцев')
        case 'toilets':
          return generateContent(toiletsImage, 'Наши туалеты')
        case 'showers':
          return generateContent(showersImage, 'Душевые + раздевалки')
        default:
          return null
      }
    } else {
      const spanStyles = 'absolute mx-auto z-10 w-[60%] text-2xl font-medium tracking-tighter text-center uppercase duration-200 !leading-[1.15] text-custom-gray xl:text-xl sm:text-lg'
      const spanText = 'Наведите курсор на&nbsp;одну из&nbsp;секций шатра на&nbsp;схеме'

      return (
        <div className="relative grid w-full h-full place-items-center">
          <span className={spanStyles} dangerouslySetInnerHTML={{__html: spanText}}></span> {generateContent(fieldsImage, 'Ожидается наведение', 'invisible')}
        </div>
      )
    }
  }

  return (
    <section id="schema" data-section="desktop" className="pt-10 mt-10 sm:pt-0 sm:sm:mt-14">
      <Button style="heading" classes="mx-3">
        Cхема шатра
      </Button>

      <div className="mx-3 mt-5 shadow-card p-7 rounded-small">
        <div className="grid grid-cols-7 gap-5">
          <div className="grid col-span-3 place-items-center border-[3px] border-custom-gray p-5 rounded-small">{renderContent()}</div>

          <div className="grid col-span-4 overflow-hidden shadow-card rounded-small place-items-center p-7">
            <SchemaSVG platform="desktop" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileSchema() {
  return (
    <section id="schema" data-section="mobile" className="pt-10 mt-10 sm:pt-0 sm:sm:mt-14">
      <div className="mx-3 mt-5 shadow-card p-4 rounded-small">
        <SchemaSVG platform="mobile" />
      </div>
    </section>
  )
}

export default function Schema() {
  useEffect(() => {
    const imagesToPreload = [fieldsImage, parkingImage, cloakroomImage, gymnastImage, toiletsImage, showersImage]
    imagesToPreload.forEach((image) => {
      const img = document.createElement('img')
      img.src = image.src
    })
  }, [])

  return <>{!isMobile ? <DesktopSchema /> : <MobileSchema />}</>
}
