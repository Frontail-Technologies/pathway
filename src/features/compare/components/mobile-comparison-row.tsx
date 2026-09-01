import { Check } from 'lucide-react'
import { Rating } from '@/components/shared/rating'
import { maxComparisonSlots } from '../data/college-compare'
import { facilityRowIcons, highlightedIndex, type ComparisonEntry, type ComparisonRowConfig } from '../data/comparison-sections'
import { MOBILE_COMPARE_GRID_COLS } from './compare-grid'

/**
 * Mobile-only row — no shared attribute column (see `compare-grid.ts`).
 * Each cell carries its own small muted label above the value, so the row
 * reads correctly even with only two columns visible at once.
 */
export function MobileComparisonRow({ row, entries }: { row: ComparisonRowConfig; entries: ComparisonEntry[] }) {
  const bestIndex = highlightedIndex(row, entries)
  const slots = Array.from({ length: maxComparisonSlots }, (_, index) => entries[index])
  const RowIcon = facilityRowIcons[row.label]

  return (
    <div className={`grid ${MOBILE_COMPARE_GRID_COLS} border-b last:border-b-0`}>
      {slots.map((entry, index) => (
        <div key={entry?.college.slug ?? `empty-${index}`} className="flex flex-col gap-0.5 border-l border-border/60 bg-card px-3 py-2.5 first:border-l-0">
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
            {RowIcon && <RowIcon className="size-3 shrink-0" aria-hidden="true" />}
            {row.label}
          </p>
          {entry ? (
            <MobileComparisonValue row={row} entry={entry} highlighted={index === bestIndex} />
          ) : (
            <span className="text-[13px] text-muted-foreground/50">—</span>
          )}
        </div>
      ))}
    </div>
  )
}

function MobileComparisonValue({ row, entry, highlighted }: { row: ComparisonRowConfig; entry: ComparisonEntry; highlighted: boolean }) {
  const value = row.getValue(entry)

  if (row.type === 'rating' && typeof value === 'number') {
    return <Rating value={value} />
  }

  if (row.type === 'boolean') {
    return value ? (
      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-success">
        <Check className="size-3.5 shrink-0" aria-hidden="true" />
        Available
      </span>
    ) : (
      <span className="text-[13px] text-muted-foreground/50">—</span>
    )
  }

  if (row.type === 'chips' && Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((chip) => (
          <span key={chip} className="rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-medium text-primary">
            {chip}
          </span>
        ))}
      </div>
    )
  }

  return <span className={`text-[13px] ${highlighted ? 'font-semibold text-foreground' : 'text-foreground'}`}>{String(value)}</span>
}
