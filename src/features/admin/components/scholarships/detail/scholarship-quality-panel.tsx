import * as React from 'react'
import {
  type AdminScholarship,
  type SectionQualityState,
} from '@/features/admin/data/admin-scholarships'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, ShieldCheck } from 'lucide-react'
import { qualityCheckStyles } from '../shared/scholarship-constants'

export function ScholarshipQualityPanel({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  const qualityItems: {
    key: keyof typeof scholarship.qualityBreakdown
    label: string
    state: SectionQualityState
  }[] = [
    { key: 'identity', label: 'Scholarship Identity', state: scholarship.qualityBreakdown.identity },
    { key: 'provider', label: 'Provider & Scope', state: scholarship.qualityBreakdown.provider },
    { key: 'eligibility', label: 'Eligibility Criteria', state: scholarship.qualityBreakdown.eligibility },
    { key: 'benefit', label: 'Financial Benefit', state: scholarship.qualityBreakdown.benefit },
    { key: 'dates', label: 'Application Dates', state: scholarship.qualityBreakdown.dates },
    { key: 'application', label: 'Application Process', state: scholarship.qualityBreakdown.application },
    { key: 'source', label: 'Source Provenance', state: scholarship.qualityBreakdown.source },
  ]

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Data Quality & Trust
        </h3>
        <Badge
          variant="secondary"
          className="text-[10px] font-semibold bg-blue-50 text-blue-700 border-0 px-2 py-0.5"
        >
          Operational Audit
        </Badge>
      </div>

      <div className="space-y-2">
        {qualityItems.map((item) => {
          const cfg = qualityCheckStyles[item.state]
          const Icon = cfg.icon
          return (
            <div
              key={item.key}
              className="flex items-center justify-between text-xs py-1 border-b border-border/40 last:border-0"
            >
              <span className="text-muted-foreground">{item.label}</span>
              <Badge
                variant="secondary"
                className={`text-[10px] font-semibold px-2 py-0.5 gap-1 ${cfg.badgeClass}`}
              >
                <Icon className="w-3 h-3" />
                {cfg.label}
              </Badge>
            </div>
          )
        })}
      </div>

      {scholarship.topIssues.length > 0 && (
        <div className="pt-2 border-t border-border/60 space-y-2">
          <span className="text-[11px] font-bold text-amber-700 block">
            Actionable Verification Items ({scholarship.topIssues.length}):
          </span>
          <div className="space-y-1.5">
            {scholarship.topIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-start gap-2 p-2 rounded bg-amber-50/60 text-amber-900 text-[11px]"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{issue.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 rounded-lg bg-muted/40 text-[11px] text-muted-foreground space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Factual Verification Rule</span>
        </div>
        <p className="leading-relaxed">
          Scholarship benefits and application windows are time-sensitive financial data. Populated amounts require official circular references to reach verified status.
        </p>
      </div>
    </div>
  )
}
