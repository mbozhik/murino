'use client'

import {useState, useEffect} from 'react'

const links = [
  {title: 'О нас', link: '#about-us'},
  {title: 'Цены', link: '#prices'},
  {title: 'Контакты', link: '#contacts'},
]

export default function HeaderSwitch() {
  const [activeLink, setActiveLink] = useState(links[0].link)

  const scrollBuffer = 50

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      links.forEach((link) => {
        const section = document.querySelector(link.link) as HTMLElement
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight

          if (scrollPosition >= sectionTop - scrollBuffer && scrollPosition < sectionTop + sectionHeight) {
            setActiveLink(link.link)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed right-20 text-[22px] bg-white text-custom-gray rounded-[35px] p-[3px] font-book">
      <ul className="flex gap-1">
        {links.map((link, index) => (
          <li key={index} className={`px-8 py-3 rounded-[35px] ${link.link === activeLink ? 'text-white bg-custom-green duration-200' : ''}`}>
            <a href={link.link}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
