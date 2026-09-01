import { ChevronDown, CircleCheck } from 'lucide-react'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

/** Vertical process flow (stage → stage), not the previous horizontal wrap-pills — reads as a journey rather than a generic tag list. */
export function ScholarshipSelectionSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="selection" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Selection Process</h2>

      <div className="mt-4 flex flex-col items-start gap-1.5">
        {scholarship.selectionProcess.map((stage, index) => (
          <div key={stage} className="flex flex-col items-start gap-1.5">
            <span className="rounded-md border bg-card px-3.5 py-2 text-sm font-medium text-foreground">{stage}</span>
            {index < scholarship.selectionProcess.length - 1 && <ChevronDown className="ml-4 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
          </div>
        ))}
      </div>

      {scholarship.importantNotes.length > 0 && (
        <div className="mt-5 rounded-[10px] border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Important Notes</p>
          <div className="mt-2.5 flex flex-col gap-2">
            {scholarship.importantNotes.map((note) => (
              <p key={note} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CircleCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                {note}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
