'use client'

import type { NoteFormData } from './use-note-editor'
import { NoteStatus, noteStatusMap } from '@/features/notes/types/note'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const statusOptions: { value: NoteStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

const statusHelp: Record<NoteStatus, string> = {
  draft: 'Only visible in the admin.',
  published: 'Visible to students on the notes page.',
  archived: 'Hidden from students; kept for reference.',
}

export function NotePublishingSection({
  formData,
  onChange,
}: {
  formData: NoteFormData
  onChange: <K extends keyof NoteFormData>(field: K, value: NoteFormData[K]) => void
}) {
  return (
    <div id="publishing" className="space-y-4 rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6">
      <h2 className="text-[15px] font-semibold text-foreground">Publishing</h2>
      <div className="max-w-sm space-y-1.5">
        <Label htmlFor="note-status" className="text-sm font-medium text-foreground">
          Status <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.status}
          onValueChange={(val) => {
            if (val) onChange('status', val as NoteStatus)
          }}
        >
          <SelectTrigger id="note-status" className="w-full text-sm">
            <SelectValue placeholder="Select status">{noteStatusMap[formData.status]?.label ?? formData.status}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[13px] text-muted-foreground">{statusHelp[formData.status]}</p>
      </div>
    </div>
  )
}
