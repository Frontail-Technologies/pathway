import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { ArrowRight } from 'lucide-react'

export function AdmissionsFeesProcessSection({
  offering,
}: {
  offering: AdminProgramOffering
}) {
  return (
    <AdminSection title="Application & Admission Workflow">
      {offering.applicationSteps.length > 0 ? (
        <div className="space-y-3">
          {offering.applicationSteps.map((st) => (
            <div
              key={st.id}
              className="p-3.5 rounded-lg bg-muted/20 border border-border/60 flex items-start gap-3.5 text-xs"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                {st.stepNumber}
              </div>

              <div className="space-y-1 min-w-0">
                <span className="font-bold text-foreground block">
                  {st.title}
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 text-muted-foreground text-xs">
          Step-by-step application workflow has not been detailed for this offering yet.
        </div>
      )}
    </AdminSection>
  )
}
