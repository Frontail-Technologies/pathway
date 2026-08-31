'use client'

import { useState } from 'react'
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { countActiveFilters, sortOptions, type FilterKey, type FilterState, type SortValue } from '../data/filters'
import { MobileCourseFilters } from './mobile-course-filters'
import { ActiveFilterChips } from './active-filter-chips'

const quickFilters: { label: string; key: FilterKey }[] = [
  { label: 'Level', key: 'levels' },
  { label: 'Stream', key: 'streams' },
  { label: 'Fees', key: 'fees' },
  { label: 'Duration', key: 'durations' },
]

type CourseResultsToolbarProps = {
  resultCount: number
  filters: FilterState
  onApplyMobileFilters: (filters: FilterState) => void
  onRemoveFilter: (key: FilterKey, value: string) => void
  onClearAll: () => void
  sort: SortValue
  onSortChange: (value: SortValue) => void
}

export function CourseResultsToolbar({
  resultCount,
  filters,
  onApplyMobileFilters,
  onRemoveFilter,
  onClearAll,
  sort,
  onSortChange,
}: CourseResultsToolbarProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const activeCount = countActiveFilters(filters)

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">
          {resultCount} {resultCount === 1 ? 'Course' : 'Courses'}
        </p>
        <div className="hidden sm:block">
          <SortSelect sort={sort} onSortChange={onSortChange} />
        </div>
      </div>

      <div className="mt-3 flex gap-2 sm:hidden">
        <Button variant="outline" className="h-10 shrink-0 gap-1.5 px-3.5 text-sm" onClick={() => setSheetOpen(true)}>
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filter{activeCount > 0 ? ` (${activeCount})` : ''}
        </Button>
        <div className="min-w-0 flex-1">
          <SortSelect sort={sort} onSortChange={onSortChange} className="w-full" />
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2 sm:hidden">
        {quickFilters.map((quick) => (
          <button
            key={quick.key}
            type="button"
            onClick={() => setSheetOpen(true)}
            className="shrink-0 cursor-pointer rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {quick.label}
          </button>
        ))}
      </div>

      <ActiveFilterChips filters={filters} onRemove={onRemoveFilter} onClearAll={onClearAll} />

      <MobileCourseFilters open={sheetOpen} onOpenChange={setSheetOpen} filters={filters} onApply={onApplyMobileFilters} />
    </div>
  )
}

function SortSelect({ sort, onSortChange, className = '' }: { sort: SortValue; onSortChange: (value: SortValue) => void; className?: string }) {
  return (
    <Select value={sort} onValueChange={(value) => onSortChange(value as SortValue)} items={sortOptions}>
      <SelectTrigger className={`gap-2 px-3 text-sm data-[size=default]:h-10 ${className}`}>
        <ArrowUpDown className="size-4 text-muted-foreground" aria-hidden="true" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent side="bottom" align="start" sideOffset={6} alignItemWithTrigger={false}>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
