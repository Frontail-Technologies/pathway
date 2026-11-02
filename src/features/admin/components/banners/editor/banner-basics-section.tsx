'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FormSection } from '../shared/banner-form'
import type { BannerFormData } from './use-banner-editor'

export function BannerBasicsSection({ formData, errors, onChange }: { formData: BannerFormData; errors: Record<string, string>; onChange: (key: keyof BannerFormData, value: string) => void }) {
  return (
    <FormSection id="basics" title="Copy">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="banner-name" label="Name" required error={errors.name} hint="Only admins see this.">
          <Input id="banner-name" value={formData.name} onChange={(e) => onChange('name', e.target.value)} placeholder="e.g. Admissions 2026 callout" aria-invalid={!!errors.name} className="text-sm" />
        </Field>
        <Field id="banner-eyebrow" label="Label above headline" hint="Optional, e.g. Admissions open.">
          <Input id="banner-eyebrow" value={formData.eyebrow} onChange={(e) => onChange('eyebrow', e.target.value)} className="text-sm" />
        </Field>
      </div>

      <Field id="banner-title" label="Headline" required error={errors.title}>
        <Input id="banner-title" value={formData.title} onChange={(e) => onChange('title', e.target.value)} placeholder="e.g. Know your chances at top engineering colleges" aria-invalid={!!errors.title} className="text-sm" />
      </Field>

      <Field id="banner-description" label="Supporting text">
        <Textarea id="banner-description" rows={3} value={formData.description} onChange={(e) => onChange('description', e.target.value)} className="resize-y text-sm" />
      </Field>
    </FormSection>
  )
}
