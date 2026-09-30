'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RotateCcw } from 'lucide-react'
import {
  noteTypeMap,
  NoteType,
  studyLevelMap,
  formatStudyLevel,
  noteStatusMap,
  NoteStatus,
} from '@/features/notes/types/note'

export type NoteAdminFilterState = {
  search: string
  noteType: string
  studyLevel: string
  pricingType: string
  status: string
}

const sel = 'h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40'

export function NoteFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: {
  filters: NoteAdminFilterState
  onFilterChange: (key: keyof NoteAdminFilterState, value: string) => void
  onResetFilters: () => void
}) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.noteType !== 'all' ||
    filters.studyLevel !== 'all' ||
    filters.pricingType !== 'all' ||
    filters.status !== 'all'

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, subject, slug, or author..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="pl-9 h-9 text-xs bg-background"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={filters.studyLevel} onChange={(e) => onFilterChange('studyLevel', e.target.value)} className={sel}>
          <option value="all">All Study Levels</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="postgraduate">Postgraduate</option>
          <option value="class_12">Class 12</option>
          <option value="class_11">Class 11</option>
          <option value="class_10">Class 10</option>
          <option value="class_9">Class 9</option>
          <option value="diploma">Diploma</option>
        </select>

        <select value={filters.noteType} onChange={(e) => onFilterChange('noteType', e.target.value)} className={sel}>
          <option value="all">All Note Types</option>
          {(Object.keys(noteTypeMap) as NoteType[]).map((key) => (
            <option key={key} value={key}>{noteTypeMap[key].label}</option>
          ))}
        </select>

        <select value={filters.pricingType} onChange={(e) => onFilterChange('pricingType', e.target.value)} className={sel}>
          <option value="all">All Pricing</option>
          <option value="free">Free Notes</option>
          <option value="paid">Paid Notes</option>
        </select>

        <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className={sel}>
          <option value="all">All Statuses</option>
          {(Object.keys(noteStatusMap) as NoteStatus[]).map((key) => (
            <option key={key} value={key}>{noteStatusMap[key].label}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}
