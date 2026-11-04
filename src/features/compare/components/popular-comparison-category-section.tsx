import { getComparableColleges } from '../api/compare-api'
import { PopularComparisonCard, type ProgramOverride } from './popular-comparison-card'

export type ComparisonPairSpec = {
  slugA: string
  slugB: string
  programA?: ProgramOverride
  programB?: ProgramOverride
}

export async function PopularComparisonCategorySection({ title, pairs }: { title: string; pairs: ComparisonPairSpec[] }) {
  const colleges = await getComparableColleges(pairs.flatMap((pair) => [pair.slugA, pair.slugB])).catch(() => new Map())
  const shown = pairs.filter((pair) => colleges.has(pair.slugA) && colleges.has(pair.slugB))
  if (shown.length === 0) return null
  return (
    <div>
      <p className="text-sm font-semibold text-foreground sm:text-[15px]">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((pair) => (
          <PopularComparisonCard
            key={`${pair.slugA}-${pair.slugB}-${pair.programA?.course ?? ''}`}
            collegeA={colleges.get(pair.slugA)!}
            collegeB={colleges.get(pair.slugB)!}
            programA={pair.programA}
            programB={pair.programB}
          />
        ))}
      </div>
    </div>
  )
}
