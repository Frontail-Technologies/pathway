'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { StudentToolPageFrame, ToolActionBar, ToolStepper, ToolSummaryCard } from '@/components/shared/student-tool/student-tool-parts'
import {
  emptyPsychometricDraft,
  INTEREST_PAGES,
  interestQuestions,
  isAboutYouComplete,
  unansweredInterestIds,
  unansweredWorkStyleIds,
  workStyleQuestions,
  type Dimension,
  type Likert,
  type PsychometricDraft,
} from '../data/psychometric'
import { AboutYouStep, InterestStep, WorkStyleStep } from './psy-steps'
import { PsychometricResult } from './psychometric-result'
import { PsyHero, PsyHowItWorks, PsyRelatedTools } from './psy-sections'

const STEPS = ['About You', 'Interests', 'Work Style', 'Your Profile']
const LAST = STEPS.length - 1

export function PsychometricTestPage() {
  
  const [draft, setDraft] = useState<PsychometricDraft>(emptyPsychometricDraft)
  const [step, setStep] = useState(0)
  const [interestPage, setInterestPage] = useState(0)
  const [showErrors, setShowErrors] = useState(false)

  const update = (patch: Partial<PsychometricDraft>) => setDraft((current) => ({ ...current, ...patch }))
  const answerInterest = (id: string, value: Likert) => setDraft((current) => ({ ...current, interests: { ...current.interests, [id]: value } }))
  const answerWorkStyle = (id: string, dimension: Dimension) => setDraft((current) => ({ ...current, workStyle: { ...current.workStyle, [id]: dimension } }))

  const missingInterest = showErrors && step === 1 ? unansweredInterestIds(draft, interestPage) : []
  const missingWorkStyle = showErrors && step === 2 ? unansweredWorkStyleIds(draft) : []

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const goNext = () => {
    const valid = step === 0 ? isAboutYouComplete(draft) : step === 1 ? unansweredInterestIds(draft, interestPage).length === 0 : unansweredWorkStyleIds(draft).length === 0
    if (!valid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    if (step === 1 && interestPage < INTEREST_PAGES - 1) setInterestPage(interestPage + 1)
    else setStep(step + 1)
    toTop()
  }

  const goBack = () => {
    setShowErrors(false)
    if (step === 1 && interestPage > 0) setInterestPage(interestPage - 1)
    else {
      if (step === 2) setInterestPage(INTEREST_PAGES - 1)
      setStep(Math.max(step - 1, 0))
    }
    toTop()
  }

  const editAnswers = () => {
    setShowErrors(false)
    setInterestPage(0)
    setStep(0)
    toTop()
  }

  const retake = () => {
    setDraft(emptyPsychometricDraft)
    editAnswers()
  }

  const interestsAnswered = interestQuestions.filter((question) => draft.interests[question.id]).length
  const workAnswered = workStyleQuestions.filter((question) => draft.workStyle[question.id]).length
  const rows = [
    { label: 'Study level', value: draft.studyLevel },
    { label: 'Area', value: draft.studyArea },
    { label: 'Exploring', value: draft.exploring.join(', ') },
    { label: 'Interests answered', value: interestsAnswered > 0 ? `${interestsAnswered} of ${interestQuestions.length}` : '' },
    { label: 'Work style answered', value: workAnswered > 0 ? `${workAnswered} of ${workStyleQuestions.length}` : '' },
  ].filter((row) => row.value)

  return (
    <StudentToolPageFrame>
      <Container className="px-4 py-3">
        <Breadcrumbs items={['Home', 'Student Tools', 'Psychometric Test']} />
      </Container>
      <PsyHero />

      <Container className="px-4 pb-4">
        <div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
            <div className="min-w-0 rounded-[14px] border bg-card p-4 shadow-[0_10px_30px_rgba(30,58,138,0.07)] sm:p-6 lg:p-8">
              <ToolStepper steps={STEPS} step={step} />

              <div className="mt-7">
                {step === 0 && <AboutYouStep draft={draft} showErrors={showErrors} onChange={update} />}
                {step === 1 && <InterestStep draft={draft} page={interestPage} missingIds={missingInterest} onAnswer={answerInterest} />}
                {step === 2 && <WorkStyleStep draft={draft} missingIds={missingWorkStyle} onAnswer={answerWorkStyle} />}
                {step === 3 && <PsychometricResult draft={draft} />}
              </div>

              <ToolActionBar>
                {step < LAST ? (
                  <>
                    <Button type="button" variant="outline" className="h-11 px-5 md:h-10" onClick={goBack} disabled={step === 0}>
                      Back
                    </Button>
                    <Button type="button" variant="cta" className="h-11 gap-2 px-6 font-semibold md:h-10" onClick={goNext}>
                      {step === 2 ? 'See My Profile' : 'Continue'}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="button" variant="outline" className="h-11 px-5 md:h-10" onClick={editAnswers}>
                      Edit Answers
                    </Button>
                    <Button type="button" variant="cta" className="h-11 px-6 font-semibold md:h-10" onClick={retake}>
                      Retake Test
                    </Button>
                  </>
                )}
              </ToolActionBar>
            </div>

            <div className="lg:sticky lg:top-header-gap">
              <ToolSummaryCard title="Your Progress">
                {rows.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">Your answers will appear here as you go.</p>
                ) : (
                  <dl className="mt-2 divide-y">
                    {rows.map((row) => (
                      <div key={row.label} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                        <dt className="text-muted-foreground">{row.label}</dt>
                        <dd className="text-right font-semibold text-foreground">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="mt-3 text-xs leading-5 text-muted-foreground">Your answers stay on this page and are not saved or sent anywhere.</p>
              </ToolSummaryCard>
            </div>
          </div>

          <PsyHowItWorks />
          <PsyRelatedTools />
        </div>
      </Container>
    </StudentToolPageFrame>
  )
}
