import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminStudentById, getAdminStudents } from '@/features/admin/data/admin-students'
import { AdminStudentEditor } from '@/features/admin/components/students/editor/admin-student-editor'

type Props = {
  params: Promise<{ studentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { studentId } = await params
  const student = getAdminStudentById(studentId)

  return {
    title: student
      ? `Edit ${student.name} | Pathway Admin`
      : 'Student Not Found | Pathway Admin',
  }
}

export async function generateStaticParams() {
  return getAdminStudents().map((student) => ({
    studentId: student.id,
  }))
}

export default async function AdminStudentEditPage({ params }: Props) {
  const { studentId } = await params
  const student = getAdminStudentById(studentId)

  if (!student) {
    notFound()
  }

  return <AdminStudentEditor student={student} />
}
