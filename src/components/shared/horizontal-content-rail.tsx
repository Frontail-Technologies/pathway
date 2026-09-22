'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type HorizontalContentRailProps = {
  children: ReactNode
  ariaLabel: string
  className?: string
  /** Applied to the scrollable track itself — put per-item width/snap classes on the items, not here. */
  trackClassName?: string
  /** Show desktop Prev/Next buttons (hidden on touch/mobile widths, where swipe is the primary interaction). */
  showControls?: boolean
}

/**
 * Shared horizontal scroll-snap rail for compact card collections (related/
 * recommended/similar items, mobile program cards, etc.) — owns only
 * overflow/snap/scroll-button mechanics. Card content and per-card width
 * stay entirely up to the caller (pass width classes on the children).
 */
export function HorizontalContentRail({ children, ariaLabel, className = '', trackClassName = '', showControls = false }: HorizontalContentRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = () => {
    const track = trackRef.current
    if (!track) return
    setCanScrollPrev(track.scrollLeft > 4)
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        role="group"
        aria-label={ariaLabel}
        onScroll={updateScrollState}
        className={`flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 ${trackClassName}`}
      >
        {children}
      </div>

      {showControls && (canScrollPrev || canScrollNext) && (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            disabled={!canScrollPrev}
            onClick={() => scrollBy(-1)}
            className="absolute top-1/2 -left-3 hidden size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-card text-foreground shadow-sm outline-none transition-opacity hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-0 lg:flex"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            disabled={!canScrollNext}
            onClick={() => scrollBy(1)}
            className="absolute top-1/2 -right-3 hidden size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-card text-foreground shadow-sm outline-none transition-opacity hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-0 lg:flex"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}
