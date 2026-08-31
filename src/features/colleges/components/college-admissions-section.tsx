import type { CollegeDetailData } from '../data/college-detail'

export function CollegeAdmissionsSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="admissions" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{college.name} Admissions 2026</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {college.admissions.map((block) => (
          <div key={block.title} className="rounded-[10px] border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">{block.title}</p>
            <dl className="mt-2.5 flex flex-col gap-1.5 text-xs sm:text-[13px]">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Exam</dt>
                <dd className="text-right font-medium text-foreground">{block.exam}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Eligibility</dt>
                <dd className="text-right font-medium text-foreground">{block.eligibility}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Selection</dt>
                <dd className="text-right font-medium text-foreground">{block.selection}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Important Dates</p>
        <div className="mt-2.5 rounded-[10px] border bg-card">
          <div className="divide-y">
            {college.importantDates.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="font-medium text-muted-foreground">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
