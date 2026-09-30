import * as React from 'react'
import {
  type AdminScholarship,
  type SectionCompletenessState,
} from '@/features/admin/data/admin-scholarships'
import { Badge } from '@/components/ui/badge'
import { completenessStatusStyles } from '../shared/scholarship-constants'

export function ScholarshipCompletenessPanel({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  const completenessItems: {
    key: keyof typeof scholarship.breakdown
    label: string
    state: SectionCompletenessState
  }[] = [
    { key: 'identity', label: 'Scholarship Identity', state: scholarship.breakdown.identity },
    { key: 'provider', label: 'Provider & Scope', state: scholarship.breakdown.provider },
    { key: 'eligibility', label: 'Eligibility Criteria', state: scholarship.breakdown.eligibility },
    { key: 'benefit', label: 'Financial Benefit', state: scholarship.breakdown.benefit },
    { key: 'dates', label: 'Application Dates', state: scholarship.breakdown.dates },
    { key: 'application', label: 'Application Workflow', state: scholarship.breakdown.application },
    { key: 'documents', label: 'Official Documents', state: scholarship.breakdown.documents },
  ]

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Content Completeness
        </h3>
        <span className="font-mono text-sm font-bold text-foreground">
          {scholarship.completeness}%
        </span>
      </div>

      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            scholarship.completeness >= 80
              ? 'bg-emerald-500'
              : scholarship.completeness >= 45
              ? 'bg-amber-500'
              : 'bg-muted-foreground'
          }`}
          style={{ width: `${scholarship.completeness}%` }}
        />
      </div>

      <div className="space-y-2 pt-1">
        {completenessItems.map((item) => {
          const cfg = completenessStatusStyles[item.state]
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
    </div>
  )
}
