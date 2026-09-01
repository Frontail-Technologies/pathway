'use client'

import { useEffect, useRef, useState } from 'react'

// Reordered so Eligibility comes right after Overview (the two things a
// student checks first), and shortened to read as quick labels rather than
// full section titles — Applicable Courses/Programs now lives inside the
// Eligibility section itself rather than requiring its own tab.
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'dates', label: 'Dates' },
  { id: 'documents', label: 'Documents' },
  { id: 'apply', label: 'Apply' },
  { id: 'selection', label: 'Selection' },
  { id: 'faqs', label: 'FAQs' },
]

export function ScholarshipDetailNav() {
  const [active, setActive] = useState(sections[0].id)
  const scrollerRef = useRef<HTMLDivElement>(null)

  // Scroll-spy: observes section position and updates the highlighted tab
  // only. Must never call scrollIntoView/scrollTo(document)/router
  // navigation from here — same known scrollIntoView-on-sticky-descendant
  // quirk documented on `CourseDetailNav`/College Detail.
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

  // Keep the active tab visible inside the horizontal tab strip only — adjusts
  // the strip's own `scrollLeft` directly, never `scrollIntoView` (which walks
  // up every scrollable ancestor including the document).
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
    // Same measured sticky offsets as CourseDetailNav/College Detail — 117px
    // mobile (app header + search row), 104px desktop (header + nav row).
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
