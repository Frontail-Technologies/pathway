import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { EditorSection, Field } from '../../shared/section-kit'

export type OverviewSectionProps = {
  description: string
  onDescriptionChange: (val: string) => void
}

export function OverviewSection({ description, onDescriptionChange }: OverviewSectionProps) {
  return (
    <EditorSection id="overview" title="Overview">
      <Field label="Description" htmlFor="prog-desc" hint="What the course covers and what students learn.">
        <Textarea id="prog-desc" value={description} onChange={(e) => onDescriptionChange(e.target.value)} rows={4} className="resize-none text-sm" />
      </Field>
    </EditorSection>
  )
}
