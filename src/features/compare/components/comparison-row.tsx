import { Check } from 'lucide-react'
import { Rating } from '@/components/shared/rating'
import { maxComparisonSlots } from '../data/college-compare'
import { facilityRowIcons, highlightedIndex, type ComparisonEntry, type ComparisonRowConfig } from '../data/comparison-sections'
import { COMPARE_GRID_COLS } from './compare-grid'

export function ComparisonRow({ row, entries }: { row: ComparisonRowConfig; entries: ComparisonEntry[] }) {
  const bestIndex = highlightedIndex(row, entries)
  const slots = Array.from({ length: maxComparisonSlots }, (_, index) => entries[index])
  const RowIcon = facilityRowIcons[row.label]

  return (
    <div className={`grid ${COMPARE_GRID_COLS} border-b last:border-b-0`}>
      <div className="sticky left-0 z-10 flex items-center gap-1.5 bg-muted/40 px-3 py-2.5 text-xs font-medium text-foreground print:static">
        {RowIcon && <RowIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
        <span className="truncate">{row.label}</span>
      </div>
      {slots.map((entry, index) => (
        <div key={entry?.college.slug ?? `empty-${index}`} className="flex items-center border-l border-border/60 bg-card px-3 py-2.5">
          {entry ? <ComparisonValue row={row} entry={entry} highlighted={index === bestIndex} /> : <span className="text-sm text-muted-foreground/50">—</span>}
        </div>
      ))}
    </div>
  )
}

function ComparisonValue({ row, entry, highlighted }: { row: ComparisonRowConfig; entry: ComparisonEntry; highlighted: boolean }) {
  const value = row.getValue(entry)

  if (row.type === 'rating' && typeof value === 'number') {
    return <Rating value={value} />
  }

  if (row.type === 'boolean') {
    return value ? (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
        <Check className="size-3.5 shrink-0" aria-hidden="true" />
        Available
      </span>
    ) : (
      <span className="text-sm text-muted-foreground/50">—</span>
    )
  }

  if (row.type === 'chips' && Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((chip) => (
          <span key={chip} className="rounded-md bg-secondary px-1.5 py-0.5 text-xs font-medium text-primary">
            {chip}
          </span>
        ))}
      </div>
    )
  }

  return <span className={`text-sm ${highlighted ? 'font-semibold text-foreground' : 'text-foreground'}`}>{String(value)}</span>
}
