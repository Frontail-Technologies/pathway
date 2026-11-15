import { KeyValueTable } from '@/components/shared/key-value-table'
import type { CourseDetailData } from '../data/course-detail'

export function CourseOverviewSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="overview" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">About {course.name}</h2>
      <p className="mt-2.5 text-[15px] leading-7 text-muted-foreground">{course.overviewCopy}</p>
      <h3 className="mt-6 text-base font-semibold text-foreground">{course.name} highlights</h3>
      <KeyValueTable className="mt-3" head={['Particulars', 'Details']} rows={course.facts.map((fact) => ({ label: fact.label, value: fact.value }))} />
    </section>
  )
}
