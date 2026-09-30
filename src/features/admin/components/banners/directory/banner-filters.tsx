'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RotateCcw } from 'lucide-react'
import { bannerPlacementMap, bannerStatusMap, BannerPlacement, BannerStatus } from '@/features/banners/types/banner'

export type BannerFilterState = {
  search: string
  placement: string
  status: string
}

const sel = 'h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function BannerFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: {
  filters: BannerFilterState
  onFilterChange: (key: keyof BannerFilterState, value: string) => void
  onResetFilters: () => void
}) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.placement !== 'all' ||
    filters.status !== 'all'

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search banners by name, headline, copy..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="pl-9 h-9 text-xs bg-background"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={filters.placement} onChange={(e) => onFilterChange('placement', e.target.value)} className={sel}>
          <option value="all">All Placements</option>
          {(Object.keys(bannerPlacementMap) as BannerPlacement[]).map((key) => (
            <option key={key} value={key}>{bannerPlacementMap[key].label}</option>
          ))}
        </select>

        <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className={sel}>
          <option value="all">All Statuses</option>
          {(Object.keys(bannerStatusMap) as BannerStatus[]).map((key) => (
            <option key={key} value={key}>{bannerStatusMap[key].label}</option>
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
