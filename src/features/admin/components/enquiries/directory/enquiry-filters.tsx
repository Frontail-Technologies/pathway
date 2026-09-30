import * as React from 'react'
import { Search, X, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  leadStatusFilterOptions,
  enquirySourceFilterOptions,
  assignmentFilterOptions,
} from '../shared/enquiry-constants'

export type EnquiryFilterState = {
  search: string
  status: string
  source: string
  assignedTo: string
}

const sel = 'h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function EnquiryFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: {
  filters: EnquiryFilterState
  onFilterChange: (key: keyof EnquiryFilterState, value: string) => void
  onResetFilters: () => void
}) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.source !== 'all' ||
    filters.assignedTo !== 'all'

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search by student, contact, entity, or subject..."
            className="pl-9 pr-8 text-xs bg-background h-9 shadow-2xs"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className={sel}>
            {leadStatusFilterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select value={filters.source} onChange={(e) => onFilterChange('source', e.target.value)} className={sel}>
            {enquirySourceFilterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select value={filters.assignedTo} onChange={(e) => onFilterChange('assignedTo', e.target.value)} className={sel}>
            {assignmentFilterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
