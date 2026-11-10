import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CoachingProviderType } from '@/features/coaching/data/coaching'
import { CheckboxField, EditorSection, Field } from '../../../shared/editor-kit'
import { COACHING_PROVIDER_TYPES, sentenceCase } from '../../../shared/tutor-coaching-constants'
import type { CoachingFormData } from '../use-coaching-editor'
import { slugify } from '@/features/admin/utils/slug'
import { UrlPreview } from '@/features/admin/components/kit'

const TYPE_ITEMS = COACHING_PROVIDER_TYPES.map((value) => ({ value, label: sentenceCase(value) }))

export function CoachingIdentitySection({
  formData,
  errors,
  locked,
  updateField,
}: {
  formData: CoachingFormData
  errors: Record<string, string>
  locked: boolean
  updateField: <K extends keyof CoachingFormData>(field: K, value: CoachingFormData[K]) => void
}) {
  return (
    <EditorSection id="identity" title="Basics">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="coaching-name" required error={errors.name} className="sm:col-span-2">
          <Input
            id="coaching-name"
            value={formData.name}
            onChange={(event) => {
              updateField('name', event.target.value)
              if (!locked) updateField('slug', slugify(event.target.value))
            }}
            placeholder="e.g. Apex JEE Academy"
            aria-invalid={!!errors.name}
            className="h-9 text-sm"
          />
        </Field>

        <UrlPreview prefix="/coaching/" slug={formData.slug} locked={locked} error={errors.slug} />

        <Field label="Type" required>
          <Select value={formData.providerType} onValueChange={(value) => updateField('providerType', (value || 'Coaching Institute') as CoachingProviderType)} items={TYPE_ITEMS}>
            <SelectTrigger aria-label="Type" className="h-9 w-full bg-card text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPE_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="City" htmlFor="coaching-location" required error={errors.location} hint="Use “Online” for online-only providers.">
          <Input id="coaching-location" value={formData.location} onChange={(event) => updateField('location', event.target.value)} placeholder="e.g. Kota" aria-invalid={!!errors.location} className="h-9 text-sm" />
        </Field>

        <Field label="State" htmlFor="coaching-state" hint="Leave empty for online-only providers.">
          <Input id="coaching-state" value={formData.state} onChange={(event) => updateField('state', event.target.value)} placeholder="e.g. Rajasthan" className="h-9 text-sm" />
        </Field>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:gap-8">
        <CheckboxField label="Has a public profile page" hint="Otherwise the provider appears in listings only." checked={formData.hasDetailPage} onChange={(value) => updateField('hasDetailPage', value)} />
        <CheckboxField label="Featured" hint="Shown first in coaching listings." checked={formData.featured} onChange={(value) => updateField('featured', value)} />
      </div>
    </EditorSection>
  )
}
