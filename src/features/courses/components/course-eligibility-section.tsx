import type { CourseDetailData } from '../data/course-detail'

export function CourseEligibilitySection({ course }: { course: CourseDetailData }) {
  const rows = [
    { label: 'Academic', value: course.eligibility.academic },
    { label: 'Subjects', value: course.eligibility.subjects },
    { label: 'Minimum Marks', value: course.eligibility.minimumMarks },
    { label: 'Entrance', value: course.eligibility.entrance },
  ]

  return (
    <section id="eligibility" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{course.name} Eligibility</h2>

      <div className="mt-4 rounded-[10px] border bg-card">
        <dl className="divide-y">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="text-right font-medium text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-3 text-xs text-muted-foreground italic">{course.eligibility.note}</p>
    </section>
  )
}
