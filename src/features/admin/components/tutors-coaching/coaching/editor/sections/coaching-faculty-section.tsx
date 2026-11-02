import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { CoachingFacultyNote } from '@/features/coaching/data/coaching'
import { EditorSection, Field, RemoveButton } from '../../../shared/editor-kit'
import type { CoachingFormData } from '../use-coaching-editor'

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
  const add = () => {
    if (!title.trim() || !description.trim()) return
    addFacultyNote({ title: title.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
  }

  return (
    <EditorSection id="faculty" title="Teaching approach" description="How teaching and doubt support work. Leave out faculty names and rank claims unless the provider has confirmed them.">
      {formData.facultyNotes.length > 0 ? (
        <ul className="divide-y divide-border rounded-md border border-border">
          {formData.facultyNotes.map((note, index) => (
            <li key={`${note.title}-${index}`} className="flex items-start justify-between gap-3 px-3 py-2.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{note.title}</p>
                <p className="text-sm text-muted-foreground">{note.description}</p>
              </div>
              <RemoveButton label={`Remove note ${note.title}`} onClick={() => removeFacultyNote(index)} />
            </li>
          ))}
        </ul>
      ) : null}

      <div className="space-y-4 rounded-md border border-dashed border-border p-4">
        <p className="text-sm font-medium text-foreground">Add a note</p>
        <Field label="Title" htmlFor="coaching-note-title">
          <Input id="coaching-note-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Doubt-clearing support" className="h-9 text-sm" />
        </Field>
        <Field label="Description" htmlFor="coaching-note-description">
          <Textarea id="coaching-note-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="e.g. Classroom and hybrid sessions led by the institute's subject faculty." rows={2} className="resize-none text-sm" />
        </Field>
        <Button type="button" variant="outline" size="sm" onClick={add} disabled={!title.trim() || !description.trim()} className="gap-1.5">
          <Plus className="size-4" aria-hidden="true" />
          Add note
        </Button>
      </div>
    </EditorSection>
  )
}
