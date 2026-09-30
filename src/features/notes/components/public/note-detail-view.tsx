'use client'

import { Note } from '@/features/notes/types/note'
import { NoteDetailHero } from './note-detail-hero'
import { NotePreviewSection } from './note-preview-section'
import { NoteFileInfoSection } from './note-file-info-section'
import { NoteAccessCard } from './note-access-card'

export function NoteDetailView({ note }: { note: Note }) {
  return (
    <div className="space-y-8 pb-16">
      <NoteDetailHero note={note} />

      <div className="container-shell max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <NotePreviewSection note={note} />

          {note.description && (
            <div className="bg-card rounded-2xl p-6 border border-border/70 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-foreground">About These Notes</h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {note.description}
              </p>
            </div>
          )}

          <NoteFileInfoSection note={note} />
        </div>

        <div className="lg:col-span-4 sticky top-24">
          <NoteAccessCard note={note} />
        </div>
      </div>
    </div>
  )
}
