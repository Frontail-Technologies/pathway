import { Button } from '@/components/ui/button'
import type { CourseDetailData } from '../data/course-detail'

export function CourseExamsSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="exams" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Entrance Exams for {course.name}</h2>

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
              <Button variant="outline" className="h-9 w-fit px-4 text-sm">
                View Exam
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
