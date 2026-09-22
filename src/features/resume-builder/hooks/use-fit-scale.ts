'use client'

import { useLayoutEffect, useRef, useState } from 'react'

/**
 * For a container whose own box is already locked to the content's aspect
 * ratio (e.g. `aspect-210/297` matching an A4 canvas) — scale only needs to
 * come from width, since height follows automatically. Used by thumbnails,
 * where the container's CSS aspect-ratio does the "contain" work for us.
 */
export function useFitScale(contentWidth: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      if (el.clientWidth > 0) setScale(el.clientWidth / contentWidth)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [contentWidth])

  return { ref, scale }
}
