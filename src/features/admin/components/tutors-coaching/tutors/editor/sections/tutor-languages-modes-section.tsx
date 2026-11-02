import { ChipToggleGroup, EditorSection } from '../../../shared/editor-kit'
import { TUTOR_LANGUAGE_OPTIONS, TUTOR_MODE_OPTIONS } from '../../../shared/tutor-coaching-constants'
import type { TutorFormData } from '../use-tutor-editor'

export function TutorLanguagesModesSection({
  formData,
  errors,
  toggleArrayItem,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  toggleArrayItem: <T>(field: 'subjects' | 'exams' | 'studyLevels' | 'languages' | 'modes', item: T) => void
}) {
  return (
    <EditorSection id="languages" title="Languages and mode">
      <ChipToggleGroup label="Languages" options={TUTOR_LANGUAGE_OPTIONS} selected={formData.languages} onToggle={(value) => toggleArrayItem('languages', value)} />
      <ChipToggleGroup label="Mode" required error={errors.modes} options={TUTOR_MODE_OPTIONS} selected={formData.modes} onToggle={(value) => toggleArrayItem('modes', value)} />
    </EditorSection>
  )
}
