import Link from 'next/link'

export default function Footer() {
  return (
    <div className="flex justify-between mx-10 mb-5 text-lg sm:mb-24 sm:gap-3 sm:mx-3 sm:flex-col xl:text-base sm:text-xs text-custom-gray">
      <div className="flex items-center gap-5 sm:gap-3 sm:justify-center">
        <h1 className="text-xl">©</h1>
        <h1>OOO «Кронос»</h1>
      </div>

      <div className="flex gap-10 p-3 sm:grid sm:grid-cols-2 sm:gap-2 sm:border-2 sm:border-custom-e4 rounded-md">
        <h1>Юр. адрес: ул. Ленина д.1</h1>
        <h1>Факт. адрес: ул. Сталина д.2</h1>
        <Link href="tel:+79217518703" className="underline duration-200 hover:text-custom-95">
          +7 (921) 751-87-03
        </Link>
        <h1>Круглосуточно</h1>
      </div>
    </div>
  )
}
