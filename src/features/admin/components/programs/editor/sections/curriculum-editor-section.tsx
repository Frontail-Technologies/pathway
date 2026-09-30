import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { type CurriculumYear } from '../use-program-editor'

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
    <section id="curriculum" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Curriculum & Syllabus
        </h2>
        <span className="text-xs text-muted-foreground">
          {curriculum.length} {curriculum.length === 1 ? 'Academic Year' : 'Academic Years'}
        </span>
      </div>

      <div className="space-y-4">
        {curriculum.map((yearGroup, yearIdx) => (
          <div
            key={yearGroup.year}
            className="p-4 rounded-lg bg-muted/30 border border-border/60 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">
                {yearGroup.year}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveYear(yearIdx)}
                className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Remove Year
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {yearGroup.subjects.map((sub, subIdx) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-card px-2.5 py-1 rounded-md border border-border/70 text-foreground shadow-2xs"
                >
                  <span>{sub}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onRemoveSubject(yearIdx, subIdx)}
                    className="size-4 text-muted-foreground hover:text-destructive"
                    aria-label={`Remove ${sub}`}
                  >
                    ×
                  </Button>
                </span>
              ))}
              {yearGroup.subjects.length === 0 && (
                <span className="text-xs text-muted-foreground italic">
                  No subjects added to this academic year yet.
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Input
                value={newSubjectInputs[yearIdx] || ''}
                onChange={(e) => onSubjectInputChange(yearIdx, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onAddSubject(yearIdx)
                  }
                }}
                placeholder="Add subject title..."
                className="text-xs h-8"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onAddSubject(yearIdx)}
                className="text-xs h-8 px-2.5 shrink-0 bg-card"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Subject
              </Button>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 pt-1">
          <Input
            value={newYearName}
            onChange={(e) => onNewYearNameChange(e.target.value)}
            placeholder="e.g. Year 5 (Dual Degree / Integrated)"
            className="text-xs h-8 max-w-xs"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddYear}
            className="text-xs h-8 font-semibold bg-card"
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-primary" />
            Add Academic Year
          </Button>
        </div>
      </div>
    </section>
  )
}
