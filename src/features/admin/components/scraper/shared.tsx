'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { fieldLabel, statLabels, type CrawlJob, type FieldDiff } from '@/features/admin/data/admin-ingestion-api'
import { cn } from '@/lib/utils'
import { AdminEmptyState } from '../admin-empty-state'
import { StatusBadge, type StatusTone } from '../kit'

export const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : error instanceof Error ? error.message : fallback)

export function useIngestionRole() {
  const { hydrated, session } = useAdminSession()
  return { ready: hydrated && Boolean(session), isAdmin: session?.role === 'admin' }
}

export function LoadErrorPanel({ title, error, onRetry }: { title: string; error: unknown; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <AdminEmptyState
        art="loadError"
        title={title}
        description={messageOf(error, 'Please try again.')}
        action={
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        }
        className="py-14"
      />
    </div>
  )
}

const isLink = (value: unknown): value is string => typeof value === 'string' && /^https?:\/\//.test(value)

function itemTitle(item: Record<string, unknown>) {
  const title = item.title ?? item.label ?? item.name
  return typeof title === 'string' ? title : null
}

function itemLink(item: Record<string, unknown>) {
  const link = item.url ?? item.sourceUrl
  return isLink(link) ? link : null
}

export function ValueView({ value, className }: { value: unknown; className?: string }) {
  if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) return <span className={cn('text-muted-foreground', className)}>—</span>
  if (typeof value === 'boolean') return <span className={className}>{value ? 'Yes' : 'No'}</span>
  if (typeof value === 'number') return <span className={cn('tabular-nums', className)}>{value}</span>
  if (typeof value === 'string')
    return isLink(value) ? (
      <a href={value} target="_blank" rel="noreferrer" className={cn('break-all text-primary hover:underline', className)}>
        {value}
      </a>
    ) : (
      <span className={cn('break-words whitespace-pre-wrap', className)}>{value}</span>
    )
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item !== 'object' || item === null)) return <span className={cn('break-words', className)}>{value.join(', ')}</span>
    if (value.every((item) => item && typeof item === 'object' && itemTitle(item as Record<string, unknown>)))
      return (
        <ul className={cn('space-y-1', className)}>
          {value.map((item, index) => {
            const record = item as Record<string, unknown>
            const link = itemLink(record)
            const extra = [record.docType, record.academicSession, record.value].filter((part) => typeof part === 'string' && part).join(' · ')
            return (
              <li key={index} className="leading-snug">
                {link ? (
                  <a href={link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    {itemTitle(record)}
                  </a>
                ) : (
                  itemTitle(record)
                )}
                {extra ? <span className="text-muted-foreground"> · {extra}</span> : null}
              </li>
            )
          })}
        </ul>
      )
  }
  if (typeof value === 'object' && !Array.isArray(value) && Object.values(value as object).every((item) => item === null || typeof item !== 'object'))
    return (
      <dl className={cn('space-y-0.5', className)}>
        {Object.entries(value as Record<string, unknown>).map(([key, item]) => (
          <div key={key} className="flex gap-1.5">
            <dt className="text-muted-foreground">{fieldLabel(key)}:</dt>
            <dd className="min-w-0 break-words">{item === null || item === undefined || item === '' ? '—' : String(item)}</dd>
          </div>
        ))}
      </dl>
    )
  return <pre className={cn('max-h-48 overflow-auto rounded-md bg-muted/50 p-2 font-mono text-[12px] leading-relaxed whitespace-pre-wrap', className)}>{JSON.stringify(value, null, 2)}</pre>
}

function diffState(row: FieldDiff, create: boolean): { label: string; tone: StatusTone } {
  if (create) return { label: 'New', tone: 'info' }
  if (!row.changed) return { label: 'Same', tone: 'neutral' }
  if (row.overridden) return { label: 'Edited by staff', tone: 'warning' }
  if (!row.ingestible) return { label: 'Not imported', tone: 'neutral' }
  return { label: 'Will update', tone: 'success' }
}

export function DiffRows({
  fields,
  create,
  selected,
  onToggle,
  productionLabel = 'Current',
  stagedLabel = 'From source',
}: {
  fields: FieldDiff[]
  create: boolean
  selected?: Set<string>
  onToggle?: (field: string) => void
  productionLabel?: string
  stagedLabel?: string
}) {
  const selectable = Boolean(selected && onToggle) && !create
  return (
    <div className="divide-y divide-border rounded-lg border border-border">
      <div className="hidden grid-cols-[minmax(140px,1fr)_minmax(0,2fr)_minmax(0,2fr)] gap-4 bg-muted/40 px-4 py-2 text-xs font-semibold text-muted-foreground md:grid">
        <span>Field</span>
        {create ? null : <span>{productionLabel}</span>}
        <span className={create ? 'md:col-span-2' : undefined}>{stagedLabel}</span>
      </div>
      {fields.map((row) => {
        const state = diffState(row, create)
        const checkable = selectable && row.willApply
        return (
          <div key={row.field} className={cn('grid gap-2 px-4 py-3 text-sm md:grid-cols-[minmax(140px,1fr)_minmax(0,2fr)_minmax(0,2fr)] md:gap-4', !create && !row.changed && 'text-muted-foreground')}>
            <div className="flex flex-wrap items-center gap-2">
              {checkable ? (
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={selected!.has(row.field)}
                  onChange={() => onToggle!(row.field)}
                  aria-label={`Apply ${fieldLabel(row.field)}`}
                />
              ) : null}
              <span className="font-medium text-foreground">{fieldLabel(row.field)}</span>
              <StatusBadge tone={state.tone}>{state.label}</StatusBadge>
            </div>
            {create ? null : (
              <div className="min-w-0">
                <p className="mb-0.5 text-xs text-muted-foreground md:hidden">{productionLabel}</p>
                <ValueView value={row.production} />
              </div>
            )}
            <div className={cn('min-w-0', create && 'md:col-span-2')}>
              {create ? null : <p className="mb-0.5 text-xs text-muted-foreground md:hidden">{stagedLabel}</p>}
              <ValueView value={row.staged} className={!create && row.changed ? 'text-foreground' : undefined} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function JobStats({ stats, className }: { stats: Record<string, number>; className?: string }) {
  const entries = Object.entries(stats).filter(([, value]) => value > 0)
  if (!entries.length) return <span className={cn('text-muted-foreground', className)}>—</span>
  return (
    <span className={cn('flex flex-wrap gap-x-3 gap-y-0.5 text-[13px]', className)}>
      {entries.map(([key, value]) => (
        <span key={key} className="whitespace-nowrap">
          <span className="font-semibold text-foreground tabular-nums">{value.toLocaleString('en-IN')}</span> <span className="text-muted-foreground">{(statLabels[key] ?? fieldLabel(key)).toLowerCase()}</span>
        </span>
      ))}
    </span>
  )
}

export function LogList({ lines }: { lines: string[] }) {
  if (!lines.length) return <p className="text-sm text-muted-foreground">No log lines yet.</p>
  return (
    <ol className="max-h-[420px] overflow-auto rounded-lg bg-slate-950 p-4 font-mono text-[12px] leading-relaxed text-slate-100">
      {lines.map((line, index) => (
        <li key={index} className="break-words whitespace-pre-wrap">
          {line}
        </li>
      ))}
    </ol>
  )
}

export function SourceLink({ source }: { source: CrawlJob['source'] }) {
  return (
    <Link href={`/admin/scraper/sources/${source.id}`} className="font-medium text-foreground hover:text-primary hover:underline">
      {source.name}
    </Link>
  )
}

export function ExternalSourceLink({ href }: { href: string | null }) {
  if (!href) return <span className="text-muted-foreground">—</span>
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 break-all text-primary hover:underline">
      {href.replace(/^https?:\/\//, '')}
      <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
    </a>
  )
}
