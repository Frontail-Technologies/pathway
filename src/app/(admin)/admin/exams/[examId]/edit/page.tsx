import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { exams } from '@/features/exams/data/exams'
import { getAdminExamById } from '@/features/admin/data/admin-exams'
import { AdminExamEditor } from '@/features/admin/components/exams/admin-exam-editor'

type Props = {
  params: Promise<{ examId: string }>
}

export function generateStaticParams() {
  return exams.map((exam) => ({ examId: exam.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params
  const exam = getAdminExamById(examId)
  return { title: exam ? `Edit ${exam.shortName} | Pathway Admin` : 'Exam not found | Pathway Admin' }
}

export default async function AdminExamEditPage({ params }: Props) {
  const { examId } = await params
  const exam = getAdminExamById(examId)
  if (!exam) notFound()
  return <AdminExamEditor exam={exam} mode="edit" />
}
