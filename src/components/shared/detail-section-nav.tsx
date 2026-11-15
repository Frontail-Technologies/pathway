'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

export type DetailSectionNavItem = { id: string; label: string }

const SETTLE_MS = 1000

export function DetailSectionNav({ items, label = 'Page sections', className }: { items: DetailSectionNavItem[]; label?: string; className?: string }) {
  const [active, setActive] = useState(items[0]?.id)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const lockUntil = useRef(0)

  useEffect(() => {
    let frame = 0

    const compute = () => {
      frame = 0
      if (!items.length || Date.now() < lockUntil.current) return
      const nodes = items.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node))
      if (!nodes.length) return
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(nodes[nodes.length - 1].id)
        return
      }
      let current = nodes[0].id
      for (const node of nodes) {
        const offset = parseFloat(getComputedStyle(node).scrollMarginTop) || 0
        if (node.getBoundingClientRect().top <= offset + 24) current = node.id
        else break
      }
      setActive(current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }

    const release = () => {
      lockUntil.current = 0
      schedule()
    }

    compute()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('scrollend', release)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scrollend', release)
    }
  }, [items])

  useEffect(() => {
    const container = scrollerRef.current
    const link = container?.querySelector<HTMLAnchorElement>(`a[data-section="${active}"]`)
    if (!container || !link) return
    const box = container.getBoundingClientRect()
    const rect = link.getBoundingClientRect()
    if (rect.left >= box.left && rect.right <= box.right) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    container.scrollTo({ left: container.scrollLeft + (rect.left - box.left) - (box.width - rect.width) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [active])

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    lockUntil.current = Date.now() + SETTLE_MS
    setActive(id)
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  if (!items.length) return null

  return (
    <nav aria-label={label} className={cn('sticky top-header z-20 border-y bg-card', className)}>
      <div className="container-shell px-4">
        <div ref={scrollerRef} className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const current = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-section={item.id}
                onClick={(event) => go(event, item.id)}
                aria-current={current ? 'location' : undefined}
                className={cn(
                  'flex h-12 shrink-0 items-center border-b-2 px-3 text-[13px] whitespace-nowrap outline-none transition-colors focus-visible:text-primary sm:text-sm',
                  current ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-primary',
                )}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
