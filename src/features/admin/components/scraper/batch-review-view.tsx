'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { CheckCheck, Clock, Database } from 'lucide-react'
import { toast } from 'sonner'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import {
  approveStagedMany,
  entityLabel,
  getBatch,
  listStaged,
  matchLabels,
  stagedStatusLabels,
  stagedStatusTone,
  STAGED_STATUSES,
  type StagedSummary,
} from '@/features/admin/data/admin-ingestion-api'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { queryKeys } from '@/lib/query-client'
import { AdminDataTable } from '../admin-data-table'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminPanelSkeleton, AdminTableSkeleton } from '../admin-skeletons'
import { formatRelative } from '../demo/relative-time'
import { AdminPageHeader, AdminToolbar, RecordHeader, StatusBadge, stopRowClick, Tag } from '../kit'
import { LoadErrorPanel, messageOf, useIngestionRole } from './shared'

const PAGE = 100
const DEFAULT_FILTERS = { status: 'pending', q: '' }
const back = { href: '/admin/scraper/imports', label: 'Review' }

export function matchText(row: Pick<StagedSummary, 'action' | 'matchMethod' | 'matchConfidence'>) {
  if (row.action === 'create') return 'New record'
  const confidence = row.matchConfidence !== null && row.matchConfidence < 1 ? ` · ${Math.round(row.matchConfidence * 100)}%` : ''
  return `${matchLabels[row.matchMethod]}${confidence}`
}

function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export function BatchReviewView({ batchId }: { batchId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { ready } = useIngestionRole()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)
  const q = useDebounced(f.q.trim())

  const batch = useQuery({ queryKey: queryKeys.ingestionBatch(batchId), queryFn: () => getBatch(batchId), enabled: ready })
  const filter = { batchId, status: f.status === 'all' ? undefined : (f.status as StagedSummary['status']), q: q || undefined }
  const staged = useInfiniteQuery({
    queryKey: queryKeys.ingestionStaged(filter),
    queryFn: ({ pageParam }) => listStaged({ ...filter, limit: PAGE, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (last, pages) => (last.length === PAGE ? pages.length * PAGE : undefined),
    enabled: ready,
  })
  const rows = React.useMemo(() => staged.data?.pages.flat() ?? [], [staged.data])

  const approve = useMutation({
    mutationFn: (ids: string[]) => approveStagedMany(ids),
    onSuccess: (results) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.ingestion })
      const failed = results.filter((result) => !result.ok)
      if (!failed.length) toast.success(`${results.length} record${results.length === 1 ? '' : 's'} approved`)
      else toast.warning(`${results.length - failed.length} approved, ${failed.length} not: ${failed[0]?.error ?? 'check each record'}`)
    },
    onError: (error) => toast.error(messageOf(error, 'Approval did not go through. Please try again.')),
  })

  const columns = React.useMemo<ColumnDef<StagedSummary>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Record',
        cell: ({ row }) => (
          <div className="min-w-[240px]">
            <Link href={`/admin/scraper/records/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.title}
            </Link>
            <p className="truncate font-mono text-[12px] text-muted-foreground">{row.original.externalKey}</p>
          </div>
        ),
      },
      {
        id: 'match',
        header: 'Match',
        cell: ({ row }) => <span className={row.original.action === 'create' ? 'whitespace-nowrap text-primary' : 'whitespace-nowrap'}>{matchText(row.original)}</span>,
      },
      {
        accessorKey: 'errorCount',
        header: 'Problems',
        cell: ({ row }) => (row.original.errorCount ? <span className="font-medium text-destructive tabular-nums">{row.original.errorCount}</span> : <span className="text-muted-foreground">—</span>),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusBadge tone={stagedStatusTone[row.original.status]}>{stagedStatusLabels[row.original.status]}</StatusBadge>,
      },
    ],
    [],
  )

  if (!batch.data) {
    const missing = batch.error instanceof ApiRequestError && batch.error.status === 404
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Batch" back={back} />
        {batch.isError ? (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <AdminEmptyState art={missing ? 'notFound' : 'loadError'} title={missing ? 'Batch not found' : 'Could not load this batch'} description={messageOf(batch.error, 'Please try again.')} className="py-14" />
          </div>
        ) : (
          <AdminPanelSkeleton lines={4} />
        )}
      </div>
    )
  }

  const item = batch.data
  const total = Object.values(item.counts).reduce((sum, value) => sum + value, 0)
  const tabs = STAGED_STATUSES.filter((status) => status === 'pending' || status === 'invalid' || item.counts[status] > 0)

  return (
    <div className="space-y-5">
      <RecordHeader
        title={item.label}
        back={back}
        chips={
          <>
            <Tag>{entityLabel(item.entityType)}</Tag>
            {item.counts.pending ? <StatusBadge tone="warning">{item.counts.pending.toLocaleString('en-IN')} pending</StatusBadge> : null}
            {item.counts.invalid ? <StatusBadge tone="danger">{item.counts.invalid.toLocaleString('en-IN')} need fixing</StatusBadge> : null}
          </>
        }
        meta={[
          { icon: Database, label: item.source.name },
          { icon: Clock, label: `Staged ${formatRelative(item.createdAt)}` },
        ]}
        actions={
          <Button variant="outline" size="sm" render={<Link href={`/admin/scraper/sources/${item.source.id}`} />}>
            Open source
          </Button>
        }
      />

      {staged.isLoading ? (
        <AdminTableSkeleton rows={8} columns={4} />
      ) : staged.isError ? (
        <LoadErrorPanel title="Could not load records" error={staged.error} onRetry={() => void staged.refetch()} />
      ) : (
        <>
          <AdminDataTable
            tabs={{
              value: f.status,
              onChange: (value) => set({ status: value }),
              total,
              options: tabs.map((status) => ({ value: status, label: stagedStatusLabels[status], count: item.counts[status] })),
            }}
            toolbar={<AdminToolbar search={f.q} onSearchChange={(value) => set({ q: value })} searchPlaceholder="Search name or key" hasActiveFilters={active} onReset={reset} resultCount={rows.length} />}
            columns={columns}
            data={rows}
            pageSize={50}
            getRowId={(row) => row.id}
            onRowClick={(row) => router.push(`/admin/scraper/records/${row.id}`)}
            getRowAriaLabel={(row) => `Open ${row.title}`}
            hasActiveFilters={active}
            onResetFilters={reset}
            emptyTitle={f.status === 'pending' ? 'Nothing pending in this batch' : 'No records match'}
            emptyDescription={f.status === 'pending' ? 'Check the other tabs for records that need fixing or were reviewed.' : 'Try a different search or status.'}
            selectable={f.status === 'pending'}
            bulkActions={(selected, clear) => (
              <Button
                size="sm"
                className="gap-1.5"
                disabled={approve.isPending}
                onClick={() =>
                  approve.mutate(
                    selected.filter((row) => row.status === 'pending').slice(0, 200).map((row) => row.id),
                    { onSuccess: clear },
                  )
                }
              >
                <CheckCheck className="size-4" aria-hidden="true" />
                Approve {Math.min(selected.length, 200)}
              </Button>
            )}
            mobileCardRender={(row) => {
              const record = row.original
              return (
                <Link href={`/admin/scraper/records/${record.id}`} className="block rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{record.title}</p>
                      <p className="text-[13px] text-muted-foreground">{matchText(record)}</p>
                    </div>
                    <StatusBadge tone={stagedStatusTone[record.status]}>{stagedStatusLabels[record.status]}</StatusBadge>
                  </div>
                  {record.errorCount ? <p className="mt-2 text-[13px] font-medium text-destructive">{record.errorCount} problem{record.errorCount === 1 ? '' : 's'}</p> : null}
                </Link>
              )
            }}
          />
          {staged.hasNextPage ? (
            <div className="flex justify-center">
              <Button variant="outline" size="sm" disabled={staged.isFetchingNextPage} onClick={() => void staged.fetchNextPage()}>
                {staged.isFetchingNextPage ? 'Loading…' : `Load ${PAGE} more`}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
