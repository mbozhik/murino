import Image from 'next/image'
import Link from 'next/link'

import HeaderSwitch from './HeaderSwitch'

export default function Header() {
  return (
    <header className="flex items-center justify-between mx-20 text-white sm:mx-0">
      <Link href="/" className="flex gap-3 sm:ml-5">
        <Image quality={100} className="object-contain xl:w-14" src="/logo.svg" width={72} height={0} priority alt="" />
        <span className="text-[32px] xl:text-2xl !leading-none sm:hidden">
          футбольный <br />
          шатер
        </span>
      </Link>
      <HeaderSwitch />
    </header>
  )
}
