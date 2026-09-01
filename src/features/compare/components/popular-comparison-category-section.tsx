import { PopularComparisonCard, type ProgramOverride } from './popular-comparison-card'

export type ComparisonPairSpec = {
  slugA: string
  slugB: string
  programA?: ProgramOverride
  programB?: ProgramOverride
}

export function PopularComparisonCategorySection({ title, pairs }: { title: string; pairs: ComparisonPairSpec[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground sm:text-[15px]">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pairs.map((pair) => (
          <PopularComparisonCard
            key={`${pair.slugA}-${pair.slugB}-${pair.programA?.course ?? ''}`}
            slugA={pair.slugA}
            slugB={pair.slugB}
            programA={pair.programA}
            programB={pair.programB}
          />
        ))}
      </div>
    </div>
  )
}
