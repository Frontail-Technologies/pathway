import type { CourseDetailData } from '../data/course-detail'

export function CourseOverviewSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="overview" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">{course.name} Overview</h2>
      <p className="mt-2.5 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{course.overviewCopy}</p>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
        {course.facts.map((fact) => (
          <div key={fact.label}>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">{fact.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-[15px]">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
