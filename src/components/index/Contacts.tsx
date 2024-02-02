'use client'

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
  default: 'py-1 xl:py-2 sm:px-2 duration-200 rounded-micro hover:bg-transparent hover:text-custom-gray hover:ring-[3px] hover:ring-custom-gray',
  light: 'text-custom-gray bg-custom-e4',
  dark: 'text-white bg-custom-gray',
}

export default function Contacts() {
  return (
    <section id="contacts" className="pt-10 mt-10">
      <div className="mx-3 rounded-small shadow-card flex justify-between h-[70vh] p-7 gap-7">
        <div className="relative w-full h-full overflow-hidden rounded-small shadow-card">
          <iframe className="s-full" src="https://yandex.ru/map-widget/v1/?ll=30.476999%2C60.043193&mode=search&oid=76918350984&ol=biz&source=serp_navig&z=17.14" width="560" height="400" frameBorder="1" title="map"></iframe>
        </div>

        <div className="flex flex-col items-center justify-around justify-self-center w-[75%] px-10">
          <div className="flex flex-col border-[3px] border-custom-gray rounded-small w-full p-5 gap-5">
            <h1 className="text-2xl font-medium text-center uppercase text-custom-gray">
              телфон <span className="text-[#c2c2c2]">(круглосуточно)</span>
            </h1>

            <div className="flex flex-col gap-8 text-[38px] xl:text-3xl sm:text-xl text-center uppercase">
              <Link href={linksData.tel.href} className={`${buttonStyles.default} ${buttonStyles.light}`} onClick={() => console.log(`hui`)}>
                {linksData.tel.text}
              </Link>
              <div className="flex flex-col gap-3">
                <Link href={linksData.vk.href} target="_blank" className={`inline-flex justify-center items-center gap-3 ${buttonStyles.default} ${buttonStyles.dark}`} onClick={() => console.log(`hui`)}>
                  <Image className="s-10" src={VkImage} width={70} height={70} alt="" />
                  {linksData.vk.text}
                </Link>
                <Link href={linksData.tg.href} target="_blank" className={`inline-flex justify-center items-center gap-3 ${buttonStyles.default} ${buttonStyles.dark}`} onClick={() => console.log(`hui`)}>
                  <Image className="s-10" src={TgImage} width={70} height={70} alt="" />
                  {linksData.tg.text}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-[3px] border-custom-gray rounded-small w-full p-5 gap-5">
            <h1 className="text-2xl font-medium text-center uppercase text-custom-gray">адрес</h1>

            <div className="flex flex-col gap-3 text-[38px] xl:text-3xl sm:text-xl text-center uppercase">
              <Link href={linksData.copy.href} target="_blank" className={`inline-flex justify-center items-center gap-3 ${buttonStyles.default} ${buttonStyles.light} text-2xl font-medium py-4`} onClick={() => console.log(`hui`)}>
                {linksData.copy.text}
                <Image className="s-7" src={CopyImage} width={70} height={70} alt="" />
              </Link>
              <Link href={linksData.map.href} target="_blank" className={`inline-flex justify-center items-center gap-3 ${buttonStyles.default} ${buttonStyles.dark} normal-case`} onClick={() => console.log(`hui`)}>
                <Image className="s-10" src={MapImage} width={70} height={70} alt="" />
                {linksData.map.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
