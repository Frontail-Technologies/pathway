import * as React from 'react'
import { AdminSection } from '../../admin-section'
import type { AdminProgram } from '@/features/admin/types/programs'
import { type CourseDetailData } from '@/features/courses/data/course-detail'

export function ProgramEligibilitySection({
  program,
  detail,
}: {
  program: AdminProgram
  detail?: CourseDetailData
}) {
  return (
    <AdminSection title="Eligibility & Academic Entry">
      {detail?.eligibility ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/40 space-y-1">
              <span className="text-[11px] text-muted-foreground font-medium block">Academic Qualification</span>
              <span className="text-xs font-bold text-foreground block">{detail.eligibility.academic}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 space-y-1">
              <span className="text-[11px] text-muted-foreground font-medium block">Mandatory Subjects</span>
              <span className="text-xs font-bold text-foreground block">{detail.eligibility.subjects}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 space-y-1">
              <span className="text-[11px] text-muted-foreground font-medium block">Minimum Marks Threshold</span>
              <span className="text-xs font-bold text-foreground block">{detail.eligibility.minimumMarks}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 space-y-1">
              <span className="text-[11px] text-muted-foreground font-medium block">Entrance Exams</span>
              <span className="text-xs font-bold text-foreground block">{detail.eligibility.entrance}</span>
            </div>
          </div>
          {detail.eligibility.note && (
            <p className="text-[11px] text-muted-foreground pt-1 italic">
              {detail.eligibility.note}
            </p>
          )}
        </div>
      ) : (
        <div className="p-3.5 rounded-lg bg-muted/40 space-y-1 text-xs">
          <span className="text-[11px] text-muted-foreground font-medium block">Standard Eligibility Requirement</span>
          <span className="text-xs font-bold text-foreground block">{program.eligibility || 'Not specified'}</span>
        </div>
      )}
    </AdminSection>
  )
}
