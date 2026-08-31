import type { CollegeDetailData } from '../data/college-detail'

export function CollegePlacementsSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="placements" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{college.name} Placements</h2>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {college.placementMetrics.map((metric) => (
          <div key={metric.label} className="rounded-[10px] border bg-card p-4">
            <p className="font-heading text-xl font-bold text-primary sm:text-2xl">{metric.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-[13px]">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Top Recruiters</p>
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
