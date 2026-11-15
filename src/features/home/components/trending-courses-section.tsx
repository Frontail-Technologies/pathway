import { HomeSectionHeading } from './home-section-heading'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { CourseCard } from '@/features/courses/components/course-card'
import { getPopularCourses } from '../api/home-data'


export async function TrendingCoursesSection() {
  const courses = await getPopularCourses(8)
  if (courses.length < 3) return null
  return (
    <section className="bg-background py-10 sm:py-12 lg:py-16">
      <div className="container-shell">
        <HomeSectionHeading eyebrow="Courses" title="Popular courses" subtitle="Fees, eligibility and the colleges that offer them" href="/courses" linkLabel="See all courses" />
        <HorizontalContentRail ariaLabel="Popular courses" edgeBleed showControls className="mt-5 sm:mx-0" trackClassName="sm:px-0 sm:scroll-px-0">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} variant="rail" />
          ))}
        </HorizontalContentRail>
      </div>
    </section>
  )
}
