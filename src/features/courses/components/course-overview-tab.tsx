import { DetailTabLinks } from '@/components/shared/detail-tab-links'
import { LegacyAnchorRedirect } from '@/components/shared/legacy-anchor-redirect'
import type { CourseDetailData } from '../data/course-detail'
import { courseBase, courseTabHref, courseTabs, legacyCourseAnchors } from '../config/course-tabs'
import { CourseOverviewSection } from './course-overview-section'
import { RelatedCoursesSection } from './related-courses-section'

export function CourseOverviewTab({ course }: { course: CourseDetailData }) {
  const tiles = courseTabs.filter((tab) => tab.segment).map((tab) => ({ href: courseTabHref(course.slug, tab.segment), label: tab.label, teaser: tab.teaser?.(course) }))
  return (
    <>
      <LegacyAnchorRedirect base={courseBase(course.slug)} anchors={legacyCourseAnchors} />
      <CourseOverviewSection course={course} />
      <DetailTabLinks title={`Explore ${course.name}`} items={tiles} />
      <RelatedCoursesSection course={course} />
    </>
  )
}
