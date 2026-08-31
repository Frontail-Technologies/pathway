'use client'

import { useEffect, useRef, useState } from 'react'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses' },
  { id: 'fees', label: 'Fees' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'placements', label: 'Placements' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
]

export function CollegeDetailNav() {
  const [active, setActive] = useState(sections[0].id)
  const scrollerRef = useRef<HTMLDivElement>(null)

  // Scroll-spy: observes section position and updates the highlighted tab
  // only. It must never call scrollIntoView/scrollTo(document)/router
  // navigation from here — doing so previously caused the page to snap back
  // toward the top while the user scrolled (a known browser quirk with
  // scrollIntoView on descendants of a `position: sticky` container).
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
  }, [])

  // Keep the active tab visible inside the horizontal tab strip only. This
  // adjusts the strip's own `scrollLeft` directly — never `scrollIntoView`,
  // which walks up every scrollable ancestor including the document and is
  // what caused the scroll-reset bug above. A plain `container.scrollTo`
  // call on this local div cannot touch document scroll at all.
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

  return (
    // Mobile top offset (117px) is the measured height of the sticky mobile
    // app header + its compact search row (56px primary row + 1px border +
    // 60px search row). Desktop/tablet uses the header's own 104px height
    // (64px primary row + 40px nav row) at `md:` and up.
    <div className="sticky top-[117px] z-20 border-y bg-card md:top-26">
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
