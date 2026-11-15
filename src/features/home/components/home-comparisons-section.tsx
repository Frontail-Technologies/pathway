import { getComparableColleges, rankedPairs } from '@/features/compare/api/compare-api'
import { PopularComparisonCard } from '@/features/compare/components/popular-comparison-card'
import { DataTabs } from './data-tabs'
import { HomeSectionHeading } from './home-section-heading'

const groups = [
  { id: 'btech', label: 'Engineering' },
  { id: 'mba', label: 'MBA' },
  { id: 'bba', label: 'BBA' },
]

export async function HomeComparisonsSection() {
  const pairSets = await Promise.all(groups.map((group) => rankedPairs(group.id, 3).catch(() => [] as [string, string][])))
  const colleges = await getComparableColleges([...new Set(pairSets.flat(2))]).catch(() => new Map())
  const tabs = groups.flatMap((group, index) => {
    const pairs = pairSets[index]!.filter(([a, b]) => colleges.has(a) && colleges.has(b))
    if (!pairs.length) return []
    return [
      {
        id: group.id,
        label: group.label,
        content: (
          <div className="grid gap-3 pt-4 md:grid-cols-2 xl:grid-cols-3">
            {pairs.map(([a, b]) => (
              <PopularComparisonCard key={`${a}-${b}`} collegeA={colleges.get(a)!} collegeB={colleges.get(b)!} />
            ))}
          </div>
        ),
      },
    ]
  })
  if (!tabs.length) return null

  return (
    <section aria-labelledby="home-comparisons-title" className="border-b bg-background py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <span id="home-comparisons-title" className="sr-only">
          Popular comparisons
        </span>
        <HomeSectionHeading eyebrow="Compare" title="Popular comparisons" subtitle="Top ranked colleges side by side on fees, rank and placements" href="/compare" linkLabel="Compare any colleges" />
        <div className="mt-4 [&_[role=tablist]]:px-0">
          <DataTabs label="home-compare" tabs={tabs} />
        </div>
      </div>
    </section>
  )
}
