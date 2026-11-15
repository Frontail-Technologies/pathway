import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { MarketingHero } from '@/components/shared/landing'
import { HeroScene } from '@/components/shared/landing-art'
import { cn } from '@/lib/utils'
import { getPredictorCoverage, type ExamCoverage } from '../api/predictor-api'
import { examCatalog, predictorCourses, type CatalogExam, type PredictorCourse } from '../data/exam-catalog'
import { predictorExams } from '../data/predictor'

const supported = new Set<string>(predictorExams.map((exam) => exam.slug))

const steps = ['Select a course', 'Select exam', 'Enter rank']

function Stepper() {
  return (
    <ol className="flex gap-4 lg:flex-col lg:gap-0">
      {steps.map((step, index) => {
        const done = index === 0
        const current = index === 1
        return (
          <li key={step} className="flex items-center gap-2.5 lg:relative lg:items-start lg:pb-8 lg:last:pb-0">
            {index < steps.length - 1 ? <span aria-hidden="true" className="absolute top-8 bottom-0 left-[13px] hidden w-0.5 bg-border lg:block" /> : null}
            <span
              className={cn(
                'relative flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold',
                done && 'border-primary bg-card text-primary',
                current && 'border-primary bg-primary text-primary-foreground',
                !done && !current && 'border-border bg-card text-muted-foreground',
              )}
            >
              {done ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
            </span>
            <span className={cn('text-sm lg:pt-1', current || done ? 'font-semibold text-foreground' : 'text-muted-foreground', !current && 'hidden sm:inline')} aria-current={current ? 'step' : undefined}>
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function ExamTile({ exam, coverage }: { exam: CatalogExam; coverage?: ExamCoverage }) {
  const crest = (
    <span
      className={cn(
        'flex size-14 items-center justify-center rounded-xl border-2 px-1 text-center text-[12px] leading-tight font-extrabold',
        coverage ? 'border-primary/20 bg-secondary text-primary' : 'border-border bg-muted text-muted-foreground',
      )}
    >
      {exam.short}
    </span>
  )
  if (!coverage) {
    return (
      <div className="flex h-full flex-col items-center rounded-xl border border-dashed bg-card/60 p-3 text-center">
        {crest}
        <span className="mt-2.5 text-sm font-semibold text-foreground">{exam.label}</span>
        <span className="text-xs text-muted-foreground">{exam.region}</span>
        <span className="mt-auto pt-2.5">
          <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">Cutoffs coming soon</span>
        </span>
      </div>
    )
  }
  return (
    <Link
      href={`/college-predictor?exam=${exam.slug}`}
      className="group flex h-full flex-col items-center rounded-xl border bg-card p-3 text-center outline-none transition-colors hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {crest}
      <span className="mt-2.5 text-sm font-semibold text-foreground group-hover:text-primary">{exam.label}</span>
      <span className="text-xs text-muted-foreground">{exam.region}</span>
      <span className="mt-auto pt-2.5">
        <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
          {coverage.institutes} institutes
          <ArrowRight className="size-3" aria-hidden="true" />
        </span>
      </span>
    </Link>
  )
}

export async function PredictorHub({ course }: { course: PredictorCourse }) {
  const coverage = await getPredictorCoverage()
  const live = new Map(coverage.filter((item) => supported.has(item.slug)).map((item) => [item.slug, item]))
  const exams = [...examCatalog[course]].sort((a, b) => Number(live.has(b.slug)) - Number(live.has(a.slug)))
  const liveCount = Object.values(examCatalog).flat().filter((exam) => live.has(exam.slug)).length

  return (
    <div className="bg-muted/50 pb-10">
      <MarketingHero
        trail={['Home', { label: 'Predictors', href: '/predictors' }, 'College Predictor']}
        title="College Predictor"
        description="Pick the exam you took and see the colleges and branches your rank can reach, from official counselling closing ranks."
        stats={[
          { label: 'Exams listed', value: String(Object.values(examCatalog).flat().length) },
          { label: 'Live predictors', value: String(liveCount) },
        ]}
        aside={<HeroScene name="careers" className="hidden lg:block" />}
      />

      <div className="container-shell px-4 pt-5 lg:pt-6">
        <div className="overflow-hidden rounded-xl border bg-card lg:flex">
          <div className="border-b p-4 sm:px-6 lg:w-60 lg:shrink-0 lg:border-r lg:border-b-0 lg:py-6">
            <Stepper />
          </div>
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <h2 className="font-heading text-lg font-bold text-foreground">Select the exam you have taken</h2>
            <nav aria-label="Course" className="mt-4 flex gap-2">
              {predictorCourses.map((item) => (
                <Link
                  key={item.id}
                  href={`/college-predictor?course=${item.id}`}
                  aria-current={item.id === course ? 'page' : undefined}
                  className={cn(
                    'flex h-10 items-center rounded-lg border px-4 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                    item.id === course ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50',
                  )}
                >
                  {item.label}
                  <span className={cn('ml-1.5 hidden font-normal sm:inline', item.id === course ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{item.title}</span>
                </Link>
              ))}
            </nav>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {exams.map((exam) => (
                <li key={exam.slug}>
                  <ExamTile exam={exam} coverage={live.get(exam.slug)} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { href: course === 'medical' ? '/rank-predictor?exam=neet-ug' : '/rank-predictor?exam=jee-main', title: 'Don’t know your rank yet?', text: course === 'medical' ? 'Estimate your NEET UG rank from your percentile.' : 'Estimate your JEE Main rank from your percentile.' },
            { href: '/cutoffs', title: 'Want the raw numbers?', text: 'Opening and closing ranks for every branch and quota.' },
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
  )
}
