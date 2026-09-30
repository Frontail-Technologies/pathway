'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RotateCcw } from 'lucide-react'
import {
  promotionKindFilterOptions,
  promotionTargetTypeFilterOptions,
  promotionPlacementFilterOptions,
  promotionStatusFilterOptions,
} from '../shared/promotion-constants'

export type PromotionFilterState = {
  search: string
  kind: string
  targetType: string
  placement: string
  status: string
}

const sel = 'h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function PromotionFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: {
  filters: PromotionFilterState
  onFilterChange: (key: keyof PromotionFilterState, value: string) => void
  onResetFilters: () => void
}) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.kind !== 'all' ||
    filters.targetType !== 'all' ||
    filters.placement !== 'all' ||
    filters.status !== 'all'

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by label, target entity or placement..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="pl-9 h-9 text-xs bg-background"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={filters.kind} onChange={(e) => onFilterChange('kind', e.target.value)} className={sel}>
          {promotionKindFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select value={filters.targetType} onChange={(e) => onFilterChange('targetType', e.target.value)} className={sel}>
          {promotionTargetTypeFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select value={filters.placement} onChange={(e) => onFilterChange('placement', e.target.value)} className={sel}>
          {promotionPlacementFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className={sel}>
          {promotionStatusFilterOptions.map((opt) => (
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
