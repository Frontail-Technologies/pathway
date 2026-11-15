'use client'

import { ArrowUpDown, SlidersHorizontal } from 'lucide-react'

export function MobileListingBar({ sortLabel, activeCount, onOpen }: { sortLabel: string; activeCount: number; onOpen: (pane: 'sort' | 'filters') => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--pw-bottom-nav-h,0px)+0.75rem)] z-20 flex justify-center px-4 lg:hidden print:hidden">
      <div className="pointer-events-auto flex h-11 items-stretch overflow-hidden rounded-full border bg-card shadow-[0_6px_20px_rgba(15,23,42,0.14)]">
        <button type="button" onClick={() => onOpen('sort')} className="flex cursor-pointer items-center gap-2 px-4 text-sm font-medium text-foreground outline-none active:bg-muted focus-visible:bg-muted">
          <ArrowUpDown className="size-4 text-primary" aria-hidden="true" />
          <span className="max-w-32 truncate">{sortLabel}</span>
        </button>
        <span className="my-2.5 w-px bg-border" aria-hidden="true" />
        <button type="button" onClick={() => onOpen('filters')} className="flex cursor-pointer items-center gap-2 px-4 text-sm font-medium text-foreground outline-none active:bg-muted focus-visible:bg-muted">
          <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
          Filters
          {activeCount ? <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">{activeCount}</span> : null}
        </button>
      </div>
    </div>
  )
}
