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

export default function HeaderSwitch() {
  // Check if window is defined (to prevent ReferenceError during server-side rendering)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  const [activeLink, setActiveLink] = useState(links[0].link)
  const [showDynamicLink, setShowDynamicLink] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if window is defined (to prevent ReferenceError during server-side rendering)
      if (typeof window === 'undefined') {
        return
      }

      const scrollPosition = window.scrollY

      // Include isMobile in the dependency array
      !isMobile &&
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

        setShowDynamicLink(scrollPosition >= heroSectionTop + heroSection.offsetHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showDynamicLink, isMobile])

  return (
    <div className={`fixed sm:bottom-5 justify-center sm:w-[90%] sm:right-5 right-20 text-custom-gray rounded-large p-[3px] font-book flex gap-1 sm:gap-0 bg-white ${showDynamicLink && isMobile ? 'bg-white' : 'sm:bg-transparent'}`}>
      {!isMobile &&
        links.slice(0, 3).map((link, index) => (
          <HeaderLink key={index} link={link.link} active={link.link === activeLink}>
            {link.title}
          </HeaderLink>
        ))}
      {showDynamicLink &&
        links.slice(-1).map((link, index) => (
          <HeaderLink key={index} link={link.link} active={link.link === activeLink} classes="bg-custom-e4 sm:bg-transparent sm:uppercase">
            {link.title}
          </HeaderLink>
        ))}
    </div>
  )
}
