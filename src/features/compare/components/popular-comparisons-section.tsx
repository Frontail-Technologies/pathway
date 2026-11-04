import { getComparableColleges } from '../api/compare-api'
import { PopularComparisonCard } from './popular-comparison-card'

const popularPairs: [string, string][] = [
  ['iit-delhi', 'iit-bombay'],
  ['iit-bombay', 'iit-madras'],
  ['iit-delhi', 'iit-kanpur'],
  ['bits-pilani', 'vit-vellore'],
  ['iit-bombay', 'bits-pilani'],
  ['iit-delhi', 'bits-pilani'],
]

export async function PopularComparisonsSection() {
  const colleges = await getComparableColleges(popularPairs.flat()).catch(() => new Map())
  const pairs = popularPairs.flatMap(([slugA, slugB]) => (colleges.has(slugA) && colleges.has(slugB) ? [{ a: colleges.get(slugA)!, b: colleges.get(slugB)! }] : []))
  if (pairs.length === 0) return null
  return (
    <div className="print:hidden">
      <p className="text-sm font-semibold text-foreground sm:text-[15px]">Popular College Comparisons</p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {pairs.map(({ a, b }) => (
          <div key={`${a.college.slug}-${b.college.slug}`} className="w-64 shrink-0 sm:w-auto">
            <PopularComparisonCard collegeA={a} collegeB={b} />
          </div>
        ))}
      </div>
    </div>
  )
}
