import type { AdminStudentAccountStatus } from '@/features/admin/data/admin-students'
import { StatusBadge } from '@/features/admin/components/kit'

/** Account status. The only state today is the demo account, which is neutral (not an alert). */
export function StudentStatusBadge({ status }: { status: AdminStudentAccountStatus | string }) {
  return <StatusBadge>{status === 'demo_account' ? 'Demo account' : status}</StatusBadge>
}
