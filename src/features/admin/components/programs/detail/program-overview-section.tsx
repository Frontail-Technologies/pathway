import * as React from 'react'
import { AdminSection } from '../../admin-section'
import type { AdminProgram } from '@/features/admin/types/programs'
import { type CourseDetailData } from '@/features/courses/data/course-detail'

export function ProgramOverviewSection({
  program,
  detail,
}: {
  program: AdminProgram
  detail?: CourseDetailData
}) {
  return (
    <AdminSection title="Overview">
      {detail?.overviewCopy ? (
        <div className="space-y-4 text-xs text-foreground leading-relaxed">
          <p>{detail.overviewCopy}</p>

          {detail.facts && detail.facts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-border/60">
              {detail.facts.map((fact) => (
                <div key={fact.label} className="p-3 rounded-lg bg-muted/40 space-y-1">
                  <span className="text-[11px] text-muted-foreground font-medium block">
                    {fact.label}
                  </span>
                  <span className="text-xs font-bold text-foreground block">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <p className="text-muted-foreground leading-relaxed">
            Canonical catalog listing currently contains baseline taxonomy information. In-depth academic narrative, learning outcomes, and electives have not been configured yet.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-muted/40 space-y-1">
              <span className="text-[11px] text-muted-foreground font-medium block">Degree Level</span>
              <span className="text-xs font-bold text-foreground block">{program.level}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 space-y-1">
              <span className="text-[11px] text-muted-foreground font-medium block">Standard Duration</span>
              <span className="text-xs font-bold text-foreground block">{program.duration}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 space-y-1">
              <span className="text-[11px] text-muted-foreground font-medium block">Indicative Fee Range</span>
              <span className="text-xs font-bold text-foreground block">{program.fees}</span>
            </div>
          </div>
        </div>
      )}
    </AdminSection>
  )
}
