import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findTab } from '@/lib/detail-tabs'
import { examTabMetadata, examTabs } from '@/features/exams/config/exam-tabs'
import { getDetailedExam } from '@/features/exams/api/exams-api'
import { CoursesSection } from '@/features/exams/components/exam-detail'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return examTabMetadata(await getDetailedExam(slug), 'courses')
}

export default async function ExamCoursesRoute({ params }: Props) {
  const { slug } = await params
  const exam = await getDetailedExam(slug)
  if (!exam || !findTab(examTabs, exam, 'courses')) notFound()
  return (
    <>
      <CoursesSection exam={exam} />
    </>
  )
}
