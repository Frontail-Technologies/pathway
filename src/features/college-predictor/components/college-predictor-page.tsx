import Link from 'next/link'
import { ArrowRight, CircleCheck, ListOrdered, Scale } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { SourceNote } from '@/components/shared/source-note'
import { getCollegeFacets } from '@/features/colleges/api/colleges-api'
import { getPrediction } from '../api/predictor-api'
import { chanceLabel, predictorCategories, predictorExams, type Chance, type PredictorInput } from '../data/predictor'
import { PredictorForm } from './predictor-form'
import { ChancePill, PredictorResults } from './predictor-results'

const bands: { chance: Chance; text: string }[] = [
  { chance: 'safe', text: 'Your rank is comfortably inside last year’s closing rank.' },
  { chance: 'likely', text: 'Your rank is close to, but within, the closing rank.' },
  { chance: 'reach', text: 'Up to 20% past the closing rank; possible in later rounds or if cutoffs move.' },
]

function Intro() {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border bg-card p-4 sm:p-6">
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">How the predictor works</h2>
        <ol className="mt-4 flex flex-col gap-4">
          {[
            { icon: ListOrdered, title: 'Enter your rank and profile', text: 'Exam, rank, category, home state, gender and PwD status decide which seats you can compete for.' },
            { icon: Scale, title: 'We compare it with real closing ranks', text: 'Every branch and quota at every JoSAA institute is checked against the last-round closing rank.' },
            { icon: CircleCheck, title: 'See colleges grouped by chance', text: 'Colleges are listed best chance first, with each branch, its quota and its opening and closing ranks.' },
          ].map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">{index + 1}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="rounded-xl border bg-card p-4 sm:p-6">
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">What the chances mean</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {bands.map((band) => (
            <li key={band.chance} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
              <ChancePill chance={band.chance} className="w-fit sm:w-28 sm:justify-center" />
              <span className="text-sm text-muted-foreground">{band.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export async function CollegePredictorPage({ input }: { input: PredictorInput }) {
  const [prediction, facets] = await Promise.all([getPrediction(input), getCollegeFacets()])
  const states = facets.states.map((state) => ({ value: state.slug, label: state.label })).sort((a, b) => a.label.localeCompare(b.label))
  const exam = predictorExams.find((item) => item.slug === input.exam)!
  const category = predictorCategories.find((item) => item.value === input.category)!.label
  const stateLabel = states.find((state) => state.value === input.state)?.label
  const profile = [exam.label, category, input.exam === 'jee-main' ? stateLabel : '', input.gender === 'female' ? 'Female' : '', input.pwd ? 'PwD' : ''].filter(Boolean).join(' · ')

  return (
    <div className="bg-muted/50 pb-10">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
          <Breadcrumbs items={['Home', { label: 'Exams', href: '/exams' }, 'College Predictor']} />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">{exam.label} College Predictor</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            Find the {exam.counselling} where your rank could get a seat, using official JoSAA closing ranks for every branch and quota.
          </p>
        </div>
      </div>

      <div className="container-shell px-4 pt-5 lg:pt-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
          <aside className="lg:sticky lg:top-header-gap lg:w-90 lg:shrink-0">
            <PredictorForm key={JSON.stringify(input)} initial={input} states={states} />
          </aside>

          <div id="results" className="min-w-0 flex-1 scroll-mt-header">
            {!input.rank ? (
              <Intro />
            ) : !prediction ? (
              <div className="rounded-xl border bg-card p-6">
                <p className="font-semibold text-foreground">We could not load predictions right now.</p>
                <p className="mt-1 text-sm text-muted-foreground">Please try again in a moment.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border bg-card p-4 sm:p-5">
                  <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                    {prediction.counts.colleges
                      ? `${prediction.counts.colleges} ${prediction.counts.colleges === 1 ? 'college' : 'colleges'} within reach of rank ${input.rank.toLocaleString('en-IN')}`
                      : `No colleges within reach of rank ${input.rank.toLocaleString('en-IN')}`}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{profile}</p>
                  {prediction.counts.colleges ? (
                    <dl className="mt-4 grid grid-cols-3 divide-x rounded-lg border">
                      {(['safe', 'likely', 'reach'] as const).map((chance) => (
                        <div key={chance} className="px-3 py-2.5 text-center">
                          <dt className="text-xs text-muted-foreground">{chanceLabel[chance]}</dt>
                          <dd className="mt-0.5 text-lg font-bold text-foreground tabular-nums">{prediction.counts[chance]}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Last year’s closing ranks for this category and quota were all well above your rank. Check the category, home state and gender you selected
                      {input.exam === 'jee-advanced' ? ', or try the JEE Main predictor for NITs and IIITs.' : '.'}
                    </p>
                  )}
                </div>

                {prediction.counts.colleges ? <PredictorResults prediction={prediction} /> : null}

                <SourceNote
                  source="JoSAA"
                  year={prediction.year ?? undefined}
                  href="https://josaa.nic.in"
                  note={`Round ${prediction.round ?? ''} closing ranks. Cutoffs change every year, so treat this as a guide, not a guarantee.`}
                />
              </div>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { href: '/rank-predictor?exam=jee-main', title: 'Don’t know your rank yet?', text: 'Estimate your JEE Main rank from your percentile.' },
                { href: '/compare', title: 'Shortlisted two colleges?', text: 'Compare fees, placements and rankings side by side.' },
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
          </div>
        </div>
      </div>
    </div>
  )
}
