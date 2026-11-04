import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/api/courses-api'
import { courseTabMetadata } from '@/features/courses/config/course-tabs'
import { CourseFaqSection } from '@/features/courses/components/course-faq-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(await getCourseDetail(slug), 'faqs')
}

export default async function CourseFaqsRoute({ params }: Props) {
  const { slug } = await params
  const course = await getCourseDetail(slug)
  if (!course) notFound()
  return (
    <>
      <CourseFaqSection course={course} />
    </>
  )
}
