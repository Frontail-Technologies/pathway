import { CircleCheck } from 'lucide-react'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

/**
 * Reads as a qualification checklist (green checks), never a plain
 * label/value table — that visual language is reserved for Documents
 * (neutral file rows) so the two sections stay clearly distinct. Applicable
 * Programs/Location live here rather than as their own long-form section,
 * since they're really part of "who this is for."
 */
export function ScholarshipEligibilitySection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="eligibility" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Eligibility Criteria</h2>

      <div className="mt-4 flex flex-col gap-3">
        {scholarship.eligibility.rows.map((row) => (
          <div key={row.label} className="flex items-start gap-2.5 text-sm">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">{row.label}</p>
              <p className="mt-0.5 font-medium text-foreground">{row.value}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted-foreground italic">{scholarship.eligibility.note}</p>

      <div className="mt-5 border-t pt-5">
        <p className="text-sm font-semibold text-foreground">Applicable Programs</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {scholarship.applicableCourses.map((course) => (
            <span key={course} className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-primary">
              {course}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">Applicable in: {scholarship.applicableLocations.join(', ')}</p>
      </div>
    </section>
  )
}
