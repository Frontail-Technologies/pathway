import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { CourseDetailData } from '../data/course-detail'

export function RelatedCoursesSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="related" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Related Courses</h2>

      <div className="mt-4 rounded-[10px] border bg-card">
        <div className="divide-y">
          {course.relatedCourses.map((related) => (
            <div key={related.slug} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{related.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-[13px]">
                  {related.level} · {related.duration}
                </p>
              </div>
              <Button variant="outline" className="h-9 shrink-0 px-4 text-sm" nativeButton={false} render={<Link href={related.href} />}>
                Explore
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
