'use client'

import {useState, useEffect} from 'react'

const links = [
  {title: 'О нас', link: '#about-us'},
  {title: 'Цены', link: '#prices'},
  {title: 'Контакты', link: '#contacts'},
  {title: 'Забронировать', link: '#booking'},
]

let scrollBuffer = 50
let headerOffset = 'pt-7'

export default function HeaderSwitch() {
  const [activeLink, setActiveLink] = useState(links[0].link)
  const [showDynamicLink, setShowDynamicLink] = useState(false)

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

      const heroSection = document.querySelector('#hero') as HTMLElement
      if (heroSection) {
        const heroSectionTop = heroSection.offsetTop

        setTimeout(() => {
          setShowDynamicLink(scrollPosition >= heroSectionTop + heroSection.offsetHeight)
        }, 500)

        if (scrollPosition >= heroSection.offsetHeight) {
          heroSection.classList.add(headerOffset)
        } else {
          heroSection.classList.remove(headerOffset)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showDynamicLink])

  return (
    <div className="fixed right-20 text-[22px] bg-white text-custom-gray rounded-[35px] p-[3px] font-book">
      <ul className="flex gap-1">
        {links.slice(0, 3).map((link, index) => (
          <li key={index} className={`px-8 py-3 rounded-[35px] ${link.link === activeLink ? 'text-white bg-custom-green duration-200' : ''}`}>
            <a href={link.link}>{link.title}</a>
          </li>
        ))}
        {showDynamicLink &&
          links.slice(-1).map((link, index) => (
            <li key={index} className={`px-8 py-3 rounded-[35px] bg-custom-e4 ${link.link === activeLink ? 'text-white !bg-custom-green duration-200' : ''}`}>
              <a href={link.link}>{link.title}</a>
            </li>
          ))}
      </ul>
    </div>
  )
}
