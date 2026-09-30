import * as React from 'react'
import { AdminSection } from '../../admin-section'
import type { AdminProgram } from '@/features/admin/types/programs'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { completenessStatusStyles } from '@/features/admin/constants/programs'

const completenessItems: { key: keyof AdminProgram['breakdown']; label: string }[] = [
  { key: 'identity', label: 'Program Identity' },
  { key: 'overview', label: 'Overview & Objectives' },
  { key: 'eligibility', label: 'Eligibility Summary' },
  { key: 'curriculum', label: 'Semester Syllabus' },
  { key: 'exams', label: 'Relevant Exams' },
  { key: 'careers', label: 'Career Pathways' },
  { key: 'institutions', label: 'Offering Relationships' },
]

export function ProgramCompletenessPanel({ program }: { program: AdminProgram }) {
  return (
    <AdminSection title="Content Completeness">
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span>Profile Score</span>
            <span className="tabular-nums">{program.completeness}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                program.completeness >= 80
                  ? 'bg-success'
                  : program.completeness >= 35
                  ? 'bg-warning'
                  : 'bg-muted-foreground/50'
              )}
              style={{ width: `${program.completeness}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {completenessItems.map(({ key, label }) => {
            const state = program.breakdown[key]
            const config = completenessStatusStyles[state]
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
      </div>
    </AdminSection>
  )
}
