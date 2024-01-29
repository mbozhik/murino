interface HeaderLinkProps {
  link: string
  active: boolean
  children: React.ReactNode
  classes?: string
}

export default function HeaderLink({link, active, classes, children}: HeaderLinkProps) {
  return (
    <a href={link} className={`text-[22px] xl:text-lg px-8 py-3 xl:px-6 xl:py-2 rounded-large ${active ? 'text-white !bg-custom-green duration-200' : ''} ${classes}`}>
      {children}
    </a>
  )
}
