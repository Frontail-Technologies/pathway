'use client'

import { useState, type ReactNode } from 'react'
import { AlertCircle, AlertTriangle, Check, CheckCircle2, Copy } from 'lucide-react'
import type { AdminTutorQualityAssessment } from '@/features/admin/data/admin-tutors'
import { CompletenessMeter, FactList, Panel } from '../../kit'
import { formatDate } from './tutor-coaching-constants'
import { QualityStatusBadge } from './tutor-status-badge'

type QualityCheck = AdminTutorQualityAssessment['checks'][number]

const checkIcon: Record<Exclude<QualityCheck['status'], 'info'>, ReactNode> = {
  passed: <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-label="Passed" />,
  warning: <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-label="Needs attention" />,
  failed: <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-label="Failed" />,
}

/** Data quality: overall status, score and each check. Informational policy checks are left to the record panel. */
export function QualityPanel({ quality }: { quality: { status: AdminTutorQualityAssessment['status']; score: number; checks: QualityCheck[] } }) {
  const checks = quality.checks.filter((check) => check.status !== 'info')
  return (
    <Panel title="Data quality" action={<QualityStatusBadge status={quality.status} />}>
      <p className="text-[13px] text-muted-foreground">
        Score <span className="font-medium text-foreground tabular-nums">{quality.score}</span> of 100
      </p>
      <ul className="mt-4 space-y-3">
        {checks.map((check) => (
          <li key={check.id} className="flex gap-2.5">
            {checkIcon[check.status as keyof typeof checkIcon]}
            <div className="min-w-0">
              <p className="text-sm text-foreground">{check.label}</p>
              {check.status !== 'passed' ? <p className="text-[13px] text-muted-foreground">{check.note}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function CompletenessPanel({ completeness }: { completeness: { percentage: number; completedCount: number; totalCount: number; missingFields: string[] } }) {
  return (
    <Panel title="Completeness">
      <CompletenessMeter value={completeness.percentage} />
      <p className="mt-2 text-[13px] text-muted-foreground tabular-nums">
        {completeness.completedCount} of {completeness.totalCount} fields filled
      </p>
      {completeness.missingFields.length > 0 ? (
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-[13px] text-muted-foreground">Missing</p>
          <ul className="mt-1.5 space-y-1 text-sm text-foreground">
            {completeness.missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Panel>
  )
}

const sourceLabel: Record<string, string> = {
  Manual: 'Entered by hand',
  'Imported Approved': 'Imported, approved',
  'Imported Provider Directory': 'Imported from provider directory',
  'Pipeline Staged': 'Imported, waiting for review',
}
const syncLabel: Record<string, string> = {
  'Manual Entry': 'Not synced',
  Synced: 'Synced',
  Unsynced: 'Out of sync',
}

/** Where the record came from, plus a quiet "Copy ID" for support requests. */
export function RecordPanel({ id, sourceInfo, note }: { id: string; sourceInfo: { source: string; lastUpdated: string; syncStatus: string }; note: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    void navigator.clipboard?.writeText(id)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Panel
      title="Record"
      action={
        <button type="button" onClick={copy} className="flex items-center gap-1 rounded text-[13px] text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
          {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy ID'}
        </button>
      }
    >
      <FactList
        columns={1}
        items={[
          { label: 'Source', value: sourceLabel[sourceInfo.source] ?? sourceInfo.source },
          { label: 'Last updated', value: formatDate(sourceInfo.lastUpdated) },
          { label: 'Sync', value: syncLabel[sourceInfo.syncStatus] ?? sourceInfo.syncStatus },
        ]}
      />
      <p className="mt-4 border-t border-border pt-4 text-[13px] text-muted-foreground">{note}</p>
    </Panel>
  )
}

/** Label + paragraph for long text on detail pages (FactList values are too heavy for prose). */
export function TextBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <div className="mt-1 text-sm leading-relaxed whitespace-pre-line text-foreground">{children}</div>
    </div>
  )
}

/** Plain bulleted list for highlights / "who this helps". */
export function PlainList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-foreground marker:text-muted-foreground">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  )
}

export function HistoryPanel() {
  return (
    <Panel title="Change history">
      <p className="text-sm text-muted-foreground">No changes recorded yet. Edits will appear here once saving is connected.</p>
    </Panel>
  )
}
