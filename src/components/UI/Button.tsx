import {cn} from '@/lib/utils'
import Link from 'next/link'

type Props = {
  variant: 'default' | 'hero'
  href: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  className?: string
  children: React.ReactNode
}

export const buttonVariants = {
  base: 'text-center px-16 py-6 xl:px-10 xl:py-4 sm:py-2 text-3xl xl:text-xl sm:text-lg uppercase font-medium tracking-tighter duration-200',
  default: 'bg-custom-gray text-white rounded-smallest py-4 text-2xl xl:text-lg font-normal tracking-normal',
  hero: 'bg-white text-custom-gray rounded-full hover:bg-custom-e4',
}

export default function Button({variant = 'default', href, target, rel, className, children}: Props) {
  return (
    <Link href={href} target={target} rel={rel} className={cn([buttonVariants.base, buttonVariants[variant]], className)}>
      {children}
    </Link>
  )
}
