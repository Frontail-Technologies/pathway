'use client'

import * as React from 'react'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { StickyNote, Info } from 'lucide-react'

export function EnquiryNotesSection({ enquiry }: { enquiry: AdminEnquiry }) {
  const [noteText, setNoteText] = React.useState('')
  const notes = enquiry.notes ?? []

  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Internal Counsellor Notes
      </h2>

      {notes.length > 0 && (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3.5 rounded-lg bg-muted/30 border border-border/60 text-xs space-y-1"
            >
              <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                <span className="font-semibold text-foreground">{note.author}</span>
                <span className="font-mono">{note.createdAt}</span>
              </div>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap pt-0.5">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 pt-2">
        <Textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add an internal note or next action for this lead..."
          className="text-xs min-h-[80px] bg-background"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Saving notes requires the Admin API.</span>
          </div>
          <Button
            size="sm"
            disabled
            className="text-xs font-semibold self-end sm:self-auto opacity-70"
          >
            <StickyNote className="w-3.5 h-3.5 mr-1.5" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  )
}
