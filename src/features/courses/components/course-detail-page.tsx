import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { Button } from '@/components/ui/button'
import type { CourseDetailData } from '../data/course-detail'
import { CourseIdentityHeader } from './course-identity-header'
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
import { CourseActionBar } from './course-action-bar'

const COURSE_NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'fees', label: 'Fees' },
  { id: 'exams', label: 'Exams' },
  { id: 'specializations', label: 'Specializations' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'careers', label: 'Careers' },
  { id: 'colleges', label: 'Colleges' },
  { id: 'related', label: 'Related Courses' },
  { id: 'faqs', label: 'FAQs' },
]

export function CourseDetailPage({ course }: { course: CourseDetailData }) {
  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', { label: 'Courses', href: '/courses' }, course.name]} />
        <div className="mt-4">
          <CourseIdentityHeader course={course} />
        </div>
      </Container>

      <DetailSectionNav items={COURSE_NAV_SECTIONS} />

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

          <DetailStickySidebar>
            <CourseDiscoverySidebar course={course} />
          </DetailStickySidebar>
        </div>
      </Container>

      <Container className="px-4 pb-10">
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
