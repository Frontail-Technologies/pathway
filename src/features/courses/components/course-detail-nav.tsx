'use client'

import { useEffect, useRef, useState } from 'react'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'fees', label: 'Fees' },
  { id: 'exams', label: 'Exams' },
  { id: 'specializations', label: 'Specializations' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'careers', label: 'Careers' },
  { id: 'colleges', label: 'Colleges' },
  { id: 'related', label: 'Related Courses' },
  { id: 'faqs', label: 'FAQs' },
]

export function CourseDetailNav() {
  const [active, setActive] = useState(sections[0].id)
  const scrollerRef = useRef<HTMLDivElement>(null)

  // Scroll-spy: observes section position and updates the highlighted tab
  // only. It must never call scrollIntoView/scrollTo(document)/router
  // navigation from here — doing so caused the page to snap back toward the
  // top on College Detail (a known browser quirk with scrollIntoView on
  // descendants of a `position: sticky` container).
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
  // which walks up every scrollable ancestor including the document. A plain
  // `container.scrollTo` call on this local div cannot touch document scroll.
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
    // 60px search row) — same global header as College Detail. Desktop/tablet
    // uses the header's own 104px height (64px primary row + 40px nav row).
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
