'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import {
  duration,
  isOpenJob,
  JOB_STATUSES,
  jobStatusLabels,
  jobStatusTone,
  listJobs,
  listSources,
  triggerLabels,
  type CrawlJob,
  type JobStatus,
} from '@/features/admin/data/admin-ingestion-api'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { queryKeys } from '@/lib/query-client'
import { AdminDataTable } from '../admin-data-table'
import { AdminTableSkeleton } from '../admin-skeletons'
import { formatRelative } from '../demo/relative-time'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, StatusBadge, stopRowClick } from '../kit'
import { JobStats, LoadErrorPanel, useIngestionRole } from './shared'

const DEFAULT_FILTERS = { status: 'all', source: 'all' }

export function JobsView() {
  const router = useRouter()
  const { ready } = useIngestionRole()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)
  const filter = { sourceId: f.source === 'all' ? undefined : f.source, limit: 200 }
  const jobs = useQuery({
    queryKey: queryKeys.ingestionJobs(filter),
    queryFn: () => listJobs(filter),
    enabled: ready,
    refetchInterval: (q) => (q.state.data?.some(isOpenJob) ? 4000 : false),
  })
  const sources = useQuery({ queryKey: queryKeys.ingestionSources, queryFn: listSources, enabled: ready })
  const rows = React.useMemo(() => jobs.data ?? [], [jobs.data])

  const counts = React.useMemo(() => {
    const result = Object.fromEntries(JOB_STATUSES.map((status) => [status, 0])) as Record<JobStatus, number>
    for (const job of rows) result[job.status] += 1
    return result
  }, [rows])

  const filtered = React.useMemo(() => (f.status === 'all' ? rows : rows.filter((job) => job.status === f.status)), [rows, f.status])

  const columns = React.useMemo<ColumnDef<CrawlJob>[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusBadge tone={jobStatusTone[row.original.status]}>{jobStatusLabels[row.original.status]}</StatusBadge>,
      },
      {
        id: 'source',
        header: 'Source',
        cell: ({ row }) => (
          <div className="min-w-[200px]">
            <Link href={`/admin/scraper/jobs/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.source.name}
            </Link>
            <p className="text-[13px] text-muted-foreground">{triggerLabels[row.original.trigger]}</p>
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Started',
        cell: ({ row }) => (
          <div className="whitespace-nowrap">
            <p>{formatRelative(row.original.startedAt ?? row.original.createdAt)}</p>
            <p className="text-[13px] text-muted-foreground">{duration(row.original) ?? 'Waiting'}</p>
          </div>
        ),
      },
      {
        id: 'result',
        header: 'Result',
        cell: ({ row }) => (row.original.error ? <p className="max-w-[360px] truncate text-[13px] text-destructive">{row.original.error}</p> : <JobStats stats={row.original.stats} />),
      },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader eyebrow="Data imports" title="Runs" count={jobs.data ? `${rows.length} recent` : undefined} />
      {jobs.isLoading || !ready ? (
        <AdminTableSkeleton rows={6} columns={4} />
      ) : jobs.isError ? (
        <LoadErrorPanel title="Could not load runs" error={jobs.error} onRetry={() => void jobs.refetch()} />
      ) : (
        <AdminDataTable
          tabs={{
            value: f.status,
            onChange: (value) => set({ status: value }),
            total: rows.length,
            options: (['running', 'queued', 'succeeded', 'failed'] as const).map((value) => ({ value, label: jobStatusLabels[value], count: counts[value] })),
          }}
          toolbar={
            <AdminToolbar hasActiveFilters={active} onReset={reset} resultCount={filtered.length}>
              <AdminFilterSelect label="Source" value={f.source} onChange={(source) => set({ source })} options={(sources.data ?? []).map((source) => ({ value: source.id, label: source.name }))} />
            </AdminToolbar>
          }
          columns={columns}
          data={filtered}
          getRowId={(row) => row.id}
          onRowClick={(row) => router.push(`/admin/scraper/jobs/${row.id}`)}
          getRowAriaLabel={(row) => `Open run of ${row.source.name}`}
          hasActiveFilters={active}
          onResetFilters={reset}
          emptyTitle="No runs"
          emptyDescription="Runs appear here when a source is fetched or a file is uploaded."
          mobileCardRender={(row) => {
            const job = row.original
            return (
              <Link href={`/admin/scraper/jobs/${job.id}`} className="block rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{job.source.name}</p>
                    <p className="text-[13px] text-muted-foreground">
                      {triggerLabels[job.trigger]} · {formatRelative(job.createdAt)}
                    </p>
                  </div>
                  <StatusBadge tone={jobStatusTone[job.status]}>{jobStatusLabels[job.status]}</StatusBadge>
                </div>
                <div className="mt-2">{job.error ? <p className="text-[13px] text-destructive">{job.error}</p> : <JobStats stats={job.stats} />}</div>
              </Link>
            )
          }}
        />
      )}
    </div>
  )
}
