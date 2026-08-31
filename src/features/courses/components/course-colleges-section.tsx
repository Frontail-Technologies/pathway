import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/shared/rating'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import type { CourseDetailData } from '../data/course-detail'

export function CourseCollegesSection({ course }: { course: CourseDetailData }) {
  return (
    <section id="colleges" className="scroll-mt-43 border-b py-7 lg:scroll-mt-40 lg:py-9">
      <h2 className="font-heading text-xl font-bold text-foreground sm:text-[22px]">Top Colleges Offering {course.name}</h2>

      <div className="mt-4 rounded-[10px] border bg-card">
        <div className="divide-y">
          {course.colleges.map((college) => (
            <div key={college.slug} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{college.name}</p>
                  {college.verified && <VerifiedBadge />}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-[13px]">
                  {college.city} · {college.type} · {college.exam} · {college.fees}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {typeof college.rating === 'number' && <Rating value={college.rating} />}
                <Button variant="outline" className="h-9 px-4 text-sm" nativeButton={false} render={<Link href={college.href} />}>
                  View College
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        {/* /colleges does not yet support a course-filter query param — COL-01 predates
            the URL-filter-state rule (see docs/PAGE_PATTERNS.md). Link to the plain
            listing rather than inventing an unsupported query contract. */}
        <Link
          href="/colleges"
          className="cursor-pointer text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          View All Colleges Offering {course.name}
        </Link>
      </div>
    </section>
  )
}
