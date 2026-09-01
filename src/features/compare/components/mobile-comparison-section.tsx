import type { ComparisonEntry, ComparisonSectionConfig } from '../data/comparison-sections'
import { MobileComparisonRow } from './mobile-comparison-row'

export function MobileComparisonSection({ section, entries }: { section: ComparisonSectionConfig; entries: ComparisonEntry[] }) {
  const Icon = section.icon
  return (
    <div className="border-b last:border-b-0">
      <div className="flex h-9 items-center gap-1.5 border-y bg-secondary/60 px-3">
        <Icon className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-[13px] font-semibold text-foreground">{section.title}</p>
      </div>
      <div>
        {section.rows.map((row) => (
          <MobileComparisonRow key={row.label} row={row} entries={entries} />
        ))}
      </div>
    </div>
  )
}
