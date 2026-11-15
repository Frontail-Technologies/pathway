import type { CourseDetailData } from '../data/course-detail'

export function CourseSpecializationsSection({ course }: { course: CourseDetailData }) {
  if (!course.specializations.length) return null
  return (
    <section id="specializations" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Popular {course.specialization} Specializations</h2>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {course.specializations.map((item) => (
          <div key={item.name} className="rounded-[10px] border bg-card p-3.5">
            <p className="text-sm font-semibold text-foreground">{item.name}</p>
            {item.description && <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
