'use client'

import { Input } from '@/components/ui/input'
import { defaultPerformance, scoreTypes, type CollegePredictorDraft, type ExamPerformance, type PredictorErrors, type PredictorExam, type ScoreType } from '../data/predictor'
import { Field, SegmentedChoice, softInputClass, StepHeading } from '@/components/shared/student-tool/tool-fields'

const valueLabels: Record<ScoreType, { label: string; placeholder: string }> = {
  Rank: { label: 'Your Rank (AIR)', placeholder: 'e.g. 12500' },
  Percentile: { label: 'Your Percentile', placeholder: 'e.g. 96.5' },
  Score: { label: 'Your Score', placeholder: 'e.g. 180' },
}

export function PerformanceStep({ draft, errors, onChange }: { draft: CollegePredictorDraft; errors: PredictorErrors; onChange: (exam: PredictorExam, patch: Partial<ExamPerformance>) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="Enter your exam performance" helper="Add your result for each exam. You can use a rank, percentile or score." />

      <div className="grid gap-4 lg:grid-cols-2">
        {draft.exams.map((exam) => {
          const entry = draft.performance[exam] ?? defaultPerformance
          const meta = valueLabels[entry.inputType]
          const error = errors.performance?.[exam]
          const inputId = `performance-${exam.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <div key={exam} className="rounded-[12px] border bg-card p-4 sm:p-5">
              <p className="font-heading text-base font-bold text-foreground">{exam}</p>
              <div className="mt-3 flex flex-col gap-4">
                <Field label="I want to enter my">
                  <SegmentedChoice<ScoreType> options={scoreTypes} value={entry.inputType} onChange={(inputType) => onChange(exam, { inputType, value: '' })} ariaLabel={`${exam} input type`} />
                </Field>
                <Field label={meta.label} required htmlFor={inputId} error={error}>
                  <Input id={inputId} inputMode="decimal" className={softInputClass} value={entry.value} placeholder={meta.placeholder} aria-invalid={Boolean(error)} onChange={(event) => onChange(exam, { value: event.target.value })} />
                </Field>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
