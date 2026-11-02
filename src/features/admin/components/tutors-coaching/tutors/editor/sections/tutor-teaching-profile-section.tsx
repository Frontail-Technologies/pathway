import { EditorSection, StringListInput } from '../../../shared/editor-kit'
import type { TutorFormData } from '../use-tutor-editor'

export function TutorTeachingProfileSection({
  formData,
  addArrayString,
  removeArrayString,
}: {
  formData: TutorFormData
  addArrayString: (field: 'whoHelps' | 'traits', value: string) => void
  removeArrayString: (field: 'whoHelps' | 'traits', index: number) => void
}) {
  return (
    <EditorSection id="teaching" title="Teaching approach">
      <StringListInput
        id="tutor-traits"
        label="Traits"
        hint="Short phrases about how the tutor teaches. Don't promise ranks or results."
        placeholder="e.g. Step-by-step problem solving"
        items={formData.traits}
        onAdd={(value) => addArrayString('traits', value)}
        onRemove={(index) => removeArrayString('traits', index)}
      />
    </EditorSection>
  )
}
