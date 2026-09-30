'use client'

import * as React from 'react'
import type { ContentFormData } from './use-content-editor'
import { ContentStatus } from '@/features/content/types/content'
import { contentStatusOptions } from '../shared/content-constants'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, Info } from 'lucide-react'

export function ContentPublishingSection({
  formData,
  isEditing,
  apiNotice,
  onChange,
  onSubmit,
}: {
  formData: ContentFormData
  isEditing: boolean
  apiNotice: string | null
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
  onSubmit: (e?: React.FormEvent) => void
}) {
  return (
    <div id="publishing" className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-border/50 pb-3">
        <Send className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Publication State & Deployment</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5 max-w-sm">
          <Label htmlFor="content-status" className="text-xs font-semibold">
            Publication Status <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.status}
            onValueChange={(val) => {
              if (val) onChange('status', val as ContentStatus)
            }}
          >
            <SelectTrigger id="content-status" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {contentStatusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-muted-foreground">
            {formData.status === 'published'
              ? 'Published entries are intended for active editorial rendering.'
              : formData.status === 'draft'
              ? 'Drafts are work-in-progress entries visible to platform admins.'
              : 'Archived entries are preserved for administrative history.'}
          </p>
        </div>

        {apiNotice && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400 font-medium">
            <Info className="w-4 h-4 shrink-0" />
            <span>{apiNotice}</span>
          </div>
        )}

        <div className="pt-2 flex items-center gap-3">
          <Button
            type="button"
            onClick={() => onSubmit()}
            className="h-9 px-5 text-xs font-semibold"
          >
            {isEditing ? 'Save Changes' : 'Create Content Entry'}
          </Button>
        </div>
      </div>
    </div>
  )
}
