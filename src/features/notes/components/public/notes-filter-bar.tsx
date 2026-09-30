'use client'

import { Button } from '@/components/ui/button'
import { RotateCcw, Filter } from 'lucide-react'
import { noteTypeMap, NoteType } from '@/features/notes/types/note'
import type { NoteFilterCriteria } from '@/features/notes/selectors/note-selectors'

export function NotesFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
}: {
  filters: NoteFilterCriteria
  onFilterChange: (key: keyof NoteFilterCriteria, value: string) => void
  onResetFilters: () => void
}) {
  const hasActiveFilters =
    (filters.search || '') !== '' ||
    (filters.studyLevel || 'all') !== 'all' ||
    (filters.noteType || 'all') !== 'all' ||
    (filters.pricingType || 'all') !== 'all'

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-card rounded-xl border border-border/70 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Filter className="w-3.5 h-3.5" />
        <span>Filter Resources:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.noteType || 'all'}
          onChange={(e) => onFilterChange('noteType', e.target.value)}
          className="h-9 w-40 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40"
        >
          <option value="all">All Note Types</option>
          {(Object.keys(noteTypeMap) as NoteType[]).map((key) => (
            <option key={key} value={key}>{noteTypeMap[key].label}</option>
          ))}
        </select>

        <select
          value={filters.studyLevel || 'all'}
          onChange={(e) => onFilterChange('studyLevel', e.target.value)}
          className="h-9 w-35 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40"
        >
          <option value="all">All Study Levels</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="postgraduate">Postgraduate</option>
          <option value="diploma">Diploma</option>
          <option value="school">Higher Secondary (10+2)</option>
        </select>

        <select
          value={filters.pricingType || 'all'}
          onChange={(e) => onFilterChange('pricingType', e.target.value)}
          className="h-9 w-30 rounded-md border border-input bg-background px-2.5 text-xs text-foreground shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40"
        >
          <option value="all">All Access</option>
          <option value="free">Free Notes</option>
          <option value="paid">Paid Notes</option>
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
