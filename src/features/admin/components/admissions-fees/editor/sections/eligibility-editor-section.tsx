import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EditorSection, Field, RemovableChip } from '../../../programs/shared/section-kit'

export function EligibilityEditorSection({
  eligibilitySummary,
  onEligibilitySummaryChange,
  academicQualification,
  onAcademicQualificationChange,
  mandatorySubjects,
  onMandatorySubjectsChange,
  minimumMarks,
  onMinimumMarksChange,
  importantRequirements,
  newReqInput,
  onNewReqInputChange,
  onAddRequirement,
  onRemoveRequirement,
}: {
  eligibilitySummary: string
  onEligibilitySummaryChange: (val: string) => void
  academicQualification: string
  onAcademicQualificationChange: (val: string) => void
  mandatorySubjects: string
  onMandatorySubjectsChange: (val: string) => void
  minimumMarks: string
  onMinimumMarksChange: (val: string) => void
  importantRequirements: string[]
  newReqInput: string
  onNewReqInputChange: (val: string) => void
  onAddRequirement: () => void
  onRemoveRequirement: (idx: number) => void
}) {
  return (
    <EditorSection id="eligibility" title="Eligibility">
      <Field label="Summary" htmlFor="elig-summary">
        <Input id="elig-summary" value={eligibilitySummary} onChange={(e) => onEligibilitySummaryChange(e.target.value)} placeholder="e.g. 10+2 with PCM and a JEE Advanced rank" className="text-sm" />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Qualification" htmlFor="elig-qual">
          <Input id="elig-qual" value={academicQualification} onChange={(e) => onAcademicQualificationChange(e.target.value)} placeholder="e.g. 10+2 or equivalent" className="text-sm" />
        </Field>
        <Field label="Required subjects" htmlFor="elig-subj">
          <Input id="elig-subj" value={mandatorySubjects} onChange={(e) => onMandatorySubjectsChange(e.target.value)} placeholder="e.g. Physics, Mathematics" className="text-sm" />
        </Field>
        <Field label="Minimum marks" htmlFor="elig-marks">
          <Input id="elig-marks" value={minimumMarks} onChange={(e) => onMinimumMarksChange(e.target.value)} placeholder="e.g. 75% in class 12" className="text-sm" />
        </Field>
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <p className="text-sm font-medium text-foreground">Documents students must provide</p>
        <div className="flex flex-wrap gap-1.5">
          {importantRequirements.map((req, idx) => (
            <RemovableChip key={`${req}-${idx}`} onRemove={() => onRemoveRequirement(idx)} removeLabel={`Remove ${req}`}>
              {req}
            </RemovableChip>
          ))}
          {importantRequirements.length === 0 ? <p className="text-[13px] text-muted-foreground">None added yet.</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={newReqInput}
            onChange={(e) => onNewReqInputChange(e.target.value)}
            placeholder="e.g. Domicile certificate"
            aria-label="Add a required document"
            className="text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onAddRequirement()
              }
            }}
          />
          <Button type="button" variant="outline" onClick={onAddRequirement} className="shrink-0">
            Add
          </Button>
        </div>
      </div>
    </EditorSection>
  )
}
