import Link from 'next/link'

interface ButtonProps {
  style: 'hero' | 'heading' | 'simple'
  link?: string
  classes?: string
  children: React.ReactNode
}

export const buttonStyles = {
  default: 'text-center px-16 py-6 xl:px-10 xl:py-4 sm:py-2 text-3xl xl:text-xl sm:text-lg uppercase font-medium tracking-tighter duration-200',
  hero: 'bg-white text-custom-gray rounded-full hover:bg-custom-e4',
  heading: 'bg-custom-green text-white rounded-smallest sm:py-4',
  simple: 'bg-custom-gray text-white rounded-smallest !py-4 !text-2xl xl:!text-lg font-normal tracking-normal',
}

export default function Button({link, classes, children, style = 'simple'}: ButtonProps) {
  const classNames = [buttonStyles.default, buttonStyles[style], classes].filter(Boolean).join(' ')

  return (
    <>
      {link ? (
        <Link href={link} className={classNames}>
          {children}
        </Link>
      ) : (
        <div className={classNames}>{children}</div>
      )}
    </>
  )
}
