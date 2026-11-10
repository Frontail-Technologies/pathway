import { Input } from '@/components/ui/input'
import { CheckboxField, EditorSection, Field } from '../../../shared/editor-kit'
import type { TutorFormData } from '../use-tutor-editor'
import { slugify } from '@/features/admin/utils/slug'
import { UrlPreview } from '@/features/admin/components/kit'

export function TutorIdentitySection({
  formData,
  errors,
  locked,
  updateField,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  locked: boolean
  updateField: <K extends keyof TutorFormData>(field: K, value: TutorFormData[K]) => void
}) {
  return (
    <EditorSection id="identity" title="Basics">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="tutor-name" required error={errors.name}>
          <Input
            id="tutor-name"
            value={formData.name}
            onChange={(event) => {
              updateField('name', event.target.value)
              if (!locked) updateField('slug', slugify(event.target.value))
            }}
            placeholder="e.g. Arjun Sharma"
            aria-invalid={!!errors.name}
            className="h-9 text-sm"
          />
        </Field>

        <UrlPreview prefix="/tutor/" slug={formData.slug} locked={locked} error={errors.slug} />

        <Field label="Headline" htmlFor="tutor-headline" required error={errors.headline} className="sm:col-span-2">
          <Input id="tutor-headline" value={formData.headline} onChange={(event) => updateField('headline', event.target.value)} placeholder="e.g. Physics tutor for JEE and NEET" aria-invalid={!!errors.headline} className="h-9 text-sm" />
        </Field>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:gap-8">
        <CheckboxField label="Has a public profile page" hint="Otherwise the tutor appears in listings only." checked={formData.hasDetailPage} onChange={(value) => updateField('hasDetailPage', value)} />
        <CheckboxField label="Featured" hint="Shown first in tutor listings." checked={formData.featured} onChange={(value) => updateField('featured', value)} />
      </div>
    </EditorSection>
  )
}
