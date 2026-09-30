import * as React from 'react'
import { AdminSection } from '../../admin-section'
import type { AdminProgram } from '@/features/admin/types/programs'
import { Badge } from '@/components/ui/badge'
import { ShieldAlert } from 'lucide-react'
import {
  qualityBadgeStyles,
  qualityCheckStyles,
} from '@/features/admin/constants/programs'

const qualityItems: { key: keyof AdminProgram['qualityBreakdown']; label: string }[] = [
  { key: 'identity', label: 'Academic Identity' },
  { key: 'eligibility', label: 'Eligibility Requirements' },
  { key: 'curriculum', label: 'Curriculum & Syllabus' },
  { key: 'exams', label: 'Entrance Exams' },
  { key: 'careers', label: 'Career Claims' },
  { key: 'institutions', label: 'Institution Offerings' },
]

export function ProgramQualityPanel({ program }: { program: AdminProgram }) {
  const qualityConfig = qualityBadgeStyles[program.qualityStatus]

  return (
    <AdminSection title="Data Quality">
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span>Trust & Review Status</span>
            <Badge variant={qualityConfig.variant} size="xs">
              {qualityConfig.label}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Operational readiness audit derived from factual source provenance and completeness.
          </p>
        </div>

        <div className="space-y-2">
          {qualityItems.map(({ key, label }) => {
            const state = program.qualityBreakdown[key]
            const config = qualityCheckStyles[state]
            const Icon = config.icon

            return (
              <div
                key={key}
                className="flex items-center justify-between py-1.5 text-xs border-b border-border/50 last:border-0"
              >
                <span className="text-muted-foreground">{label}</span>
                <Badge variant={config.variant} size="xs">
                  <Icon />
                  {config.label}
                </Badge>
              </div>
            )
          })}
        </div>

        {program.topIssues && program.topIssues.length > 0 && (
          <div className="pt-2 border-t border-border/60 space-y-2">
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">
              Actionable Items
            </span>
            <div className="space-y-1.5">
              {program.topIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start gap-2 p-2 rounded-md bg-muted/40 text-[11px] text-muted-foreground leading-snug"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
                  <span>{issue.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminSection>
  )
}
