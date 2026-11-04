import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/api/courses-api'
import { courseTabMetadata } from '@/features/courses/config/course-tabs'
import { CourseOverviewTab } from '@/features/courses/components/course-overview-tab'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(await getCourseDetail(slug), '')
}

export default async function CourseOverviewRoute({ params }: Props) {
  const { slug } = await params
  const course = await getCourseDetail(slug)
  if (!course) notFound()
  return (
    <>
      <CourseOverviewTab course={course} />
    </>
  )
}
