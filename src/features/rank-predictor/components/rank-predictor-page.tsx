'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Pencil } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { StudentToolPageFrame, ToolActionBar, ToolEngineNotice, ToolStepper, ToolSummaryCard } from '@/components/shared/student-tool/student-tool-parts'
import { emptyRankDraft, inputTypeLabel, rankExamFromSlug, validateRankInput, type RankErrors, type RankExam, type RankPredictorDraft } from '../data/rank'
import { CandidateContextStep, ExamPerformanceStep, RankPreviewStep } from './rank-steps'
import { RankHero, RankHowItWorks, RankRelatedTools } from './rank-sections'

const STEPS = ['Exam & Performance', 'Candidate Context', 'Rank Preview']
const LAST = STEPS.length - 1

export function RankPredictorPage() {
  const searchParams = useSearchParams()
  
  const [draft, setDraft] = useState<RankPredictorDraft>(() => ({ ...emptyRankDraft, exam: rankExamFromSlug[searchParams.get('exam') ?? ''] ?? '' }))
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<RankErrors>({})

  const update = (patch: Partial<RankPredictorDraft>) => {
    setDraft((current) => ({ ...current, ...patch }))
    setErrors({})
  }

  const selectExam = (exam: RankExam) => update({ exam })

  const goNext = () => {
    if (step === 0) {
      const found = validateRankInput(draft)
      setErrors(found)
      if (Object.keys(found).length > 0) return
    }
    setStep((current) => Math.min(current + 1, LAST))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  const goToStep = (target: number) => {
    setErrors({})
    setStep(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inputGroup = [
    { label: 'Exam', value: draft.exam },
    { label: inputTypeLabel[draft.inputType], value: draft.value.trim() },
  ].filter((row) => row.value)
  const contextGroup = draft.category ? [{ label: 'Category', value: draft.category }] : []
  const groups = [
    { title: 'Exam & Performance', step: 0, rows: inputGroup },
    { title: 'Context', step: 1, rows: contextGroup },
  ].filter((group) => group.rows.length > 0)

  return (
    <StudentToolPageFrame>
      <Container className="px-4 py-3">
        <Breadcrumbs items={['Home', 'Student Tools', 'Rank Predictor']} />
      </Container>
      <RankHero />

      <Container className="px-4 pb-4">
        <div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
            <div className="min-w-0 rounded-[14px] border bg-card p-4 shadow-[0_10px_30px_rgba(30,58,138,0.07)] sm:p-6 lg:p-8">
              <ToolStepper steps={STEPS} step={step} />

              <div className="mt-7">
                {step === 0 && <ExamPerformanceStep draft={draft} errors={errors} onSelectExam={selectExam} onChange={update} />}
                {step === 1 && <CandidateContextStep draft={draft} onChange={update} />}
                {step === 2 && <RankPreviewStep draft={draft} />}
              </div>

              <ToolActionBar>
                <Button type="button" variant="outline" className="h-11 px-5 md:h-10" onClick={goBack} disabled={step === 0}>
                  Back
                </Button>
                {step < LAST ? (
                  <Button type="button" variant="cta" className="h-11 gap-2 px-6 font-semibold md:h-10" onClick={goNext}>
                    {step === 0 ? 'Continue' : 'Preview Rank'}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button type="button" variant="outline" className="h-11 px-5 md:h-10" onClick={() => goToStep(0)}>
                    Edit Details
                  </Button>
                )}
              </ToolActionBar>
            </div>

            <div className="lg:sticky lg:top-header-gap">
              <ToolSummaryCard title="Your Input">
                {groups.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">Your selections will appear here as you go.</p>
                ) : (
                  <div className="mt-2 divide-y">
                    {groups.map((group) => (
                      <section key={group.title} className="py-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{group.title}</p>
                          <button type="button" onClick={() => goToStep(group.step)} className="flex cursor-pointer items-center gap-1 text-xs font-medium text-primary hover:underline" aria-label={`Edit ${group.title}`}>
                            <Pencil className="size-3" aria-hidden="true" />
                            Edit
                          </button>
                        </div>
                        <dl className="mt-1.5">
                          {group.rows.map((row) => (
                            <div key={row.label} className="flex items-start justify-between gap-3 py-1 text-sm">
                              <dt className="text-muted-foreground">{row.label}</dt>
                              <dd className="text-right font-semibold text-foreground">{row.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </section>
                    ))}
                  </div>
                )}
                <ToolEngineNotice title="Rank prediction engine not connected yet" text="Verified score-to-rank data is required before a rank estimate can be shown." />
              </ToolSummaryCard>
            </div>
          </div>

          <RankHowItWorks />
          <RankRelatedTools />
        </div>
      </Container>
    </StudentToolPageFrame>
  )
}
