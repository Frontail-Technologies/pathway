import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getCourseDetail, getCourseDetailSlugs } from '@/features/courses/data/course-detail'
import { CourseDetailShell } from '@/features/courses/components/course-detail-shell'

// Params generated here cover every sub-page under /course/[slug]/*.
export function generateStaticParams() {
  return getCourseDetailSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export default async function CourseLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourseDetail(slug)
  if (!course) notFound()
  return <CourseDetailShell course={course}>{children}</CourseDetailShell>
}
