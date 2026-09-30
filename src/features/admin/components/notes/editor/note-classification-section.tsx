'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  studyLevelMap,
  formatStudyLevel,
  streamOptions,
  formatStream,
} from '@/features/notes/types/note'
import type { NoteFormData } from './use-note-editor'

export function NoteClassificationSection({
  formData,
  onFieldChange,
}: {
  formData: NoteFormData
  onFieldChange: (key: keyof NoteFormData, value: any) => void
}) {
  return (
    <div id="classification" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Academic Scope & Classification</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Subject taxonomy, study level, and curriculum stream categorization.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="note-subject" className="text-xs font-semibold text-foreground">
              Subject
            </Label>
            <Input
              id="note-subject"
              value={formData.subject}
              onChange={(e) => onFieldChange('subject', e.target.value)}
              placeholder="e.g. Organic Chemistry, Algorithms"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-level" className="text-xs font-semibold text-foreground">
              Study Level
            </Label>
            <Select
              value={formData.studyLevel}
              onValueChange={(val) => {
                if (val) onFieldChange('studyLevel', val)
              }}
            >
              <SelectTrigger id="note-level" className="text-xs bg-background">
                <SelectValue placeholder="Select study level">
                  {studyLevelMap[formData.studyLevel]?.label ?? formatStudyLevel(formData.studyLevel)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undergraduate" className="text-xs">
                  Undergraduate
                </SelectItem>
                <SelectItem value="postgraduate" className="text-xs">
                  Postgraduate
                </SelectItem>
                <SelectItem value="class_12" className="text-xs">
                  Class 12
                </SelectItem>
                <SelectItem value="class_11" className="text-xs">
                  Class 11
                </SelectItem>
                <SelectItem value="class_10" className="text-xs">
                  Class 10
                </SelectItem>
                <SelectItem value="class_9" className="text-xs">
                  Class 9
                </SelectItem>
                <SelectItem value="diploma" className="text-xs">
                  Diploma
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-stream" className="text-xs font-semibold text-foreground">
              Stream / Discipline
            </Label>
            <Select
              value={formData.stream}
              onValueChange={(val) => {
                if (val) onFieldChange('stream', val)
              }}
            >
              <SelectTrigger id="note-stream" className="text-xs bg-background">
                <SelectValue placeholder="Select stream / discipline">
                  {formatStream(formData.stream)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {streamOptions.map((st) => (
                  <SelectItem key={st.value} value={st.value} className="text-xs">
                    {st.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="note-author" className="text-xs font-semibold text-foreground">
              Author Name (Optional)
            </Label>
            <Input
              id="note-author"
              value={formData.authorName}
              onChange={(e) => onFieldChange('authorName', e.target.value)}
              placeholder="Optional author name"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-provider" className="text-xs font-semibold text-foreground">
              Institution / Provider Name (Optional)
            </Label>
            <Input
              id="note-provider"
              value={formData.providerName}
              onChange={(e) => onFieldChange('providerName', e.target.value)}
              placeholder="Optional institution or provider"
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
