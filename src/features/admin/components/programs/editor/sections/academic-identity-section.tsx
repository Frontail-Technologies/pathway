import * as React from 'react'
import { Input } from '@/components/ui/input'
import type { AdminProgramStudyLevel } from '@/features/admin/types/programs'
import { studyLevels, streams, studyModes } from '@/features/admin/constants/programs'
import { EditorSection, Field, FormSelect } from '../../shared/section-kit'

type StudyMode = 'Full-time' | 'Part-time' | 'Online' | 'Distance'

export type AcademicIdentitySectionProps = {
  name: string
  onNameChange: (val: string) => void
  degree: string
  onDegreeChange: (val: string) => void
  level: AdminProgramStudyLevel
  onLevelChange: (val: AdminProgramStudyLevel) => void
  stream: string
  onStreamChange: (val: string) => void
  specialization: string
  onSpecializationChange: (val: string) => void
  duration: string
  onDurationChange: (val: string) => void
  studyMode: StudyMode
  onStudyModeChange: (val: StudyMode) => void
  errors: Record<string, string>
}

export function AcademicIdentitySection({
  name,
  onNameChange,
  degree,
  onDegreeChange,
  level,
  onLevelChange,
  stream,
  onStreamChange,
  specialization,
  onSpecializationChange,
  duration,
  onDurationChange,
  studyMode,
  onStudyModeChange,
  errors,
}: AcademicIdentitySectionProps) {
  return (
    <EditorSection id="identity" title="Basics">
      <Field label="Course name" htmlFor="prog-name" required error={errors.name}>
        <Input id="prog-name" value={name} onChange={(e) => onNameChange(e.target.value)} placeholder="e.g. B.Tech Computer Science" aria-invalid={!!errors.name} className="text-sm" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Degree" htmlFor="prog-degree" required error={errors.degree}>
          <Input id="prog-degree" value={degree} onChange={(e) => onDegreeChange(e.target.value)} placeholder="e.g. B.Tech, M.Sc, MBA" aria-invalid={!!errors.degree} className="text-sm" />
        </Field>
        <Field label="Level" htmlFor="prog-level" required>
          <FormSelect id="prog-level" value={level} onChange={(val) => onLevelChange(val as AdminProgramStudyLevel)} options={studyLevels} placeholder="Choose level" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Stream" htmlFor="prog-stream" required>
          <FormSelect id="prog-stream" value={stream} onChange={onStreamChange} options={streams} placeholder="Choose stream" />
        </Field>
        <Field label="Specialisation" htmlFor="prog-spec">
          <Input id="prog-spec" value={specialization} onChange={(e) => onSpecializationChange(e.target.value)} placeholder="e.g. Artificial intelligence" className="text-sm" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Duration" htmlFor="prog-duration" required error={errors.duration}>
          <Input id="prog-duration" value={duration} onChange={(e) => onDurationChange(e.target.value)} placeholder="e.g. 4 Years" aria-invalid={!!errors.duration} className="text-sm" />
        </Field>
        <Field label="Study mode" htmlFor="prog-mode">
          <FormSelect id="prog-mode" value={studyMode} onChange={(val) => onStudyModeChange(val as StudyMode)} options={studyModes} placeholder="Choose mode" />
        </Field>
      </div>
    </EditorSection>
  )
}
