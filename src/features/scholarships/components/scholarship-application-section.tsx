import { Button } from '@/components/ui/button'
import type { ScholarshipDetailData } from '../data/scholarship-detail'

/** Connected numbered stepper — one of the strongest sections on the page, deliberately reading as an application guide rather than a syllabus/curriculum list. */
export function ScholarshipApplicationSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="apply" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">How to Apply</h2>

      <div className="mt-4 flex flex-col">
        {scholarship.applicationSteps.map((step, index) => {
          const isLast = index === scholarship.applicationSteps.length - 1
          return (
            <div key={step} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast && <span className="absolute top-7 left-3.25 h-full w-px bg-border" aria-hidden="true" />}
              <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
              <p className="mt-0.5 text-sm font-medium text-foreground">{step}</p>
            </div>
          )
        })}
      </div>

      {scholarship.officialApplyUrl && (
        <div className="mt-2">
          <Button variant="cta" className="h-11 px-6 text-sm font-semibold sm:h-10" nativeButton={false} render={<a href={scholarship.officialApplyUrl} target="_blank" rel="noopener noreferrer" />}>
            Official Apply
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">You&apos;ll continue on the official provider website.</p>
        </div>
      )}
    </section>
  )
}
