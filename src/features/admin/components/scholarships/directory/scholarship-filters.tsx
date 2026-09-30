import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X, Building, BookOpen } from 'lucide-react'
import {
  providerTypes,
  scholarshipTypes,
  educationLevels,
  applicationStatusOptions,
} from '../shared/scholarship-constants'

export type ScholarshipFilterState = {
  search: string
  providerType: string
  educationLevel: string
  scholarshipType: string
  applicationStatus: string
  qualityStatus: string
  detailStatus: string
}

export type ScholarshipFiltersProps = {
  filters: ScholarshipFilterState
  onFilterChange: (key: keyof ScholarshipFilterState, value: string) => void
  onResetFilters: () => void
}

const providerTypeOptions = [{ value: 'all', label: 'All Provider Types' }, ...providerTypes]
const levelOptions = [{ value: 'all', label: 'All Study Levels' }, ...educationLevels]
const typeOptions = [{ value: 'all', label: 'All Scholarship Types' }, ...scholarshipTypes]
const statusOptions = [{ value: 'all', label: 'All Application Windows' }, ...applicationStatusOptions]
const qualityOptions = [
  { value: 'all', label: 'All Data Quality' },
  { value: 'ready', label: 'Ready' },
  { value: 'needs_review', label: 'Needs Review' },
  { value: 'conflict', label: 'Conflict' },
  { value: 'incomplete', label: 'Incomplete' },
]

const sel = 'h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function ScholarshipFilters({ filters, onFilterChange, onResetFilters }: ScholarshipFiltersProps) {
  const activeCount = [
    filters.providerType !== 'all',
    filters.educationLevel !== 'all',
    filters.scholarshipType !== 'all',
    filters.applicationStatus !== 'all',
    filters.qualityStatus !== 'all',
    filters.detailStatus !== 'all',
    filters.search.trim() !== '',
  ].filter(Boolean).length

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        <div className="relative sm:col-span-2 lg:col-span-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search scholarship, provider, or keyword..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="lg:col-span-2">
          <select value={filters.providerType} onChange={(e) => onFilterChange('providerType', e.target.value)} className={sel}>
            {providerTypeOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select value={filters.educationLevel} onChange={(e) => onFilterChange('educationLevel', e.target.value)} className={sel}>
            {levelOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select value={filters.scholarshipType} onChange={(e) => onFilterChange('scholarshipType', e.target.value)} className={sel}>
            {typeOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select value={filters.applicationStatus} onChange={(e) => onFilterChange('applicationStatus', e.target.value)} className={sel}>
            {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div className="lg:col-span-1">
          <select value={filters.qualityStatus} onChange={(e) => onFilterChange('qualityStatus', e.target.value)} className={sel}>
            {qualityOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-muted-foreground">Active Filters ({activeCount}):</span>

          {filters.search && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              Search: "{filters.search}"
              <button type="button" onClick={() => onFilterChange('search', '')} className="hover:text-destructive" aria-label="Clear search filter"><X className="w-3 h-3" /></button>
            </Badge>
          )}
          {filters.providerType !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              <Building className="w-3 h-3 mr-0.5" />Provider: {filters.providerType}
              <button type="button" onClick={() => onFilterChange('providerType', 'all')} className="hover:text-destructive" aria-label="Clear provider filter"><X className="w-3 h-3" /></button>
            </Badge>
          )}
          {filters.educationLevel !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              <BookOpen className="w-3 h-3 mr-0.5" />Level: {filters.educationLevel}
              <button type="button" onClick={() => onFilterChange('educationLevel', 'all')} className="hover:text-destructive" aria-label="Clear level filter"><X className="w-3 h-3" /></button>
            </Badge>
          )}
          {filters.scholarshipType !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              Type: {filters.scholarshipType}
              <button type="button" onClick={() => onFilterChange('scholarshipType', 'all')} className="hover:text-destructive" aria-label="Clear type filter"><X className="w-3 h-3" /></button>
            </Badge>
          )}
          {filters.applicationStatus !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              Window: {statusOptions.find((s) => s.value === filters.applicationStatus)?.label}
              <button type="button" onClick={() => onFilterChange('applicationStatus', 'all')} className="hover:text-destructive" aria-label="Clear status filter"><X className="w-3 h-3" /></button>
            </Badge>
          )}
          {filters.qualityStatus !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              Quality: {qualityOptions.find((q) => q.value === filters.qualityStatus)?.label}
              <button type="button" onClick={() => onFilterChange('qualityStatus', 'all')} className="hover:text-destructive" aria-label="Clear quality filter"><X className="w-3 h-3" /></button>
            </Badge>
          )}

          <Button variant="ghost" size="sm" onClick={onResetFilters} className="h-6 px-2 text-[11px] font-medium text-destructive hover:text-destructive hover:bg-destructive/10">
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
