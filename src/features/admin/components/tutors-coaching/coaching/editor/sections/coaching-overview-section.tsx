import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditorSection, Field, StringListInput } from '../../../shared/editor-kit'
import type { CoachingFormData } from '../use-coaching-editor'

export function CoachingOverviewSection({
  formData,
  errors,
  updateField,
  addHighlight,
  removeHighlight,
}: {
  formData: CoachingFormData
  errors: Record<string, string>
  updateField: <K extends keyof CoachingFormData>(field: K, value: CoachingFormData[K]) => void
  addHighlight: (highlight: string) => void
  removeHighlight: (index: number) => void
}) {
  return (
    <EditorSection id="overview" title="Overview">
      <Field label="Tagline" htmlFor="coaching-program-label" required error={errors.programLabel}>
        <Input id="coaching-program-label" value={formData.programLabel} onChange={(event) => updateField('programLabel', event.target.value)} placeholder="e.g. JEE Main and Advanced preparation" aria-invalid={!!errors.programLabel} className="h-9 text-sm" />
      </Field>

      {formData.hasDetailPage ? (
        <Field label="About" htmlFor="coaching-about-copy">
          <Textarea id="coaching-about-copy" value={formData.aboutCopy} onChange={(event) => updateField('aboutCopy', event.target.value)} rows={5} className="text-sm" />
        </Field>
      ) : null}

      <StringListInput id="coaching-highlight" label="Highlights" placeholder="e.g. Foundation and repeater batches" items={formData.highlights} onAdd={addHighlight} onRemove={removeHighlight} />
    </EditorSection>
  )
}
