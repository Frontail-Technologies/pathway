import { StudentDashboardLayout } from '@/components/layout/student-dashboard-layout'
import { StudentAuthGuard } from '@/features/student/components/student-auth-guard'


export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudentAuthGuard>
      <StudentDashboardLayout>{children}</StudentDashboardLayout>
    </StudentAuthGuard>
  )
}
