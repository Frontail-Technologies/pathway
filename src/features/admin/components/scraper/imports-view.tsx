'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Upload } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { entityLabel, listBatches, listSources, type ImportBatch } from '@/features/admin/data/admin-ingestion-api'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { queryKeys } from '@/lib/query-client'
import { AdminDataTable } from '../admin-data-table'
import { AdminTableSkeleton } from '../admin-skeletons'
import { formatRelative } from '../demo/relative-time'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CountBadge, stopRowClick, Tag } from '../kit'
import { LoadErrorPanel, useIngestionRole } from './shared'

const DEFAULT_FILTERS = { state: 'waiting', source: 'all', type: 'all' }

export const waiting = (batch: ImportBatch) => batch.counts.pending + batch.counts.invalid > 0
const reviewed = (batch: ImportBatch) => batch.counts.approved + batch.counts.corrected + batch.counts.rejected

export function ImportsView() {
  const router = useRouter()
  const { ready } = useIngestionRole()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)
  const filter = { sourceId: f.source === 'all' ? undefined : f.source, limit: 300 }
  const batches = useQuery({ queryKey: queryKeys.ingestionBatches(filter), queryFn: () => listBatches(filter), enabled: ready })
  const sources = useQuery({ queryKey: queryKeys.ingestionSources, queryFn: listSources, enabled: ready })
  const rows = React.useMemo(() => batches.data ?? [], [batches.data])

  const types = React.useMemo(() => [...new Set(rows.map((batch) => batch.entityType))].sort(), [rows])
  const waitingCount = rows.filter(waiting).length

  const filtered = React.useMemo(
    () =>
      rows.filter((batch) => {
        if (f.state === 'waiting' && !waiting(batch)) return false
        if (f.state === 'done' && waiting(batch)) return false
        if (f.type !== 'all' && batch.entityType !== f.type) return false
        return true
      }),
    [rows, f],
  )

  const columns = React.useMemo<ColumnDef<ImportBatch>[]>(
    () => [
      {
        id: 'batch',
        header: 'Batch',
        cell: ({ row }) => (
          <div className="min-w-[220px]">
            <Link href={`/admin/scraper/imports/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.source.name}
            </Link>
            <p className="truncate text-[13px] text-muted-foreground">{row.original.label}</p>
          </div>
        ),
      },
      {
        accessorKey: 'entityType',
        header: 'Records',
        cell: ({ row }) => <Tag>{entityLabel(row.original.entityType)}</Tag>,
      },
      {
        id: 'pending',
        header: 'Pending',
        cell: ({ row }) => (row.original.counts.pending ? <CountBadge count={row.original.counts.pending} tone="warning" /> : <span className="text-muted-foreground">—</span>),
      },
      {
        id: 'invalid',
        header: 'Need fixing',
        cell: ({ row }) => (row.original.counts.invalid ? <CountBadge count={row.original.counts.invalid} tone="danger" /> : <span className="text-muted-foreground">—</span>),
      },
      {
        id: 'changes',
        header: 'New · updates',
        cell: ({ row }) => (
          <span className="whitespace-nowrap tabular-nums">
            {row.original.toCreate.toLocaleString('en-IN')} · {row.original.toUpdate.toLocaleString('en-IN')}
          </span>
        ),
      },
      {
        id: 'reviewed',
        header: 'Reviewed',
        cell: ({ row }) => <span className="tabular-nums">{reviewed(row.original).toLocaleString('en-IN')}</span>,
      },
      {
        accessorKey: 'createdAt',
        header: 'Staged',
        cell: ({ row }) => <span className="whitespace-nowrap">{formatRelative(row.original.createdAt)}</span>,
      },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Data imports"
        title="Review"
        count={batches.data ? `${waitingCount} batch${waitingCount === 1 ? '' : 'es'} waiting` : undefined}
        actions={
          <Button variant="outline" size="sm" className="gap-1.5" render={<Link href="/admin/scraper/bulk-import" />}>
            <Upload className="size-4" aria-hidden="true" />
            Upload
          </Button>
        }
      />
      {batches.isLoading || !ready ? (
        <AdminTableSkeleton rows={6} columns={7} />
      ) : batches.isError ? (
        <LoadErrorPanel title="Could not load batches" error={batches.error} onRetry={() => void batches.refetch()} />
      ) : (
        <AdminDataTable
          tabs={{
            value: f.state,
            onChange: (value) => set({ state: value }),
            total: rows.length,
            options: [
              { value: 'waiting', label: 'Waiting', count: waitingCount },
              { value: 'done', label: 'Done', count: rows.length - waitingCount },
            ],
          }}
          toolbar={
            <AdminToolbar hasActiveFilters={active} onReset={reset} resultCount={filtered.length}>
              <AdminFilterSelect label="Source" value={f.source} onChange={(source) => set({ source })} options={(sources.data ?? []).map((source) => ({ value: source.id, label: source.name }))} />
              <AdminFilterSelect label="Records" value={f.type} onChange={(type) => set({ type })} options={types.map((value) => ({ value, label: entityLabel(value) }))} />
            </AdminToolbar>
          }
          columns={columns}
          data={filtered}
          getRowId={(row) => row.id}
          onRowClick={(row) => router.push(`/admin/scraper/imports/${row.id}`)}
          getRowAriaLabel={(row) => `Review ${row.label}`}
          hasActiveFilters={active}
          onResetFilters={reset}
          emptyTitle={f.state === 'waiting' ? 'Nothing waiting for review' : 'No batches'}
          emptyDescription={f.state === 'waiting' ? 'New batches appear here after a run or an upload.' : 'Try a different source or record type.'}
          mobileCardRender={(row) => {
            const batch = row.original
            return (
              <Link href={`/admin/scraper/imports/${batch.id}`} className="block rounded-xl border border-border bg-card p-4 shadow-sm">
                <p className="truncate font-medium text-foreground">{batch.source.name}</p>
                <p className="truncate text-[13px] text-muted-foreground">
                  {entityLabel(batch.entityType)} · {formatRelative(batch.createdAt)}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[13px]">
                  {batch.counts.pending ? <span className="font-medium text-warning">{batch.counts.pending.toLocaleString('en-IN')} pending</span> : null}
                  {batch.counts.invalid ? <span className="font-medium text-destructive">{batch.counts.invalid.toLocaleString('en-IN')} need fixing</span> : null}
                  {!waiting(batch) ? <span className="text-muted-foreground">All reviewed</span> : null}
                </div>
              </Link>
            )
          }}
        />
      )}
    </div>
  )
}
