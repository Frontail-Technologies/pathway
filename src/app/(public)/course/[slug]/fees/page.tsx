import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/api/courses-api'
import { courseTabMetadata } from '@/features/courses/config/course-tabs'
import { CourseFeesSection } from '@/features/courses/components/course-fees-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(await getCourseDetail(slug), 'fees')
}

export default async function CourseFeesRoute({ params }: Props) {
  const { slug } = await params
  const course = await getCourseDetail(slug)
  if (!course) notFound()
  return (
    <>
      <CourseFeesSection course={course} />
    </>
  )
}
