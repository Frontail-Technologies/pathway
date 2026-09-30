import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, RotateCcw, Building2 } from 'lucide-react'

export type ProgramFiltersProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedLevel: string
  onLevelChange: (value: string) => void
  levelOptions: { value: string; label: string }[]
  selectedStream: string
  onStreamChange: (value: string) => void
  streamOptions: { value: string; label: string }[]
  selectedDuration: string
  onDurationChange: (value: string) => void
  durationOptions: { value: string; label: string }[]
  selectedQuality: string
  onQualityChange: (value: string) => void
  qualityOptions: { value: string; label: string }[]
  selectedDetailPage: string
  onDetailPageChange: (value: string) => void
  detailPageOptions: { value: string; label: string }[]
  selectedInstitution: string
  onInstitutionReset: () => void
  institutionName?: string
  hasActiveFilters: boolean
  onResetFilters: () => void
}

const sel = 'h-9 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function ProgramFilters({
  searchQuery,
  onSearchChange,
  selectedLevel,
  onLevelChange,
  selectedStream,
  onStreamChange,
  streamOptions,
  selectedDuration,
  onDurationChange,
  durationOptions,
  selectedQuality,
  onQualityChange,
  qualityOptions,
  selectedDetailPage,
  onDetailPageChange,
  detailPageOptions,
  selectedInstitution,
  onInstitutionReset,
  institutionName,
  hasActiveFilters,
  onResetFilters,
  levelOptions,
}: ProgramFiltersProps) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by program name, degree, stream, or specialization..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <select value={selectedLevel} onChange={(e) => onLevelChange(e.target.value || 'all')} className={sel}>
            {levelOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <select value={selectedStream} onChange={(e) => onStreamChange(e.target.value || 'all')} className={sel}>
            {streamOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <select value={selectedDuration} onChange={(e) => onDurationChange(e.target.value || 'all')} className={sel}>
            {durationOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <select value={selectedQuality} onChange={(e) => onQualityChange(e.target.value || 'all')} className={sel}>
            {qualityOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <select value={selectedDetailPage} onChange={(e) => onDetailPageChange(e.target.value || 'all')} className={sel}>
            {detailPageOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground shrink-0 gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>

      {selectedInstitution !== 'all' && (
        <div className="flex items-center gap-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
          <Building2 className="w-3.5 h-3.5 text-primary" />
          <span>
            Filtered by institution offering:{' '}
            <strong className="text-foreground">{institutionName || selectedInstitution}</strong>
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onInstitutionReset}
            className="h-6 px-1.5 text-[11px] font-semibold text-primary"
          >
            Show all
          </Button>
        </div>
      )}
    </div>
  )
}
