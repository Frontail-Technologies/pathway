import type { ReactNode } from 'react'
import { Container } from '@/components/shared/container'
import { DetailBody } from '@/components/shared/detail-section'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailTabBreadcrumbs } from '@/components/shared/detail-tab-breadcrumbs'
import { hasTab, sectionNavItems, tabLinks } from '@/lib/detail-tabs'
import type { CourseDetailData } from '../data/course-detail'
import { courseBase, courseTabs } from '../config/course-tabs'
import { CourseIdentityHeader } from './course-identity-header'
import { CourseDiscoverySidebar } from './course-discovery-sidebar'
import { CourseActionBar } from './course-action-bar'
import { CourseOverviewSection } from './course-overview-section'
import { CourseEligibilitySection } from './course-eligibility-section'
import { CourseExamsSection } from './course-exams-section'
import { CourseFeesSection } from './course-fees-section'
import { CourseSyllabusSection } from './course-syllabus-section'
import { CourseSpecializationsSection } from './course-specializations-section'
import { CourseCareersSection } from './course-careers-section'
import { CourseCollegesSection } from './course-colleges-section'
import { CourseFaqSection } from './course-faq-section'
import { RelatedCoursesSection } from './related-courses-section'

export function CourseDetailShell({ course, children }: { course: CourseDetailData; children: ReactNode }) {
  const base = courseBase(course.slug)
  const has = (segment: string) => hasTab(courseTabs, course, segment)

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 pb-5 lg:pt-6">
        <DetailTabBreadcrumbs trail={['Home', { label: 'Courses', href: '/courses' }]} entityLabel={course.name} base={base} tabs={tabLinks(courseTabs, course, base)} />
        <div className="mt-4">
          <CourseIdentityHeader course={course} />
        </div>
      </Container>

      <DetailSectionNav items={sectionNavItems(courseTabs, course)} label={`${course.name} sections`} />

      <DetailBody aside={<CourseDiscoverySidebar course={course} />}>
        <CourseOverviewSection course={course} />
        {has('eligibility') ? (
          <>
            <CourseEligibilitySection course={course} />
            <CourseExamsSection course={course} />
          </>
        ) : null}
        {has('fees') ? <CourseFeesSection course={course} /> : null}
        {has('syllabus') ? (
          <>
            <CourseSyllabusSection course={course} />
            <CourseSpecializationsSection course={course} />
          </>
        ) : null}
        {has('careers') ? <CourseCareersSection course={course} /> : null}
        {has('colleges') ? <CourseCollegesSection course={course} /> : null}
        {has('faqs') ? <CourseFaqSection course={course} /> : null}
        <RelatedCoursesSection course={course} />

      </DetailBody>

      {children}
      <CourseActionBar course={course} />
    </div>
  )
}
