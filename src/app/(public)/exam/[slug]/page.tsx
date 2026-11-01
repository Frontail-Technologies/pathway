import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findTab } from '@/lib/detail-tabs'
import { examTabMetadata, examTabs, getDetailedExam } from '@/features/exams/config/exam-tabs'
import { ExamOverviewTab } from '@/features/exams/components/exam-detail'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return examTabMetadata(getDetailedExam(slug), '')
}

export default async function ExamOverviewRoute({ params }: Props) {
  const { slug } = await params
  const exam = getDetailedExam(slug)
  if (!exam || !findTab(examTabs, exam, '')) notFound()
  return (
    <>
      <ExamOverviewTab exam={exam} />
    </>
  )
}
