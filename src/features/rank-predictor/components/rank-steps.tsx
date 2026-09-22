'use client'

import { Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ToolExamCard } from '@/components/shared/student-tool/student-tool-parts'
import { ChipGroup, Field, SegmentedChoice, softInputClass, StepHeading } from '@/components/shared/student-tool/tool-fields'
import { inputTypeLabel, rankCategories, rankExams, type RankErrors, type RankExam, type RankInputType, type RankPredictorDraft } from '../data/rank'

const inputTypes: RankInputType[] = ['score', 'percentile']

export function ExamPerformanceStep({ draft, errors, onSelectExam, onChange }: { draft: RankPredictorDraft; errors: RankErrors; onSelectExam: (exam: RankExam) => void; onChange: (patch: Partial<RankPredictorDraft>) => void }) {
  const label = inputTypeLabel[draft.inputType]

  return (
    <div className="flex flex-col gap-7">
      <StepHeading title="Which exam do you want to predict your rank for?" helper="Choose one exam." />

      <div>
        <div role="group" aria-label="Exam" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {rankExams.map((exam) => (
            <ToolExamCard key={exam} exam={exam} active={draft.exam === exam} onClick={() => onSelectExam(exam)} />
          ))}
        </div>
        {errors.exam && (
          <p role="alert" className="mt-2 text-xs text-destructive">
            {errors.exam}
          </p>
        )}
      </div>

      {draft.exam && (
        <div className="border-t pt-6">
          <p className="text-base font-semibold text-foreground">Enter your exam performance</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Input Type" required>
              <SegmentedChoice<string>
                options={inputTypes.map((type) => inputTypeLabel[type])}
                value={label}
                onChange={(next) => onChange({ inputType: next === 'Percentile' ? 'percentile' : 'score', value: '' })}
                ariaLabel="Input type"
              />
            </Field>
            <Field label={`Your ${label}`} required htmlFor="rank-value" hint={draft.inputType === 'percentile' ? 'A value between 0 and 100.' : 'Enter the score you obtained.'} error={errors.value}>
              <Input
                id="rank-value"
                inputMode="decimal"
                className={softInputClass}
                value={draft.value}
                placeholder={draft.inputType === 'percentile' ? 'e.g. 96.5' : 'e.g. 180'}
                aria-invalid={Boolean(errors.value)}
                onChange={(event) => onChange({ value: event.target.value })}
              />
            </Field>
          </div>
        </div>
      )}
    </div>
  )
}

export function CandidateContextStep({ draft, onChange }: { draft: RankPredictorDraft; onChange: (patch: Partial<RankPredictorDraft>) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="Add optional context" helper="This step is optional — you can skip straight to the preview." />
      <Field label="Category" hint="May allow a category rank alongside your overall rank once verified data is connected.">
        <ChipGroup ariaLabel="Category" options={rankCategories} selected={draft.category ? [draft.category] : []} onToggle={(category) => onChange({ category: draft.category === category ? '' : category })} />
      </Field>
    </div>
  )
}

function ResultCard({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`rounded-[12px] border border-dashed border-primary/25 bg-card p-5 ${className}`}>
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 font-heading text-3xl font-extrabold text-foreground/40" aria-label="Not available yet">
        — —
      </p>
    </div>
  )
}

/** No rank engine exists: every result value is a literal "— —" placeholder — never a sample number, range, confidence or gauge. */
export function RankPreviewStep({ draft }: { draft: RankPredictorDraft }) {
  const rows = [
    { label: 'Exam', value: draft.exam },
    { label: inputTypeLabel[draft.inputType], value: draft.value.trim() },
    { label: 'Category', value: draft.category },
  ].filter((row) => row.value)

  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="Rank prediction preview" helper="This is where your rank estimate will appear." />

      <div className="flex items-start gap-3 rounded-[10px] border border-primary/25 bg-primary/5 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-foreground">Rank prediction engine not connected yet</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Verified score-to-rank data is required before a rank estimate can be shown. Nothing below is an estimate.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <ResultCard label="Predicted Rank" className="flex flex-col justify-center py-8 [&>p:last-child]:text-5xl" />
        <div className="grid gap-4">
          <ResultCard label="Likely Range" />
          <div className="rounded-[12px] border border-dashed border-primary/25 bg-card p-5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Data Basis</p>
            <p className="mt-2 text-sm font-medium text-foreground">Pending verified exam data</p>
          </div>
        </div>
      </div>

      {rows.length > 0 && (
        <dl className="divide-y rounded-[12px] border bg-card px-4">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 py-3 text-sm">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-semibold text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
