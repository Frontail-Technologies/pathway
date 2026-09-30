import { type Metadata } from 'next'
import { getAdminStudents } from '@/features/admin/data/admin-students'
import { AdminStudentsView } from '@/features/admin/components/students/directory/admin-students-view'

export const metadata: Metadata = {
  title: 'Students | Admin Console',
  description: 'View student profiles, education preferences, and profile completeness.',
}

export default function AdminStudentsPage() {
  const students = getAdminStudents()

  return <AdminStudentsView initialStudents={students} />
}
