import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import type { CourseDetailData } from '../data/course-detail'
import { CourseIdentityHeader } from './course-identity-header'
import { CourseDetailNav } from './course-detail-nav'
import { CourseOverviewSection } from './course-overview-section'
import { CourseEligibilitySection } from './course-eligibility-section'
import { CourseFeesSection } from './course-fees-section'
import { CourseExamsSection } from './course-exams-section'
import { CourseSpecializationsSection } from './course-specializations-section'
import { CourseSyllabusSection } from './course-syllabus-section'
import { CourseCareersSection } from './course-careers-section'
import { CourseCollegesSection } from './course-colleges-section'
import { RelatedCoursesSection } from './related-courses-section'
import { CourseFaqSection } from './course-faq-section'
import { CourseDiscoverySidebar } from './course-discovery-sidebar'

export function CourseDetailPage({ course }: { course: CourseDetailData }) {
  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', 'Courses', course.name]} />
        <div className="mt-4">
          <CourseIdentityHeader course={course} />
        </div>
      </Container>

      <CourseDetailNav />

      <Container className="px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="min-w-0 flex-1">
            <CourseOverviewSection course={course} />
            <CourseEligibilitySection course={course} />
            <CourseFeesSection course={course} />
            <CourseExamsSection course={course} />
            <CourseSpecializationsSection course={course} />
            <CourseSyllabusSection course={course} />
            <CourseCareersSection course={course} />
            <CourseCollegesSection course={course} />
            <RelatedCoursesSection course={course} />
            <CourseFaqSection course={course} />
          </div>

          <div className="hidden shrink-0 lg:sticky lg:top-40 lg:block lg:w-75">
            <CourseDiscoverySidebar course={course} />
          </div>
        </div>
      </Container>
    </div>
  )
}
