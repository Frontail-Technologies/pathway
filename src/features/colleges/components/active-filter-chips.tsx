import { X } from 'lucide-react'
import type { FilterKey, FilterState } from '../data/filters'

export function ActiveFilterChips({
  filters,
  onRemove,
  onClearAll,
}: {
  filters: FilterState
  onRemove: (key: FilterKey, value: string) => void
  onClearAll: () => void
}) {
  const chips = (Object.keys(filters) as FilterKey[]).flatMap((key) => filters[key].map((value) => ({ key, value })))
  if (chips.length === 0) return null

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          type="button"
          onClick={() => onRemove(chip.key, chip.value)}
          className="flex cursor-pointer items-center gap-1 rounded-md border border-primary/30 bg-secondary px-2.5 py-1 text-xs font-medium text-primary outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {chip.value}
          <X className="size-3" aria-hidden="true" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="cursor-pointer text-xs font-semibold text-muted-foreground outline-none hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        Clear All
      </button>
    </div>
  )
}
