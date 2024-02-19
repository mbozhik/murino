'use client'

import {useEffect} from 'react'

export default function Metro() {
  useEffect(() => {
    window.location.href = 'https://yandex.ru/maps/-/CDBYJM37'
  }, [])

  return (
    <div className="w-screen h-screen grid place-items-center">
      <h1 className="animate-pulse">Происходит переход на Яндекс Карты..</h1>
    </div>
  )
}
