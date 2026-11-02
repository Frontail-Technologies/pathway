'use client'

import type { ContentType } from '@/features/content/types/content'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { contentTypeOptions } from '../shared/content-constants'
import { Field, FormSection } from '../shared/content-form'
import type { ContentFormData } from './use-content-editor'

export function ContentBasicsSection({
  formData,
  errors,
  onTitleChange,
  onSlugChange,
  onChange,
}: {
  formData: ContentFormData
  errors: Record<string, string>
  onTitleChange: (title: string) => void
  onSlugChange: (slug: string) => void
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
}) {
  return (
    <FormSection id="basics" title="Basics">
      <Field id="content-title" label="Title" required error={errors.title}>
        <Input id="content-title" value={formData.title} onChange={(e) => onTitleChange(e.target.value)} placeholder="e.g. JEE Main 2026 counselling guide" aria-invalid={!!errors.title} className="text-sm" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="content-slug" label="Slug" required error={errors.slug} hint="Filled in from the title. Letters, numbers and dashes only.">
          <Input id="content-slug" value={formData.slug} onChange={(e) => onSlugChange(e.target.value)} placeholder="jee-main-2026-counselling-guide" aria-invalid={!!errors.slug} className="font-mono text-sm" />
        </Field>

        <Field id="content-type" label="Type" required>
          <Select value={formData.type} onValueChange={(value) => value && onChange('type', value as ContentType)} items={contentTypeOptions}>
            <SelectTrigger id="content-type" className="w-full text-sm">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {contentTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="content-excerpt" label="Excerpt" hint="One or two sentences shown on cards and in search results.">
        <Textarea id="content-excerpt" value={formData.excerpt} onChange={(e) => onChange('excerpt', e.target.value)} rows={2} className="resize-none text-sm" />
      </Field>
    </FormSection>
  )
}
