'use client'

import { useEffect, useRef, useState } from 'react'

type CoachingDetailNavProps = {
  sections: { id: string; label: string }[]
}








 
export function CoachingDetailNav({ sections }: CoachingDetailNavProps) {
  const [active, setActive] = useState(sections[0]?.id)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(({ id }) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [sections])

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

  if (sections.length === 0) return null

  return (
    <div className="sticky top-[117px] lg:top-30 z-20 border-y bg-card lg:top-30">
      <div className="container-shell px-4">
        <div ref={scrollerRef} className="flex gap-1 overflow-x-auto">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 cursor-pointer border-b-2 px-3 py-2.5 text-[13px] whitespace-nowrap outline-none transition-colors focus-visible:text-primary sm:text-sm ${
                active === section.id ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-primary'
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
