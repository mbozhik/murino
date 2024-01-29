import Image from 'next/image'
import Link from 'next/link'

import HeaderSwitch from './HeaderSwitch'

export default function Header() {
  return (
    <div className="flex items-center justify-between mx-20 text-white ">
      <Link href="/" className="flex gap-3">
        <Image className="object-contain" src="/logo.svg" width={72} height={0} priority alt="" />
        <span className="text-[32px] leading-none">
          футбольный <br />
          шатер
        </span>
      </Link>
      <HeaderSwitch />
    </div>
  )
}
