import * as React from 'react'
import { AdminSection } from '../../admin-section'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { CheckCircle2, FileCheck } from 'lucide-react'

export function ScholarshipRequiredDocsSection({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  const docs = scholarship.requiredDocuments

  return (
    <AdminSection title="Required Applicant Documents">
      {docs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {docs.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/20 border border-border/60"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-[11px] text-foreground leading-snug">{doc}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border/80 flex items-center gap-3 text-muted-foreground text-xs">
          <FileCheck className="w-4 h-4 shrink-0 text-muted-foreground/70" />
          <p>Mandatory verification document checklist has not been configured for this scheme.</p>
        </div>
      )}
    </AdminSection>
  )
}
