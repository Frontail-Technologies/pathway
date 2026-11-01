import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { courseTabMetadata } from '@/features/courses/config/course-tabs'
import { CourseOverviewTab } from '@/features/courses/components/course-overview-tab'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(getCourseDetail(slug), '')
}

export default async function CourseOverviewRoute({ params }: Props) {
  const { slug } = await params
  const course = getCourseDetail(slug)
  if (!course) notFound()
  return (
    <>
      <CourseOverviewTab course={course} />
    </>
  )
}
