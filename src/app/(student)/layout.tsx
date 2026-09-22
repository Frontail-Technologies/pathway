import { StudentDashboardLayout } from '@/components/layout/student-dashboard-layout'
import { StudentAuthGuard } from '@/features/student/components/student-auth-guard'

// The profile provider now lives in the root layout (shared with the auth screens); this route group adds the demo sign-in gate.
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudentAuthGuard>
      <StudentDashboardLayout>{children}</StudentDashboardLayout>
    </StudentAuthGuard>
  )
}
