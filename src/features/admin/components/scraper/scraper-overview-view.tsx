'use client'

import Link from 'next/link'
import { AlertTriangle, ClipboardCheck, DatabaseZap, GitCompare, Wrench } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { fetchModeLabels, isOpenJob, listBatches, listConflicts, listJobs, listSources, sourceStatusLabels, sourceStatusTone } from '@/features/admin/data/admin-ingestion-api'
import { queryKeys } from '@/lib/query-client'
import { AdminPanelSkeleton, AdminStatSkeleton } from '../admin-skeletons'
import { AdminPageHeader, CountBadge, Panel, StatGrid, StatTile, StatusBadge } from '../kit'
import { waiting } from './imports-view'
import { BatchList, RunList } from './run-lists'
import { LoadErrorPanel, useIngestionRole } from './shared'
import { lastRunText } from './sources-view'

export function ScraperOverviewView() {
  const { ready } = useIngestionRole()
  const sources = useQuery({ queryKey: queryKeys.ingestionSources, queryFn: listSources, enabled: ready })
  const batchesFilter = { limit: 300 }
  const batches = useQuery({ queryKey: queryKeys.ingestionBatches(batchesFilter), queryFn: () => listBatches(batchesFilter), enabled: ready })
  const jobsFilter = { limit: 8 }
  const jobs = useQuery({
    queryKey: queryKeys.ingestionJobs(jobsFilter),
    queryFn: () => listJobs(jobsFilter),
    enabled: ready,
    refetchInterval: (q) => (q.state.data?.some(isOpenJob) ? 4000 : false),
  })
  const conflicts = useQuery({ queryKey: queryKeys.ingestionConflicts('open'), queryFn: () => listConflicts('open'), enabled: ready })

  const list = sources.data ?? []
  const pending = list.reduce((sum, source) => sum + source.pendingReview, 0)
  const invalid = (batches.data ?? []).reduce((sum, batch) => sum + batch.counts.invalid, 0)
  const failing = list.filter((source) => source.status === 'broken')
  const attention = list.filter((source) => source.status === 'broken' || source.pendingReview > 0).sort((a, b) => Number(b.status === 'broken') - Number(a.status === 'broken') || b.pendingReview - a.pendingReview)
  const waitingBatches = (batches.data ?? []).filter(waiting).slice(0, 6)
  const loading = !ready || sources.isLoading || batches.isLoading

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Data imports"
        title="Overview"
        actions={
          <Button size="sm" render={<Link href="/admin/scraper/imports" />}>
            Review records
          </Button>
        }
      />

      {loading ? (
        <AdminStatSkeleton count={4} />
      ) : sources.isError ? (
        <LoadErrorPanel title="Could not load data imports" error={sources.error} onRetry={() => void sources.refetch()} />
      ) : (
        <StatGrid>
          <StatTile label="Active sources" value={list.filter((source) => source.status === 'active').length} icon={DatabaseZap} href="/admin/scraper/sources" />
          <StatTile label="Waiting for review" value={pending.toLocaleString('en-IN')} icon={ClipboardCheck} tone="warning" href="/admin/scraper/imports" />
          <StatTile label="Need fixing" value={invalid.toLocaleString('en-IN')} icon={Wrench} tone="danger" href="/admin/scraper/imports" />
          <StatTile label="Open conflicts" value={conflicts.data?.length ?? '—'} icon={GitCompare} tone="info" href="/admin/scraper/conflicts" />
        </StatGrid>
      )}

      {failing.length ? (
        <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>
            {failing.length === 1 ? `${failing[0]!.name} is failing` : `${failing.length} sources are failing`}. Check the last run log.
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          title="Sources"
          action={
            <Link href="/admin/scraper/sources" className="text-sm font-medium text-primary hover:underline">
              All sources
            </Link>
          }
        >
          {loading ? (
            <AdminPanelSkeleton lines={4} className="border-0 p-0 shadow-none" />
          ) : (
            <ul className="-my-1 divide-y divide-border">
              {(attention.length ? attention : list).slice(0, 8).map((source) => (
                <li key={source.id}>
                  <Link href={`/admin/scraper/sources/${source.id}`} className="group flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">{source.name}</p>
                      <p className="truncate text-[13px] text-muted-foreground">
                        {fetchModeLabels[source.fetchMode]} · {lastRunText(source)}
                      </p>
                    </div>
                    {source.pendingReview ? <CountBadge count={source.pendingReview} tone="warning" /> : null}
                    <StatusBadge tone={sourceStatusTone[source.status]}>{sourceStatusLabels[source.status]}</StatusBadge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel
          title="Waiting for review"
          action={
            <Link href="/admin/scraper/imports" className="text-sm font-medium text-primary hover:underline">
              All batches
            </Link>
          }
        >
          {loading ? <AdminPanelSkeleton lines={4} className="border-0 p-0 shadow-none" /> : <BatchList batches={waitingBatches} emptyText="Nothing waiting." />}
        </Panel>
      </div>

      <Panel
        title="Recent runs"
        action={
          <Link href="/admin/scraper/jobs" className="text-sm font-medium text-primary hover:underline">
            All runs
          </Link>
        }
      >
        {jobs.isLoading ? <AdminPanelSkeleton lines={4} className="border-0 p-0 shadow-none" /> : <RunList jobs={jobs.data ?? []} />}
      </Panel>
    </div>
  )
}
