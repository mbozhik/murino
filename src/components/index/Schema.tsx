import Image from 'next/image'

import SchemaArena from '../../assets/index/schema.svg'

import Button from '../ui/Button'

export default function Schema() {
  return (
    <section id="schema" className="pt-10 mt-10 sm:pt-0 sm:sm:mt-14">
      <Button style="heading" classes="mx-3">
        Сколько стоит аренда?
      </Button>

      <div className="mx-3 mt-5 shadow-card p-7 rounded-small">
        <div className="grid grid-cols-2 gap-5">
          <div className="grid place-items-center border-[3px] border-custom-gray p-7 sm:p-3 rounded-small">
            <span className="w-[60%] text-2xl font-medium tracking-tighter text-center uppercase duration-200 leading-[1.15] text-custom-gray xl:text-xl sm:text-lg">Нажмите на интересующий вас объект на схеме</span>
          </div>

          <div className="overflow-hidden shadow-card rounded-small aspect-[1.25/1] grid place-items-center">
            <Image className="h-[95%]" src={SchemaArena} alt=""></Image>
          </div>
        </div>
      </div>
    </section>
  )
}
