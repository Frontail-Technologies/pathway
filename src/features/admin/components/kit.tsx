'use client'

/**
 * Admin kit: the one way to build an admin page.
 *
 * Hierarchy on every page: PageHeader (title, plain count, one primary action) → Toolbar (search + filters)
 * → content (table / sections). Colour is reserved for meaning: primary for the main action and links,
 * success / warning / danger for status. Everything else is neutral. Body text is 14px; 12px only for meta.
 */

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ page header */

export function AdminPageHeader({
  title,
  description,
  count,
  actions,
  back,
  meta,
}: {
  title: string
  description?: string
  /** Plain text such as "8 institutions"; shown next to the title, not as a coloured pill. */
  count?: string
  actions?: ReactNode
  back?: { href: string; label: string }
  /** Small line under the title, e.g. status badges on a detail page. */
  meta?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-3 pb-1">
      {back ? (
        <Link href={back.href} className="-ml-1 flex w-fit items-center gap-1.5 rounded-md px-1 py-0.5 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            {count ? <span className="text-sm text-muted-foreground tabular-nums">{count}</span> : null}
          </div>
          {description ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
          {meta ? <div className="mt-2 flex flex-wrap items-center gap-2">{meta}</div> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ toolbar & filters */

export type FilterOption = { value: string; label: string }

/** Search + filters on one row, sitting directly above the table (no extra card). */
export function AdminToolbar({
  search,
  onSearchChange,
  searchPlaceholder = 'Search',
  children,
  hasActiveFilters,
  onReset,
  summary,
}: {
  search?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  children?: ReactNode
  hasActiveFilters?: boolean
  onReset?: () => void
  /** e.g. "Showing 4 of 8" */
  summary?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        {onSearchChange ? (
          <div className="relative lg:w-80 lg:shrink-0">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              value={search ?? ''}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-9 bg-card pl-9 text-sm"
            />
          </div>
        ) : null}
        {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
        {hasActiveFilters && onReset ? (
          <button type="button" onClick={onReset} className="flex h-9 items-center gap-1 rounded-md px-2 text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
            <X className="size-4" aria-hidden="true" />
            Clear
          </button>
        ) : null}
      </div>
      {summary ? <p className="text-[13px] text-muted-foreground">{summary}</p> : null}
    </div>
  )
}

/**
 * Filter dropdown. Shows "Type: All" style labels so the toolbar reads at a glance, and uses the design-system
 * Select instead of the browser's native control.
 */
export function AdminFilterSelect({ label, value, onChange, options, allLabel = 'All' }: { label: string; value: string; onChange: (value: string) => void; options: FilterOption[]; allLabel?: string }) {
  const items = [{ value: 'all', label: allLabel }, ...options.filter((option) => option.value !== 'all')]
  const current = items.find((item) => item.value === value) ?? items[0]!
  const active = value !== 'all'
  return (
    <Select value={value} onValueChange={(next) => onChange((next as string | null) ?? 'all')} items={items}>
      <SelectTrigger size="sm" aria-label={label} className={cn('h-9 min-w-0 gap-1.5 bg-card text-sm', active && 'border-primary/50 bg-accent text-accent-foreground')}>
        <span className="text-muted-foreground">{label}:</span>
        <SelectValue>{current.label}</SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/* ------------------------------------------------------------------ status */

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

const toneDot: Record<StatusTone, string> = {
  neutral: 'bg-muted-foreground/60',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-destructive',
  info: 'bg-primary',
}
const toneText: Record<StatusTone, string> = {
  neutral: 'text-muted-foreground',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-destructive',
  info: 'text-primary',
}

/** A dot and a word. Quiet enough to repeat in every row; the colour carries the meaning. */
export function StatusBadge({ tone = 'neutral', children, className }: { tone?: StatusTone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap', toneText[tone], className)}>
      <span className={cn('size-1.5 shrink-0 rounded-full', toneDot[tone])} aria-hidden="true" />
      {children}
    </span>
  )
}

/** Maps the legacy badge variants used across admin data to tones. */
export function toneFromVariant(variant?: string | null): StatusTone {
  switch (variant) {
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'destructive':
      return 'danger'
    case 'info':
    case 'default':
      return 'info'
    default:
      return 'neutral'
  }
}

/** Neutral tag for categories (type, level, stream) — never coloured. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center rounded-md border border-border bg-card px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-foreground', className)}>{children}</span>
}

/** Completeness as a thin single-colour bar with the number; green only when the record is complete. */
export function CompletenessMeter({ value, className }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={cn('flex min-w-28 items-center gap-2', className)} role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${pct}% complete`}>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className={cn('h-full rounded-full', pct >= 100 ? 'bg-success' : 'bg-primary')} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-9 text-right text-[13px] font-medium text-foreground tabular-nums">{pct}%</span>
    </div>
  )
}

/* ------------------------------------------------------------------ stats */

/** KPI tile: label, big number, optional context line. No coloured icons. */
export function StatTile({ label, value, hint, href }: { label: string; value: ReactNode; hint?: ReactNode; href?: string }) {
  const body = (
    <>
      <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-heading text-[28px] leading-8 font-bold text-foreground tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </>
  )
  const className = 'block rounded-lg border border-border bg-card p-4'
  return href ? (
    <Link href={href} className={cn(className, 'outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/40')}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  )
}

export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>{children}</div>
}

/* ------------------------------------------------------------------ surfaces */

/** Plain bordered panel with an optional heading row. */
export function Panel({ title, description, action, children, className, bodyClassName }: { title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string; bodyClassName?: string }) {
  return (
    <section className={cn('rounded-lg border border-border bg-card', className)}>
      {title ? (
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
            {description ? <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </section>
  )
}

/** Label / value list for detail pages. */
export function FactList({ items, columns = 2 }: { items: { label: string; value: ReactNode }[]; columns?: 1 | 2 | 3 }) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-4', columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3')}>
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[13px] text-muted-foreground">{item.label}</dt>
          <dd className="mt-0.5 text-sm font-medium break-words text-foreground">{item.value ?? '—'}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------------ table helpers */

/** Sortable column header: sentence case, shows the current direction. */
export function SortHeader({ label, sorted, onToggle }: { label: string; sorted: false | 'asc' | 'desc'; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="-ml-1 inline-flex items-center gap-1 rounded px-1 py-0.5 text-[13px] font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
      {label}
      <span aria-hidden="true" className="text-[10px]">
        {sorted === 'asc' ? '▲' : sorted === 'desc' ? '▼' : '↕'}
      </span>
      <span className="sr-only">{sorted ? `sorted ${sorted === 'asc' ? 'ascending' : 'descending'}` : 'sortable'}</span>
    </button>
  )
}

/** Row actions: a quiet "…" menu trigger that doesn't trigger the row click. */
export function stopRowClick(event: { stopPropagation: () => void }) {
  event.stopPropagation()
}
