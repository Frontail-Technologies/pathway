import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { courseTabMetadata } from '@/features/courses/config/course-tabs'
import { CourseEligibilitySection } from '@/features/courses/components/course-eligibility-section'
import { CourseExamsSection } from '@/features/courses/components/course-exams-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(getCourseDetail(slug), 'eligibility')
}

export default async function CourseEligibilityRoute({ params }: Props) {
  const { slug } = await params
  const course = getCourseDetail(slug)
  if (!course) notFound()
  return (
    <>
      <CourseEligibilitySection course={course} />
      <CourseExamsSection course={course} />
    </>
  )
}
