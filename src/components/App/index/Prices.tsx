'use client'

import {cn} from '@/lib/utils'
import {useState} from 'react'
import Heading from '#/UI/Heading'
import Button from '#/UI/Button'

const fieldSizes = ['20x40', '40x70']
const fieldButtons = fieldSizes.map((size) => ({size}))

const priceData = {
  '20x40': {
    workdays: {
      title: 'БУДНИЕ ДНИ',
      schedule: [
        {time: '07:00 - 14:00', price: '3500'},
        {time: '14:00 - 17:00', price: '5000'},
        {time: '17:00 - 23:00', price: '6500'},
        {time: '23:00 - 07:00', price: '5000'},
      ],
    },
    weekends: {
      title: 'ВЫХОДНЫЕ ДНИ',
      schedule: [{time: 'Весь день', price: '5000'}],
    },
  },
  '40x70': {
    workdays: {
      title: 'БУДНИЕ ДНИ',
      schedule: [
        {time: '07:00 - 14:00', price: '10500'},
        {time: '14:00 - 17:00', price: '15000'},
        {time: '17:00 - 23:00', price: '19500'},
        {time: '23:00 - 07:00', price: '15000'},
      ],
    },
    weekends: {
      title: 'ВЫХОДНЫЕ ДНИ',
      schedule: [{time: 'Весь день', price: '15000'}],
    },
  },
}

export default function Prices() {
  const [selectedField, setSelectedField] = useState('20x40')

  return (
    <section data-section="prices-index" id="prices" className={cn('scroll-m-10', 'space-y-10 xl:space-y-7 sm:space-y-5')}>
      <Heading size="full" text="Сколько стоит аренда?" />

      <div className="flex flex-col gap-7 sm:gap-5 mx-auto p-5 xl:p-4 sm:p-2.5 w-fit sm:w-full shadow-card rounded-small">
        <div className="flex justify-between gap-4 sm:gap-2">
          {fieldButtons.map(({size}) => (
            <button key={size} onClick={() => setSelectedField(size)} className={cn('px-8 xl:px-6 sm:px-0 py-4 sm:py-2.5 inline-flex sm:justify-center gap-2 sm:gap-1.5 sm:w-full', 'text-2xl xl:text-xl sm:text-lg uppercase font-book tracking-tighter', 'duration-200 rounded-smallest border-[3px] border-transparent', selectedField === size ? 'bg-custom-gray text-white' : 'text-custom-gray !border-custom-gray')} title="switch">
              <span>
                <span className="sm:hidden">футбольное</span> поле
              </span>

              <span className="text-custom-95">{size}</span>
            </button>
          ))}
        </div>

        {Object.values(priceData[selectedField]).map(({title, schedule}, index) => (
          <div key={index} className="flex flex-col gap-4 xl:gap-3 sm:gap-1.5">
            <h1 className="text-2xl xl:text-xl sm:text-lg font-medium text-center uppercase text-custom-gray">{title}</h1>

            {schedule.map(({time, price}, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between text-3xl xl:text-2xl sm:text-lg !leading-tight font-book text-custom-gray">
                <div className="text-center w-1/2 py-4 xl:py-3 sm:py-2.5 sm:px-2 duration-200 bg-custom-e4 text-custom-gray rounded-smallest">{time}</div>
                <span>
                  {price} ₽<span className="text-custom-95">/ЧАС</span>
                </span>
              </div>
            ))}
          </div>
        ))}

        <Button variant="hero" href="#" className="text-white bg-custom-green duration-200 hover:bg-custom-gray">
          Забронировать
        </Button>
      </div>
    </section>
  )
}
