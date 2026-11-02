import { ChipToggleGroup, EditorSection } from '../../../shared/editor-kit'
import { COACHING_EXAM_OPTIONS, COACHING_MODE_OPTIONS, TUTOR_SUBJECT_OPTIONS } from '../../../shared/tutor-coaching-constants'
import type { CoachingFormData } from '../use-coaching-editor'

export function CoachingLocationModesSection({
  formData,
  errors,
  toggleArrayItem,
}: {
  formData: CoachingFormData
  errors: Record<string, string>
  toggleArrayItem: <T>(field: 'exams' | 'subjects' | 'modes' | 'courseTypes', item: T) => void
}) {
  return (
    <EditorSection id="location" title="Coverage and mode">
      <ChipToggleGroup label="Mode" required error={errors.modes} options={COACHING_MODE_OPTIONS} selected={formData.modes} onToggle={(value) => toggleArrayItem('modes', value)} />
      <ChipToggleGroup label="Exams" required error={errors.exams} options={COACHING_EXAM_OPTIONS} selected={formData.exams} onToggle={(value) => toggleArrayItem('exams', value)} />
      <ChipToggleGroup label="Subjects" required error={errors.subjects} options={TUTOR_SUBJECT_OPTIONS} selected={formData.subjects} onToggle={(value) => toggleArrayItem('subjects', value)} />
    </EditorSection>
  )
}
