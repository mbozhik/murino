import Link from 'next/link'

import {linksData} from '@/lib/data'

export default function Footer() {
  const {copy, tel} = linksData

  return (
    <div className="flex justify-between p-3 mx-10 mb-5 text-lg sm:flex-col sm:mb-24 sm:gap-2 sm:mx-3 xl:text-base sm:text-xs sm:tracking-tight text-custom-gray sm:border-2 sm:border-custom-e4">
      <div className="flex items-center gap-5 sm:justify-center sm:hidden">
        <h1 className="text-xl">©</h1>
        <h1>OOO «Кронос»</h1>
      </div>

      <div className="flex gap-10 rounded-md sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2">
        {copy && (
          <Link href={copy.href} target="_blank" className="underline duration-200 hover:no-underline">
            {copy.text}
          </Link>
        )}

        {tel && (
          <Link href={tel.href} target="_blank" className="underline duration-200 hover:no-underline">
            {tel.text}
          </Link>
        )}

        <h1 className="hidden sm:inline">OOO «Кронос»</h1>

        <h1>Круглосуточно</h1>
      </div>
    </div>
  )
}
