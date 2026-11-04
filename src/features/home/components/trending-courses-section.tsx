import Link from 'next/link'
import { ArrowRight, Clock, GraduationCap } from 'lucide-react'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { listCourses } from '@/features/courses/api/courses-api'
import { inCuratedOrder } from '@/features/catalog/curated'

const curatedSlugs = ['btech-computer-science', 'mba', 'mbbs', 'bca']

export async function TrendingCoursesSection() {
  const popularCourses = await listCourses({ slugs: curatedSlugs.join(','), limit: String(curatedSlugs.length) })
    .then((list) => inCuratedOrder(list.items, curatedSlugs))
    .catch(() => [])
  if (popularCourses.length === 0) return null
  return (
    <section className="bg-muted py-7 sm:py-9 lg:py-12">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Popular Courses</h2>
          <Link href="/courses" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All Courses <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <HorizontalContentRail ariaLabel="Popular courses" edgeBleed className="mt-4 sm:mx-0" trackClassName="sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:scroll-px-0 lg:grid-cols-4">
          {popularCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses?q=${encodeURIComponent(course.name)}`}
              className="group flex w-60 shrink-0 snap-start flex-col gap-2 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{course.level}</span>
              </div>
              <p className="text-[15px] leading-snug font-bold text-foreground">{course.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {course.stream}
                <span aria-hidden="true">·</span>
                <Clock className="size-3" aria-hidden="true" />
                {course.duration}
              </p>
              <span className="mt-auto flex items-center gap-1 pt-1 text-sm font-semibold text-primary">
                Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
