import Link from 'next/link'
import { ArrowRight, Target } from 'lucide-react'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { collegePredictors } from '../data/college-predictors'

 
export function CollegePredictorsSection() {
  return (
    <section className="bg-background pt-7 pb-3 sm:pt-9 lg:pt-12">
      <div className="container-shell">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Predict Colleges Based on Your Exam</h2>
        <p className="mt-1 text-sm text-muted-foreground">See colleges you may qualify for using your exam score or rank.</p>
        <HorizontalContentRail ariaLabel="College predictors" edgeBleed className="mt-4 sm:mx-0" trackClassName="sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:scroll-px-0 lg:grid-cols-4">
          {collegePredictors.map((predictor) => (
            <Link
              key={predictor.exam}
              href={predictor.href}
              className="group flex w-64 shrink-0 snap-start flex-col justify-between gap-3 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-white">
                  <Target className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">{predictor.exam} College Predictor</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{predictor.description}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                Predict Now <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
