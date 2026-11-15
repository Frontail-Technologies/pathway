'use client'

import { useEffect } from 'react'

export function ScrollToSection({ id }: { id: string }) {
  useEffect(() => {
    if (window.location.hash) return
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [id])
  return null
}
