'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export type DetailTabNavItem = { href: string; label: string }

/**
 * Sticky tab bar whose tabs are real routes (Shiksha-style sub-pages), unlike
 * DetailSectionNav which scrolls between in-page anchors.
 *
 * Scroll handling: Next.js keeps the scroll position while the shared layout
 * stays visible, which would drop the reader mid-way into the new tab. So
 * tabs opt out (scroll={false}) and, after the route changes, the window is
 * moved so the new content starts right under the tab bar, but only when the
 * reader had already scrolled past it.
 */
export function DetailTabNav({ items, label, className = '' }: { items: DetailTabNavItem[]; label: string; className?: string }) {
  const pathname = usePathname()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const sentinel = sentinelRef.current
    const nav = navRef.current
    if (!sentinel || !nav) return
    const stickyTop = parseFloat(getComputedStyle(nav).top) || 0
    const target = sentinel.getBoundingClientRect().top + window.scrollY - stickyTop
    if (window.scrollY > target) window.scrollTo({ top: target })
  }, [pathname])

  useEffect(() => {
    const container = scrollerRef.current
    const activeLink = container?.querySelector<HTMLAnchorElement>('a[aria-current="page"]')
    if (!container || !activeLink) return
    const containerRect = container.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    if (linkRect.left >= containerRect.left && linkRect.right <= containerRect.right) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    container.scrollTo({ left: container.scrollLeft + (linkRect.left - containerRect.left) - (containerRect.width - linkRect.width) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [pathname])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <nav ref={navRef} aria-label={label} className={`sticky top-header z-20 border-y bg-card ${className}`}>
        <div className="container-shell px-4">
          <div ref={scrollerRef} className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  aria-current={active ? 'page' : undefined}
                  className={`shrink-0 border-b-2 px-3 py-2.5 text-[13px] whitespace-nowrap outline-none transition-colors focus-visible:text-primary sm:text-sm ${
                    active ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
