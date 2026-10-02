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
    <div id="basics" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Basic Information</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Title, slug identifier, study material format, and editorial description.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="note-title" className="text-xs font-semibold text-foreground">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="note-title"
            value={formData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Complete Organic Chemistry Reaction Mechanisms & Revision Sheet"
            className="text-xs font-medium"
          />
          {errors.title ? (
            <p className="text-[11px] text-destructive">{errors.title}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground">
              Descriptive title for marketplace search and discovery.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="note-slug" className="text-xs font-semibold text-foreground">
              Public URL Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="note-slug"
              value={formData.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="organic-chemistry-reaction-mechanisms"
              className="text-xs font-mono"
            />
            {errors.slug ? (
              <p className="text-[11px] text-destructive">{errors.slug}</p>
            ) : (
              <p className="text-[10px] text-muted-foreground">
                Canonical URL path at /notes/{formData.slug || '[slug]'}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-type" className="text-xs font-semibold text-foreground">
              Material Format / Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.noteType}
              onValueChange={(val) => {
                if (val) onFieldChange('noteType', val as NoteType)
              }}
            >
              <SelectTrigger id="note-type" className="text-xs bg-background">
                <SelectValue placeholder="Select material type">
                  {noteTypeMap[formData.noteType]?.label ?? formData.noteType}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(noteTypeMap) as NoteType[]).map((key) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {noteTypeMap[key].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="note-short-desc" className="text-xs font-semibold text-foreground">
            Short Description / Excerpt
          </Label>
          <Input
            id="note-short-desc"
            value={formData.shortDescription}
            onChange={(e) => onFieldChange('shortDescription', e.target.value)}
            placeholder="e.g. High-yield summary covering electrophilic addition, nucleophilic substitution, and named reactions."
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="note-desc" className="text-xs font-semibold text-foreground">
            Full Description & Contents
          </Label>
          <Textarea
            id="note-desc"
            rows={4}
            value={formData.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Detailed chapter breakdown, key takeaways, covered exam topics, and study recommendations..."
            className="text-xs resize-y"
          />
        </div>
      </div>
    </div>
  )
}
