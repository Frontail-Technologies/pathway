import type { PlatformReportsData } from '../../data/admin-reports'
import { CompletenessMeter, Panel, StatusBadge, type StatusTone } from '../kit'

const pct = (part: number, total: number) => (total > 0 ? Math.round((part / total) * 100) : 0)

const segmentColour: Record<StatusTone, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-destructive',
  neutral: 'bg-muted-foreground/40',
  info: 'bg-primary',
}

export function DataQualityReportSection({ data }: { data: PlatformReportsData['quality'] }) {
  const { overallDistribution: d, institutionsCompleteness: inst, programsCompleteness: prog, scholarshipsCompleteness: sch } = data
  const total = d.assessableTotal
  const segments: { label: string; value: number; tone: StatusTone }[] = [
    { label: 'Ready', value: d.ready, tone: 'success' },
    { label: 'Needs review', value: d.needsReview, tone: 'warning' },
    { label: 'Conflict', value: d.conflict, tone: 'danger' },
    { label: 'Not assessed', value: d.notAssessed, tone: 'neutral' },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Panel title="Review status" description={`${total} catalogue records with a quality check`}>
        {total === 0 ? (
          <p className="text-sm text-muted-foreground">No records have been assessed yet.</p>
        ) : (
          <div className="space-y-5">
            <div className="flex h-2 overflow-hidden rounded-full bg-muted" role="img" aria-label={segments.map((s) => `${s.label}: ${s.value}`).join(', ')}>
              {segments.map((segment) =>
                segment.value > 0 ? <div key={segment.label} className={segmentColour[segment.tone]} style={{ width: `${(segment.value / total) * 100}%` }} /> : null,
              )}
            </div>
            <ul className="divide-y divide-border">
              {segments.map((segment) => (
                <li key={segment.label} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <StatusBadge tone={segment.tone}>{segment.label}</StatusBadge>
                  <span className="text-sm text-foreground tabular-nums">
                    {segment.value}
                    <span className="ml-2 text-[13px] text-muted-foreground">{pct(segment.value, total)}%</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Panel>

      <Panel title="Completeness">
        <ul className="space-y-5">
          {[
            { label: 'Institutions with a public page', part: inst.liveDetailPage, total: inst.total },
            { label: 'Courses with a full curriculum', part: prog.liveDetailPage, total: prog.total },
            { label: 'Scholarships with a deadline', part: sch.withDeadlines, total: sch.total },
            { label: 'Scholarships with eligibility rules', part: sch.withEligibility, total: sch.total },
          ].map((row) => (
            <li key={row.label}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                <span className="text-foreground">{row.label}</span>
                <span className="text-[13px] text-muted-foreground tabular-nums">
                  {row.part} / {row.total}
                </span>
              </div>
              <CompletenessMeter value={pct(row.part, row.total)} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
