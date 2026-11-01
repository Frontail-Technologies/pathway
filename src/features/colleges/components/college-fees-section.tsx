import type { CollegeDetailData } from '../data/college-detail'

export function CollegeFeesSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="fees" className="scroll-mt-section border-b py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{college.name} Fees</h2>
      <p className="mt-1 text-sm text-muted-foreground">Approximate tuition and total fee by programme.</p>

      <div className="mt-4 rounded-[10px] border bg-card">
        <div className="divide-y">
          {college.fees.map((row) => (
            <div key={row.course} className="flex flex-col gap-2.5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{row.course}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{row.duration}</p>
              </div>
              <div className="flex gap-6 sm:shrink-0 sm:text-right">
                <div>
                  <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Tuition Fee</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{row.tuitionFee}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Total Fee</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{row.totalFee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
