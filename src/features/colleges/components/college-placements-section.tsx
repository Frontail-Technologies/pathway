import { Info } from 'lucide-react'
import type { CollegeDetailData } from '../data/college-detail'





 
export function CollegePlacementsSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="placements" className="scroll-mt-section border-b py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{college.name} Placements</h2>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 rounded-[10px] border bg-card p-4 sm:grid-cols-4">
        {college.placementMetrics.map((metric) => (
          <div key={metric.label}>
            <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">{metric.label}</dt>
            <dd className="mt-0.5 text-base font-semibold text-foreground">{metric.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        Figures are self-reported by the institute and not independently verified — confirm current numbers with the college before deciding.
      </p>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Recruiters that have visited</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {college.recruiters.map((recruiter) => (
            <span key={recruiter} className="rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground sm:text-sm">
              {recruiter}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
