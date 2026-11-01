import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getDetailedExam, getDetailedExamSlugs } from '@/features/exams/config/exam-tabs'
import { ExamDetailShell } from '@/features/exams/components/exam-detail'

// Params generated here cover every sub-page under /exam/[slug]/*.
export function generateStaticParams() {
  return getDetailedExamSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export default async function ExamLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exam = getDetailedExam(slug)
  if (!exam) notFound()
  return <ExamDetailShell exam={exam}>{children}</ExamDetailShell>
}
