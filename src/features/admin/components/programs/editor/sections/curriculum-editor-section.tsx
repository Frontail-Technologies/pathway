import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type CurriculumYear } from '../use-program-editor'
import { EditorSection, RemovableChip } from '../../shared/section-kit'

export type CurriculumEditorSectionProps = {
  curriculum: CurriculumYear[]
  newSubjectInputs: Record<number, string>
  onSubjectInputChange: (yearIndex: number, val: string) => void
  newYearName: string
  onNewYearNameChange: (val: string) => void
  onAddYear: () => void
  onRemoveYear: (index: number) => void
  onAddSubject: (yearIndex: number) => void
  onRemoveSubject: (yearIndex: number, subjectIndex: number) => void
}

export function CurriculumEditorSection({
  curriculum,
  newSubjectInputs,
  onSubjectInputChange,
  newYearName,
  onNewYearNameChange,
  onAddYear,
  onRemoveYear,
  onAddSubject,
  onRemoveSubject,
}: CurriculumEditorSectionProps) {
  return (
    <EditorSection id="curriculum" title="Curriculum" action={`${curriculum.length} ${curriculum.length === 1 ? 'year' : 'years'}`}>
      <div className="divide-y divide-border rounded-md border border-border">
        {curriculum.map((yearGroup, yearIdx) => (
          <div key={`${yearGroup.year}-${yearIdx}`} className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">{yearGroup.year}</p>
              <Button type="button" variant="ghost" size="sm" onClick={() => onRemoveYear(yearIdx)} className="text-muted-foreground hover:text-destructive">
                Remove year
              </Button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {yearGroup.subjects.map((sub, subIdx) => (
                <RemovableChip key={`${sub}-${subIdx}`} onRemove={() => onRemoveSubject(yearIdx, subIdx)} removeLabel={`Remove ${sub}`}>
                  {sub}
                </RemovableChip>
              ))}
              {yearGroup.subjects.length === 0 ? <p className="text-[13px] text-muted-foreground">No subjects yet.</p> : null}
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={newSubjectInputs[yearIdx] || ''}
                onChange={(e) => onSubjectInputChange(yearIdx, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onAddSubject(yearIdx)
                  }
                }}
                placeholder="Subject name"
                aria-label={`Add subject to ${yearGroup.year}`}
                className="text-sm"
              />
              <Button type="button" variant="outline" onClick={() => onAddSubject(yearIdx)} className="shrink-0">
                Add
              </Button>
            </div>
          </div>
        ))}
        {curriculum.length === 0 ? <p className="p-4 text-sm text-muted-foreground">No years added yet.</p> : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input value={newYearName} onChange={(e) => onNewYearNameChange(e.target.value)} placeholder={`Year ${curriculum.length + 1}`} aria-label="New year name" className="text-sm sm:max-w-xs" />
        <Button type="button" variant="outline" onClick={onAddYear} className="gap-1.5 self-start sm:self-auto">
          <Plus className="size-4" aria-hidden="true" />
          Add year
        </Button>
      </div>
    </EditorSection>
  )
}
