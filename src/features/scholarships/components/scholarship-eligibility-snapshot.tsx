import { CircleCheck } from 'lucide-react'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

/** "Eligibility at a Glance" — a short, scannable pre-check shown near the top, distinct from the full Eligibility Checklist section further down (`ScholarshipEligibilitySection`). */
export function ScholarshipEligibilitySnapshot({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-foreground">Eligibility at a Glance</p>
      <div className="mt-2 flex flex-col gap-1.5">
        {scholarship.eligibilitySnapshot.map((item) => (
          <p key={item} className="flex items-center gap-2 text-sm text-foreground">
            <CircleCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
            {item}
          </p>
        ))}
      </div>
      <a href="#eligibility" className="mt-2 inline-block text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
        View Full Eligibility →
      </a>
    </div>
  )
}
