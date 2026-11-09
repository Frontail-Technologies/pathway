'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Search, TrendingDown, TrendingUp, X, type LucideIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export function AdminPageHeader({
  title,
  eyebrow,
  description,
  count,
  actions,
  back,
  meta,
}: {
  title: string
  eyebrow?: string
  description?: string
  count?: string
  actions?: ReactNode
  back?: { href: string; label: string }
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          {eyebrow ? <p className="text-xs font-semibold tracking-[1.2px] text-primary uppercase">{eyebrow}</p> : null}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-heading text-2xl leading-7 font-semibold tracking-tight text-foreground">{title}</h1>
            {count ? <span className="text-sm text-muted-foreground tabular-nums">{count}</span> : null}
          </div>
          {description ? <p className="max-w-2xl text-[15px] text-muted-foreground">{description}</p> : null}
          {meta ? <div className="mt-1 flex flex-wrap items-center gap-2">{meta}</div> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}

export type FilterOption = { value: string; label: string }

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
              className="h-9 rounded-lg bg-card pl-9 text-sm"
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

export function AdminFilterSelect({ label, value, onChange, options, allLabel = 'All' }: { label: string; value: string; onChange: (value: string) => void; options: FilterOption[]; allLabel?: string }) {
  const items = [{ value: 'all', label: allLabel }, ...options.filter((option) => option.value !== 'all')]
  const current = items.find((item) => item.value === value) ?? items[0]!
  const active = value !== 'all'
  return (
    <Select value={value} onValueChange={(next) => onChange((next as string | null) ?? 'all')} items={items}>
      <SelectTrigger size="sm" aria-label={label} className={cn('h-9 min-w-0 gap-1.5 rounded-lg bg-card text-sm', active && 'border-primary/50 bg-primary/8 text-primary')}>
        <span className={active ? 'text-primary/80' : 'text-muted-foreground'}>{label}:</span>
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

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

const toneDot: Record<StatusTone, string> = {
  neutral: 'bg-muted-foreground/70',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-destructive',
  info: 'bg-primary',
}

const tonePill: Record<StatusTone, string> = {
  neutral: 'bg-muted text-muted-foreground',
  success: 'bg-success/12 text-success',
  warning: 'bg-warning/14 text-warning',
  danger: 'bg-destructive/12 text-destructive',
  info: 'bg-primary/12 text-primary',
}

export const toneSoft: Record<StatusTone, string> = tonePill

export function StatusBadge({ tone = 'neutral', children, className }: { tone?: StatusTone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold whitespace-nowrap in-data-[density=compact]:h-5 in-data-[density=compact]:px-2', tonePill[tone], className)}>
      <span className={cn('size-1.5 shrink-0 rounded-full', toneDot[tone])} aria-hidden="true" />
      {children}
    </span>
  )
}

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

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex h-6 items-center rounded-md bg-muted px-2 text-xs font-medium whitespace-nowrap text-foreground', className)}>{children}</span>
}

export function CountBadge({ count, tone = 'info', className }: { count: number; tone?: StatusTone; className?: string }) {
  if (!count) return null
  return (
    <span className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums', tonePill[tone], className)} aria-label={`${count}`}>
      {count > 999 ? '999+' : count}
    </span>
  )
}

const tileSize = { sm: 'size-8 rounded-lg [&_svg]:size-4', md: 'size-10 rounded-lg [&_svg]:size-5', lg: 'size-11 rounded-xl [&_svg]:size-[22px]' }

export function IconTile({ icon: Icon, tone = 'info', size = 'md', className }: { icon: LucideIcon; tone?: StatusTone; size?: keyof typeof tileSize; className?: string }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center', tileSize[size], tonePill[tone], className)} aria-hidden="true">
      <Icon strokeWidth={1.9} />
    </span>
  )
}

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

export type StatTrend = { value: string; up: boolean; label?: string }

export function StatTile({ label, value, hint, href, icon, tone = 'info', trend }: { label: string; value: ReactNode; hint?: ReactNode; href?: string; icon?: LucideIcon; tone?: StatusTone; trend?: StatTrend }) {
  const body = (
    <>
      {icon ? <IconTile icon={icon} tone={tone} size="lg" className="mb-(--admin-pad-y)" /> : null}
      <p className="truncate text-[13px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-heading text-[26px] leading-8 font-bold text-foreground tabular-nums">{value}</p>
      {trend || hint ? (
        <p className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          {trend ? (
            <span className={cn('inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold', trend.up ? 'bg-success/12 text-success' : 'bg-destructive/12 text-destructive')}>
              {trend.up ? <TrendingUp className="size-3" aria-hidden="true" /> : <TrendingDown className="size-3" aria-hidden="true" />}
              {trend.value}
            </span>
          ) : null}
          {trend?.label ?? hint ? <span className="truncate">{trend?.label ?? hint}</span> : null}
        </p>
      ) : null}
    </>
  )
  const className = 'flex min-w-0 flex-col rounded-xl border border-border bg-card p-(--admin-pad) shadow-sm'
  return href ? (
    <Link href={href} className={cn(className, 'outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/40')}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  )
}

export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4', className)}>{children}</div>
}

export function Panel({ title, description, action, children, className, bodyClassName }: { title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string; bodyClassName?: string }) {
  return (
    <section className={cn('flex min-w-0 flex-col rounded-xl border border-border bg-card shadow-sm', className)}>
      {title ? (
        <header className="flex items-start justify-between gap-3 border-b border-border px-(--admin-pad) py-(--admin-pad-y)">
          <div className="min-w-0">
            <h2 className="text-base leading-6 font-semibold text-foreground">{title}</h2>
            {description ? <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p> : null}
          </div>
          {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
        </header>
      ) : null}
      <div className={cn('p-(--admin-pad)', bodyClassName)}>{children}</div>
    </section>
  )
}

export function FactList({ items, columns = 2 }: { items: { label: string; value: ReactNode }[]; columns?: 1 | 2 | 3 }) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-4', columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3')}>
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[13px] text-muted-foreground">{item.label}</dt>
          <dd className="mt-1 text-sm font-medium break-words text-foreground">{item.value ?? '—'}</dd>
        </div>
      ))}
    </dl>
  )
}

export type WorkItem = { id: string; href: string; title: string; subtitle?: string; meta?: ReactNode }

export function WorkList({ title, count, href, hrefLabel = 'See all', items, emptyText, className }: { title: string; count?: number; href?: string; hrefLabel?: string; items: WorkItem[]; emptyText: string; className?: string }) {
  return (
    <section className={cn('flex min-w-0 flex-col rounded-xl border border-border bg-card shadow-sm', className)}>
      <header className="flex h-14 items-center gap-2 border-b border-border px-5 in-data-[density=compact]:h-12 in-data-[density=compact]:px-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {count ? <CountBadge count={count} /> : null}
        {href ? (
          <Link href={href} className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:underline">
            {hrefLabel}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </header>
      {items.length ? (
        <ul className="flex flex-col divide-y divide-border">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="flex min-h-16 items-center gap-3 px-5 py-2.5 outline-none transition-colors hover:bg-muted/50 focus-visible:bg-muted/60 in-data-[density=compact]:min-h-12 in-data-[density=compact]:px-4">
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold text-foreground">{item.title}</span>
                  {item.subtitle ? <span className="truncate text-[13px] text-muted-foreground">{item.subtitle}</span> : null}
                </span>
                {item.meta ? <span className="flex shrink-0 items-center gap-2">{item.meta}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-5 py-10 text-center text-sm text-muted-foreground">{emptyText}</p>
      )}
    </section>
  )
}

export type QuickActionTile = { id: string; label: string; subtitle?: string; icon: LucideIcon; tone?: StatusTone; href: string }

export function QuickActionTiles({ items, className }: { items: QuickActionTile[]; className?: string }) {
  return (
    <ul className={cn('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <Link href={item.href} className="flex h-full items-center gap-3 rounded-xl border border-border bg-card p-(--admin-pad-y) shadow-sm outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/40">
            <IconTile icon={item.icon} tone={item.tone ?? 'info'} />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-foreground">{item.label}</span>
              {item.subtitle ? <span className="truncate text-xs text-muted-foreground">{item.subtitle}</span> : null}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export type ProgressItem = { label: string; value: number; display?: string; tone?: StatusTone }

const toneBar: Record<StatusTone, string> = { neutral: 'bg-muted-foreground/60', success: 'bg-success', warning: 'bg-warning', danger: 'bg-destructive', info: 'bg-primary' }

export function ProgressList({ items, max }: { items: ProgressItem[]; max?: number }) {
  const top = max ?? Math.max(1, ...items.map((item) => item.value))
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-medium text-foreground">{item.label}</span>
            <span className="shrink-0 text-[13px] font-medium text-muted-foreground tabular-nums">{item.display ?? item.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted" role="meter" aria-valuemin={0} aria-valuemax={top} aria-valuenow={item.value} aria-label={item.label}>
            <div className={cn('h-full rounded-full', toneBar[item.tone ?? 'info'])} style={{ width: `${Math.min(100, (item.value / top) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ScoreMeter({ value, tone = 'info', label, size = 96, className }: { value: number; tone?: StatusTone; label: string; size?: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const colour = { neutral: 'stroke-muted-foreground/60', success: 'stroke-success', warning: 'stroke-warning', danger: 'stroke-destructive', info: 'stroke-primary' }[tone]
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} className="stroke-muted" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - pct / 100)} className={colour} />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-xl leading-6 font-bold text-foreground tabular-nums">{pct}%</span>
      </span>
    </div>
  )
}

export type RecordMeta = { icon: LucideIcon; label: string }

export function RecordHeader({ title, media, chips, meta, actions, back }: { title: string; media?: ReactNode; chips?: ReactNode; meta?: RecordMeta[]; actions?: ReactNode; back?: { href: string; label: string } }) {
  return (
    <header className="flex flex-col gap-3">
      {back ? (
        <Link href={back.href} className="-ml-1 flex w-fit items-center gap-1.5 rounded-md px-1 py-0.5 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {media ? <span className="shrink-0">{media}</span> : null}
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-[26px] leading-8 font-semibold tracking-tight text-foreground">{title}</h1>
              {chips}
            </div>
            {meta?.length ? (
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {meta.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="inline-flex items-center gap-1.5">
                      <Icon className="size-4" aria-hidden="true" />
                      {item.label}
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}

export function Monogram({ name, size = 'md', className }: { name: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
  const sizes = { sm: 'size-8 text-xs rounded-lg', md: 'size-10 text-sm rounded-lg', lg: 'size-16 text-xl rounded-2xl' }
  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center bg-primary/10 font-heading font-bold text-primary', sizes[size], className)} aria-hidden="true">
      {initials}
    </span>
  )
}

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

export function stopRowClick(event: { stopPropagation: () => void }) {
  event.stopPropagation()
}
