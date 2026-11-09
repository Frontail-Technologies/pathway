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
  onFieldChange: (key: keyof NoteFormData, value: NoteFormData[keyof NoteFormData]) => void
}) {
  return (
    <div id="classification" className="rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-5">
      <div>
        <h2 className="text-[15px] font-semibold text-foreground">Subject and level</h2>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Used for filters on the public notes page.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="note-subject" className="text-sm font-medium text-foreground">
              Subject
            </Label>
            <Input
              id="note-subject"
              value={formData.subject}
              onChange={(e) => onFieldChange('subject', e.target.value)}
              placeholder="e.g. Organic Chemistry, Algorithms"
              className="text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-level" className="text-sm font-medium text-foreground">
              Study level
            </Label>
            <Select
              value={formData.studyLevel}
              onValueChange={(val) => {
                if (val) onFieldChange('studyLevel', val)
              }}
            >
              <SelectTrigger id="note-level" className="text-sm bg-background">
                <SelectValue placeholder="Select study level">
                  {studyLevelMap[formData.studyLevel]?.label ?? formatStudyLevel(formData.studyLevel)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undergraduate" className="text-sm">
                  Undergraduate
                </SelectItem>
                <SelectItem value="postgraduate" className="text-sm">
                  Postgraduate
                </SelectItem>
                <SelectItem value="class_12" className="text-sm">
                  Class 12
                </SelectItem>
                <SelectItem value="class_11" className="text-sm">
                  Class 11
                </SelectItem>
                <SelectItem value="class_10" className="text-sm">
                  Class 10
                </SelectItem>
                <SelectItem value="class_9" className="text-sm">
                  Class 9
                </SelectItem>
                <SelectItem value="diploma" className="text-sm">
                  Diploma
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-stream" className="text-sm font-medium text-foreground">
              Stream
            </Label>
            <Select
              value={formData.stream}
              onValueChange={(val) => {
                if (val) onFieldChange('stream', val)
              }}
            >
              <SelectTrigger id="note-stream" className="text-sm bg-background">
                <SelectValue placeholder="Select stream / discipline">
                  {formatStream(formData.stream)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {streamOptions.map((st) => (
                  <SelectItem key={st.value} value={st.value} className="text-sm">
                    {st.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="note-author" className="text-sm font-medium text-foreground">
              Author (optional)
            </Label>
            <Input
              id="note-author"
              value={formData.authorName}
              onChange={(e) => onFieldChange('authorName', e.target.value)}
              placeholder="Name"
              className="text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-provider" className="text-sm font-medium text-foreground">
              Provider or institution (optional)
            </Label>
            <Input
              id="note-provider"
              value={formData.providerName}
              onChange={(e) => onFieldChange('providerName', e.target.value)}
              placeholder="Name"
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
