'use client'

import {isMobile} from '@/lib/utils'

import Image from 'next/image'

import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import {Autoplay, Scrollbar, Pagination} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'

import image1 from '@/assets/index/gallery/1.webp'
import image2 from '@/assets/index/gallery/2.webp'
import image3 from '@/assets/index/gallery/3.webp'
import image4 from '@/assets/index/gallery/4.webp'
import image5 from '@/assets/index/gallery/5.webp'
import image6 from '@/assets/index/gallery/6.webp'
import image7 from '@/assets/index/gallery/7.webp'
import image8 from '@/assets/index/gallery/8.webp'
import image9 from '@/assets/index/gallery/9.webp'
import image10 from '@/assets/index/gallery/10.webp'
import image11 from '@/assets/index/gallery/11.webp'

interface SlideButtonProps {
  position: 'left' | 'right'
}

const SlideButton: React.FC<SlideButtonProps> = ({position}) => {
  const swiper = useSwiper()

  const handleClick = () => {
    swiper[position === 'left' ? 'slidePrev' : 'slideNext']()
  }

  const isLeft = position === 'left'

  return (
    <button className={`sm:hidden group absolute top-[47%] z-10 bg-white rounded-small py-4 xl:py-3 ${isLeft ? 'left-5 pl-5 pr-6' : 'right-5 pr-5 pl-6'}`} onClick={handleClick} title="slide">
      <svg className={`xl:w-9 ${isLeft ? '' : 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" width="46" height="28" viewBox="0 0 46 28" fill="none">
        <path className="duration-200 group-hover:fill-custom-green fill-custom-gray" d="M24.529 25.696c0 1.547-1.68 2.508-3.013 1.725L1.935 15.916c-1.316-.774-1.316-2.676 0-3.45L21.515.963c1.334-.784 3.014.178 3.014 1.724v6.86h21.316v10.358H24.53v5.792Z" />
      </svg>
    </button>
  )
}

export default function Gallery() {
  const sliderImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11]

  return (
    <section className="mt-20 sm:mt-10">
      <Swiper
        modules={[Autoplay, Scrollbar, Pagination]}
        speed={750}
        autoplay={{delay: 3500}}
        scrollbar={{
          hide: true,
        }}
        pagination={true}
        grabCursor={true}
        loop={true}
        className="mySwiper relative h-[65vh] sm:h-[50vh] !mx-3 rounded-small"
      >
        {!isMobile && (
          <>
            <SlideButton position="left" />
            <SlideButton position="right" />
          </>
        )}

        {sliderImages.map((image, key) => (
          <SwiperSlide className="relative grid place-items-center" key={key}>
            <Image loading={'eager'} quality={100} className="absolute inset-0 block object-cover s-full" src={image} width={2000} height={2000} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
