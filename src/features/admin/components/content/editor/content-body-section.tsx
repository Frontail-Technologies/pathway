'use client'

import { Textarea } from '@/components/ui/textarea'
import { Field, FormSection } from '../shared/content-form'
import type { ContentFormData } from './use-content-editor'

export function ContentBodySection({
  formData,
  errors,
  onChange,
}: {
  formData: ContentFormData
  errors: Record<string, string>
  onChange: <K extends keyof ContentFormData>(field: K, value: ContentFormData[K]) => void
}) {
  const wordCount = formData.body.trim() ? formData.body.trim().split(/\s+/).length : 0

  return (
    <FormSection id="body" title="Body" action={<span className="text-[13px] text-muted-foreground tabular-nums">{wordCount} words</span>}>
      <Field id="content-body" label="Text" required error={errors.body} hint="Markdown: # heading, **bold**, [link](url), - list, > quote.">
        <Textarea
          id="content-body"
          value={formData.body}
          onChange={(e) => onChange('body', e.target.value)}
          rows={16}
          aria-invalid={!!errors.body}
          className="font-mono text-sm leading-relaxed"
        />
      </Field>
    </FormSection>
  )
}
