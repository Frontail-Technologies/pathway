import type { CourseDetailData } from '../data/course-detail'

export function CourseCareersSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="careers" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Career Scope After {course.name}</h2>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {course.careerMetrics.map((metric) => (
          <div key={metric.label} className="rounded-[10px] border bg-card p-4">
            <p className="font-heading text-xl font-bold text-primary sm:text-2xl">{metric.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-[13px]">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[10px] border bg-card">
        <div className="divide-y">
          {course.careers.map((career) => (
            <div key={career.role} className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-sm font-semibold text-foreground">{career.role}</p>
              <p className="text-right text-xs text-muted-foreground sm:text-[13px]">{career.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
