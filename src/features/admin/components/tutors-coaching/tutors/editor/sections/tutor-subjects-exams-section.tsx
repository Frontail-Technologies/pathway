import { ChipToggleGroup, EditorSection } from '../../../shared/editor-kit'
import { TUTOR_EXAM_OPTIONS, TUTOR_LEVEL_OPTIONS, TUTOR_SUBJECT_OPTIONS } from '../../../shared/tutor-coaching-constants'
import type { TutorFormData } from '../use-tutor-editor'

export function TutorSubjectsExamsSection({
  formData,
  errors,
  toggleArrayItem,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  toggleArrayItem: <T>(field: 'subjects' | 'exams' | 'studyLevels' | 'languages' | 'modes', item: T) => void
}) {
  return (
    <EditorSection id="subjects" title="Subjects and exams">
      <ChipToggleGroup label="Subjects" required error={errors.subjects} options={TUTOR_SUBJECT_OPTIONS} selected={formData.subjects} onToggle={(value) => toggleArrayItem('subjects', value)} />
      <ChipToggleGroup label="Exams" required error={errors.exams} options={TUTOR_EXAM_OPTIONS} selected={formData.exams} onToggle={(value) => toggleArrayItem('exams', value)} />
      <ChipToggleGroup label="Study levels" options={TUTOR_LEVEL_OPTIONS} selected={formData.studyLevels} onToggle={(value) => toggleArrayItem('studyLevels', value)} />
    </EditorSection>
  )
}
