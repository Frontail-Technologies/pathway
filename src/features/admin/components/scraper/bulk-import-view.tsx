'use client'

import * as React from 'react'
import Link from 'next/link'
import { FileUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { entityLabel, fetchModeLabels, isOpenJob, listJobs, listSources, type IngestionSource } from '@/features/admin/data/admin-ingestion-api'
import { queryKeys } from '@/lib/query-client'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminPanelSkeleton } from '../admin-skeletons'
import { AdminPageHeader, Panel, Tag } from '../kit'
import { RunList } from './run-lists'
import { LoadErrorPanel, useIngestionRole } from './shared'
import { isCsvSource, SourceFileDialog, takesFiles } from './source-file-dialog'

export function BulkImportView() {
  const { ready, isAdmin } = useIngestionRole()
  const [target, setTarget] = React.useState<IngestionSource | null>(null)
  const sources = useQuery({ queryKey: queryKeys.ingestionSources, queryFn: listSources, enabled: ready })
  const jobsFilter = { limit: 50 }
  const jobs = useQuery({
    queryKey: queryKeys.ingestionJobs(jobsFilter),
    queryFn: () => listJobs(jobsFilter),
    enabled: ready,
    select: (rows) => rows.filter((job) => job.trigger === 'import').slice(0, 10),
    refetchInterval: (q) => (q.state.data?.some((job) => job.trigger === 'import' && isOpenJob(job)) ? 4000 : false),
  })
  const fileSources = (sources.data ?? []).filter(takesFiles)

  return (
    <div className="space-y-5">
      <AdminPageHeader eyebrow="Data imports" title="Upload" />
      {sources.isLoading || !ready ? (
        <AdminPanelSkeleton lines={4} />
      ) : sources.isError ? (
        <LoadErrorPanel title="Could not load sources" error={sources.error} onRetry={() => void sources.refetch()} />
      ) : fileSources.length === 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState
            art="noData"
            title="No source takes uploads"
            action={
              isAdmin ? (
                <Button variant="outline" render={<Link href="/admin/scraper/sources" />}>
                  Add a source
                </Button>
              ) : undefined
            }
            className="py-14"
          />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {fileSources.map((source) => (
            <div key={source.id} className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="min-w-0">
                <Link href={`/admin/scraper/sources/${source.id}`} className="font-medium text-foreground hover:text-primary hover:underline">
                  {source.name}
                </Link>
                <p className="text-[13px] text-muted-foreground">{isCsvSource(source) ? 'CSV with field-name columns' : fetchModeLabels[source.fetchMode]}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {source.entityTypes.map((type) => (
                    <Tag key={type}>{entityLabel(type)}</Tag>
                  ))}
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-fit gap-1.5" onClick={() => setTarget(source)}>
                <FileUp className="size-4" aria-hidden="true" />
                Upload file
              </Button>
            </div>
          ))}
        </div>
      )}

      <Panel title="Recent uploads">{jobs.isLoading ? <AdminPanelSkeleton lines={3} className="border-0 p-0 shadow-none" /> : <RunList jobs={jobs.data ?? []} emptyText="No uploads yet." />}</Panel>

      {target ? <SourceFileDialog open={Boolean(target)} onOpenChange={(open) => (open ? undefined : setTarget(null))} source={target} /> : null}
    </div>
  )
}
