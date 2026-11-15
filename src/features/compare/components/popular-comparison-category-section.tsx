import { getComparableColleges, rankedPairs } from '../api/compare-api'
import { PopularComparisonCard } from './popular-comparison-card'

export async function PopularComparisonCategorySection({ title, courses, count = 3, exclude = [] }: { title: string; courses: string; count?: number; exclude?: string[] }) {
  const pairs = await rankedPairs(courses, count, exclude)
  const colleges = await getComparableColleges(pairs.flat()).catch(() => new Map())
  const shown = pairs.filter(([a, b]) => colleges.has(a) && colleges.has(b))
  if (shown.length === 0) return null
  return (
    <section>
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{title}</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(([a, b]) => (
          <PopularComparisonCard key={`${a}-${b}`} collegeA={colleges.get(a)!} collegeB={colleges.get(b)!} />
        ))}
      </div>
    </section>
  )
}
