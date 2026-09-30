'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RotateCcw } from 'lucide-react'
import {
  contentTypeFilterOptions,
  contentStatusFilterOptions,
  contentCategoryFilterOptions,
} from '../shared/content-constants'

export type ContentFilterState = {
  search: string
  type: string
  status: string
  category: string
}

const sel = 'h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function ContentFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: {
  filters: ContentFilterState
  onFilterChange: (key: keyof ContentFilterState, value: string) => void
  onResetFilters: () => void
}) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.type !== 'all' ||
    filters.status !== 'all' ||
    filters.category !== 'all'

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, excerpt or slug..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="pl-9 h-9 text-xs bg-background"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={filters.type} onChange={(e) => onFilterChange('type', e.target.value)} className={sel}>
          {contentTypeFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select value={filters.category} onChange={(e) => onFilterChange('category', e.target.value)} className={sel}>
          {contentCategoryFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className={sel}>
          {contentStatusFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {hasActiveFilters ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  )
}
