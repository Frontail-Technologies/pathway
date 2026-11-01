import type { CourseDetailData } from '../data/course-detail'

export function CourseFeesSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="fees" className="scroll-mt-section border-b py-7 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{course.name} Fees</h2>
      <p className="mt-1 text-sm text-muted-foreground">Typical fee range by institution type.</p>

      <div className="mt-4 rounded-[10px] border bg-card">
        <div className="divide-y">
          {course.fees.map((row) => (
            <div key={row.institutionType} className="flex items-center justify-between gap-3 p-4">
              <p className="text-sm font-semibold text-foreground">{row.institutionType}</p>
              <p className="text-sm font-semibold text-foreground">{row.feeRange}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Fee Components</p>
        <div className="mt-2.5 rounded-[10px] border bg-card">
          <div className="divide-y">
            {course.feeComponents.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="font-medium text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
