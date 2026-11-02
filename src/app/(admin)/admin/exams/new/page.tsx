import type { Metadata } from 'next'
import { AdminExamEditor } from '@/features/admin/components/exams/admin-exam-editor'

export const metadata: Metadata = {
  title: 'Add exam | Pathway Admin',
  description: 'Create a new entrance exam listing.',
}

export default function AdminExamNewPage() {
  return <AdminExamEditor mode="add" />
}
