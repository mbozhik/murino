import Link from 'next/link'

import {linksData} from '@/lib/data'

export default function Footer() {
  const {copy, tel} = linksData

  return (
    <div className="flex justify-between mx-10 mb-5 text-lg sm:mb-24 sm:gap-3 sm:mx-3 sm:flex-col xl:text-base sm:text-xs text-custom-gray">
      <div className="flex items-center gap-5 sm:gap-3 sm:justify-center">
        <h1 className="text-xl">©</h1>
        <h1>OOO «Кронос»</h1>
      </div>

      <div className="flex gap-10 p-3 sm:grid sm:grid-cols-2 sm:gap-2 sm:border-2 sm:border-custom-e4 rounded-md">
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
        <h1>Круглосуточно</h1>
      </div>
    </div>
  )
}
