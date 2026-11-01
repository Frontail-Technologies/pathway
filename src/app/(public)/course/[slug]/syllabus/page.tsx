import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { courseTabMetadata } from '@/features/courses/config/course-tabs'
import { CourseSyllabusSection } from '@/features/courses/components/course-syllabus-section'
import { CourseSpecializationsSection } from '@/features/courses/components/course-specializations-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(getCourseDetail(slug), 'syllabus')
}

export default async function CourseSyllabusRoute({ params }: Props) {
  const { slug } = await params
  const course = getCourseDetail(slug)
  if (!course) notFound()
  return (
    <>
      <CourseSyllabusSection course={course} />
      <CourseSpecializationsSection course={course} />
    </>
  )
}
