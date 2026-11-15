'use client'

import type { ReactNode } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AppliedFilter = { key: string; label: string; onRemove: () => void }

export function FilterToolbar({
  total,
  noun,
  applied = [],
  onClearAll,
  onOpenFilters,
  controls,
  className,
}: {
  total?: number
  noun: [string, string]
  applied?: AppliedFilter[]
  onClearAll?: () => void
  onOpenFilters?: () => void
  controls?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {onOpenFilters || controls ? (
        <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {onOpenFilters ? (
            <button
              type="button"
              onClick={onOpenFilters}
              className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border bg-card px-3.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters
              {applied.length > 0 ? <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">{applied.length}</span> : null}
            </button>
          ) : null}
          {controls}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        {typeof total === 'number' ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Found <span className="font-semibold text-foreground tabular-nums">{total.toLocaleString('en-IN')}</span> {total === 1 ? noun[0] : noun[1]}
          </p>
        ) : null}
        {applied.map((filter) => (
          <span key={filter.key} className="inline-flex h-7 items-center gap-1 rounded-full bg-secondary pl-3 pr-1 text-xs font-medium text-secondary-foreground">
            {filter.label}
            <button
              type="button"
              onClick={filter.onRemove}
              aria-label={`Remove ${filter.label}`}
              className="grid size-5 cursor-pointer place-items-center rounded-full outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <X className="size-3" aria-hidden="true" />
            </button>
          </span>
        ))}
        {applied.length > 0 && onClearAll ? (
          <button type="button" onClick={onClearAll} className="cursor-pointer text-xs font-semibold text-primary hover:underline underline-offset-4">
            Clear all
          </button>
        ) : null}
      </div>
    </div>
  )
}

export function FilterPill({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
        active ? 'border-primary bg-secondary text-secondary-foreground' : 'bg-card text-foreground hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}
