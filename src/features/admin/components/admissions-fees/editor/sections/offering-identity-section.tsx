import * as React from 'react'
import { Input } from '@/components/ui/input'
import { colleges } from '@/features/colleges/data/colleges'
import { courses } from '@/features/courses/data/courses'
import { streams, studyLevels, studyModes } from '@/features/admin/constants/programs'
import { EditorSection, Field, FormSelect } from '../../../programs/shared/section-kit'
import { admissionModes } from '../../shared/admissions-fees-constants'

type Level = 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certificate'
type StudyMode = 'Full-time' | 'Part-time' | 'Online' | 'Distance'
type AdmissionMode = 'Entrance Exam' | 'Merit Based' | 'Direct / Management'

const collegeOptions = colleges.map((c) => ({ value: c.id, label: `${c.name} (${c.city})` }))
const programOptions = courses.map((crs) => ({ value: crs.id, label: `${crs.name} (${crs.degree})` }))

export function OfferingIdentitySection({
  institutionId,
  onInstitutionIdChange,
  programId,
  onProgramIdChange,
  degree,
  onDegreeChange,
  level,
  onLevelChange,
  stream,
  onStreamChange,
  duration,
  onDurationChange,
  studyMode,
  onStudyModeChange,
  academicSession,
  onAcademicSessionChange,
  admissionMode,
  onAdmissionModeChange,
  isEdit,
  errors,
}: {
  institutionId: string
  onInstitutionIdChange: (val: string) => void
  programId: string
  onProgramIdChange: (val: string) => void
  degree: string
  onDegreeChange: (val: string) => void
  level: string
  onLevelChange: (val: Level) => void
  stream: string
  onStreamChange: (val: string) => void
  duration: string
  onDurationChange: (val: string) => void
  studyMode: string
  onStudyModeChange: (val: StudyMode) => void
  academicSession: string
  onAcademicSessionChange: (val: string) => void
  admissionMode: string
  onAdmissionModeChange: (val: AdmissionMode) => void
  isEdit: boolean
  errors: Record<string, string>
}) {
  return (
    <EditorSection id="identity" title="Basics">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Institution" htmlFor="off-inst" required error={errors.institutionId}>
          <FormSelect id="off-inst" value={institutionId} onChange={onInstitutionIdChange} options={collegeOptions} placeholder="Choose institution" disabled={isEdit} />
        </Field>
        <Field label="Course" htmlFor="off-prog" required error={errors.programId}>
          <FormSelect id="off-prog" value={programId} onChange={onProgramIdChange} options={programOptions} placeholder="Choose course" disabled={isEdit} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Degree" htmlFor="off-degree">
          <Input id="off-degree" value={degree} onChange={(e) => onDegreeChange(e.target.value)} placeholder="e.g. B.Tech, MBA" className="text-sm" />
        </Field>
        <Field label="Level" htmlFor="off-level">
          <FormSelect id="off-level" value={level} onChange={(val) => onLevelChange(val as Level)} options={studyLevels} placeholder="Choose level" />
        </Field>
        <Field label="Stream" htmlFor="off-stream">
          <FormSelect id="off-stream" value={stream} onChange={onStreamChange} options={streams} placeholder="Choose stream" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Session" htmlFor="off-session" required error={errors.academicSession}>
          <Input id="off-session" value={academicSession} onChange={(e) => onAcademicSessionChange(e.target.value)} placeholder="e.g. 2026-27" aria-invalid={!!errors.academicSession} className="text-sm" />
        </Field>
        <Field label="Duration" htmlFor="off-duration">
          <Input id="off-duration" value={duration} onChange={(e) => onDurationChange(e.target.value)} placeholder="e.g. 4 Years" className="text-sm" />
        </Field>
        <Field label="Study mode" htmlFor="off-mode">
          <FormSelect id="off-mode" value={studyMode} onChange={(val) => onStudyModeChange(val as StudyMode)} options={studyModes} placeholder="Choose mode" />
        </Field>
      </div>

      <Field label="Admission route" htmlFor="off-admission" className="sm:max-w-sm">
        <FormSelect id="off-admission" value={admissionMode} onChange={(val) => onAdmissionModeChange(val as AdmissionMode)} options={admissionModes} placeholder="Choose route" />
      </Field>
    </EditorSection>
  )
}
