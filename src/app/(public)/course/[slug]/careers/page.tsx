import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { courseTabMetadata } from '@/features/courses/config/course-tabs'
import { CourseCareersSection } from '@/features/courses/components/course-careers-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(getCourseDetail(slug), 'careers')
}

export default async function CourseCareersRoute({ params }: Props) {
  const { slug } = await params
  const course = getCourseDetail(slug)
  if (!course) notFound()
  return (
    <>
      <CourseCareersSection course={course} />
    </>
  )
}
