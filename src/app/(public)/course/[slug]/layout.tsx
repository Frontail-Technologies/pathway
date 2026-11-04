import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getCourseDetail } from '@/features/courses/api/courses-api'
import { CourseDetailShell } from '@/features/courses/components/course-detail-shell'

export default async function CourseLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourseDetail(slug)
  if (!course) notFound()
  return <CourseDetailShell course={course}>{children}</CourseDetailShell>
}
