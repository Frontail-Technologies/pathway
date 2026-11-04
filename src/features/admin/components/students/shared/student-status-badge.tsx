import type { AdminStudentAccountStatus } from '@/features/admin/data/admin-students'
import { StatusBadge } from '@/features/admin/components/kit'

export function StudentStatusBadge({ status }: { status: AdminStudentAccountStatus | string }) {
  return <StatusBadge>{status === 'demo_account' ? 'Demo account' : status}</StatusBadge>
}
