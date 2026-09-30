import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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
    <section id="eligibility" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Eligibility
      </h2>

      <div className="space-y-1.5">
        <Label htmlFor="elig-summary" className="text-xs font-semibold">
          Eligibility Summary
        </Label>
        <Input
          id="elig-summary"
          value={eligibilitySummary}
          onChange={(e) => onEligibilitySummaryChange(e.target.value)}
          placeholder="e.g. 10+2 with Physics, Chemistry & Mathematics"
          className="text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="elig-qual" className="text-xs font-semibold">
            Academic Qualification
          </Label>
          <Input
            id="elig-qual"
            value={academicQualification}
            onChange={(e) => onAcademicQualificationChange(e.target.value)}
            placeholder="e.g. 10+2 or equivalent examination"
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="elig-subj" className="text-xs font-semibold">
            Mandatory Subjects
          </Label>
          <Input
            id="elig-subj"
            value={mandatorySubjects}
            onChange={(e) => onMandatorySubjectsChange(e.target.value)}
            placeholder="e.g. Physics, Mathematics, and Chemistry"
            className="text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="elig-marks" className="text-xs font-semibold">
          Minimum Marks Threshold
        </Label>
        <Input
          id="elig-marks"
          value={minimumMarks}
          onChange={(e) => onMinimumMarksChange(e.target.value)}
          placeholder="e.g. 60% aggregate in PCM in qualifying board examination"
          className="text-xs"
        />
      </div>
    </section>
  )
}
