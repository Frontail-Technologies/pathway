import { Label } from '@/components/ui/label'
import {
  COACHING_MODE_OPTIONS,
  COACHING_EXAM_OPTIONS,
  TUTOR_SUBJECT_OPTIONS,
} from '../../../shared/tutor-coaching-constants'
import type { CoachingFormData } from '../use-coaching-editor'
import type { LearningMode } from '@/features/coaching/data/coaching'

export function CoachingLocationModesSection({
  formData,
  errors,
  toggleArrayItem,
}: {
  formData: CoachingFormData
  errors: Record<string, string>
  toggleArrayItem: <T>(field: 'exams' | 'subjects' | 'modes' | 'courseTypes', item: T) => void
}) {
  return (
    <div id="section-location" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4 scroll-mt-24">
      <h2 className="text-sm font-bold text-foreground">Delivery Modes & Curriculum Coverage</h2>

      <div className="space-y-4 text-xs">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">
              Delivery Modes <span className="text-destructive">*</span>
            </Label>
            <span className="text-[11px] text-muted-foreground">Select formats offered</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {COACHING_MODE_OPTIONS.map((mode: string) => {
              const selected = formData.modes.includes(mode as LearningMode)
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => toggleArrayItem('modes', mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-muted/70'
                  }`}
                >
                  {mode}
                </button>
              )
            })}
          </div>
          {errors.modes && <p className="text-[11px] text-destructive">{errors.modes}</p>}
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">
              Target Entrance Exams <span className="text-destructive">*</span>
            </Label>
            <span className="text-[11px] text-muted-foreground">Select all exams prepared for</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {COACHING_EXAM_OPTIONS.map((exam: string) => {
              const selected = formData.exams.includes(exam)
              return (
                <button
                  key={exam}
                  type="button"
                  onClick={() => toggleArrayItem('exams', exam)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-muted/70'
                  }`}
                >
                  {exam}
                </button>
              )
            })}
          </div>
          {errors.exams && <p className="text-[11px] text-destructive">{errors.exams}</p>}
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">
              Subject Coverage <span className="text-destructive">*</span>
            </Label>
            <span className="text-[11px] text-muted-foreground">Curriculum subjects taught</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TUTOR_SUBJECT_OPTIONS.map((sub: string) => {
              const selected = formData.subjects.includes(sub)
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleArrayItem('subjects', sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-muted/70'
                  }`}
                >
                  {sub}
                </button>
              )
            })}
          </div>
          {errors.subjects && <p className="text-[11px] text-destructive">{errors.subjects}</p>}
        </div>
      </div>
    </div>
  )
}
