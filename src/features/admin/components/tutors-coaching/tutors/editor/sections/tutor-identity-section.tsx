import { Input } from '@/components/ui/input'
import { CheckboxField, EditorSection, Field } from '../../../shared/editor-kit'
import type { TutorFormData } from '../use-tutor-editor'

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export function TutorIdentitySection({
  formData,
  errors,
  updateField,
}: {
  formData: TutorFormData
  errors: Record<string, string>
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
              if (!formData.slug) updateField('slug', slugify(event.target.value))
            }}
            placeholder="e.g. Arjun Sharma"
            aria-invalid={!!errors.name}
            className="h-9 text-sm"
          />
        </Field>

        <Field label="URL" htmlFor="tutor-slug" hint={`Public address: /tutors/${formData.slug || 'name'}`}>
          <Input id="tutor-slug" value={formData.slug} onChange={(event) => updateField('slug', event.target.value)} placeholder="e.g. arjun-sharma" className="h-9 font-mono text-sm" />
        </Field>

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
