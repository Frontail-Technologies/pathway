import type { ComparisonEntry, ComparisonSectionConfig } from '../data/comparison-sections'
import { ComparisonRow } from './comparison-row'

export function ComparisonSection({ section, entries }: { section: ComparisonSectionConfig; entries: ComparisonEntry[] }) {
  const Icon = section.icon
  return (
    <div className="border-b last:border-b-0">
      <div className="flex h-9 items-center gap-1.5 border-y bg-secondary/60 px-3 sm:h-10">
        <Icon className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-[13px] font-semibold text-foreground sm:text-sm">{section.title}</p>
      </div>
      <div>
        {section.rows.map((row) => (
          <ComparisonRow key={row.label} row={row} entries={entries} />
        ))}
      </div>
    </div>
  )
}
