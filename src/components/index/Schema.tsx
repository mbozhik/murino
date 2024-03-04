'use client'

import {isMobile} from '@/lib/utils'

import {useState, useRef, useEffect} from 'react'

import {motion} from 'framer-motion'

import Image from 'next/image'
import Button from '../ui/Button'
import SchemaSVG from './SchemaSVG'

import crossIcon from '../../assets/index/cross.svg'

import fieldsImage from '../../assets/index/schema/fields.webp'
import parkingImage from '../../assets/index/schema/parking.webp'
import cloakroomImage from '../../assets/index/schema/cloakroom.webp'
import gymnastImage from '../../assets/index/schema/gymnast.webp'
import toiletsImage from '../../assets/index/schema/toilets.webp'
import showersImage from '../../assets/index/schema/showers.webp'

const contentData = {
  fields: {image: fieldsImage, text: '3 футбольных поля'},
  parking: {image: parkingImage, text: '300 парковочных мест'},
  cloakroom: {image: cloakroomImage, text: 'Какая-то раздевалка'},
  gymnast: {image: gymnastImage, text: 'Штука для танцев'},
  toilets: {image: toiletsImage, text: 'Наши туалеты'},
  showers: {image: showersImage, text: 'Душевые + раздевалки'},
}

function DesktopSchema() {
  const [hoveredElement, setHoveredElement] = useState(null)
  const hoveredTimeout = useRef(null)

  const handleMouseEnter = (elementId) => {
    clearTimeout(hoveredTimeout.current)
    hoveredTimeout.current = setTimeout(() => {
      setHoveredElement(elementId)
    }, 250)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoveredTimeout.current)
    setHoveredElement(null)
  }

  const generateContent = (imageSrc, altText, classes = '') => {
    const imageStyles = 'w-full h-full object-cover rounded-smallest'

    return (
      <motion.div className={`flex flex-col h-full gap-5 ${classes}`} initial={{opacity: 0}} animate={{opacity: hoveredElement ? 1 : 0}} transition={{duration: 0.25}}>
        <Image loading={'eager'} quality={100} className={imageStyles} src={imageSrc} alt={altText} />
        <Button style="simple">{altText}</Button>
      </motion.div>
    )
  }

  const renderContent = () => {
    if (hoveredElement) {
      switch (hoveredElement) {
        case 'fields':
          return generateContent(contentData.fields.image, contentData.fields.text)
        case 'parking':
          return generateContent(contentData.parking.image, contentData.parking.text)
        case 'cloakroom':
          return generateContent(contentData.cloakroom.image, contentData.cloakroom.text)
        case 'gymnast':
          return generateContent(contentData.gymnast.image, contentData.gymnast.text)
        case 'toilets':
          return generateContent(contentData.toilets.image, contentData.toilets.text)
        case 'showers':
          return generateContent(contentData.showers.image, contentData.showers.text)
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
  const [clickedElement, setClickedElement] = useState(null)
  const [showIntroText, setShowIntroText] = useState(true)

  const generateContent = (imageSrc, altText) => {
    const imageStyles = 'w-full h-full object-cover rounded-smallest'

    return (
      <div className="rounded-small">
        <button onClick={() => setClickedElement(null)} className="absolute top-0 right-0 p-2 m-2 bg-custom-e4 rounded-small">
          <Image quality={100} src={crossIcon} className="s-5" alt="" />
        </button>
        <Image loading={'eager'} quality={100} className={imageStyles} src={imageSrc} alt={altText} />
        <h1 className="mt-3 text-center">{altText}</h1>
      </div>
    )
  }

  const renderContent = () => {
    if (clickedElement) {
      const {image, text} = contentData[clickedElement] || {}
      if (!image || !text) return null
      return generateContent(image, text)
    }
    return null
  }

  const handleMobileTouch = (elementId) => {
    setClickedElement(elementId)

    setTimeout(() => {
      setShowIntroText(false)
    }, 1500)
  }

  return (
    <section id="schema" data-section="mobile" className="pt-10 mt-10 sm:pt-0 sm:sm:mt-14">
      {showIntroText && (
        <h1 className="mt-3 text-sm leading-tight text-center text-custom-95 w-[60%] mx-auto">
          Нажмите на&nbsp;одну из&nbsp;секций <br /> шатра на&nbsp;схеме
        </h1>
      )}

      <div className="relative p-4 mx-3 mt-5 shadow-card rounded-small">
        {renderContent() || (
          <div>
            <SchemaSVG platform="mobile" onMobileTouch={handleMobileTouch} />
          </div>
        )}
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

  return !isMobile ? <DesktopSchema /> : <MobileSchema />
}
