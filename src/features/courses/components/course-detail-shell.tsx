import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { DetailTabNav } from '@/components/shared/detail-tab-nav'
import { DetailTabBreadcrumbs } from '@/components/shared/detail-tab-breadcrumbs'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { Button } from '@/components/ui/button'
import { tabLinks } from '@/lib/detail-tabs'
import type { CourseDetailData } from '../data/course-detail'
import { courseBase, courseTabs } from '../config/course-tabs'
import { CourseIdentityHeader } from './course-identity-header'
import { CourseDiscoverySidebar } from './course-discovery-sidebar'
import { CourseActionBar } from './course-action-bar'

/**
 * Shared frame for every /course/[slug]/* page: breadcrumbs, identity header,
 * sticky tab bar, desktop sidebar, closing CTA and the mobile action bar.
 */
export function CourseDetailShell({ course, children }: { course: CourseDetailData; children: ReactNode }) {
  const base = courseBase(course.slug)
  const tabs = tabLinks(courseTabs, course, base)

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <DetailTabBreadcrumbs trail={['Home', { label: 'Courses', href: '/courses' }]} entityLabel={course.name} base={base} tabs={tabs} />
        <div className="mt-4">
          <CourseIdentityHeader course={course} />
        </div>
      </Container>

      <DetailTabNav items={tabs.map(({ href, label }) => ({ href, label }))} label={`${course.name} sections`} />

      <Container className="px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="min-w-0 flex-1">{children}</div>
          <DetailStickySidebar>
            <CourseDiscoverySidebar course={course} />
          </DetailStickySidebar>
        </div>
      </Container>

      <Container className="px-4 pt-8 pb-10">
        <div className="flex flex-col gap-4 rounded-[12px] border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-foreground">Ready to shortlist colleges for {course.name}?</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Browse colleges offering this course, or explore more courses on Pathway.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="cta" className="h-11 gap-2 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
              View Colleges
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" className="h-11 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/courses" />}>
              Explore More Courses
            </Button>
          </div>
        </div>
      </Container>

      <CourseActionBar course={course} />
    </div>
  )
}
