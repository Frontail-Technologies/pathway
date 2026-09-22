'use client'

import { useEffect, useRef, useState } from 'react'

export type DetailSectionNavItem = { id: string; label: string }

type DetailSectionNavProps = {
  items: DetailSectionNavItem[]
}

/**
 * Canonical sticky horizontal section nav for every Public Detail screen
 * (College/Course/Scholarship/Coaching). Same 117px mobile / 104px desktop
 * sticky offsets as the per-feature implementations it replaces.
 *
 * Active-section logic is a deterministic scroll listener, not a fragile
 * IntersectionObserver percentage band — the old approach could pick the
 * wrong tab for a short section (a section shorter than the observer's
 * "active" band gets skipped in favor of whatever sits next to it). Instead:
 * the active section is the *last* item whose top has scrolled up past the
 * nav's own bottom edge, walking sections in order — correct regardless of
 * section height, with sensible first/last-section fallback built in by
 * construction. rAF-throttled scroll/resize listeners, computed once on
 * mount too so the correct tab is active even before any scrolling happens.
 *
 * Never calls scrollIntoView/scrollTo(document) from here — only the tab
 * strip's own `scrollLeft` is ever touched, to keep the active tab visible,
 * because scrollIntoView on a descendant of a `position: sticky` ancestor
 * can snap the whole page back toward the top (a known browser quirk hit
 * repeatedly building the earlier per-feature versions of this nav).
 */
export function DetailSectionNav({ items }: DetailSectionNavProps) {
  const [active, setActive] = useState(items[0]?.id)
  const navRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const computeActive = () => {
      ticking = false
      if (items.length === 0) return
      // Matches each section's own `scroll-mt-43 lg:scroll-mt-40` (172px /
      // 160px) exactly — clicking a tab lands that section's top at this
      // offset (not at the sticky nav's own bottom edge, which sits a little
      // higher), so the threshold has to match the scroll-margin convention
      // the sections already use, or the just-clicked section would never
      // register as "passed" and the previous tab stays highlighted.
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const threshold = (isDesktop ? 160 : 172) + 2

      let current = items[0].id
      for (const item of items) {
        const node = document.getElementById(item.id)
        if (!node) continue
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

  // Keep the active tab visible inside the horizontal tab strip only — never
  // scrollIntoView (see file header note).
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
    // Mobile top offset (117px) is the measured height of the sticky mobile
    // app header + its compact search row; desktop/tablet uses the header's
    // own 104px height at `md:` and up — same measurement every Detail
    // screen already shared.
    <div ref={navRef} className="sticky top-[117px] z-20 border-y bg-card md:top-26">
      <div className="container-shell px-4">
        <div ref={scrollerRef} className="flex gap-1 overflow-x-auto">
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
