interface HeaderLinkProps {
  link: string
  active: boolean
  children: React.ReactNode
  classes?: string
}

export default function HeaderLink({link, active, classes, children}: HeaderLinkProps) {
  return (
    <a href={link} className={`px-8 py-3 rounded-large ${active ? 'text-white !bg-custom-green duration-200' : ''} ${classes}`}>
      {children}
    </a>
  )
}
