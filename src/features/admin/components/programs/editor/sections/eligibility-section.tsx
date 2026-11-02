import * as React from 'react'
import { Input } from '@/components/ui/input'
import { EditorSection, Field } from '../../shared/section-kit'

export type EligibilitySectionProps = {
  eligibilitySummary: string
  onEligibilitySummaryChange: (val: string) => void
  academicQualification: string
  onAcademicQualificationChange: (val: string) => void
  mandatorySubjects: string
  onMandatorySubjectsChange: (val: string) => void
  minimumMarks: string
  onMinimumMarksChange: (val: string) => void
}

export function EligibilitySection({
  eligibilitySummary,
  onEligibilitySummaryChange,
  academicQualification,
  onAcademicQualificationChange,
  mandatorySubjects,
  onMandatorySubjectsChange,
  minimumMarks,
  onMinimumMarksChange,
}: EligibilitySectionProps) {
  return (
    <EditorSection id="eligibility" title="Eligibility">
      <Field label="Summary" htmlFor="elig-summary">
        <Input id="elig-summary" value={eligibilitySummary} onChange={(e) => onEligibilitySummaryChange(e.target.value)} placeholder="e.g. 10+2 with Physics, Chemistry and Mathematics" className="text-sm" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Qualification" htmlFor="elig-qual">
          <Input id="elig-qual" value={academicQualification} onChange={(e) => onAcademicQualificationChange(e.target.value)} placeholder="e.g. 10+2 or equivalent" className="text-sm" />
        </Field>
        <Field label="Required subjects" htmlFor="elig-subj">
          <Input id="elig-subj" value={mandatorySubjects} onChange={(e) => onMandatorySubjectsChange(e.target.value)} placeholder="e.g. Physics, Mathematics, Chemistry" className="text-sm" />
        </Field>
      </div>

      <Field label="Minimum marks" htmlFor="elig-marks">
        <Input id="elig-marks" value={minimumMarks} onChange={(e) => onMinimumMarksChange(e.target.value)} placeholder="e.g. 60% aggregate in PCM" className="text-sm" />
      </Field>
    </EditorSection>
  )
}
