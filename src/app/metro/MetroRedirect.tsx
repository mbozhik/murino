'use client'

import {useEffect} from 'react'

export default function MetroRedirect() {
  useEffect(() => {
    window.location.replace('https://yandex.ru/maps/-/CDBYJM37')
  }, [])

  return (
    <div className="w-screen h-screen grid place-items-center">
      <h1 className="animate-pulse">Происходит переход на Яндекс Карты...</h1>
    </div>
  )
}
