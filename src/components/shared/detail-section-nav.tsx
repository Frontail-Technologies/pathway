'use client'

import { useEffect, useRef, useState } from 'react'

export type DetailSectionNavItem = { id: string; label: string }

type DetailSectionNavProps = {
  items: DetailSectionNavItem[]
}

export function DetailSectionNav({ items }: DetailSectionNavProps) {
  const [active, setActive] = useState(items[0]?.id)
  const navRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const computeActive = () => {
      ticking = false
      if (items.length === 0) return

      let current = items[0].id
      for (const item of items) {
        const node = document.getElementById(item.id)
        if (!node) continue
        const threshold = parseFloat(getComputedStyle(node).scrollMarginTop) + 2
        if (node.getBoundingClientRect().top <= threshold) {
          current = item.id
        } else {
          break
        }
      }
      setActive(current)
    }

    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(computeActive)
    }

    computeActive()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [items])

  useEffect(() => {
    const container = scrollerRef.current
    const activeLink = container?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)
    if (!container || !activeLink) return

    const containerRect = container.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const isFullyVisible = linkRect.left >= containerRect.left && linkRect.right <= containerRect.right
    if (isFullyVisible) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targetScrollLeft = container.scrollLeft + (linkRect.left - containerRect.left) - (containerRect.width - linkRect.width) / 2
    container.scrollTo({ left: targetScrollLeft, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [active])

  if (items.length === 0) return null

  return (

    <div ref={navRef} className="sticky top-header z-20 border-y bg-card">
      <div className="container-shell px-4">
        <div ref={scrollerRef} className="flex gap-1 overflow-x-auto max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 cursor-pointer border-b-2 px-3 py-2.5 text-[13px] whitespace-nowrap outline-none transition-colors focus-visible:text-primary sm:text-sm ${
                active === item.id ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
