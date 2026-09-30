import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { CheckCircle2 } from 'lucide-react'

export function AdmissionsFeesEligibilitySection({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <AdminSection title="Eligibility Criteria">
      <div className="space-y-4 text-xs">
        {offering.eligibilitySummary && (
          <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-100 text-blue-950 space-y-1">
            <span className="text-[11px] font-bold text-blue-900 block uppercase tracking-wider">
              Summary Requirement
            </span>
            <p className="leading-relaxed font-medium">
              {offering.eligibilitySummary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground block">
              Academic Qualification
            </span>
            <span className="font-semibold text-foreground block">
              {offering.academicQualification || '10+2 or equivalent'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground block">
              Mandatory Subjects
            </span>
            <span className="font-semibold text-foreground block">
              {offering.mandatorySubjects || 'Specified by academic stream'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground block">
              Minimum Marks Threshold
            </span>
            <span className="font-semibold text-foreground block">
              {offering.minimumMarks || 'As per governing council norms'}
            </span>
          </div>
        </div>

        {offering.importantRequirements.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-foreground block">
              Mandatory Verification Documents & Certificates
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {offering.importantRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/20 border border-border/60"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-foreground leading-snug">{req}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminSection>
  )
}
