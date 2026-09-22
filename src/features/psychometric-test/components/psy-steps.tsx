'use client'

import { ChipGroup, Field, OptionSelect, StepHeading } from '@/components/shared/student-tool/tool-fields'
import {
  exploringOptions,
  interestPageQuestions,
  INTEREST_PAGE_SIZE,
  interestQuestions,
  likertLabels,
  studyAreas,
  studyLevels,
  workStyleQuestions,
  type Dimension,
  type Likert,
  type PsychometricDraft,
} from '../data/psychometric'

const likertValues: Likert[] = [1, 2, 3, 4, 5]

export function AboutYouStep({ draft, showErrors, onChange }: { draft: PsychometricDraft; showErrors: boolean; onChange: (patch: Partial<PsychometricDraft>) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="A little about you" helper="Keep it light — we only ask what helps frame your results. No personal details needed." />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Current Study Level" required error={showErrors && !draft.studyLevel ? 'Choose your current study level.' : undefined}>
          <OptionSelect value={draft.studyLevel} onChange={(studyLevel) => onChange({ studyLevel })} options={studyLevels} placeholder="Select study level" invalid={showErrors && !draft.studyLevel} />
        </Field>
        <Field label="Stream / Area of Study" required error={showErrors && !draft.studyArea ? 'Choose your stream or area.' : undefined}>
          <OptionSelect value={draft.studyArea} onChange={(studyArea) => onChange({ studyArea })} options={studyAreas} placeholder="Select stream or area" invalid={showErrors && !draft.studyArea} />
        </Field>
      </div>
      <Field label="What are you exploring?" required hint="Select all that apply." error={showErrors && draft.exploring.length === 0 ? 'Choose at least one.' : undefined}>
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

function QuestionScale({ id, value, onChange }: { id: string; value?: Likert; onChange: (value: Likert) => void }) {
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
            className={`flex min-h-14 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 text-center transition-colors ${active ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground hover:border-primary/40'}`}
          >
            <span className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>{option}</span>
            <span className="text-[10px] leading-tight sm:text-xs">{likertLabels[option]}</span>
          </button>
        )
      })}
    </div>
  )
}

export function InterestStep({ draft, page, missingIds, onAnswer }: { draft: PsychometricDraft; page: number; missingIds: string[]; onAnswer: (id: string, value: Likert) => void }) {
  const questions = interestPageQuestions(page)
  const first = page * INTEREST_PAGE_SIZE + 1
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="How much would you enjoy these?" helper={`Questions ${first}–${first + questions.length - 1} of ${interestQuestions.length}. There are no right or wrong answers.`} />
      <div className="flex flex-col gap-4">
        {questions.map((question, index) => {
          const missing = missingIds.includes(question.id)
          return (
            <div key={question.id} className={`rounded-[12px] border bg-card p-4 sm:p-5 ${missing ? 'border-destructive/60' : ''}`}>
              <p id={`${question.id}-text`} className="text-sm font-semibold text-foreground sm:text-base">
                <span className="mr-2 text-muted-foreground">{first + index}.</span>
                {question.text}
              </p>
              <QuestionScale id={question.id} value={draft.interests[question.id]} onChange={(value) => onAnswer(question.id, value)} />
              {missing && (
                <p role="alert" className="mt-2 text-xs text-destructive">
                  Please choose an answer.
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function WorkStyleStep({ draft, missingIds, onAnswer }: { draft: PsychometricDraft; missingIds: string[]; onAnswer: (id: string, dimension: Dimension) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="How do you like to work?" helper="Pick the option that feels more natural to you. Neither is better — they're just different." />
      <div className="flex flex-col gap-4">
        {workStyleQuestions.map((question, index) => {
          const missing = missingIds.includes(question.id)
          return (
            <div key={question.id} className={`rounded-[12px] border bg-card p-4 sm:p-5 ${missing ? 'border-destructive/60' : ''}`}>
              <p id={`${question.id}-text`} className="text-sm font-semibold text-foreground sm:text-base">
                <span className="mr-2 text-muted-foreground">{index + 1}.</span>
                {question.prompt}
              </p>
              <div role="radiogroup" aria-labelledby={`${question.id}-text`} className="mt-3 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => {
                  const active = draft.workStyle[question.id] === option.dimension
                  return (
                    <button
                      key={option.label}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onAnswer(question.id, option.dimension)}
                      className={`min-h-14 cursor-pointer rounded-lg border p-3.5 text-left text-sm transition-colors ${active ? 'border-primary bg-primary/10 font-medium text-primary ring-1 ring-primary/30' : 'border-border bg-card text-foreground hover:border-primary/40'}`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              {missing && (
                <p role="alert" className="mt-2 text-xs text-destructive">
                  Please choose one.
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
