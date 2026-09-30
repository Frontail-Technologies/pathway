import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { CoachingFormData } from '../use-coaching-editor'
import type { CoachingFacultyNote } from '@/features/coaching/data/coaching'

export function CoachingFacultySection({
  formData,
  addFacultyNote,
  removeFacultyNote,
}: {
  formData: CoachingFormData
  addFacultyNote: (note: CoachingFacultyNote) => void
  removeFacultyNote: (index: number) => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleAddNote = () => {
    if (!title.trim() || !description.trim()) return
    addFacultyNote({
      title: title.trim(),
      description: description.trim(),
    })
    setTitle('')
    setDescription('')
  }

  return (
    <div id="section-faculty" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Teaching Approach & Faculty Notes</h2>

      <div className="space-y-3 text-xs">
        <p className="text-muted-foreground">
          Document pedagogical structure, doubt support, and batch tracks. Individual faculty names and rank claims are omitted unless verified by institutional contracts.
        </p>

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/50 space-y-3">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Note Title</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Subject Faculty or Doubt-Clearing Support"
              className="text-xs h-8"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground block">Approach Description</span>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Classroom and hybrid sessions led by the institute's subject faculty."
              rows={2}
              className="text-xs resize-none"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddNote}
            className="h-8 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Note
          </Button>
        </div>

        <div className="space-y-2 pt-2">
          {formData.facultyNotes.map((note, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/40 border border-border/60 text-xs"
            >
              <div className="space-y-0.5 min-w-0">
                <span className="font-bold text-foreground">{note.title}</span>
                <p className="text-muted-foreground leading-relaxed">{note.description}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFacultyNote(idx)}
                aria-label={`Remove faculty note ${note.title}`}
                className="text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
