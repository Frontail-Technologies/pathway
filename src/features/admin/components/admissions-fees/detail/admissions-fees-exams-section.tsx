import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { Badge } from '@/components/ui/badge'

export function AdmissionsFeesExamsSection({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <AdminSection title="Entrance Exams & Selection">
      <div className="space-y-4 text-xs">
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-muted-foreground block">
            Accepted Entrance Examinations
          </span>
          <div className="flex flex-wrap gap-2">
            {offering.entranceExams.map((ex) => (
              <Badge
                key={ex}
                variant="secondary"
                className="text-xs font-semibold px-2.5 py-1 bg-muted/80 text-foreground border border-border/60"
              >
                {ex}
              </Badge>
            ))}
            {offering.entranceExams.length === 0 && (
              <span className="text-xs text-muted-foreground italic">
                Direct board merit or institutional test without centralized national entrance exam.
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground block">
              Counselling & Allocation Authority
            </span>
            <span className="font-semibold text-foreground block">
              {offering.counsellingBody || 'Direct Institutional Authority'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground block">
              Admission Route
            </span>
            <span className="font-semibold text-foreground block">
              {offering.admissionMode}
            </span>
          </div>
        </div>

        {offering.selectionProcess && (
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-bold text-foreground block">
              Selection Procedure Breakdown
            </span>
            <p className="text-[11px] text-muted-foreground leading-relaxed p-3 rounded-lg bg-muted/20 border border-border/60">
              {offering.selectionProcess}
            </p>
          </div>
        )}
      </div>
    </AdminSection>
  )
}
