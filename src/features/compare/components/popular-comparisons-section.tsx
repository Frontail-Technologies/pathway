import { getComparableColleges, rankedPairs } from '../api/compare-api'
import { PopularComparisonCard } from './popular-comparison-card'

export async function PopularComparisonsSection() {
  const btech = await rankedPairs('btech', 3)
  const pairs = [...btech, ...(await rankedPairs('mba', 3, btech.flat()))]
  const colleges = await getComparableColleges(pairs.flat()).catch(() => new Map())
  const shown = pairs.filter(([a, b]) => colleges.has(a) && colleges.has(b))
  if (shown.length === 0) return null
  return (
    <section className="print:hidden">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Popular comparisons</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {shown.map(([a, b]) => (
          <div key={`${a}-${b}`} className="w-64 shrink-0 sm:w-auto">
            <PopularComparisonCard collegeA={colleges.get(a)!} collegeB={colleges.get(b)!} />
          </div>
        ))}
      </div>
    </section>
  )
}
