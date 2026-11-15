import { SourceNote } from '@/components/shared/source-note'
import type { CollegeDetailData } from '../data/college-detail'

export function PlacementFigures({ college }: { college: CollegeDetailData }) {
  if (!college.placementMetrics.length) return null
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {college.placementMetrics.map((metric) => (
        <div key={metric.label} className="rounded-xl border bg-card p-4">
          <dd className="font-heading text-2xl leading-8 font-semibold text-foreground tabular-nums sm:text-[28px]">{metric.value}</dd>
          <dt className="mt-1 text-[13px] leading-5 text-muted-foreground">{metric.label}</dt>
        </div>
      ))}
    </dl>
  )
}

export function placementSource(college: CollegeDetailData) {
  const year = college.rankings?.[0]?.year
  return { source: 'NIRF', year, note: college.placementYear ? `Graduating batch ${college.placementYear}, as reported by the institute` : 'As reported by the institute' }
}

export function CollegePlacementsSection({ college }: { college: CollegeDetailData }) {
  const source = placementSource(college)
  return (
    <section id="placements" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{college.name} Placements</h2>
      {college.placementMetrics.length ? (
        <>
          <div className="mt-4">
            <PlacementFigures college={college} />
          </div>
          <SourceNote className="mt-3" source={source.source} year={source.year} href="https://www.nirfindia.org" note={source.note} />
        </>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Placement figures for {college.name} have not been published in an official source yet.</p>
      )}

      {college.recruiters.length ? (
        <div className="mt-6">
          <p className="text-sm font-semibold text-foreground">Recruiters that have visited</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {college.recruiters.map((recruiter) => (
              <span key={recruiter} className="rounded-lg border bg-card px-3 py-1.5 text-sm font-medium text-foreground">
                {recruiter}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
