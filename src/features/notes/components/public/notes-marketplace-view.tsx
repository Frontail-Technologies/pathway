'use client'

import * as React from 'react'
import { Note } from '@/features/notes/types/note'
import { filterNotes, NoteFilterCriteria } from '@/features/notes/selectors/note-selectors'
import { NotesMarketplaceHero } from './notes-marketplace-hero'
import { NotesFilterBar } from './notes-filter-bar'
import { NoteCard } from './note-card'
import { BookOpen, FileQuestion } from 'lucide-react'

export function NotesMarketplaceView({ initialNotes }: { initialNotes: Note[] }) {
  const [filters, setFilters] = React.useState<NoteFilterCriteria>({
    search: '',
    noteType: 'all',
    studyLevel: 'all',
    pricingType: 'all',
  })

  const handleFilterChange = (key: keyof NoteFilterCriteria, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      noteType: 'all',
      studyLevel: 'all',
      pricingType: 'all',
    })
  }

  const filteredNotes = React.useMemo(() => {
    return filterNotes(initialNotes, filters)
  }, [initialNotes, filters])

  return (
    <div className="space-y-8 pb-16">
      <NotesMarketplaceHero
        search={filters.search || ''}
        onSearchChange={(val) => handleFilterChange('search', val)}
      />

      <div className="container-shell max-w-6xl mx-auto space-y-6">
        <NotesFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialNotes.length === 0 ? (
          <div className="p-12 sm:p-16 text-center bg-card rounded-2xl border border-dashed border-border/80 space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                No study material available yet
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Curated revision notes, formula sheets, chapter summaries, and preparation packages will appear here once published.
              </p>
            </div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="p-12 text-center bg-card rounded-2xl border border-border text-muted-foreground space-y-2">
            <FileQuestion className="w-8 h-8 mx-auto text-muted-foreground/60" />
            <p className="text-sm font-semibold text-foreground">No notes match your filter criteria</p>
            <p className="text-xs">Try adjusting your search query or removing active filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
