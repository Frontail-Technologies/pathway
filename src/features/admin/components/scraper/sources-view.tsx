'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  entityLabel,
  fetchModeLabels,
  kindLabels,
  listSources,
  SOURCE_KINDS,
  sourceStatusLabels,
  sourceStatusTone,
  type IngestionSource,
  type SourceStatus,
} from '@/features/admin/data/admin-ingestion-api'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { queryKeys } from '@/lib/query-client'
import { AdminDataTable } from '../admin-data-table'
import { AdminTableSkeleton } from '../admin-skeletons'
import { formatRelative } from '../demo/relative-time'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CountBadge, StatusBadge, stopRowClick, Tag } from '../kit'
import { LoadErrorPanel, useIngestionRole } from './shared'
import { SourceEditorDialog } from './source-editor-dialog'

const DEFAULT_FILTERS = { q: '', status: 'all', kind: 'all' }

export function lastRunText(source: IngestionSource) {
  if (!source.health.lastRunAt) return 'Never run'
  return formatRelative(source.health.lastRunAt)
}

export function SourcesView() {
  const router = useRouter()
  const { ready, isAdmin } = useIngestionRole()
  const [creating, setCreating] = React.useState(false)
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)
  const query = useQuery({ queryKey: queryKeys.ingestionSources, queryFn: listSources, enabled: ready })
  const sources = React.useMemo(() => query.data ?? [], [query.data])

  const counts = React.useMemo(() => {
    const result: Record<SourceStatus, number> = { active: 0, paused: 0, broken: 0 }
    for (const source of sources) result[source.status] += 1
    return result
  }, [sources])

  const filtered = React.useMemo(() => {
    const needle = f.q.trim().toLowerCase()
    return sources.filter((source) => {
      if (needle && !`${source.name} ${source.slug} ${source.baseUrl ?? ''}`.toLowerCase().includes(needle)) return false
      if (f.status !== 'all' && source.status !== f.status) return false
      if (f.kind !== 'all' && source.kind !== f.kind) return false
      return true
    })
  }, [sources, f])

  const columns = React.useMemo<ColumnDef<IngestionSource>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Source',
        cell: ({ row }) => (
          <div className="min-w-[220px]">
            <Link href={`/admin/scraper/sources/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.name}
            </Link>
            <p className="truncate text-[13px] text-muted-foreground">{kindLabels[row.original.kind]}</p>
          </div>
        ),
      },
      {
        id: 'types',
        header: 'Records',
        cell: ({ row }) => (
          <div className="flex max-w-[220px] flex-wrap gap-1">
            {row.original.entityTypes.map((type) => (
              <Tag key={type}>{entityLabel(type)}</Tag>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'fetchMode',
        header: 'Mode',
        cell: ({ row }) => (
          <div className="whitespace-nowrap">
            <p>{fetchModeLabels[row.original.fetchMode]}</p>
            {row.original.schedule ? <p className="font-mono text-[12px] text-muted-foreground">{row.original.schedule}</p> : null}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusBadge tone={sourceStatusTone[row.original.status]}>{sourceStatusLabels[row.original.status]}</StatusBadge>,
      },
      {
        id: 'lastRun',
        header: 'Last run',
        cell: ({ row }) => {
          const source = row.original
          const failed = source.health.lastFailureAt && source.health.lastFailureAt === source.health.lastRunAt
          return <span className={failed ? 'whitespace-nowrap text-destructive' : 'whitespace-nowrap'}>{lastRunText(source)}</span>
        },
      },
      {
        accessorKey: 'pendingReview',
        header: 'To review',
        cell: ({ row }) => (row.original.pendingReview ? <CountBadge count={row.original.pendingReview} tone="warning" /> : <span className="text-muted-foreground">—</span>),
      },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Data imports"
        title="Sources"
        count={query.data ? `${sources.length} source${sources.length === 1 ? '' : 's'}` : undefined}
        actions={
          isAdmin ? (
            <Button type="button" size="sm" className="gap-1.5" onClick={() => setCreating(true)}>
              <Plus className="size-4" aria-hidden="true" />
              Add source
            </Button>
          ) : null
        }
      />

      {query.isLoading || !ready ? (
        <AdminTableSkeleton rows={5} columns={6} />
      ) : query.isError ? (
        <LoadErrorPanel title="Could not load sources" error={query.error} onRetry={() => void query.refetch()} />
      ) : (
        <AdminDataTable
          tabs={{
            value: f.status,
            onChange: (value) => set({ status: value }),
            total: sources.length,
            options: [
              { value: 'active', label: 'Active', count: counts.active },
              { value: 'broken', label: 'Failing', count: counts.broken },
              { value: 'paused', label: 'Paused', count: counts.paused },
            ],
          }}
          toolbar={
            <AdminToolbar search={f.q} onSearchChange={(q) => set({ q })} searchPlaceholder="Search sources" hasActiveFilters={active} onReset={reset} resultCount={filtered.length}>
              <AdminFilterSelect label="Kind" value={f.kind} onChange={(kind) => set({ kind })} options={SOURCE_KINDS.map((value) => ({ value, label: kindLabels[value] }))} />
            </AdminToolbar>
          }
          columns={columns}
          data={filtered}
          getRowId={(row) => row.id}
          onRowClick={(row) => router.push(`/admin/scraper/sources/${row.id}`)}
          getRowAriaLabel={(row) => `Open ${row.name}`}
          hasActiveFilters={active}
          onResetFilters={reset}
          emptyTitle="No sources match"
          emptyDescription="Try a different search or status."
          mobileCardRender={(row) => {
            const source = row.original
            return (
              <Link href={`/admin/scraper/sources/${source.id}`} className="block rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{source.name}</p>
                    <p className="text-[13px] text-muted-foreground">
                      {fetchModeLabels[source.fetchMode]} · {lastRunText(source)}
                    </p>
                  </div>
                  <StatusBadge tone={sourceStatusTone[source.status]}>{sourceStatusLabels[source.status]}</StatusBadge>
                </div>
                {source.pendingReview ? <p className="mt-2 text-[13px] font-medium text-warning">{source.pendingReview.toLocaleString('en-IN')} to review</p> : null}
              </Link>
            )
          }}
        />
      )}

      <SourceEditorDialog open={creating} onOpenChange={setCreating} source={null} />
    </div>
  )
}
