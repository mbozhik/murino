import Link from 'next/link'

export default function Footer() {
  // Array of link information
  const links = [
    {text: 'Мурино, Заводской проезд 4', href: 'https://yandex.ru/maps/org/murino_arena/76918350984/?from=mapframe&ll=30.474895%2C60.043823&source=mapframe&utm_source=mapframe&z=16'},
    {text: '+7 (921) 751-87-03', href: 'tel:+79217518703'},
  ]

  return (
    <div className="flex justify-between mx-10 mb-5 text-lg sm:mb-24 sm:gap-3 sm:mx-3 sm:flex-col xl:text-base sm:text-xs text-custom-gray">
      <div className="flex items-center gap-5 sm:gap-3 sm:justify-center">
        <h1 className="text-xl">©</h1>
        <h1>OOO «Кронос»</h1>
      </div>

      <div className="flex gap-10 p-3 sm:grid sm:grid-cols-2 sm:gap-2 sm:border-2 sm:border-custom-e4 rounded-md">
        {links.map((link, index) => (
          <Link key={index} href={link.href} target="_blank" className="underline duration-200 hover:no-underline">
            {link.text}
          </Link>
        ))}
        <h1>Круглосуточно</h1>
      </div>
    </div>
  )
}
