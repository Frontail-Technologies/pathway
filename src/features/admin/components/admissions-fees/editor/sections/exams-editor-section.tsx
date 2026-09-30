import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { exams as canonicalExams } from '@/features/exams/data/exams'

const examSelectOptions = canonicalExams.map((ex) => ({
  value: ex.shortName,
  label: `${ex.shortName} — ${ex.name}`,
}))

export function ExamsEditorSection({
  selectedExams,
  examSelectValue,
  customExamInput,
  onCustomExamInputChange,
  onAddExam,
  onAddCustomExam,
  onRemoveExam,
  counsellingBody,
  onCounsellingBodyChange,
  selectionProcess,
  onSelectionProcessChange,
}: {
  selectedExams: string[]
  examSelectValue: string
  customExamInput: string
  onCustomExamInputChange: (val: string) => void
  onAddExam: (name: string) => void
  onAddCustomExam: () => void
  onRemoveExam: (name: string) => void
  counsellingBody: string
  onCounsellingBodyChange: (val: string) => void
  selectionProcess: string
  onSelectionProcessChange: (val: string) => void
}) {
  return (
    <section id="exams" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Entrance Exams & Selection
      </h2>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {selectedExams.map((examName) => (
            <Badge
              key={examName}
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-1 bg-muted/80 text-foreground border border-border/60 gap-1.5"
            >
              <span>{examName}</span>
              <button
                type="button"
                onClick={() => onRemoveExam(examName)}
                className="text-muted-foreground hover:text-destructive text-sm leading-none"
                aria-label={`Remove exam ${examName}`}
              >
                ×
              </button>
            </Badge>
          ))}
          {selectedExams.length === 0 && (
            <span className="text-xs text-muted-foreground italic">
              No entrance exams configured for this offering.
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="exam-select" className="text-xs font-semibold">
              Select Canonical Exam
            </Label>
            <Select
              items={examSelectOptions}
              value={examSelectValue}
              onValueChange={(val) => {
                if (val) onAddExam(val)
              }}
            >
              <SelectTrigger id="exam-select" className="w-full text-xs">
                <SelectValue placeholder="Choose an entrance exam..." />
              </SelectTrigger>
              <SelectContent>
                {examSelectOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="custom-exam" className="text-xs font-semibold">
              Add Other Exam
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="custom-exam"
                value={customExamInput}
                onChange={(e) => onCustomExamInputChange(e.target.value)}
                placeholder="e.g. State CET / Institutional Test"
                className="text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onAddCustomExam()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddCustomExam}
                className="text-xs shrink-0 bg-card"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 pt-2">
        <Label htmlFor="counselling-body" className="text-xs font-semibold">
          Counselling & Allocation Authority
        </Label>
        <Input
          id="counselling-body"
          value={counsellingBody}
          onChange={(e) => onCounsellingBodyChange(e.target.value)}
          placeholder="e.g. JoSAA Counselling, JAC Delhi, MCC All India Counselling"
          className="text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="selection-process" className="text-xs font-semibold">
          Selection Procedure Breakdown
        </Label>
        <Textarea
          id="selection-process"
          value={selectionProcess}
          onChange={(e) => onSelectionProcessChange(e.target.value)}
          placeholder="Describe how candidates are shortlisted, rank cutoffs applied, and seats allocated..."
          rows={3}
          className="text-xs resize-none"
        />
      </div>
    </section>
  )
}
