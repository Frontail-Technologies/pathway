import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { trendingCourses } from '../data/trending-courses'
import { DiscoveryChip } from './discovery-chip'

export function TrendingCoursesSection() {
  return (
    <section className="border-b bg-muted py-6 sm:py-9 lg:py-10">
      <div className="container-shell px-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <SectionHeader title="Trending Courses" />
          <Link href="/courses" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All Courses <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
          {trendingCourses.map((course) => <DiscoveryChip key={course.name} href={course.href} label={course.name} />)}
        </div>
      </div>
    </section>
  )
}
