import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { exams } from '@/features/exams/data/exams'
import { getAdminExamById } from '@/features/admin/data/admin-exams'
import { AdminExamDetailView } from '@/features/admin/components/exams/admin-exam-detail-view'

type Props = {
  params: Promise<{ examId: string }>
}

export function generateStaticParams() {
  return exams.map((exam) => ({ examId: exam.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params
  const exam = getAdminExamById(examId)
  return { title: exam ? `${exam.shortName} | Exams | Pathway Admin` : 'Exam not found | Pathway Admin' }
}

export default async function AdminExamDetailPage({ params }: Props) {
  const { examId } = await params
  const exam = getAdminExamById(examId)
  if (!exam) notFound()
  return <AdminExamDetailView exam={exam} />
}
