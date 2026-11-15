import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findTab } from '@/lib/detail-tabs'
import { getCourseDetail } from '@/features/courses/api/courses-api'
import { courseTabMetadata, courseTabs } from '@/features/courses/config/course-tabs'

type Props = { params: Promise<{ slug: string }> }

const SEGMENT = ''

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return courseTabMetadata(await getCourseDetail(slug), SEGMENT)
}

export default async function CourseOverviewRoute({ params }: Props) {
  const { slug } = await params
  const course = await getCourseDetail(slug)
  const tab = course ? findTab(courseTabs, course, SEGMENT) : undefined
  if (!tab) notFound()
  return null
}
