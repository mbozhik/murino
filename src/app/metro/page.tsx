import type {Metadata} from 'next'
import MetroRedirect from './MetroRedirect'

export const metadata: Metadata = {
  title: 'Как добраться',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Metro() {
  return <MetroRedirect />
}
