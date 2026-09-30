import { Label } from '@/components/ui/label'
import {
  TUTOR_LANGUAGE_OPTIONS,
  TUTOR_MODE_OPTIONS,
} from '../../../shared/tutor-coaching-constants'
import type { TutorFormData } from '../use-tutor-editor'
import type { TutorLanguage, TutorMode } from '@/features/tutors/data/tutors'

export function TutorLanguagesModesSection({
  formData,
  errors,
  toggleArrayItem,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  toggleArrayItem: <T>(field: 'subjects' | 'exams' | 'studyLevels' | 'languages' | 'modes', item: T) => void
}) {
  return (
    <div id="section-languages" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4 scroll-mt-24">
      <h2 className="text-sm font-bold text-foreground">Languages & Delivery Modes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Languages Spoken / Taught</Label>
          <div className="flex flex-wrap gap-2">
            {TUTOR_LANGUAGE_OPTIONS.map((lang: string) => {
              const selected = formData.languages.includes(lang as TutorLanguage)
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleArrayItem('languages', lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-muted/70'
                  }`}
                >
                  {lang}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold">
            Delivery Modes <span className="text-destructive">*</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {TUTOR_MODE_OPTIONS.map((mode: string) => {
              const selected = formData.modes.includes(mode as TutorMode)
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
      </div>
    </div>
  )
}
