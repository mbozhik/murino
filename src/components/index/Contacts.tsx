'use client'

import {useState} from 'react'

import Link from 'next/link'
import Image from 'next/image'

import VkImage from '../../assets/index/socials/vk.svg'
import TgImage from '../../assets/index/socials/tg.svg'
import CopyImage from '../../assets/index/contacts/copy.svg'
import MapImage from '../../assets/index/contacts/map.svg'

const linksData = {
  tel: {href: 'tel:+79217518703', text: '+7 (921) 751-87-03'},
  vk: {href: 'https://vk.com/murino_arena', text: 'MURINO_ARENA'},
  tg: {href: 'https://t.me/murino_arena', text: 'MURINO_ARENA'},
  copy: {href: '', text: 'г. Мурино, ул. Ленина д.1'},
  map: {href: 'https://yandex.ru/maps/-/CDBYJM37', text: 'Как добраться на метро'},
}

const buttonStyles = {
  default: 'py-1 xl:py-2 sm:px-2 duration-150 rounded-micro hover:text-custom-gray hover:ring-[3px] hover:ring-custom-gray',
  light: 'text-custom-gray bg-custom-e4',
  dark: 'text-white bg-custom-gray hover:bg-transparent',
}

interface ButtonProps {
  href: string
  target: string
  className: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({href, target, className, onClick, children}) => (
  <a href={href} target={target} className={className} onClick={onClick}>
    {children}
  </a>
)

export default function Contacts() {
  const [copiedText, setCopiedText] = useState(null)

  const handleCopyClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()

    try {
      const input = document.createElement('input')
      input.value = linksData.copy.text
      document.body.appendChild(input)

      input.focus()
      input.setSelectionRange(0, input.value.length)

      const copySuccess = document.execCommand('copy')

      document.body.removeChild(input)

      if (copySuccess) {
        setCopiedText('Скопировано!')

        setTimeout(() => {
          setCopiedText(null)
        }, 2500)
      }
    } catch (error) {
      console.error('Failed to copy text: ', error)
      alert('неееееееееее скопировано!')
    }
  }

  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  return (
    <section id="contacts" className="my-28 xl:my-20 sm:my-14">
      <div className="flex items-center justify-between mx-3 sm:flex-col rounded-small shadow-card p-7 sm:p-3 gap-7">
        <div className="relative w-full overflow-hidden rounded-small shadow-card">
          <iframe className="w-full h-[70vh] sm:h-[30vh]" src={`https://yandex.ru/map-widget/v1/?ll=30.476999%2C60.043193&mode=search&oid=76918350984&ol=biz&source=serp_navig&z=${!isMobile ? '17.5' : '16'}`} frameBorder="1" title="map"></iframe>
        </div>

        <div className="flex flex-col items-center gap-5 justify-self-center w-[75%] sm:w-full px-10 sm:px-0">
          <div className="flex flex-col border-[3px] border-custom-gray rounded-small w-full p-5 sm:px-3 sm:py-5 gap-5">
            <h1 className="text-2xl font-medium text-center uppercase sm:text-lg sm:leading-tight text-custom-gray">
              телфон <span className="text-[#c2c2c2]">(круглосуточно)</span>
            </h1>

            <div className="flex flex-col gap-8 sm:gap-2 text-[38px] xl:text-3xl sm:text-xl text-center uppercase">
              <Button target="" href={linksData.tel.href} className={`${buttonStyles.default} ${buttonStyles.light}`}>
                {linksData.tel.text}
              </Button>

              <div className="flex flex-col gap-3 sm:gap-2">
                {['vk', 'tg'].map((socialMedia) => (
                  <Button key={socialMedia} href={linksData[socialMedia].href} target="_blank" className={`group inline-flex justify-center items-center gap-3 sm:gap-2 ${buttonStyles.default} ${buttonStyles.dark}`}>
                    {socialMedia === 'vk' ? <Image className="duration-150 s-10 sm:s-7 group-hover:scale-125" src={VkImage} width={70} height={70} alt="" /> : <Image className="duration-150 s-10 sm:s-7 group-hover:scale-125" src={TgImage} width={70} height={70} alt="" />}
                    {linksData[socialMedia].text}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col border-[3px] border-custom-gray rounded-small w-full p-5 sm:px-3 sm:py-5 gap-5">
            <h1 className="text-2xl font-medium text-center uppercase sm:text-lg text-custom-gray">адрес</h1>

            <div className="flex flex-col gap-3 sm:gap-2 text-[38px] xl:text-3xl sm:text-xl text-center uppercase">
              <Button href={linksData.copy.href} target="_blank" onClick={handleCopyClick} className={`group inline-flex justify-center items-center gap-3 sm:gap-2 ${buttonStyles.default} ${buttonStyles.light} text-2xl sm:text-sm font-medium py-4`}>
                {copiedText ? (
                  <span>{copiedText}</span>
                ) : (
                  <>
                    {linksData.copy.text}
                    <Image className="duration-200 s-7 sm:s-3 group-hover:scale-110" src={CopyImage} width={70} height={70} alt="" />
                  </>
                )}
              </Button>

              <Button href={linksData.map.href} target="_blank" className={`group inline-flex justify-center items-center gap-3 sm:gap-2 ${buttonStyles.default} ${buttonStyles.dark} normal-case sm:text-sm`}>
                <Image className="duration-150 s-10 sm:s-7 group-hover:scale-125" src={MapImage} width={70} height={70} alt="" />
                {linksData.map.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
