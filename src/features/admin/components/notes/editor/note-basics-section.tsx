'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { noteTypeMap, NoteType } from '@/features/notes/types/note'
import type { NoteFormData } from './use-note-editor'
import { sentenceCase } from '../shared/note-meta'

export function NoteBasicsSection({
  formData,
  errors,
  onTitleChange,
  onSlugChange,
  onFieldChange,
}: {
  formData: NoteFormData
  errors: Record<string, string>
  onTitleChange: (title: string) => void
  onSlugChange: (slug: string) => void
  onFieldChange: (key: keyof NoteFormData, value: NoteFormData[keyof NoteFormData]) => void
}) {
  return (
    <div id="basics" className="rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-5">
      <div>
        <h2 className="text-[15px] font-semibold text-foreground">Basics</h2>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Title, link and description.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="note-title" className="text-sm font-medium text-foreground">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="note-title"
            value={formData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Organic chemistry reaction mechanisms"
            className="text-sm font-medium"
          />
          {errors.title ? (
            <p className="text-[13px] text-destructive">{errors.title}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Shown on the note card and in search.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="note-slug" className="text-sm font-medium text-foreground">
              URL slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="note-slug"
              value={formData.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="organic-chemistry-reaction-mechanisms"
              className="text-sm font-mono"
            />
            {errors.slug ? (
              <p className="text-[13px] text-destructive">{errors.slug}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Public link: /notes/{formData.slug || '[slug]'}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-type" className="text-sm font-medium text-foreground">
              Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.noteType}
              onValueChange={(val) => {
                if (val) onFieldChange('noteType', val as NoteType)
              }}
            >
              <SelectTrigger id="note-type" className="text-sm bg-background">
                <SelectValue placeholder="Select material type">
                  {sentenceCase(noteTypeMap[formData.noteType]?.label ?? formData.noteType)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(noteTypeMap) as NoteType[]).map((key) => (
                  <SelectItem key={key} value={key} className="text-sm">
                    {sentenceCase(noteTypeMap[key].label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="note-short-desc" className="text-sm font-medium text-foreground">
            Short description
          </Label>
          <Input
            id="note-short-desc"
            value={formData.shortDescription}
            onChange={(e) => onFieldChange('shortDescription', e.target.value)}
            placeholder="One line shown under the title"
            className="text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="note-desc" className="text-sm font-medium text-foreground">
            Description
          </Label>
          <Textarea
            id="note-desc"
            rows={4}
            value={formData.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Chapters covered, key topics and who it's for"
            className="text-sm resize-y"
          />
        </div>
      </div>
    </div>
  )
}
