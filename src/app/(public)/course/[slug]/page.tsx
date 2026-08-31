import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { CourseDetailPage } from '@/features/courses/components/course-detail-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export function generateStaticParams() {
  return [{ slug: 'btech-computer-science' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseDetail(slug)
  return { title: course ? course.name : 'Course Not Found' }
}

export default async function CourseDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourseDetail(slug)
  if (!course) notFound()

  return (
    <>
      <CourseDetailPage course={course} />
      <MobileBottomNavigation />
    </>
  )
}
