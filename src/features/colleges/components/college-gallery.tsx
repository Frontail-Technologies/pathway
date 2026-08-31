'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { CollegeGalleryImage } from '../data/college-detail'

export function CollegeGallery({ images, collegeName }: { images: CollegeGalleryImage[]; collegeName: string }) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)

  const openViewer = (index: number) => {
    setViewerIndex(index)
    setViewerOpen(true)
  }

  return (
    <div className="mt-5 sm:mt-6">
      <DesktopGalleryPreview images={images} name={collegeName} onOpen={openViewer} />
      <MobileGallerySlider images={images} name={collegeName} onOpen={openViewer} />

      <CollegeGalleryViewer
        images={images}
        collegeName={collegeName}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        initialIndex={viewerIndex}
      />
    </div>
  )
}

function DesktopGalleryPreview({
  images,
  name,
  onOpen,
}: {
  images: CollegeGalleryImage[]
  name: string
  onOpen: (index: number) => void
}) {
  const [wide, thumbA, thumbB] = images
  const remaining = Math.max(images.length - 3, 0)

  return (
    <div className="hidden grid-cols-3 grid-rows-2 gap-2 sm:grid sm:h-50">
      <button
        type="button"
        onClick={() => onOpen(0)}
        aria-label={`View ${name} photos`}
        className="group relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Image src={wide.src} alt={wide.alt} fill sizes="60vw" className="object-cover transition-opacity group-hover:opacity-90" priority />
        <span className="absolute inset-0 flex items-end justify-start bg-black/0 p-3 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
          <span className="rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white">View Photos</span>
        </span>
      </button>

      {thumbA && (
        <button
          type="button"
          onClick={() => onOpen(1)}
          aria-label={`View ${name} photos`}
          className="relative cursor-pointer overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Image src={thumbA.src} alt={thumbA.alt} fill sizes="20vw" className="object-cover" />
        </button>
      )}

      {thumbB && (
        <button
          type="button"
          onClick={() => onOpen(2)}
          aria-label={`View all ${images.length} ${name} photos`}
          className="relative cursor-pointer overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Image src={thumbB.src} alt={thumbB.alt} fill sizes="20vw" className="object-cover" />
          {remaining > 0 && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
              +{remaining} Photos
            </span>
          )}
        </button>
      )}
    </div>
  )
}

function MobileGallerySlider({
  images,
  name,
  onOpen,
}: {
  images: CollegeGalleryImage[]
  name: string
  onOpen: (index: number) => void
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
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

  return (
    <div className="relative overflow-hidden rounded-lg sm:hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((image, index) => (
          <button
            type="button"
            key={image.id}
            onClick={() => onOpen(index)}
            aria-label={`View ${name} photos`}
            className="relative h-40 min-w-0 flex-[0_0_100%] cursor-pointer bg-muted outline-none"
          >
            <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" priority={index === 0} loading={index === 0 ? 'eager' : 'lazy'} />
          </button>
        ))}
      </div>
      <span className="pointer-events-none absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
        {selectedIndex + 1} / {images.length}
      </span>
    </div>
  )
}

function CollegeGalleryViewer({
  images,
  collegeName,
  open,
  onOpenChange,
  initialIndex,
}: {
  images: CollegeGalleryImage[]
  collegeName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialIndex: number
}) {
  const [index, setIndex] = useState(initialIndex)
  const total = images.length

  useEffect(() => {
    if (open) setIndex(initialIndex)
  }, [open, initialIndex])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + total) % total)
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % total)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, total])

  const current = images[index]
  if (!current) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90dvh] w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b p-3">
          <DialogTitle className="truncate text-sm font-semibold">{collegeName} Photos</DialogTitle>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {index + 1} / {total}
            </span>
            <DialogClose
              render={
                <button
                  type="button"
                  aria-label="Close gallery"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              }
            >
              <X className="size-4" aria-hidden="true" />
            </DialogClose>
          </div>
        </div>

        <div className="relative aspect-4/3 w-full shrink-0 bg-muted sm:aspect-video">
          <Image src={current.src} alt={current.alt} fill sizes="(min-width: 640px) 42rem, 100vw" className="object-cover" />

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => setIndex((current) => (current - 1 + total) % total)}
            className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white outline-none transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => setIndex((current) => (current + 1) % total)}
            className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white outline-none transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex shrink-0 gap-2 overflow-x-auto p-3">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === index}
              className={`relative size-14 shrink-0 cursor-pointer overflow-hidden rounded-md outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-primary/40 ${
                i === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={image.src} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
