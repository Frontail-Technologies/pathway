'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { emptyDraft, isAboutYouComplete, ratingPages, unansweredChoices, unansweredRatings, type DimensionKey, type Likert, type PsychometricDraft, type PsychometricTest } from '../data/psychometric'
import { AboutYouStep, ChoiceStep, RatingStep } from './psy-steps'
import { PsychometricResult } from './psychometric-result'

const STEPS = ['About you', 'Interests', 'Work style', 'Your profile']

function Progress({ step }: { step: number }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Step {step + 1} of {STEPS.length} · <span className="font-medium text-foreground">{STEPS[step]}</span>
      </p>
      <div className="mt-2 grid grid-cols-4 gap-1.5" aria-hidden="true">
        {STEPS.map((label, index) => (
          <span key={label} className={cn('h-1.5 rounded-full', index <= step ? 'bg-primary' : 'bg-muted')} />
        ))}
      </div>
    </div>
  )
}

export function PsychometricTestPage({ test }: { test: PsychometricTest | null }) {
  const [draft, setDraft] = useState<PsychometricDraft>(emptyDraft)
  const [step, setStep] = useState(0)
  const [page, setPage] = useState(0)
  const [showErrors, setShowErrors] = useState(false)

  const header = (
    <div className="border-b bg-card">
      <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
        <Breadcrumbs items={['Home', 'Psychometric test']} />
        <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">Psychometric test</h1>
        <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">
          {test ? `${test.ratings.length + test.choices.length} quick questions about what you enjoy and how you like to work, with the directions that suit you.` : 'Find the directions that suit how you like to work.'}
        </p>
      </div>
    </div>
  )

  if (!test || !test.ratings.length) {
    return (
      <div className="bg-muted/50 pb-10">
        {header}
        <div className="container-shell px-4 pt-6">
          <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">The test is not available right now. Please try again shortly.</p>
        </div>
      </div>
    )
  }

  const pages = ratingPages(test)
  const missingRatings = showErrors && step === 1 ? unansweredRatings(test, draft, page) : []
  const missingChoices = showErrors && step === 2 ? unansweredChoices(test, draft) : []
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const last = step === STEPS.length - 1

  const next = () => {
    const valid = step === 0 ? isAboutYouComplete(draft) : step === 1 ? unansweredRatings(test, draft, page).length === 0 : unansweredChoices(test, draft).length === 0
    if (!valid) return setShowErrors(true)
    setShowErrors(false)
    if (step === 1 && page < pages - 1) setPage(page + 1)
    else setStep(step === 1 && !test.choices.length ? 3 : step + 1)
    toTop()
  }

  const back = () => {
    setShowErrors(false)
    if (step === 1 && page > 0) setPage(page - 1)
    else {
      if (step >= 2) setPage(pages - 1)
      setStep(step === 3 && !test.choices.length ? 1 : Math.max(step - 1, 0))
    }
    toTop()
  }

  const restart = (clear: boolean) => {
    if (clear) setDraft(emptyDraft)
    setShowErrors(false)
    setPage(0)
    setStep(0)
    toTop()
  }

  return (
    <div className="bg-muted/50 pb-10">
      {header}
      <div className="container-shell px-4 pt-5 lg:pt-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <div className="rounded-xl border bg-card p-4 sm:p-6">
            <Progress step={step} />
            <div className="mt-6">
              {step === 0 ? <AboutYouStep draft={draft} showErrors={showErrors} onChange={(patch) => setDraft((current) => ({ ...current, ...patch }))} /> : null}
              {step === 1 ? <RatingStep test={test} draft={draft} page={page} missingIds={missingRatings} onAnswer={(id, value: Likert) => setDraft((current) => ({ ...current, ratings: { ...current.ratings, [id]: value } }))} /> : null}
              {step === 2 ? <ChoiceStep test={test} draft={draft} missingIds={missingChoices} onAnswer={(id, dimension: DimensionKey) => setDraft((current) => ({ ...current, choices: { ...current.choices, [id]: dimension } }))} /> : null}
              {last ? <PsychometricResult test={test} draft={draft} /> : null}
            </div>
            <div className="mt-6 flex items-center justify-between gap-3 border-t pt-4">
              {last ? (
                <>
                  <Button variant="outline" onClick={() => restart(false)}>
                    Edit answers
                  </Button>
                  <Button variant="cta" className="font-semibold" onClick={() => restart(true)}>
                    Retake test
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="gap-1.5" onClick={back} disabled={step === 0}>
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Back
                  </Button>
                  <Button variant="cta" className="gap-1.5 font-semibold" onClick={next}>
                    {(step === 2 || (step === 1 && page === pages - 1 && !test.choices.length)) ? 'See my profile' : 'Continue'}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {last ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { href: '/courses', title: 'Explore courses', text: 'Browse courses in the streams that suit you.' },
                { href: '/college-predictor', title: 'Know your JEE rank?', text: 'See the colleges and branches it can get.' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group flex items-center justify-between gap-3 rounded-xl border bg-card p-4 outline-none hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
                  <span>
                    <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{item.title}</span>
                    <span className="mt-0.5 block text-[13px] text-muted-foreground">{item.text}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
