import type { ScholarshipDetailData } from '../data/scholarship-detail'

/** Vertical timeline (dot + connecting line) rather than a generic table — the Application Deadline row gets slightly stronger emphasis. */
export function ScholarshipDatesSection({ scholarship }: { scholarship: ScholarshipDetailData }) {
  return (
    <section id="dates" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Important Dates</h2>

      <div className="mt-4 flex flex-col">
        {scholarship.importantDates.map((date, index) => {
          const isDeadline = date.label.toLowerCase().includes('deadline')
          const isLast = index === scholarship.importantDates.length - 1
          return (
            <div key={date.label} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && <span className="absolute top-3 left-1.25 h-full w-px bg-border" aria-hidden="true" />}
              <span className={`z-10 mt-1.5 size-2.5 shrink-0 rounded-full ${isDeadline ? 'bg-warning' : 'bg-primary'}`} aria-hidden="true" />
              <div>
                <p className={`text-sm ${isDeadline ? 'font-bold text-foreground' : 'font-semibold text-foreground'}`}>{date.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{date.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
