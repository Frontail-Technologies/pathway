import { Landmark } from 'lucide-react'
import { scholarshipStatusStyles } from '../data/scholarships'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

/**
 * Compact identity only — name, provider identity, status/type/level chips.
 * Deliberately carries no fact grid and no action buttons of its own: those
 * live in `ScholarshipOpportunitySnapshot`/`ScholarshipTopActions` right
 * below, which is what gives Scholarship Detail its own "opportunity" shape
 * instead of reading like Course Detail's identity+facts+actions block.
 */
export function ScholarshipIdentityHeader({ scholarship }: { scholarship: ScholarshipDetailData }) {
  const status = scholarshipStatusStyles[scholarship.status]

  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-bold text-primary sm:size-16 sm:text-sm">
        {scholarship.providerInitials}
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-3xl">{scholarship.name}</h1>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground sm:text-[15px]">
          <Landmark className="size-3.5 shrink-0" aria-hidden="true" />
          {scholarship.provider} · <span className="font-medium text-foreground">{scholarship.providerType}</span>
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{scholarship.scholarshipType}</span>
          {scholarship.educationLevels.map((level) => (
            <span key={level} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
              {level}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
