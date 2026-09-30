import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminStudentById, getAdminStudents } from '@/features/admin/data/admin-students'
import { AdminStudentDetailView } from '@/features/admin/components/students/detail/admin-student-detail-view'

type Props = {
  params: Promise<{ studentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { studentId } = await params
  const student = getAdminStudentById(studentId)
  if (!student) return { title: 'Student Not Found | Pathway Admin' }

  return {
    title: `${student.name} | Student Details | Pathway Admin`,
    description: `Administrative overview and education preferences for ${student.name}.`,
  }
}

export async function generateStaticParams() {
  const students = getAdminStudents()
  return students.map((s) => ({
    studentId: s.id,
  }))
}

export default async function AdminStudentDetailPage({ params }: Props) {
  const { studentId } = await params
  const student = getAdminStudentById(studentId)

  if (!student) {
    notFound()
  }

  return <AdminStudentDetailView student={student} />
}
