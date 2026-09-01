import { FileText } from 'lucide-react'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

/** Neutral document/file rows — deliberately not green checkmarks, so this reads as a paperwork checklist rather than a repeat of the Eligibility qualification checks. */
export function ScholarshipDocumentsSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="documents" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Documents Required</h2>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {scholarship.documents.map((document) => (
          <div key={document} className="flex items-center gap-2.5 rounded-[10px] border bg-card px-3.5 py-2.5 text-sm">
            <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <p className="font-medium text-foreground">{document}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
