import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { exams as canonicalExams } from '@/features/exams/data/exams'
import { EditorSection, Field, FormSelect, RemovableChip } from '../../../programs/shared/section-kit'

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
    <EditorSection id="exams" title="Entrance exams">
      <div className="flex flex-wrap gap-1.5">
        {selectedExams.map((examName) => (
          <RemovableChip key={examName} onRemove={() => onRemoveExam(examName)} removeLabel={`Remove ${examName}`}>
            {examName}
          </RemovableChip>
        ))}
        {selectedExams.length === 0 ? <p className="text-[13px] text-muted-foreground">No exams added yet.</p> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Add an exam" htmlFor="exam-select">
          <FormSelect id="exam-select" value={examSelectValue} onChange={onAddExam} options={examSelectOptions} placeholder="Choose an exam" />
        </Field>
        <Field label="Other exam" htmlFor="custom-exam">
          <div className="flex items-center gap-2">
            <Input
              id="custom-exam"
              value={customExamInput}
              onChange={(e) => onCustomExamInputChange(e.target.value)}
              placeholder="e.g. State CET"
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onAddCustomExam()
                }
              }}
            />
            <Button type="button" variant="outline" onClick={onAddCustomExam} className="shrink-0">
              Add
            </Button>
          </div>
        </Field>
      </div>

      <Field label="Counselling body" htmlFor="counselling-body">
        <Input id="counselling-body" value={counsellingBody} onChange={(e) => onCounsellingBodyChange(e.target.value)} placeholder="e.g. JoSAA, MCC" className="text-sm" />
      </Field>

      <Field label="How selection works" htmlFor="selection-process">
        <Textarea id="selection-process" value={selectionProcess} onChange={(e) => onSelectionProcessChange(e.target.value)} rows={3} className="resize-none text-sm" />
      </Field>
    </EditorSection>
  )
}
