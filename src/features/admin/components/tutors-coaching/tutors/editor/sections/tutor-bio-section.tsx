import { Textarea } from '@/components/ui/textarea'
import { EditorSection, Field, StringListInput } from '../../../shared/editor-kit'
import type { TutorFormData } from '../use-tutor-editor'

export function TutorBioSection({
  formData,
  errors,
  updateField,
  addArrayString,
  removeArrayString,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  updateField: <K extends keyof TutorFormData>(field: K, value: TutorFormData[K]) => void
  addArrayString: (field: 'whoHelps' | 'traits', value: string) => void
  removeArrayString: (field: 'whoHelps' | 'traits', index: number) => void
}) {
  return (
    <EditorSection id="bio" title="Bio" description={formData.hasDetailPage ? undefined : 'Full bio and audience appear only when the tutor has a public profile page.'}>
      <Field label="Summary" htmlFor="tutor-intro" required error={errors.intro} hint="One or two sentences shown on listing cards.">
        <Textarea
          id="tutor-intro"
          value={formData.intro}
          onChange={(event) => updateField('intro', event.target.value)}
          placeholder="e.g. Concept-first Physics teaching with regular problem-solving practice."
          rows={2}
          aria-invalid={!!errors.intro}
          className="resize-none text-sm"
        />
      </Field>

      {formData.hasDetailPage ? (
        <>
          <Field label="Full bio" htmlFor="tutor-long-bio" hint="How sessions run, how doubts are handled, how revision works.">
            <Textarea id="tutor-long-bio" value={formData.longBio} onChange={(event) => updateField('longBio', event.target.value)} rows={5} className="text-sm" />
          </Field>

          <StringListInput
            id="tutor-who-helps"
            label="Who this tutor helps"
            placeholder="e.g. Class 11–12 students strengthening Physics concepts"
            items={formData.whoHelps}
            onAdd={(value) => addArrayString('whoHelps', value)}
            onRemove={(index) => removeArrayString('whoHelps', index)}
          />
        </>
      ) : null}
    </EditorSection>
  )
}
