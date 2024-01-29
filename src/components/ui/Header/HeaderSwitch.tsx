'use client'

import {useState, useEffect} from 'react'

import HeaderLink from './HeaderSwitchLink'

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
    <div className="fixed right-20 text-[22px] bg-white text-custom-gray rounded-large p-[3px] font-book flex gap-1">
      {links.slice(0, 3).map((link, index) => (
        <HeaderLink key={index} link={link.link} active={link.link === activeLink}>
          {link.title}
        </HeaderLink>
      ))}
      {showDynamicLink &&
        links.slice(-1).map((link, index) => (
          <HeaderLink key={index} link={link.link} active={link.link === activeLink} classes="bg-custom-e4">
            {link.title}
          </HeaderLink>
        ))}
    </div>
  )
}
