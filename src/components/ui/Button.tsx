interface ButtonProps {
  style?: 'hero' | 'heading' | 'simple'
  link?: string
  classes?: string
  children: React.ReactNode
}

export default function Button({link, classes, children, style = 'simple'}: ButtonProps) {
  const buttonStyles = {
    hero: 'bg-white text-custom-gray rounded-full hover:bg-custom-e4',
    heading: 'bg-custom-green text-white',
    simple: 'bg-custom-gray',
  }

  return (
    <a href={link} className={`px-16 py-6 text-3xl uppercase font-medium tracking-tighter duration-200 ${buttonStyles[style]} ${classes}`}>
      {children}
    </a>
  )
}
