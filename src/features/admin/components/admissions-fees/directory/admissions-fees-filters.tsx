import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X, Building2, BookOpen } from 'lucide-react'
import { admissionModes } from '../shared/admissions-fees-constants'

export type AdmissionsFeesFilterState = {
  search: string
  institutionId: string
  programId: string
  level: string
  admissionMode: string
  qualityStatus: string
}

export type AdmissionsFeesFiltersProps = {
  filters: AdmissionsFeesFilterState
  onFilterChange: (key: keyof AdmissionsFeesFilterState, value: string) => void
  onResetFilters: () => void
  institutions: { id: string; name: string }[]
  programs: { id: string; name: string }[]
}

const levelOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'Undergraduate', label: 'Undergraduate (UG)' },
  { value: 'Postgraduate', label: 'Postgraduate (PG)' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
]

const qualityOptions = [
  { value: 'all', label: 'All Data Quality' },
  { value: 'ready', label: 'Ready' },
  { value: 'needs_review', label: 'Needs Review' },
  { value: 'conflict', label: 'Conflict' },
  { value: 'incomplete', label: 'Incomplete' },
]

const sel = 'h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function AdmissionsFeesFilters({
  filters,
  onFilterChange,
  onResetFilters,
  institutions,
  programs,
}: AdmissionsFeesFiltersProps) {
  const institutionOptions = [
    { value: 'all', label: 'All Institutions' },
    ...institutions.map((i) => ({ value: i.id, label: i.name })),
  ]

  const programOptions = [
    { value: 'all', label: 'All Academic Programs' },
    ...programs.map((p) => ({ value: p.id, label: p.name })),
  ]

  const modeOptions = [
    { value: 'all', label: 'All Admission Modes' },
    ...admissionModes,
  ]

  const activeCount = [
    filters.institutionId !== 'all',
    filters.programId !== 'all',
    filters.level !== 'all',
    filters.admissionMode !== 'all',
    filters.qualityStatus !== 'all',
    filters.search.trim() !== '',
  ].filter(Boolean).length

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        <div className="relative sm:col-span-2 lg:col-span-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search offering, college, program, or exam..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="lg:col-span-2">
          <select value={filters.institutionId} onChange={(e) => onFilterChange('institutionId', e.target.value)} className={sel}>
            {institutionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select value={filters.programId} onChange={(e) => onFilterChange('programId', e.target.value)} className={sel}>
            {programOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select value={filters.admissionMode} onChange={(e) => onFilterChange('admissionMode', e.target.value)} className={sel}>
            {modeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select value={filters.qualityStatus} onChange={(e) => onFilterChange('qualityStatus', e.target.value)} className={sel}>
            {qualityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-muted-foreground">
            Active Filters ({activeCount}):
          </span>

          {filters.search && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              Search: "{filters.search}"
              <button type="button" onClick={() => onFilterChange('search', '')} className="hover:text-destructive" aria-label="Clear search filter">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {filters.institutionId !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              <Building2 className="w-3 h-3 mr-0.5" />
              Institution: {institutions.find((i) => i.id === filters.institutionId)?.name || filters.institutionId}
              <button type="button" onClick={() => onFilterChange('institutionId', 'all')} className="hover:text-destructive" aria-label="Clear institution filter">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {filters.programId !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              <BookOpen className="w-3 h-3 mr-0.5" />
              Program: {programs.find((p) => p.id === filters.programId)?.name || filters.programId}
              <button type="button" onClick={() => onFilterChange('programId', 'all')} className="hover:text-destructive" aria-label="Clear program filter">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {filters.admissionMode !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              Mode: {filters.admissionMode}
              <button type="button" onClick={() => onFilterChange('admissionMode', 'all')} className="hover:text-destructive" aria-label="Clear mode filter">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {filters.qualityStatus !== 'all' && (
            <Badge variant="secondary" className="text-[11px] font-normal gap-1 bg-muted px-2 py-0.5">
              Quality: {qualityOptions.find((q) => q.value === filters.qualityStatus)?.label}
              <button type="button" onClick={() => onFilterChange('qualityStatus', 'all')} className="hover:text-destructive" aria-label="Clear quality filter">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-6 px-2 text-[11px] font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
