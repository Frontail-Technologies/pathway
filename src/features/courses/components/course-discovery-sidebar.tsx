import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CourseDetailData } from '../data/course-detail'

export function CourseDiscoverySidebar({ course }: { course: CourseDetailData }) {
  const topRelated = course.relatedCourses.slice(0, 3)

  return (
    <div className="rounded-[10px] border bg-card p-4">
      <p className="text-[15px] font-semibold text-foreground">Explore {course.name} Colleges</p>
      <p className="mt-1 text-xs text-muted-foreground">{course.collegesCount} colleges offer this course.</p>
      <Button className="mt-3 h-10 w-full text-sm font-semibold">View Colleges</Button>

      <div className="mt-4 border-t pt-4">
        <p className="text-xs text-muted-foreground">Compare this course with other popular programmes.</p>
        <Button variant="outline" className="mt-2 h-10 w-full text-sm font-semibold">
          Compare Courses
        </Button>
      </div>

      {topRelated.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Related Courses</p>
          <div className="mt-2 flex flex-col gap-2">
            {topRelated.map((related) => (
              <Link
                key={related.slug}
                href={related.href}
                className="flex cursor-pointer items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{related.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
