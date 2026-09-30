import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

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
    <section id="eligibility" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Eligibility Criteria
      </h2>

      <div className="space-y-1.5">
        <Label htmlFor="elig-summary" className="text-xs font-semibold">
          Eligibility Summary
        </Label>
        <Input
          id="elig-summary"
          value={eligibilitySummary}
          onChange={(e) => onEligibilitySummaryChange(e.target.value)}
          placeholder="e.g. 10+2 with PCM, Qualified JEE Advanced rank"
          className="text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        <div className="space-y-1.5">
          <Label htmlFor="elig-marks" className="text-xs font-semibold">
            Minimum Marks Threshold
          </Label>
          <Input
            id="elig-marks"
            value={minimumMarks}
            onChange={(e) => onMinimumMarksChange(e.target.value)}
            placeholder="e.g. 75% aggregate in 12th board examination"
            className="text-xs"
          />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <span className="text-xs font-bold text-foreground block">
          Required Certificates & Documentation ({importantRequirements.length})
        </span>

        <div className="flex flex-wrap gap-2">
          {importantRequirements.map((req, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted/60 px-2.5 py-1 rounded-md border border-border/70 text-foreground"
            >
              <span>{req}</span>
              <button
                type="button"
                onClick={() => onRemoveRequirement(idx)}
                className="text-muted-foreground hover:text-destructive transition-colors text-sm"
                aria-label={`Remove requirement ${req}`}
              >
                ×
              </button>
            </span>
          ))}
          {importantRequirements.length === 0 && (
            <span className="text-xs text-muted-foreground italic">
              No mandatory certificates specified yet.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Input
            value={newReqInput}
            onChange={(e) => onNewReqInputChange(e.target.value)}
            placeholder="Add required certificate (e.g. Domicile, Medical fitness, Category certificate)..."
            className="text-xs h-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onAddRequirement()
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddRequirement}
            className="text-xs h-8 shrink-0 bg-card"
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-primary" />
            Add
          </Button>
        </div>
      </div>
    </section>
  )
}
