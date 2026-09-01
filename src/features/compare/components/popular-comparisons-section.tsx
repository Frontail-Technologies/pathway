import { PopularComparisonCard } from './popular-comparison-card'

const popularPairs: [string, string][] = [
  ['iit-delhi', 'iit-bombay'],
  ['iit-bombay', 'iit-madras'],
  ['iit-delhi', 'iit-kanpur'],
  ['bits-pilani', 'vit-vellore'],
  ['iit-bombay', 'bits-pilani'],
  ['iit-delhi', 'bits-pilani'],
]

export function PopularComparisonsSection() {
  return (
    <div className="print:hidden">
      <p className="text-sm font-semibold text-foreground sm:text-[15px]">Popular College Comparisons</p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {popularPairs.map(([slugA, slugB]) => (
          <div key={`${slugA}-${slugB}`} className="w-64 shrink-0 sm:w-auto">
            <PopularComparisonCard slugA={slugA} slugB={slugB} />
          </div>
        ))}
      </div>
    </div>
  )
}
