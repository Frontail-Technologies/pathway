import { Label } from '@/components/ui/label'
import {
  TUTOR_SUBJECT_OPTIONS,
  TUTOR_EXAM_OPTIONS,
  TUTOR_LEVEL_OPTIONS,
} from '../../../shared/tutor-coaching-constants'
import type { TutorFormData } from '../use-tutor-editor'
import type { TutorSubject, TutorExam, TutorLevel } from '@/features/tutors/data/tutors'

export function TutorSubjectsExamsSection({
  formData,
  errors,
  toggleArrayItem,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  toggleArrayItem: <T>(field: 'subjects' | 'exams' | 'studyLevels' | 'languages' | 'modes', item: T) => void
}) {
  return (
    <div id="section-subjects" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4 scroll-mt-24">
      <h2 className="text-sm font-bold text-foreground">Subjects & Target Exams</h2>

      <div className="space-y-4 text-xs">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">
              Teaching Subjects <span className="text-destructive">*</span>
            </Label>
            <span className="text-[11px] text-muted-foreground">Select all taught</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TUTOR_SUBJECT_OPTIONS.map((sub: string) => {
              const selected = formData.subjects.includes(sub as TutorSubject)
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

        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">
              Entrance & Board Exams <span className="text-destructive">*</span>
            </Label>
            <span className="text-[11px] text-muted-foreground">Select exam targets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TUTOR_EXAM_OPTIONS.map((exam: string) => {
              const selected = formData.exams.includes(exam as TutorExam)
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
            <Label className="text-xs font-semibold">Study Levels</Label>
            <span className="text-[11px] text-muted-foreground">Target student age/grade</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TUTOR_LEVEL_OPTIONS.map((lvl: string) => {
              const selected = formData.studyLevels.includes(lvl as TutorLevel)
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => toggleArrayItem('studyLevels', lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-muted/70'
                  }`}
                >
                  {lvl}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
