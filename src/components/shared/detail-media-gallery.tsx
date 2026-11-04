'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'

export type DetailGalleryImage = { src: string; alt: string; position?: string }

type DetailMediaGalleryProps = {
  images: DetailGalleryImage[]
   
  name: string
}








 
export function DetailMediaGallery({ images, name }: DetailMediaGalleryProps) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)

  const openViewer = (index: number) => {
    setViewerIndex(index)
    setViewerOpen(true)
  }

  const [primary, ...thumbnails] = images

  return (
    <div>
      <div className="hidden sm:block">
        <button
          type="button"
          onClick={() => openViewer(0)}
          aria-label={`View ${name} photos`}
          className="relative block h-64 w-full cursor-pointer overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-72"
        >
          <Image src={primary.src} alt={primary.alt || `${name} photo 1`} fill sizes="(min-width: 1024px) 640px, 60vw" className="object-cover" style={{ objectPosition: primary.position }} priority />
        </button>
        {thumbnails.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {thumbnails.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => openViewer(index + 1)}
                aria-label={`View ${name} photo ${index + 2}`}
                className="relative h-16 cursor-pointer overflow-hidden rounded-md bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-20"
              >
                <Image src={image.src} alt={image.alt || `${name} photo ${index + 2}`} fill sizes="120px" className="object-cover" style={{ objectPosition: image.position }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative sm:hidden">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto" onScroll={(event) => setMobileIndex(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openViewer(index)}
              aria-label={`View ${name} photo ${index + 1}`}
              className="relative h-48 w-full shrink-0 snap-start cursor-pointer overflow-hidden rounded-lg bg-muted outline-none"
            >
              <Image
                src={image.src}
                alt={image.alt || `${name} photo ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: image.position }}
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
          {mobileIndex + 1} / {images.length}
        </span>
      </div>

      <DetailGalleryViewer images={images} name={name} open={viewerOpen} onOpenChange={setViewerOpen} initialIndex={viewerIndex} />
    </div>
  )
}

function DetailGalleryViewer({
  images,
  name,
  open,
  onOpenChange,
  initialIndex,
}: {
  images: DetailGalleryImage[]
  name: string
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
      <DialogContent showCloseButton={false} className="flex max-h-[90dvh] w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b p-3">
          <DialogTitle className="truncate text-sm font-semibold">{name} Photos</DialogTitle>
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
          <Image src={current.src} alt={current.alt || `${name} photo ${index + 1}`} fill sizes="(min-width: 640px) 42rem, 100vw" className="object-cover" style={{ objectPosition: current.position }} />
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => setIndex((c) => (c - 1 + total) % total)}
            className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white outline-none transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => setIndex((c) => (c + 1) % total)}
            className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white outline-none transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
