import type {Metadata} from 'next'
import './globals.css'
import localFont from 'next/font/local'

const SuisseIntl = localFont({
  src: [
    {
      path: './fonts/SuisseIntl-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/SuisseIntl-Book.woff2',
      weight: '450',
    },
    {
      path: './fonts/SuisseIntl-Medium.woff2',
      weight: '500',
    },
    {
      path: './fonts/SuisseIntl-SemiBold.woff2',
      weight: '600',
    },
  ],
})

export const BebasNeue = localFont({
  src: './fonts/BebasNeueCyrillic.woff2',
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: {
    default: 'МУРИНО АРЕНА',
    template: '%s — МУРИНО АРЕНА',
  },
  description: 'Мурино Арена — один из самых масштабных футбольных шатров в Санкт-Петербурге и Ленинградской области!',
  openGraph: {
    title: 'МУРИНО АРЕНА',
    description: 'Мурино Арена — один из самых масштабных футбольных шатров в Санкт-Петербурге и Ленинградской области!',
  },
  metadataBase: new URL('https://murino-arena.ru'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${SuisseIntl.className} tracking-tighter`}>{children}</body>
    </html>
  )
}
