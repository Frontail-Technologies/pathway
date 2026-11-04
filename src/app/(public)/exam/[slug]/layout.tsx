import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getDetailedExam } from '@/features/exams/api/exams-api'
import { ExamDetailShell } from '@/features/exams/components/exam-detail'

export default async function ExamLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exam = await getDetailedExam(slug)
  if (!exam) notFound()
  return <ExamDetailShell exam={exam}>{children}</ExamDetailShell>
}
