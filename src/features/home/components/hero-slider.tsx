'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { heroSlides } from '../data/hero-slides'

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const autoplay = emblaApi.plugins().autoplay
    if (!autoplay) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) autoplay.stop()
  }, [emblaApi])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="relative h-full min-w-0 flex-[0_0_100%]">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-brand-blue-dark/60" />

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-white ${index === selectedIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  )
}
