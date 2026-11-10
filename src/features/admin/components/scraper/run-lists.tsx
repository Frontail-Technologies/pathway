'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { duration, entityLabel, jobStatusLabels, jobStatusTone, triggerLabels, type CrawlJob, type ImportBatch } from '@/features/admin/data/admin-ingestion-api'
import { formatRelative } from '../demo/relative-time'
import { CountBadge, StatusBadge } from '../kit'
import { JobStats } from './shared'

export function RunList({ jobs, showSource = true, emptyText = 'No runs yet.' }: { jobs: CrawlJob[]; showSource?: boolean; emptyText?: string }) {
  if (!jobs.length) return <p className="py-2 text-sm text-muted-foreground">{emptyText}</p>
  return (
    <ul className="-my-1 divide-y divide-border">
      {jobs.map((job) => (
        <li key={job.id}>
          <Link href={`/admin/scraper/jobs/${job.id}`} className="group flex items-center gap-3 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
            <StatusBadge tone={jobStatusTone[job.status]} className="shrink-0">
              {jobStatusLabels[job.status]}
            </StatusBadge>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                {showSource ? job.source.name : triggerLabels[job.trigger]}
                <span className="font-normal text-muted-foreground">
                  {' · '}
                  {formatRelative(job.createdAt)}
                  {duration(job) ? ` · ${duration(job)}` : ''}
                </span>
              </p>
              {job.error ? <p className="truncate text-[13px] text-destructive">{job.error}</p> : <JobStats stats={job.stats} />}
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function BatchList({ batches, showSource = true, emptyText = 'Nothing staged yet.' }: { batches: ImportBatch[]; showSource?: boolean; emptyText?: string }) {
  if (!batches.length) return <p className="py-2 text-sm text-muted-foreground">{emptyText}</p>
  return (
    <ul className="-my-1 divide-y divide-border">
      {batches.map((batch) => (
        <li key={batch.id}>
          <Link href={`/admin/scraper/imports/${batch.id}`} className="group flex items-center gap-3 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">{showSource ? batch.source.name : batch.label}</p>
              <p className="truncate text-[13px] text-muted-foreground">
                {entityLabel(batch.entityType)} · {formatRelative(batch.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {batch.counts.pending ? <CountBadge count={batch.counts.pending} tone="warning" /> : null}
              {batch.counts.invalid ? <CountBadge count={batch.counts.invalid} tone="danger" /> : null}
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
