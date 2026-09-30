import { Badge } from '@/components/ui/badge'
import type { AdminStudentAccountStatus } from '@/features/admin/data/admin-students'

export function StudentStatusBadge({
  status,
}: {
  status: AdminStudentAccountStatus | string
}) {
  if (status === 'demo_account' || status === 'Demo Account') {
    return <Badge variant="info" size="sm">Demo Account</Badge>
  }

  return <Badge variant="muted" size="sm">{status}</Badge>
}
