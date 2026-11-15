import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToSection } from '@/components/shared/scroll-to-section'
import { findTab, tabSection } from '@/lib/detail-tabs'
import { getDetailedExam } from '@/features/exams/api/exams-api'
import { examTabMetadata, examTabs } from '@/features/exams/config/exam-tabs'

type Props = { params: Promise<{ slug: string }> }

const SEGMENT = 'dates'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return examTabMetadata(await getDetailedExam(slug), SEGMENT)
}

export default async function ExamDatesRoute({ params }: Props) {
  const { slug } = await params
  const exam = await getDetailedExam(slug)
  const tab = exam ? findTab(examTabs, exam, SEGMENT) : undefined
  if (!tab) notFound()
  return <ScrollToSection id={tabSection(tab)} />
}
