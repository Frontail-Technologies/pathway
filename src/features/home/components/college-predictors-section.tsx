import Link from 'next/link'
import { ArrowRight, Target } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { collegePredictors } from '../data/college-predictors'

export function CollegePredictorsSection() {
  return (
    <section className="border-b bg-card py-6 sm:py-9 lg:py-10">
      <div className="container-shell px-4">
        <SectionHeader title="Predict Colleges Based on Your Exam" description="See colleges you may qualify for using your exam score or rank." />
        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:mt-5 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {collegePredictors.map((predictor) => (
            <Link
              key={predictor.exam}
              href={predictor.href}
              className="group flex w-[82vw] shrink-0 snap-start flex-col justify-between gap-3 rounded-[10px] border bg-card p-4 outline-none transition-colors hover:border-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Target className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{predictor.exam} College Predictor</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{predictor.description}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                Predict Now <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
