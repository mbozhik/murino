import Image from 'next/image'
import Link from 'next/link'

import TelImage from '../../assets/index/socials/tel.svg'
import VkImage from '../../assets/index/socials/vk.svg'
import TgImage from '../../assets/index/socials/tg.svg'

const icons = [
  {link: 'tel:+79217518703', target: '', image: TelImage},
  {link: 'https://vk.com/murino_arena', target: '_blank', image: VkImage},
  {link: 'https://t.me/murino_arena', target: '_blank', image: TgImage},
]

export default function HeroSocials() {
  return (
    <div className="flex gap-4">
      {icons.map((icon, index) => (
        <Link href={icon.link} target={icon.target} title="icon" key={index} className="duration-200 s-14 xl:s-10 hover:scale-110">
          <Image className="object-cover s-full" src={icon.image} alt={`${icon.link} icon`} width={48} height={48} />
        </Link>
      ))}
    </div>
  )
}
