'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RotateCcw } from 'lucide-react'
import { SeoTargetType, seoTargetTypeMap } from '@/features/seo/types/seo-metadata'

export interface SeoFilterState {
  search: string
  targetType: string
  indexing: string
}

const sel = 'h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

interface SeoFiltersProps {
  filters: SeoFilterState
  onFilterChange: (key: keyof SeoFilterState, value: string) => void
  onResetFilters: () => void
}

export function SeoFilters({ filters, onFilterChange, onResetFilters }: SeoFiltersProps) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.targetType !== 'all' ||
    filters.indexing !== 'all'

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search overrides by title, description, or route..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="pl-9 h-9 text-xs bg-background"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={filters.targetType} onChange={(e) => onFilterChange('targetType', e.target.value)} className={sel}>
          <option value="all">All Target Types</option>
          {Object.entries(seoTargetTypeMap).map(([key, meta]) => (
            <option key={key} value={key}>{meta.label}</option>
          ))}
        </select>

        <select value={filters.indexing} onChange={(e) => onFilterChange('indexing', e.target.value)} className={sel}>
          <option value="all">All Indexing States</option>
          <option value="inherited">Inherited</option>
          <option value="indexable">Indexable Override</option>
          <option value="noindex">Noindex Override</option>
        </select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}
