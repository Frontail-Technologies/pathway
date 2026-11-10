'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CalendarClock, Clock, FileUp, Gauge, Pause, Pencil, Play, PlayCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import {
  entityLabel,
  fetchModeLabels,
  getSource,
  isOpenJob,
  kindLabels,
  listBatches,
  listJobs,
  pauseSource,
  resumeSource,
  runSource,
  sourceStatusLabels,
  sourceStatusTone,
} from '@/features/admin/data/admin-ingestion-api'
import { formatDateTime } from '@/features/admin/data/admin-team-api'
import { queryKeys } from '@/lib/query-client'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminPanelSkeleton } from '../admin-skeletons'
import { formatRelative } from '../demo/relative-time'
import { AdminPageHeader, FactList, Panel, RecordHeader, StatusBadge, Tag } from '../kit'
import { BatchList, RunList } from './run-lists'
import { ExternalSourceLink, messageOf, useIngestionRole, ValueView } from './shared'
import { SourceEditorDialog } from './source-editor-dialog'
import { runsLive, SourceFileDialog, takesFiles } from './source-file-dialog'

const back = { href: '/admin/scraper/sources', label: 'Sources' }

export function SourceDetailView({ sourceId }: { sourceId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { ready, isAdmin } = useIngestionRole()
  const [editing, setEditing] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)

  const source = useQuery({ queryKey: queryKeys.ingestionSource(sourceId), queryFn: () => getSource(sourceId), enabled: ready })
  const jobsFilter = { sourceId, limit: 10 }
  const jobs = useQuery({
    queryKey: queryKeys.ingestionJobs(jobsFilter),
    queryFn: () => listJobs(jobsFilter),
    enabled: ready,
    refetchInterval: (q) => (q.state.data?.some(isOpenJob) ? 4000 : false),
  })
  const batchesFilter = { sourceId, limit: 10 }
  const batches = useQuery({ queryKey: queryKeys.ingestionBatches(batchesFilter), queryFn: () => listBatches(batchesFilter), enabled: ready })

  const act = useMutation({
    mutationFn: async ({ run }: { run: () => Promise<unknown>; success: string; openJob?: boolean }) => run(),
    onSuccess: (result, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.ingestion })
      toast.success(variables.success)
      if (variables.openJob && result && typeof result === 'object' && 'id' in result) router.push(`/admin/scraper/jobs/${String(result.id)}`)
    },
    onError: (error) => toast.error(messageOf(error, 'That action did not go through. Please try again.')),
  })

  if (!source.data) {
    const missing = source.error instanceof ApiRequestError && source.error.status === 404
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Source" back={back} />
        {source.isError ? (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <AdminEmptyState
              art={missing ? 'notFound' : 'loadError'}
              title={missing ? 'Source not found' : 'Could not load this source'}
              description={messageOf(source.error, 'Please try again.')}
              action={
                <Button variant="outline" onClick={() => void source.refetch()}>
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

  const item = source.data
  const running = jobs.data?.some(isOpenJob) ?? false
  const busy = act.isPending
  const health = item.health

  return (
    <div className="space-y-5">
      <RecordHeader
        title={item.name}
        back={back}
        description={item.baseUrl ?? undefined}
        chips={
          <>
            <StatusBadge tone={sourceStatusTone[item.status]}>{sourceStatusLabels[item.status]}</StatusBadge>
            <Tag>{kindLabels[item.kind]}</Tag>
            <Tag>{fetchModeLabels[item.fetchMode]}</Tag>
            {running ? <StatusBadge tone="info">Running</StatusBadge> : null}
          </>
        }
        meta={[
          { icon: Clock, label: health.lastRunAt ? `Last run ${formatRelative(health.lastRunAt)}` : 'Never run' },
          { icon: CalendarClock, label: item.schedule ? `Schedule ${item.schedule}` : 'No schedule' },
          { icon: Gauge, label: `${item.rateLimitPerMinute} requests a minute` },
        ]}
        actions={
          <>
            {isAdmin && runsLive(item) ? (
              <Button size="sm" className="gap-1.5" disabled={busy || running} onClick={() => act.mutate({ run: () => runSource(item.id), success: 'Run queued', openJob: true })}>
                <PlayCircle className="size-4" aria-hidden="true" />
                Run now
              </Button>
            ) : null}
            {takesFiles(item) ? (
              <Button variant={runsLive(item) ? 'outline' : 'default'} size="sm" className="gap-1.5" onClick={() => setUploading(true)}>
                <FileUp className="size-4" aria-hidden="true" />
                Upload file
              </Button>
            ) : null}
            {isAdmin ? (
              item.status === 'paused' ? (
                <Button variant="outline" size="sm" className="gap-1.5" disabled={busy} onClick={() => act.mutate({ run: () => resumeSource(item.id), success: `${item.name} resumed` })}>
                  <Play className="size-4" aria-hidden="true" />
                  Resume
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="gap-1.5" disabled={busy} onClick={() => act.mutate({ run: () => pauseSource(item.id), success: `${item.name} paused` })}>
                  <Pause className="size-4" aria-hidden="true" />
                  Pause
                </Button>
              )
            ) : null}
            {isAdmin ? (
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setEditing(true)}>
                <Pencil className="size-4" aria-hidden="true" />
                Edit
              </Button>
            ) : null}
          </>
        }
      />

      {item.status === 'broken' && health.lastError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {health.consecutiveFailures} failed runs in a row. Last error: {health.lastError}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Recent runs">
            {jobs.isLoading ? <AdminPanelSkeleton lines={3} className="border-0 p-0 shadow-none" /> : <RunList jobs={jobs.data ?? []} showSource={false} />}
          </Panel>
          <Panel title="Staged batches" action={item.pendingReview ? <span className="text-sm text-muted-foreground tabular-nums">{item.pendingReview.toLocaleString('en-IN')} to review</span> : undefined}>
            {batches.isLoading ? <AdminPanelSkeleton lines={3} className="border-0 p-0 shadow-none" /> : <BatchList batches={batches.data ?? []} showSource={false} />}
          </Panel>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Health">
            <FactList
              columns={1}
              items={[
                { label: 'Last success', value: formatDateTime(health.lastSuccessAt) },
                { label: 'Last failure', value: formatDateTime(health.lastFailureAt) },
                { label: 'Failures in a row', value: health.consecutiveFailures },
                { label: 'Changed last run', value: health.changedLastRun ?? '—' },
                ...(health.lastError ? [{ label: 'Last error', value: <span className="text-destructive">{health.lastError}</span> }] : []),
              ]}
            />
          </Panel>
          <Panel title="Setup">
            <FactList
              columns={1}
              items={[
                { label: 'Records', value: item.entityTypes.map(entityLabel).join(', ') },
                { label: 'Adapter', value: <span className="font-mono text-[13px]">{item.adapter}</span> },
                { label: 'Website', value: <ExternalSourceLink href={item.baseUrl} /> },
                { label: 'Allowed paths', value: item.allowedPaths.length ? <span className="font-mono text-[12px] break-all">{item.allowedPaths.join(', ')}</span> : '—' },
                { label: 'Robots.txt', value: item.respectRobots ? 'Respected' : 'Not checked' },
                { label: 'Terms', value: <ExternalSourceLink href={item.termsUrl} /> },
                { label: 'Licence', value: item.licenceNote ?? '—' },
                ...(Object.keys(item.config).length ? [{ label: 'Adapter settings', value: <ValueView value={item.config} /> }] : []),
              ]}
            />
          </Panel>
        </div>
      </div>

      {isAdmin ? <SourceEditorDialog open={editing} onOpenChange={setEditing} source={item} /> : null}
      <SourceFileDialog open={uploading} onOpenChange={setUploading} source={item} />
    </div>
  )
}
