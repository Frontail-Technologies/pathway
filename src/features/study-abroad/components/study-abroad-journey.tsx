import { SectionHeader } from '@/components/shared/section-header'
import { journeySteps } from '../data/study-abroad'

 
export function StudyAbroadJourney() {
  return (
    <section className="bg-muted py-8 sm:py-10 lg:py-14">
      <div className="container-shell mx-auto px-4">
        <SectionHeader title="Plan Your Journey" />
        <div className="mt-6 flex flex-col gap-0 sm:mt-8 lg:flex-row lg:items-start lg:gap-0">
          {journeySteps.map((step, index) => (
            <div key={step.title} className="relative flex flex-1 gap-4 pb-8 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0">
              {index < journeySteps.length - 1 && (
                <span className="absolute top-4 left-4 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-border lg:top-4 lg:right-0 lg:left-auto lg:h-px lg:w-[calc(100%-2rem)] lg:translate-x-4" aria-hidden="true" />
              )}
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span>
              <div className="lg:mt-3 lg:pr-4">
                <p className="text-sm font-bold text-foreground">{step.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
