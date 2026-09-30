import { Info } from 'lucide-react'
import type { CourseDetailData } from '../data/course-detail'





 
export function CourseCareersSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="careers" className="scroll-mt-43 border-b py-7 lg:scroll-mt-44 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Career Scope After {course.name}</h2>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 rounded-[10px] border bg-card p-4 lg:grid-cols-4">
        {course.careerMetrics.map((metric) => (
          <div key={metric.label}>
            <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">{metric.label}</dt>
            <dd className="mt-0.5 text-base font-semibold text-foreground">{metric.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        Indicative figures only, not a guaranteed outcome — actual roles and pay vary by institute, skills and market conditions.
      </p>

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
