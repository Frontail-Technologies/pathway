import * as React from 'react'
import {
  type AdminProgramOffering,
  type SectionCompletenessState,
} from '@/features/admin/data/admin-admissions-fees'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { completenessStatusStyles } from '../shared/admissions-fees-constants'

export function AdmissionsFeesCompletenessPanel({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  const items: { key: keyof typeof offering.breakdown; label: string; state: SectionCompletenessState }[] = [
    { key: 'identity', label: 'Offering Identity', state: offering.breakdown.identity },
    { key: 'fees', label: 'Fee Schedules', state: offering.breakdown.fees },
    { key: 'eligibility', label: 'Eligibility Criteria', state: offering.breakdown.eligibility },
    { key: 'exams', label: 'Entrance Exams', state: offering.breakdown.exams },
    { key: 'process', label: 'Admission Workflow', state: offering.breakdown.process },
    { key: 'documents', label: 'Official Documents', state: offering.breakdown.documents },
  ]

  return (
    <div className="bg-card rounded-xl p-5 shadow-xs border-0 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Content Completeness
        </h3>
        <span className="text-xs font-bold text-foreground">
          {offering.completeness}%
        </span>
      </div>

      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            offering.completeness >= 80
              ? 'bg-emerald-500'
              : offering.completeness >= 35
              ? 'bg-amber-500'
              : 'bg-muted-foreground/50'
          )}
          style={{ width: `${offering.completeness}%` }}
        />
      </div>

      <div className="space-y-2 pt-1">
        {items.map((item) => {
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
