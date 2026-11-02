'use client'

import type { ContentStatus } from '@/features/content/types/content'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { contentStatusHints, contentStatusOptions } from '../shared/content-constants'
import { Field, FormSection } from '../shared/content-form'
import type { ContentFormData } from './use-content-editor'

export function ContentPublishingSection({
  formData,
  onChange,
}: {
  formData: ContentFormData
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
}) {
  return (
    <FormSection id="publishing" title="Publishing">
      <Field id="content-status" label="Status" required hint={contentStatusHints[formData.status]} className="max-w-sm">
        <Select value={formData.status} onValueChange={(value) => value && onChange('status', value as ContentStatus)} items={contentStatusOptions}>
          <SelectTrigger id="content-status" className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contentStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </FormSection>
  )
}
