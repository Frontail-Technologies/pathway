import type { CollegeDetailData } from '../data/college-detail'

export function CollegeScholarshipsSection({ college }: { college: CollegeDetailData }) {
  return (
    <section id="scholarships" className="scroll-mt-[172px] border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Scholarships</h2>

      <div className="mt-4 rounded-[10px] border bg-card">
        <div className="divide-y">
          {college.scholarships.map((item) => (
            <div key={item.name} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-[13px]">{item.eligibility}</p>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="text-sm font-semibold text-foreground">{item.benefit}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.deadline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
