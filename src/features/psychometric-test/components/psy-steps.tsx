'use client'

import { ChipGroup, Field, OptionSelect } from '@/components/shared/student-tool/tool-fields'
import { cn } from '@/lib/utils'
import {
  exploringOptions,
  likertLabels,
  likertValues,
  RATING_PAGE_SIZE,
  ratingPage,
  studyAreas,
  studyLevels,
  type DimensionKey,
  type Likert,
  type PsychometricDraft,
  type PsychometricTest,
} from '../data/psychometric'

export function StepTitle({ children, meta }: { children: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">{children}</h2>
      {meta ? <span className="text-sm text-muted-foreground tabular-nums">{meta}</span> : null}
    </div>
  )
}

export function AboutYouStep({ draft, showErrors, onChange }: { draft: PsychometricDraft; showErrors: boolean; onChange: (patch: Partial<PsychometricDraft>) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <StepTitle>A little about you</StepTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Current study level" required error={showErrors && !draft.studyLevel ? 'Choose your current study level.' : undefined}>
          <OptionSelect value={draft.studyLevel} onChange={(studyLevel) => onChange({ studyLevel })} options={studyLevels} placeholder="Select study level" invalid={showErrors && !draft.studyLevel} />
        </Field>
        <Field label="Stream or area of study" required error={showErrors && !draft.studyArea ? 'Choose your stream or area.' : undefined}>
          <OptionSelect value={draft.studyArea} onChange={(studyArea) => onChange({ studyArea })} options={studyAreas} placeholder="Select stream or area" invalid={showErrors && !draft.studyArea} />
        </Field>
      </div>
      <Field label="What are you exploring?" required error={showErrors && draft.exploring.length === 0 ? 'Choose at least one.' : undefined}>
        <ChipGroup
          ariaLabel="What are you exploring"
          options={exploringOptions}
          selected={draft.exploring}
          onToggle={(option) => onChange({ exploring: draft.exploring.includes(option) ? draft.exploring.filter((entry) => entry !== option) : [...draft.exploring, option] })}
        />
      </Field>
    </div>
  )
}

function Scale({ id, value, onChange }: { id: string; value?: Likert; onChange: (value: Likert) => void }) {
  return (
    <div role="radiogroup" aria-labelledby={`${id}-text`} className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2">
      {likertValues.map((option) => {
        const active = value === option
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={likertLabels[option]}
            onClick={() => onChange(option)}
            className={cn(
              'flex min-h-12 cursor-pointer items-center justify-center rounded-lg border px-1 py-2 text-center text-[11px] leading-tight font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-xs',
              active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50',
            )}
          >
            {likertLabels[option]}
          </button>
        )
      })}
    </div>
  )
}

export function RatingStep({ test, draft, page, missingIds, onAnswer }: { test: PsychometricTest; draft: PsychometricDraft; page: number; missingIds: string[]; onAnswer: (id: string, value: Likert) => void }) {
  const questions = ratingPage(test, page)
  const first = page * RATING_PAGE_SIZE + 1
  return (
    <div className="flex flex-col gap-5">
      <StepTitle meta={`${first}–${first + questions.length - 1} of ${test.ratings.length}`}>How much would you enjoy these?</StepTitle>
      <ol className="flex flex-col gap-3">
        {questions.map((question, index) => {
          const missing = missingIds.includes(question.id)
          return (
            <li key={question.id} className={cn('rounded-xl border p-4 sm:p-5', missing && 'border-destructive/60')}>
              <p id={`${question.id}-text`} className="text-[15px] font-semibold text-foreground">
                <span className="mr-2 text-muted-foreground tabular-nums">{first + index}.</span>
                {question.text}
              </p>
              <Scale id={question.id} value={draft.ratings[question.id]} onChange={(value) => onAnswer(question.id, value)} />
              {missing ? (
                <p role="alert" className="mt-2 text-xs text-destructive">
                  Choose an answer.
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function ChoiceStep({ test, draft, missingIds, onAnswer }: { test: PsychometricTest; draft: PsychometricDraft; missingIds: string[]; onAnswer: (id: string, dimension: DimensionKey) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <StepTitle meta={`${test.choices.length} questions`}>Which sounds more like you?</StepTitle>
      <ol className="flex flex-col gap-3">
        {test.choices.map((question, index) => {
          const missing = missingIds.includes(question.id)
          return (
            <li key={question.id} className={cn('rounded-xl border p-4 sm:p-5', missing && 'border-destructive/60')}>
              <p id={`${question.id}-text`} className="text-[15px] font-semibold text-foreground">
                <span className="mr-2 text-muted-foreground tabular-nums">{index + 1}.</span>
                {question.text}
              </p>
              <div role="radiogroup" aria-labelledby={`${question.id}-text`} className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.options.map((option) => {
                  const active = draft.choices[question.id] === option.dimension
                  return (
                    <button
                      key={option.label}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onAnswer(question.id, option.dimension)}
                      className={cn(
                        'min-h-12 cursor-pointer rounded-lg border p-3.5 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                        active ? 'border-primary bg-primary font-medium text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50',
                      )}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              {missing ? (
                <p role="alert" className="mt-2 text-xs text-destructive">
                  Choose one.
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
