'use client'

import type { BannerStatus } from '@/features/banners/types/banner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { bannerStatusHints, bannerStatusLabels } from '../shared/banner-constants'
import { Field, FormSection } from '../shared/banner-form'
import type { BannerFormData } from './use-banner-editor'

const MANUAL_STATUSES: BannerStatus[] = ['draft', 'active', 'paused']
const statusItems = MANUAL_STATUSES.map((value) => ({ value, label: bannerStatusLabels[value] }))

export function BannerPublishingSection({ formData, onChange }: { formData: BannerFormData; onChange: (key: keyof BannerFormData, value: string) => void }) {
  return (
    <FormSection id="publishing" title="Publishing">
      <Field id="banner-status" label="Status" className="max-w-xs">
        <Select value={formData.status} onValueChange={(value) => onChange('status', (value as string | null) ?? 'draft')} items={statusItems}>
          <SelectTrigger id="banner-status" className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </FormSection>
  )
}
