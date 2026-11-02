'use client'

import { Input } from '@/components/ui/input'
import { Field, FormSection } from '../shared/banner-form'
import type { BannerFormData } from './use-banner-editor'

export function BannerScheduleSection({ formData, errors, onChange }: { formData: BannerFormData; errors: Record<string, string>; onChange: (key: keyof BannerFormData, value: string) => void }) {
  return (
    <FormSection id="schedule" title="Schedule" description="Optional. With a future start date the banner shows as scheduled until then.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="banner-starts-at" label="Starts" hint="Leave blank to start right away.">
          <Input id="banner-starts-at" type="datetime-local" value={formData.startsAt} onChange={(e) => onChange('startsAt', e.target.value)} className="text-sm" />
        </Field>
        <Field id="banner-ends-at" label="Ends" error={errors.endsAt} hint="Leave blank to run with no end date.">
          <Input id="banner-ends-at" type="datetime-local" value={formData.endsAt} onChange={(e) => onChange('endsAt', e.target.value)} aria-invalid={!!errors.endsAt} className="text-sm" />
        </Field>
      </div>
    </FormSection>
  )
}
