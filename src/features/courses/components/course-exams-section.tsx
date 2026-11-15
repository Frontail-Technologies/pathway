import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { CourseDetailData } from '../data/course-detail'

export function CourseExamsSection({ course }: { course: CourseDetailData }) {
  if (!course.exams.length) return null
  return (
    <section id="exams" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">Entrance Exams for {course.name}</h2>

      <div className="mt-4 rounded-[10px] border bg-card">
        <div className="divide-y">
          {course.exams.map((exam) => (
            <div key={exam.name} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{exam.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-[13px]">
                  {exam.level} · {exam.purpose}
                </p>
              </div>
              {exam.slug ? (
                <Button variant="outline" size="sm" className="w-fit px-4" nativeButton={false} render={<Link href={`/exam/${exam.slug}`} />}>
                  View exam
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
