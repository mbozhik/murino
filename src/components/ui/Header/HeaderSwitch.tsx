'use client'

import {useState, useEffect} from 'react'

import HeaderLink from './HeaderSwitchLink'

const links = [
  {title: 'О нас', link: '#about-us'},
  {title: 'Цены', link: '#prices'},
  {title: 'Контакты', link: '#contacts'},
  {title: 'Забронировать', link: '#booking'},
]

export default function HeaderSwitch() {
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  const [activeLink, setActiveLink] = useState(links[0].link)
  const [showDynamicLink, setShowDynamicLink] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') {
        return
      }

      const scrollPosition = window.scrollY
      const offsetBeforeHighlight = 200

      !isMobile &&
        links.forEach((link) => {
          const section = document.querySelector(link.link) as HTMLElement
          if (section) {
            const sectionTop = section.offsetTop - offsetBeforeHighlight
            const sectionHeight = section.offsetHeight

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              setActiveLink(link.link)
            }
          }
        })

      const heroSection = document.querySelector('#hero') as HTMLElement
      if (heroSection) {
        const heroSectionTop = heroSection.offsetTop

        setShowDynamicLink(scrollPosition >= heroSectionTop + heroSection.offsetHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showDynamicLink, isMobile])

  return (
    <div className={`fixed z-50 sm:bottom-5 justify-center sm:w-[90%] sm:right-5 right-20 text-custom-gray rounded-large p-[3px] font-book flex gap-1 sm:gap-0 bg-white shadow-base ${showDynamicLink && isMobile ? 'bg-white' : 'sm:bg-transparent'}`}>
      {!isMobile &&
        links.slice(0, 3).map((link, index) => (
          <HeaderLink key={index} link={link.link} active={link.link === activeLink}>
            {link.title}
          </HeaderLink>
        ))}
      {showDynamicLink &&
        links.slice(-1).map((link, index) => (
          <HeaderLink key={index} link={link.link} active={link.link === activeLink} classes="bg-custom-e4 sm:bg-transparent sm:uppercase hover:bg-custom-green hover:text-white duration-200">
            {link.title}
          </HeaderLink>
        ))}
    </div>
  )
}
