'use client'

import * as React from 'react'
import type { AdminNote } from '@/features/admin/data/admin-notes'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { noteTableColumns } from './note-table-columns'
import { NoteFilters, type NoteAdminFilterState } from './note-filters'
import { NoteMobileCard } from './note-mobile-card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Plus } from 'lucide-react'
import Link from 'next/link'

export function AdminNotesView({ initialNotes }: { initialNotes: AdminNote[] }) {
  const [filters, setFilters] = React.useState<NoteAdminFilterState>({
    search: '',
    noteType: 'all',
    studyLevel: 'all',
    pricingType: 'all',
    status: 'all',
  })

  const handleFilterChange = (key: keyof NoteAdminFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      noteType: 'all',
      studyLevel: 'all',
      pricingType: 'all',
      status: 'all',
    })
  }

  const filteredNotes = React.useMemo(() => {
    return initialNotes.filter((note) => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const matchTitle = note.title.toLowerCase().includes(q)
        const matchSlug = note.slug.toLowerCase().includes(q)
        const matchSubject = note.subject?.toLowerCase().includes(q) || false
        const matchAuthor = note.authorName?.toLowerCase().includes(q) || false
        if (!matchTitle && !matchSlug && !matchSubject && !matchAuthor) {
          return false
        }
      }

      if (filters.noteType !== 'all' && note.noteType !== filters.noteType) {
        return false
      }

      if (filters.studyLevel !== 'all' && note.studyLevel?.toLowerCase() !== filters.studyLevel.toLowerCase()) {
        return false
      }

      if (filters.pricingType !== 'all' && note.pricingType !== filters.pricingType) {
        return false
      }

      if (filters.status !== 'all' && note.status !== filters.status) {
        return false
      }

      return true
    })
  }, [initialNotes, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Notes & Study Material
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialNotes.length} Notes
            </Badge>
          </div>
        </div>

        <Link
          href="/admin/notes/new"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Note</span>
        </Link>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <NoteFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialNotes.length === 0 ? (
          <div className="p-12 text-center bg-muted/10 rounded-xl border border-dashed border-border/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No study notes yet.</h3>
            <div className="pt-2">
              <Link
                href="/admin/notes/new"
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Note</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <AdminDataTable
                columns={noteTableColumns}
                data={filteredNotes}
                pageSize={10}
              />
            </div>

            <div className="md:hidden space-y-3">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <NoteMobileCard key={note.id} note={note} />
                ))
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
                  No notes found matching current filter criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
