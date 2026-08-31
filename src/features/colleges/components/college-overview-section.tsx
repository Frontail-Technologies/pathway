import type { CollegeDetailData } from '../data/college-detail'

export function CollegeOverviewSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="overview" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Overview</h2>
      <p className="mt-2.5 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{college.overviewCopy}</p>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
        {college.facts.map((fact) => (
          <div key={fact.label}>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">{fact.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-[15px]">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
