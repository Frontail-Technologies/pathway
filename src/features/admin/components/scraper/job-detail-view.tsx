'use client'

import Link from 'next/link'
import { Clock, Timer, Zap } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { duration, getJob, isOpenJob, jobStatusLabels, jobStatusTone, listBatches, statLabels, triggerLabels, fieldLabel } from '@/features/admin/data/admin-ingestion-api'
import { formatDateTime } from '@/features/admin/data/admin-team-api'
import { queryKeys } from '@/lib/query-client'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminPanelSkeleton } from '../admin-skeletons'
import { AdminPageHeader, FactList, Panel, RecordHeader, StatusBadge } from '../kit'
import { BatchList } from './run-lists'
import { LogList, messageOf, useIngestionRole } from './shared'

const back = { href: '/admin/scraper/jobs', label: 'Runs' }

export function JobDetailView({ jobId }: { jobId: string }) {
  const { ready } = useIngestionRole()
  const job = useQuery({
    queryKey: queryKeys.ingestionJob(jobId),
    queryFn: () => getJob(jobId),
    enabled: ready,
    refetchInterval: (q) => (q.state.data && isOpenJob(q.state.data) ? 3000 : false),
  })
  const sourceId = job.data?.source.id
  const batchesFilter = { sourceId, limit: 50 }
  const batches = useQuery({
    queryKey: queryKeys.ingestionBatches(batchesFilter),
    queryFn: () => listBatches(batchesFilter),
    enabled: ready && Boolean(sourceId) && Boolean(job.data && !isOpenJob(job.data)),
    select: (rows) => rows.filter((batch) => batch.jobId === jobId),
  })

  if (!job.data) {
    const missing = job.error instanceof ApiRequestError && job.error.status === 404
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Run" back={back} />
        {job.isError ? (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <AdminEmptyState
              art={missing ? 'notFound' : 'loadError'}
              title={missing ? 'Run not found' : 'Could not load this run'}
              description={messageOf(job.error, 'Please try again.')}
              action={
                <Button variant="outline" onClick={() => void job.refetch()}>
                  Try again
                </Button>
              }
              className="py-14"
            />
          </div>
        ) : (
          <AdminPanelSkeleton lines={6} />
        )}
      </div>
    )
  }

  const item = job.data
  const stats = Object.entries(item.stats)

  return (
    <div className="space-y-5">
      <RecordHeader
        title={`${item.source.name} run`}
        back={back}
        chips={
          <>
            <StatusBadge tone={jobStatusTone[item.status]}>{jobStatusLabels[item.status]}</StatusBadge>
            <StatusBadge tone="neutral">{triggerLabels[item.trigger]}</StatusBadge>
          </>
        }
        meta={[
          { icon: Clock, label: formatDateTime(item.startedAt ?? item.createdAt) },
          { icon: Timer, label: duration(item) ?? 'Waiting for the worker' },
          { icon: Zap, label: item.trigger === 'schedule' ? 'Started by the schedule' : item.trigger === 'import' ? 'Started by a file upload' : 'Started by hand' },
        ]}
        actions={
          <Button variant="outline" size="sm" render={<Link href={`/admin/scraper/sources/${item.source.id}`} />}>
            Open source
          </Button>
        }
      />

      {item.error ? <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{item.error}</div> : null}

      {stats.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(([key, value]) => (
            <div key={key} className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground">{statLabels[key] ?? fieldLabel(key)}</p>
              <p className="text-xl font-semibold text-foreground tabular-nums">{value.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Log">
            <LogList lines={item.logLines} />
          </Panel>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Staged from this run">
            {isOpenJob(item) ? (
              <p className="text-sm text-muted-foreground">Still running.</p>
            ) : batches.isLoading ? (
              <AdminPanelSkeleton lines={2} className="border-0 p-0 shadow-none" />
            ) : (
              <BatchList batches={batches.data ?? []} showSource={false} emptyText="Nothing new to review." />
            )}
          </Panel>
          <Panel title="Run">
            <FactList
              columns={1}
              items={[
                { label: 'Queued', value: formatDateTime(item.createdAt) },
                { label: 'Started', value: formatDateTime(item.startedAt) },
                { label: 'Finished', value: formatDateTime(item.finishedAt) },
                { label: 'Queue job', value: item.queueJobId ? <span className="font-mono text-[12px] break-all">{item.queueJobId}</span> : '—' },
              ]}
            />
          </Panel>
        </div>
      </div>
    </div>
  )
}
