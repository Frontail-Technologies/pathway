'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type LoaderState = 'idle' | 'loading' | 'complete'

export function NavigationLoader() {
  const pathname = usePathname()
  const [state, setState] = useState<LoaderState>('idle')
  const prevPathname = useRef(pathname)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      if (!href.startsWith('/') || href === pathname) return
      clearTimeout(hideTimer.current)
      setState('loading')
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  useEffect(() => {
    if (pathname === prevPathname.current) return
    prevPathname.current = pathname
    setState('complete')
    hideTimer.current = setTimeout(() => setState('idle'), 450)
    return () => clearTimeout(hideTimer.current)
  }, [pathname])

  if (state === 'idle') return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.75 overflow-hidden" aria-hidden="true">
      <div
        className={
          state === 'loading'
            ? 'h-full w-full origin-left bg-[#e07020] animate-[nav-progress_8s_ease-out_forwards]'
            : 'h-full w-full origin-left bg-[#e07020] scale-x-100 transition-transform duration-300'
        }
      />
    </div>
  )
}
