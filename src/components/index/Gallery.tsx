'use client'

import Image from 'next/image'

import image1 from '@/assets/index/gallery/1.jpg'
import image2 from '@/assets/index/gallery/2.jpg'
import image3 from '@/assets/index/gallery/3.jpg'
import image4 from '@/assets/index/gallery/4.jpg'
import image5 from '@/assets/index/gallery/5.jpg'
import image6 from '@/assets/index/gallery/6.jpg'
import image7 from '@/assets/index/gallery/7.jpg'
import image8 from '@/assets/index/gallery/8.jpg'

import {Swiper, SwiperSlide, useSwiper} from 'swiper/react'
import {Autoplay, Scrollbar, FreeMode} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/scrollbar'

interface SlideButtonProps {
  position: 'left' | 'right'
}

const SlideButton: React.FC<SlideButtonProps> = ({position}) => {
  const swiper = useSwiper()

  const handleClick = () => {
    position === 'left' ? swiper.slidePrev() : swiper.slideNext()
  }

  return (
    <button className={`absolute top-[47%] z-10 p-2 text-white bg-black s-fit ${position == 'left' ? 'left-2' : 'right-2'}`} onClick={handleClick}>
      Slide
    </button>
  )
}

export default function Gallery() {
  const sliderImages = [image1, image2, image3, image4, image5, image6, image7, image8]

  return (
    <section className="mt-20">
      <Swiper
        modules={[Autoplay, Scrollbar]}
        speed={750}
        autoplay={{delay: 3500}}
        scrollbar={{
          hide: true,
        }}
        grabCursor={true}
        loop={true}
        className="mySwiper relative h-[65vh] !mx-3 rounded-small"
      >
        <SlideButton position="left" />
        <SlideButton position="right" />
        {sliderImages.map((image, key) => (
          <SwiperSlide className="relative grid place-items-center" key={key}>
            <Image className="absolute inset-0 block object-cover s-full" src={image} width={2000} height={2000} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
